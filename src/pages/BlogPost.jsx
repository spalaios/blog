import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

// Using the same mock data from Blog.jsx
const blogPosts = [
  {
    id: 1,
    title: 'Getting Started with React',
    date: 'July 15, 2023',
    excerpt: 'Learn how to build your first React application from scratch.',
    content: `
      <p>React is a popular JavaScript library for building user interfaces, particularly single-page applications. It's used for handling the view layer in web and mobile apps.</p>
      <h3>Setting Up Your Environment</h3>
      <p>To get started with React, you'll need to have Node.js installed. Then, you can create a new React application using Create React App:</p>
      <pre>npx create-react-app my-app</pre>
      <p>Once the installation is complete, navigate to your project directory and start the development server:</p>
      <pre>cd my-app</pre>
      <pre>npm start</pre>
      <h3>Understanding React Components</h3>
      <p>React applications are built using components. A component is a self-contained module that renders some output. Components can be functional or class-based.</p>
      <p>Here's a simple functional component:</p>
      <pre>function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}</pre>
      <p>Components can be composed together to create complex UIs. They can also maintain state, which allows them to keep track of changing data.</p>
      <h3>Next Steps</h3>
      <p>Once you're comfortable with the basics, you might want to explore:</p>
      <ul>
        <li>React Router for navigation</li>
        <li>State management with Redux or Context API</li>
        <li>Styling approaches in React</li>
        <li>Making API calls</li>
      </ul>
      <p>React has a vast ecosystem and active community, making it a great choice for modern web development.</p>
    `
  },
  {
    id: 2,
    title: 'CSS Tips and Tricks',
    date: 'June 30, 2023',
    excerpt: 'Discover some useful CSS techniques to enhance your web design.',
    content: `
      <p>CSS (Cascading Style Sheets) is a cornerstone technology of the web, allowing you to create great-looking websites. Here are some useful techniques to enhance your designs:</p>
      <h3>Flexbox</h3>
      <p>Flexbox is a layout model that allows items in a container to be aligned and distributed across an axis. It's perfect for creating responsive designs:</p>
      <pre>.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}</pre>
      <h3>CSS Grid</h3>
      <p>CSS Grid Layout is a two-dimensional layout system designed specifically for user interface design. It allows you to create complex layouts with ease:</p>
      <pre>.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}</pre>
      <h3>Custom Properties (Variables)</h3>
      <p>CSS variables allow you to define reusable values throughout your stylesheet:</p>
      <pre>:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
}

.button {
  background-color: var(--primary-color);
}</pre>
      <h3>Media Queries</h3>
      <p>Media queries allow you to apply different styles based on device characteristics:</p>
      <pre>@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}</pre>
      <p>These are just a few of the many CSS techniques that can help you create beautiful, responsive web designs.</p>
    `
  },
  {
    id: 3,
    title: 'JavaScript Best Practices',
    date: 'June 15, 2023',
    excerpt: 'Explore the best practices for writing clean, efficient JavaScript code.',
    content: 'Full content would go here...'
  },
  {
    id: 4,
    title: 'Building Neural Networks',
    date: 'May 20, 2023',
    excerpt: 'Dive into the world of neural networks and learn how to build systems that can learn and adapt to complex data patterns.',
    content: `
      <p>Neural networks are computing systems inspired by the biological neural networks that constitute animal brains. They are the foundation of many modern AI systems.</p>
      <h3>The Basic Structure</h3>
      <p>A neural network consists of layers of interconnected nodes or "neurons". Each connection can transmit a signal from one neuron to another. Here's a basic implementation:</p>
      <pre>class NeuralNetwork {
  constructor(inputNodes, hiddenNodes, outputNodes) {
    this.inputNodes = inputNodes;
    this.hiddenNodes = hiddenNodes;
    this.outputNodes = outputNodes;
    
    // Initialize weights and biases
    this.weights_ih = new Matrix(this.hiddenNodes, this.inputNodes);
    this.weights_ho = new Matrix(this.outputNodes, this.hiddenNodes);
    this.weights_ih.randomize();
    this.weights_ho.randomize();
    
    this.bias_h = new Matrix(this.hiddenNodes, 1);
    this.bias_o = new Matrix(this.outputNodes, 1);
    this.bias_h.randomize();
    this.bias_o.randomize();
  }
  
  // More methods would be defined here
}</pre>
      <h3>Training the Network</h3>
      <p>Neural networks learn by adjusting connection weights based on the error of their outputs compared to the expected results. This process is called backpropagation.</p>
      <h3>Applications</h3>
      <p>Neural networks are used in a variety of applications:</p>
      <ul>
        <li>Image and speech recognition</li>
        <li>Natural language processing</li>
        <li>Game playing and decision making</li>
        <li>Medical diagnosis</li>
      </ul>
      <p>The field of neural networks is constantly evolving, with new architectures and training methods being developed regularly.</p>
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
        <nav className="mono-nav">
          <Link to="/" className="mono-nav-link">Home</Link>
          <Link to="/blog" className="mono-nav-link active">Blog</Link>
          <Link to="/" className="mono-nav-link">About</Link>
          <Link to="/" className="mono-nav-link">Now</Link>
        </nav>
        
        <div className="mono-blog-container">
          <div className="mono-error-box">
            <h2 className="mono-error-title">404: Post not found</h2>
            <p className="mono-error-message">The article you're looking for doesn't exist.</p>
            <button 
              onClick={() => navigate('/blog')} 
              className="mono-button"
            >
              Back to blog
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="mono-container">
      <nav className="mono-nav">
        <Link to="/" className="mono-nav-link">Home</Link>
        <Link to="/blog" className="mono-nav-link active">Blog</Link>
        <Link to="/" className="mono-nav-link">About</Link>
        <Link to="/" className="mono-nav-link">Now</Link>
      </nav>
      
      <div className="mono-blog-container">
        <Link 
          to="/blog" 
          className="mono-back-link"
        >
          <span className="mono-back-arrow">←</span> Back
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