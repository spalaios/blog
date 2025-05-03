import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import createJSONBlock from '../utils/formatJSON';

// Using the same mock data from Blog.jsx
const blogPosts = [
//   {
//     id: 1,
//     title: 'Getting Started with React',
//     date: 'July 15, 2023',
//     excerpt: 'Learn how to build your first React application from scratch.',
//     content: `
//       <p>React is a popular JavaScript library for building user interfaces, particularly single-page applications. It's used for handling the view layer in web and mobile apps.</p>
//       <h3>Setting Up Your Environment</h3>
//       <p>To get started with React, you'll need to have Node.js installed. Then, you can create a new React application using Create React App:</p>
//       <pre>npx create-react-app my-app</pre>
//       <p>Once the installation is complete, navigate to your project directory and start the development server:</p>
//       <pre>cd my-app</pre>
//       <pre>npm start</pre>
//       <h3>Understanding React Components</h3>
//       <p>React applications are built using components. A component is a self-contained module that renders some output. Components can be functional or class-based.</p>
//       <p>Here's a simple functional component:</p>
//       <pre>function Welcome(props) {
//   return <h1>Hello, {props.name}</h1>;
// }</pre>
//       <p>Components can be composed together to create complex UIs. They can also maintain state, which allows them to keep track of changing data.</p>
//       <h3>Next Steps</h3>
//       <p>Once you're comfortable with the basics, you might want to explore:</p>
//       <ul>
//         <li>React Router for navigation</li>
//         <li>State management with Redux or Context API</li>
//         <li>Styling approaches in React</li>
//         <li>Making API calls</li>
//       </ul>
//       <p>React has a vast ecosystem and active community, making it a great choice for modern web development.</p>
//     `
//   },
  {
    id: 1,
    title: 'Probabilistic Counting with HyperLogLog: Under the Hood',
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