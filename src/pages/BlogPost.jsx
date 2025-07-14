import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import createJSONBlock from '../utils/formatJSON';

// Using the same mock data from Blog.jsx
const blogPosts = [
  {
    id: 1,
    title: 'Probabilistic Counting with HyperLogLog : Under the Hood - 1',
    date: 'May 1, 2025',
    excerpt: 'How do you count billions of users or pageviews without storing every single one? Meet HyperLogLog—a clever algorithm that trades exactness for extreme efficiency. Here\'s how it works, and why it\'s used by Redis, Google, and more.',
    content: `
          <h3> Part 1 </h3>
          <p> Let's start with problem statements : </p>
          <p>You are a software engineer who has been tasked to build a feature/api where you show the count of either of these requests : </p>
          <ul>
            <li>total unique users who have visited your website</li>
            <li>total unique search queries done on your platform</li>
            <li>total unique IP addresses visiting a server</li>
          </ul>
          <p>A generalised version of the above problems statements will be: Give the cardinality of all the items</p>

          <h3>Example : </h3>
          ${createJSONBlock(`[
            { "id": 1, "name": "Alice" },
            { "id": 2, "name": "Bob" },
            { "id": 1, "name": "Alice" }
          ]`)}
          <p>If we measure the cardinality by "id", then cardinality = 2</p>
          <div class="mono-article-image">
            <img src="/images/cubes_5.png" alt="HyperLogLog visualization"/>
          </div>
          <p>Total unique(cardinality) cubes = 5</p>
          <ul>Now that we understand the requirement, the obvious solution that comes to mind is using a HashMap to track the unique items. Let's walk through the process with our 5 cubes:
          <li>We start with an empty HashMap</li>
          <li>We iterate through each cube<li>
          <li>For each cube, we check if it's already a key in our HashMap</li>
          <li>If the cube is already in the map, we've seen it before, so we do nothing</li>
          <li>If the cube is <b>not</b> in the map, we add it as a new key</li>
          <li>Once we've processed all cubes, the number of entries in the HashMap gives us the total count of unique cubes</li>
          </ul>
          <h3>What if we increase the size of the cubes to say 1 billion ?</h3>
          <div class="mono-article-image">
            <img src="/images/cubes_billion.png" alt="HyperLogLog visualization"/>
          </div>
          <p>if we were to follow the hashmap building process here's how our hashmap would have looked </p>
          ${createJSONBlock(`
[
  {
    "cube_bright_green": 1,
    "cube_red": 1,
    "cube_blue": 1,
    "cube_gold": 1,
    "cube_blue_violet": 1,
    ...
    // and so on, up to billion of unique entries
  }
]`)}
   <p>You see the problem above a billion unique entries would have been created ? </p>
   <p>Let's calculate the approximate total space that will be consumed if the hashmap has 1 billion entries</p>
   <pre>
<b>Key : "cube_bright_green" (string)</b>
  . Avg string length ~20 characters
  . UTF-16 encoding : 2 bytes/character -> 20 * 2 = 40 bytes
  . Object overhead + hash + pointers : ~24 bytes
  . Total key size ~ 64 bytest
   </pre>
   <pre>
<b>Value : int</b>
  . Just an integer -> 4 bytes
  . Padding + reference overhead → ~12–16 bytes in object form 
   </pre>
   <pre>
<b>HashMap overhead per entry</b>
  . Entry object overhead (hash, key ref, value ref, next pointer): ~32 bytes
   </pre>
  <pre>
Key:        ~64 bytes
Value:      ~16 bytes
Entry node: ~32 bytes
-------------------------
Total:      ~112 bytes per entry

Final Calculation for 1 billion+ will be
1,000,000,000 × 112 bytes = 112,000,000,000 bytes = 112 GB
  </pre>
  <p>Assuming the hashmap with load factor of <b>0.75</b> means the hashmap will resize <b>when it's 75% full</b>, so to support 1 billion entries, the capacity needs to be larger than 1 billion <b>(1/0.75 = 1.33)</b>, so that will shoot up the memory space to <b>~150GB</b></p>         
  <p><b>NOTE</b> : The estimates above is done for HashMap used in Java and can vary based on the JVM runtime, architecture and specific object implemetation</p>         
  <ul>What problems would we face if we went ahead with this solution:
  <li>You would need a high memory machine (>= 256 GB RAM). Making it an expensive choice</li>
  <li>Lookup performace would degrade
    <ul>
      <li>While the avg lookup is O(1), collisions can make worst-case O(n) in a poorly implemented hashmap or O(log n) in tree based used in some languages (Java 8+)</li>
      <li>Even avg case can slow down due to cache misses with a massive memory footprint</li>
    </ul>
  </li>
  <li>Garbage collection and rehashing could cause major performace hits
    <ul>
      <li>The 1 billion keys of the hashmap are live and has to maintained in the heap memory directly putting a lot of pressure on the garbage collector. With this scale, stop the world GC pauses can last seconds to minutes</li>
      <li>Rehashing a map with million or billions of entries is a very expensive operation that can pause your application</li>
    </ul>
  </li>
  </ul>
  <p>But if a simple HashMap consumes hundreds of gigabytes, how can anything track billions of unique items in just kilobytes? The answer lies in a clever probabilistic approach. In Part 2, we'll lift the hood on HyperLogLog and see exactly how it achieves this seemingly impossible feat</p>
    `
  }, 
  {
    id: 2,
    title: 'Probabilistic Counting with HyperLogLog : Under the Hood - 2',
    date: 'July 14, 2025',
    excerpt: 'How do you count billions of users or pageviews without storing every single one? Meet HyperLogLog—a clever algorithm that trades exactness for extreme efficiency. Here\'s how it works, and why it\'s used by Redis, Google, and more.',
    content: `
    <h3> Part 2 </h3>
    <p> To understand HyperLogLog, let's start with basic coin flip probabilities </p>
    <div class="mono-article-image">
      <img src="/images/single_head.png" alt="HyperLogLog visualization"/>
    </div>
    <p>The probability of getting head from a single coin is 1/2</p>
    <div class="mono-article-image">
      <img src="/images/five_heads.png" alt="HyperLogLog visualization"/>
    </div>
    <p>The probability of getting all coins with head is 1/2<sup>5</sup></p>
    <div class="mono-article-image">
      <img src="/images/twenty_heads.png" alt="HyperLogLog visualization"/>
    </div>
    <p>The probability of getting all coins with head is 1/2<sup>20</sup></p>
    <p>We can generalize this pattern. The probability of getting k consecutive heads is 1/2<sup>k</sup></p>
    <p><b>Here's the core insight:</b> if you observe 5 consecutive heads, you've likely made around 32 (2<sup>5</sup>) total flips. Similarly, seeing 20 consecutive heads suggests approximately 1,048,576 total flips</p>
    <p>HyperLogLog builds on this principle. When we see k consecutive heads, we estimate that 2<sup>k</sup> total flips might have occurred. <b>This 2<sup>k</sup> value represents our estimate of unique elements encountered</b></p>
    <div class="mono-article-image">
      <img src="/images/cubes_5.png" alt="HyperLogLog visualization"/>
    </div>
    <p>Now let's apply this coin flip concept to our cube colors. We'll pass each color through a hash function that generates a 32 or 64-bit binary string</p>
    <p><b>Why use binary strings?</b> Think of each bit as a coin flip result. A '0' represents heads, and '1' represents tails. The entire binary string simulates a sequence of coin flips, where each bit has an equal probability of being 0 or 1</p>
    <p>Let's see this in action with our cube colors</p>
    <p>Here I have passed all the cube colors into the hash function and generated its corresponding binary string</p>
    ${createJSONBlock(`red :    0010011010001101110000011100100011001110111010000101011101001010
blue :   0000110000111011011000000000111000110001001100111100011110001001
green :  0000101110011110000001110101111111100001010101100001101000111110
yellow : 0000111110100100100010000101101010111001000010011110011100000101
purple : 0001000100101001000110000010010010100000010110001011111101010101        
      `)}
      <p><b>Note</b> : I have used <b>xxHash</b> hash function to generate the binary string here since it is fast, non-cryptographic and has good distribution. Output may vary depending on the seed value used by the hash function.</p>
      <p>Next, we examine the leading zeros in each binary string. We store the longest run of leading 0s among all strings we've processed. In our example, blue, green, and yellow each have 4 leading zeros</p>
      <p>Why focus on the maximum leading zeros? This value estimates our total unique elements. With 4 leading zeros, we estimate 2<sup>4</sup> = 16 unique colors</p>
      <p>However, there's a clear problem with this approach. Our estimate of 16 is far from the actual count of 5 colors. This gets worse with extreme cases</p>
      <p>Consider this scenario: suppose one color generated this binary string:</p>
      ${createJSONBlock(`blue : 0000000000000000000000000000000000000000000000000000000000000001`)}
      <p>as per our logic the largest leading 0s will be 63 which means we might have seen 2^63 colors till now which obviously orders of magnitude far from what we have</p>
      <p>This illustrates the fundamental flaw in our single-value approach. One outlier can completely skew our estimate</p>
      <p>To solve this skew problem, we introduce buckets. Each bucket receives hash values and stores the maximum leading zeros found within that bucket</p>
      <ul>But why do buckets help? They leverage several statistical principles:
        <li>The law of large numbers kicks in with multiple samples</li>
        <li>Averaging many estimates produces stable results</li>
        <li>Extreme outliers get diluted across the population</li>
      </ul>
      <p>Think of this like a product rating system. A single 5-star review isn't very meaningful
        However, averaging 1,000+ ratings gives you a trustworthy result.
        Similarly, more buckets reduce our error rate, though they require additional memory
      </p>
      <p>Let's use 1024 buckets for our example, indexed from 0 to 1023</p>
      <ul>How do we assign our binary string to our buckets?
        <li>Take the first n (10 in our case hence 1024 buckets) bits of each binary string</li>
        <li>Convert these bits to a decimal value (this becomes the bucket index)</li>
        <li>Count the leading zeros in the remaining bits</li>
        <li>Store this count in the corresponding bucket</li>
      </ul>
      <p>Let's walk through this process with our cube colors :</p>
      ${createJSONBlock(`red  :  0010011010 - 001101110000011100100011001110111010000101011101001010
the first 10 bits : 0010011010 -> 154
remaining bits : 001101110000011100100011001110111010000101011101001010 -> leading 0s is 2 (0s from start of the string)
So we will store 3 in bucket index 154`)}
${createJSONBlock(`blue : 0000110000 - 111011011000000000111000110001001100111100011110001001
the first 10 bits - 0000110000 -> 48
remaining bits - 111011011000000000111000110001001100111100011110001001 -> leading 0s is 0
So we will store 1 in bucket index 48`)}
${createJSONBlock(`green : 0000101110 - 011110000001110101111111100001010101100001101000111110
the first 10 bits - 0000101110 -> 46
remaining bits - 011110000001110101111111100001010101100001101000111110 -> leading 0s is 1
So we will store 2 in bucket index 46`)}
${createJSONBlock(`yellow :  0000111110 - 100100100010000101101010111001000010011110011100000101
the first 10 bits - 0000111110 -> 62
remaining bits - 100100100010000101101010111001000010011110011100000101 -> leading 0s is 0
So we will store 1 in bucket index 62`)}
${createJSONBlock(`purple :  0001000100 - 101001000110000010010010100000010110001011111101010101
the first 10 bits - 0001000100 -> 68
remaining bits - 101001000110000010010010100000010110001011111101010101 -> leading 0s is 0
So we will store 1 in bucket index 68`)}

<ul>NOTE :
  <li>if in case the same bucket no. appears and if the leading zero count is greater that what is present in that bucket index we update it</li>
  <li>we are adding +1 to every value (reason explained later)</li>
</ul>
  
<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="800" height="600" fill="#f8f9fa"/>
  
  <!-- Title -->
  <text x="400" y="30" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#333">
    Hash Table: Color Data with Leading Zeros Analysis
  </text>
  
  <!-- Table Headers -->
  <rect x="50" y="60" width="700" height="40" fill="#e9ecef" stroke="#dee2e6" stroke-width="1"/>
  <text x="80" y="85" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#333">Color</text>
  <text x="150" y="85" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#333">Bucket Index</text>
  <text x="320" y="85" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#333">Remaining Bits</text>
  <text x="500" y="85" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#333">Leading Zeros</text>
  <text x="620" y="85" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#333">Stored Value</text>
  
  <!-- Red Row -->
  <rect x="50" y="100" width="700" height="40" fill="#ffebee" stroke="#dee2e6" stroke-width="1"/>
  <circle cx="70" cy="120" r="8" fill="#f44336"/>
  <text x="90" y="125" font-family="Arial, sans-serif" font-size="11" fill="#333">red</text>
  <text x="150" y="115" font-family="monospace" font-size="10" fill="#666">0010011010</text>
  <text x="150" y="130" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#333">154</text>
  <text x="320" y="115" font-family="monospace" font-size="10" fill="#666">00110111...</text>
  <text x="320" y="130" font-family="Arial, sans-serif" font-size="9" fill="#999">(truncated)</text>
  <text x="520" y="125" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#f44336">2</text>
  <text x="640" y="125" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#f44336">3</text>
  
  <!-- Blue Row -->
  <rect x="50" y="140" width="700" height="40" fill="#e3f2fd" stroke="#dee2e6" stroke-width="1"/>
  <circle cx="70" cy="160" r="8" fill="#2196f3"/>
  <text x="90" y="165" font-family="Arial, sans-serif" font-size="11" fill="#333">blue</text>
  <text x="150" y="155" font-family="monospace" font-size="10" fill="#666">0000110000</text>
  <text x="150" y="170" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#333">48</text>
  <text x="320" y="155" font-family="monospace" font-size="10" fill="#666">11101101...</text>
  <text x="320" y="170" font-family="Arial, sans-serif" font-size="9" fill="#999">(truncated)</text>
  <text x="520" y="165" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#2196f3">0</text>
  <text x="640" y="165" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#2196f3">1</text>
  
  <!-- Green Row -->
  <rect x="50" y="180" width="700" height="40" fill="#e8f5e8" stroke="#dee2e6" stroke-width="1"/>
  <circle cx="70" cy="200" r="8" fill="#4caf50"/>
  <text x="90" y="205" font-family="Arial, sans-serif" font-size="11" fill="#333">green</text>
  <text x="150" y="195" font-family="monospace" font-size="10" fill="#666">0000101110</text>
  <text x="150" y="210" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#333">46</text>
  <text x="320" y="195" font-family="monospace" font-size="10" fill="#666">01111000...</text>
  <text x="320" y="210" font-family="Arial, sans-serif" font-size="9" fill="#999">(truncated)</text>
  <text x="520" y="205" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#4caf50">1</text>
  <text x="640" y="205" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#4caf50">2</text>
  
  <!-- Yellow Row -->
  <rect x="50" y="220" width="700" height="40" fill="#fff8e1" stroke="#dee2e6" stroke-width="1"/>
  <circle cx="70" cy="240" r="8" fill="#ffeb3b"/>
  <text x="90" y="245" font-family="Arial, sans-serif" font-size="11" fill="#333">yellow</text>
  <text x="150" y="235" font-family="monospace" font-size="10" fill="#666">0000111110</text>
  <text x="150" y="250" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#333">62</text>
  <text x="320" y="235" font-family="monospace" font-size="10" fill="#666">10010010...</text>
  <text x="320" y="250" font-family="Arial, sans-serif" font-size="9" fill="#999">(truncated)</text>
  <text x="520" y="245" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#f57f17">0</text>
  <text x="640" y="245" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#f57f17">1</text>
  
  <!-- Purple Row -->
  <rect x="50" y="260" width="700" height="40" fill="#f3e5f5" stroke="#dee2e6" stroke-width="1"/>
  <circle cx="70" cy="280" r="8" fill="#9c27b0"/>
  <text x="90" y="285" font-family="Arial, sans-serif" font-size="11" fill="#333">purple</text>
  <text x="150" y="275" font-family="monospace" font-size="10" fill="#666">0001000100</text>
  <text x="150" y="290" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#333">68</text>
  <text x="320" y="275" font-family="monospace" font-size="10" fill="#666">10100100...</text>
  <text x="320" y="290" font-family="Arial, sans-serif" font-size="9" fill="#999">(truncated)</text>
  <text x="520" y="285" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#9c27b0">0</text>
  <text x="640" y="285" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#9c27b0">1</text>
  
  <!-- Legend -->
  <rect x="50" y="340" width="700" height="200" fill="#ffffff" stroke="#dee2e6" stroke-width="1"/>
  <text x="70" y="365" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#333">Key Insights:</text>
  
  <!-- Insight 1 -->
  <circle cx="80" cy="385" r="3" fill="#f44336"/>
  <text x="95" y="390" font-family="Arial, sans-serif" font-size="12" fill="#333">Red has the highest number of leading zeros (2) → stored value 3</text>
  
  <!-- Insight 2 -->
  <circle cx="80" cy="405" r="3" fill="#2196f3"/>
  <text x="95" y="410" font-family="Arial, sans-serif" font-size="12" fill="#333">Blue, yellow, and purple all have 0 leading zeros → stored value 1</text>
  
  <!-- Insight 3 -->
  <circle cx="80" cy="425" r="3" fill="#4caf50"/>
  <text x="95" y="430" font-family="Arial, sans-serif" font-size="12" fill="#333">Green has 1 leading zero → stored value 2</text>
  
  <!-- Formula -->
  <text x="70" y="460" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#333">Formula: ρ = LZ + 1</text>
  <text x="70" y="480" font-family="Arial, sans-serif" font-size="11" fill="#666">where ρ (rho) is the stored value and LZ is the count of leading zeros</text>
  
  <!-- Bucket Index Range -->
  <text x="70" y="510" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#333">Bucket Index Range: 46 - 154</text>
  <text x="70" y="530" font-family="Arial, sans-serif" font-size="11" fill="#666">10-bit binary values converted to decimal for hash table indexing</text>
</svg>

  <p><b>NOTE : </b>LZ stands for leading zeros</p>
  ${createJSONBlock(`Why stored value is LZ + 1 ?

HyperLogLog works with the formula -> Z = ∑(2^-M[i]) for i = 1 to m

Where :
m = number of buckets (e.g., 1024)
M[i] = the stored value in bucket i (which is LZ + 1)
Z = a value used in the cardinality estimate  `)}
<ul>So if you store just LZ(leading zero) and some bucket ends up storing LZ=0, it means,
  <li>the element had 1 as the first bit</li>
  <li>So we'd store 0</li>
  <li>Then as per the formula given above 2<sup>-0</sup> = 1 which overpowers the average because values like 2<sup>-6</sup> = 0.015625 or 2<sup>-10</sup> = 0.000976 comparing the result 1 seems very large and mess up the estimate
  so if we store LZ+1 then for 0 we store 1 as the count. so 2<sup>-1</sup> = 0.5 which is still greater than other values but not overpowering as 1</li>
</ul>
<p>Rule of Thumb:
You choose n (number of bits for bucket index) based on the desired error rate.
</p>

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="800" height="500" fill="#f8f9fa"/>
  
  <!-- Title -->
  <text x="400" y="30" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#333">
    Error Rate vs Buckets Performance Analysis
  </text>
  
  <!-- Table Headers -->
  <rect x="100" y="60" width="600" height="40" fill="#343a40" stroke="#dee2e6" stroke-width="1"/>
  <text x="130" y="85" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white">n</text>
  <text x="220" y="85" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white">Buckets (m = 2ⁿ)</text>
  <text x="380" y="85" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white">Relative Error (%)</text>
  <text x="550" y="85" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white">Memory (bytes)</text>
  
  <!-- Row 1: n=4 -->
  <rect x="100" y="100" width="600" height="35" fill="#fff5f5" stroke="#dee2e6" stroke-width="1"/>
  <text x="130" y="122" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#333">4</text>
  <text x="220" y="122" font-family="Arial, sans-serif" font-size="12" fill="#333">16</text>
  <text x="380" y="115" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#dc3545">~26%</text>
  <rect x="375" y="118" width="60" height="8" fill="#dc3545" opacity="0.7"/>
  <text x="550" y="122" font-family="Arial, sans-serif" font-size="12" fill="#333">16</text>
  
  <!-- Row 2: n=5 -->
  <rect x="100" y="135" width="600" height="35" fill="#fff8f0" stroke="#dee2e6" stroke-width="1"/>
  <text x="130" y="157" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#333">5</text>
  <text x="220" y="157" font-family="Arial, sans-serif" font-size="12" fill="#333">32</text>
  <text x="380" y="150" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#fd7e14">~18%</text>
  <rect x="375" y="153" width="42" height="8" fill="#fd7e14" opacity="0.7"/>
  <text x="550" y="157" font-family="Arial, sans-serif" font-size="12" fill="#333">32</text>
  
  <!-- Row 3: n=6 -->
  <rect x="100" y="170" width="600" height="35" fill="#fff9f0" stroke="#dee2e6" stroke-width="1"/>
  <text x="130" y="192" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#333">6</text>
  <text x="220" y="192" font-family="Arial, sans-serif" font-size="12" fill="#333">64</text>
  <text x="380" y="185" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#ffc107">~13%</text>
  <rect x="375" y="188" width="30" height="8" fill="#ffc107" opacity="0.7"/>
  <text x="550" y="192" font-family="Arial, sans-serif" font-size="12" fill="#333">64</text>
  
  <!-- Row 4: n=10 -->
  <rect x="100" y="205" width="600" height="35" fill="#f0f8ff" stroke="#dee2e6" stroke-width="1"/>
  <text x="130" y="227" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#333">10</text>
  <text x="220" y="227" font-family="Arial, sans-serif" font-size="12" fill="#333">1,024</text>
  <text x="380" y="220" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#17a2b8">~3.2%</text>
  <rect x="375" y="223" width="8" height="8" fill="#17a2b8" opacity="0.7"/>
  <text x="550" y="227" font-family="Arial, sans-serif" font-size="12" fill="#333">1,024</text>
  
  <!-- Row 5: n=12 -->
  <rect x="100" y="240" width="600" height="35" fill="#f0fff0" stroke="#dee2e6" stroke-width="1"/>
  <text x="130" y="262" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#333">12</text>
  <text x="220" y="262" font-family="Arial, sans-serif" font-size="12" fill="#333">4,096</text>
  <text x="380" y="255" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#28a745">~1.6%</text>
  <rect x="375" y="258" width="4" height="8" fill="#28a745" opacity="0.7"/>
  <text x="550" y="262" font-family="Arial, sans-serif" font-size="12" fill="#333">4,096</text>
  
  <!-- Row 6: n=14 -->
  <rect x="100" y="275" width="600" height="35" fill="#f0fff8" stroke="#dee2e6" stroke-width="1"/>
  <text x="130" y="297" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#333">14</text>
  <text x="220" y="297" font-family="Arial, sans-serif" font-size="12" fill="#333">16,384</text>
  <text x="380" y="290" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#20c997">~0.81%</text>
  <rect x="375" y="293" width="2" height="8" fill="#20c997" opacity="0.7"/>
  <text x="550" y="297" font-family="Arial, sans-serif" font-size="12" fill="#333">16,384</text>
  
  <!-- Key Insights Section -->
  <rect x="50" y="340" width="700" height="140" fill="#ffffff" stroke="#dee2e6" stroke-width="1"/>
  <text x="70" y="365" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#333">Key Performance Insights:</text>
  
  <!-- Insight 1 -->
  <circle cx="80" cy="385" r="3" fill="#dc3545"/>
  <text x="95" y="390" font-family="Arial, sans-serif" font-size="12" fill="#333">Higher bucket count (n) significantly reduces error rate</text>
  
  <!-- Insight 2 -->
  <circle cx="80" cy="405" r="3" fill="#17a2b8"/>
  <text x="95" y="410" font-family="Arial, sans-serif" font-size="12" fill="#333">Memory usage scales linearly with bucket count (1:1 ratio)</text>
  
  <!-- Insight 3 -->
  <circle cx="80" cy="425" r="3" fill="#28a745"/>
  <text x="95" y="430" font-family="Arial, sans-serif" font-size="12" fill="#333">Sweet spot: n=10-12 offers good accuracy with reasonable memory usage</text>
  
  <!-- Formula -->
  <text x="70" y="455" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#333">Trade-off: Accuracy ↑ as Memory ↑</text>
  <text x="70" y="470" font-family="Arial, sans-serif" font-size="11" fill="#666">Each doubling of buckets roughly halves the error rate</text>
  
  <!-- Visual Error Rate Indicator -->
  <text x="450" y="365" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#333">Error Rate Visualization:</text>
  <text x="450" y="380" font-family="Arial, sans-serif" font-size="10" fill="#666">Bar length proportional to error %</text>
  
  <!-- Performance Arrow -->
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#28a745"/>
    </marker>
  </defs>
  <line x1="600" y1="370" x2="680" y2="370" stroke="#28a745" stroke-width="2" marker-end="url(#arrowhead)"/>
  <text x="630" y="365" font-family="Arial, sans-serif" font-size="10" fill="#28a745">Better</text>
  <text x="620" y="385" font-family="Arial, sans-serif" font-size="10" fill="#28a745">Performance</text>
</svg>
  <p>Now we can apply the HyperLogLog formula</p>

${createJSONBlock(`E = α_m * m^2 / Z

Where:
Z = defined above
m = number of buckets (i.e. 2^n)
M[i] = value stored in bucket i (which is LZ + 1)
α_m = bias correction constant, depends on m
Z = sum of 2^-M[i] across all buckets`)}

<p><b>What is α_m?</b><br>α_m (alpha-m) is a bias correction constant that's essential for accurate cardinality estimation in probabilistic counting algorithms like HyperLogLog</p>
<p><b>Why do we need α_m?</b><br>Without this correction factor, our cardinality estimates would be biased consistently too low or too high depending on how many buckets (m) we're using in our hash table. The value of this constant depends on the no. of buckets</p>

${createJSONBlock(`If m = 16:      αₘ = 0.673
If m = 32:      αₘ = 0.697
If m = 64:      αₘ = 0.709
If m ≥ 128:     αₘ = 0.7213 / (1 + 1.079 / m)`)}
<p>so in our case since our bucket count m = 1024 our constant value is 0.720544</p>
<p>Using this formula our total color counts for HLL comes around 740 which is very high. This happens because most buckets remain empty, contributing 2^0 = 1 to our calculation. These empty buckets artificially inflate the average</p>
<p>For small cardinalities, HyperLogLog switches to a more accurate method: linear counting</p>
${createJSONBlock(`So if the E (estimate) <= (5 / 2) * m

Formula for linear counting

E = m * ln(m / V)

Where :
E = estimated number of unique elements
m = total number of buckets (e.g., 1024)
V = number of buckets that still have the value 0
ln = natural logarithm (log base e)

Using the formula we get :

E = 1024 * ln(1024 / 1019)
  ≈ 1024 * ln(1.0049)
  ≈ 1024 * 0.00489
  ≈ 5`)}

  <p>So the estimate is 5 unique elements, which is accurate if you've only seen 5</p>
  <p>Now let's calculate the storage requirements for our HyperLogLog system</p>
  ${createJSONBlock(`With a 64-bit hash function:
a. Maximum leading zeros: 64
b. Maximum LZ + 1 value: 65
c. Bits needed to store 0-65: 7 bits per bucket

This gives us our final storage calculation:
a. m = 1024 buckets
b. 7 bits per bucket

1024 buckets * 7 bits = 7168 bits = 7168 / 8 = 896 bytes = 0.875 KB`)}
<p>The total space required will be <b>0.875 KB</b></p>
<p><b>Sparse Encoding (Optional Optimization)</b><br>
For small cardinalities, you can use a sparse representation:<br>
Instead of allocating memory for all buckets<br>
Store only non-zero entries using (bucket index, value) pairs<br>
This can shrink usage to hundreds of bytes for small datasets<br>
Redis and Google BigQuery use this trick: start sparse, switch to dense when needed
</p>

<p><b>Final Thoughts on Why HyperLogLog is awesome</b><br>
a. Tracks billions of unique values in just kilobytes<br>
b. gives an estimate (not exact), but that's often good enough<br>
c. Used in Redis, Google BigQuery, Postgres etc
</p>

    `
  }
];

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the blog post with the matching id
  const post = blogPosts.find(post => post.id === Number(id));
  
  // If no post is found, return to the blog list
  if (!post) {
    return (
      <div className="mono-container">
        <div className="mono-blog-container">
          <div className="mono-error-box">
            <h2 className="mono-error-title">Error 404: Post not found</h2>
            <p className="mono-error-message">The blog post you're looking for doesn't exist.</p>
            <button 
              onClick={() => navigate('/blog')} 
              className="mono-button"
              aria-label="Return to blog list"
              tabIndex="0"
            >
              cd ../blog
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="mono-container">
      <div className="mono-blog-container">
        <Link 
          to="/blog" 
          className="mono-back-link"
          aria-label="Return to blog list"
          tabIndex="0"
        >
          <span className="mono-back-arrow">←</span> cd ..
        </Link>
        
        <article className="mono-article">
          <header className="mono-article-header">
            <h1 className="mono-article-title">{post.title}</h1>
            <p className="mono-article-date">{post.date}</p>
          </header>
          
          <div 
            className="mono-article-content"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </article>
      </div>
    </div>
  );
};

export default BlogPost; 