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
    id: 4,
    title: 'Probabilistic Counting with HyperLogLog: Under the Hood',
    date: 'May 1, 2025',
    excerpt: 'How do you count billions of users or pageviews without storing every single one? Meet HyperLogLog—a clever algorithm that trades exactness for extreme efficiency. Here\'s how it works, and why it’s used by Redis, Google, and more..',
    content: `
          <h3> Part 1 </h3>
          <p> Let's start with problem statements : </p>
          <ul>You are a software engineer who has been tasked to build a feature/api where you show the count of either of these requests</ul>
          <li>1. total unique users who have visited your website</li>
          <li>2. total unique search queries done on your platform</li>
          <li>3. total unique IP addresses visiting a server</li>
          <li> A generalised version of the above problems statements will be : Give the cardinality of all the items </li>

          <h3>Example : </h3>
          <pre>
          [
            { "id": 1, "name": "Alice" },
            { "id": 2, "name": "Bob" },
            { "id": 1, "name": "Alice" }
          ]
          if we measure the cardinality by "id", then cardinality = 2
          </pre>
    
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