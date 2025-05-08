// Blog Posts Data
const blogPosts = [
  {
    id: 1,
    title: "Modern JavaScript Features You Should Know",
    category: "javascript",
    date: "October 15, 2023",
    excerpt: "JavaScript has evolved significantly over the years. This post explores the most useful modern features that can improve your code quality and developer experience.",
    content: `
      <p>JavaScript has evolved significantly over the years. This post explores the most useful modern features that can improve your code quality and developer experience.</p>
      
      <h4>1. Arrow Functions</h4>
      <p>Arrow functions provide a more concise syntax for writing function expressions, offering both a shorter syntax and non-binding of 'this'.</p>
      <pre><code>// Traditional function
const add = function(a, b) {
  return a + b;
};

// Arrow function
const add = (a, b) => a + b;
</code></pre>

      <h4>2. Destructuring Assignment</h4>
      <p>Destructuring allows you to extract data from arrays or objects into distinct variables with a more readable syntax.</p>
      <pre><code>// Object destructuring
const person = { name: 'John', age: 30 };
const { name, age } = person;

// Array destructuring
const colors = ['red', 'green', 'blue'];
const [primary, secondary] = colors;
</code></pre>

      <h4>3. Spread and Rest Operators</h4>
      <p>The spread operator (...) allows an iterable to be expanded in places where zero or more arguments or elements are expected. The rest parameter syntax allows us to represent an indefinite number of arguments as an array.</p>
      <pre><code>// Spread operator
const numbers = [1, 2, 3];
const newNumbers = [...numbers, 4, 5]; // [1, 2, 3, 4, 5]

// Rest parameter
function sum(...args) {
  return args.reduce((total, num) => total + num, 0);
}
</code></pre>

      <h4>4. Template Literals</h4>
      <p>Template literals provide an easy way to interpolate variables and expressions into strings, as well as create multi-line strings.</p>
      <pre><code>const name = 'World';
const greeting = \`Hello ${name}!
This is a multi-line string.\`;
</code></pre>

      <h4>5. Optional Chaining</h4>
      <p>Optional chaining (?.) allows reading the value of a property located deep within a chain of connected objects without having to check that each reference in the chain is valid.</p>
      <pre><code>const user = {
  profile: {
    // address might not exist
  }
};

// Without optional chaining
const zipCode = user.profile && user.profile.address 
  ? user.profile.address.zipCode : undefined;

// With optional chaining
const zipCode = user.profile?.address?.zipCode;
</code></pre>

      <p>Adopting these modern JavaScript features can significantly improve your code's readability and maintainability. Which features do you find most useful in your projects?</p>
    `
  },
  {
    id: 2,
    title: "Building Responsive Websites: Best Practices",
    category: "webdev",
    date: "September 28, 2023",
    excerpt: "Creating websites that look great on all devices is essential in today's mobile-first world. Learn the key principles and techniques for building truly responsive websites.",
    content: `
      <p>Creating websites that look great on all devices is essential in today's mobile-first world. Let's explore the key principles and techniques for building truly responsive websites.</p>
      
      <h4>The Foundation: Responsive Design Principles</h4>
      <p>Responsive web design is built on three fundamental concepts:</p>
      <ol>
        <li><strong>Fluid Grids:</strong> Using relative units like percentages instead of fixed pixels for layout elements</li>
        <li><strong>Flexible Images:</strong> Ensuring media scales within their containing elements</li>
        <li><strong>Media Queries:</strong> Applying different styles based on device characteristics (primarily screen width)</li>
      </ol>
      
      <h4>Mobile-First Approach</h4>
      <p>Start by designing for the smallest screen first, then progressively enhance the experience for larger screens. This approach forces you to focus on content priorities and core functionality.</p>
      
      <pre><code>/* Mobile styles (base) */
.container {
  padding: 1rem;
}

/* Tablet styles */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

/* Desktop styles */
@media (min-width: 1024px) {
  .container {
    max-width: 960px;
    margin: 0 auto;
  }
}
</code></pre>
      
      <h4>Responsive Typography</h4>
      <p>Text should be readable across all devices without requiring zoom. Consider these techniques:</p>
      <ul>
        <li>Use relative units (em, rem) instead of pixels</li>
        <li>Set a reasonable base font size (typically 16px)</li>
        <li>Implement a fluid type scale that adjusts based on viewport width</li>
      </ul>
      
      <pre><code>html {
  font-size: 16px;
}

h1 {
  /* Fluid typography that scales between 1.8rem and 3rem */
  font-size: clamp(1.8rem, 5vw, 3rem);
}
</code></pre>
      
      <h4>Flexible Images</h4>
      <p>Images should never cause horizontal scrolling or overflow their containers:</p>
      
      <pre><code>img {
  max-width: 100%;
  height: auto;
}
</code></pre>
      
      <h4>CSS Grid and Flexbox</h4>
      <p>Modern layout tools like CSS Grid and Flexbox have made responsive layouts much easier to implement:</p>
      
      <pre><code>/* Basic responsive grid */
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
</code></pre>
      
      <h4>Testing Across Devices</h4>
      <p>Always test your responsive designs on actual devices when possible, not just using browser dev tools. Pay attention to:</p>
      <ul>
        <li>Touch targets (buttons, links) should be at least 44×44px</li>
        <li>Font sizes should be comfortable to read without zooming</li>
        <li>Layouts should accommodate different aspect ratios</li>
        <li>Performance considerations for less powerful devices</li>
      </ul>
      
      <p>By applying these responsive design principles consistently, you'll create websites that provide an optimal viewing experience across the wide range of devices used today.</p>
    `
  },
  {
    id: 3,
    title: "The Complete Guide to CSS Flexbox",
    category: "webdev",
    date: "August 12, 2023",
    excerpt: "Flexbox has revolutionized CSS layouts. This comprehensive guide covers everything you need to know to master this powerful layout system.",
    content: `
      <p>Flexbox has revolutionized CSS layouts by providing a more efficient way to arrange, align, and distribute space among elements. This guide will help you master this powerful layout system.</p>
      
      <h4>What is Flexbox?</h4>
      <p>Flexbox (Flexible Box Module) is a one-dimensional layout method designed for arranging items in rows or columns. It excels at distributing space and aligning items within a container, even when their size is unknown or dynamic.</p>
      
      <h4>Basic Concepts</h4>
      <p>There are two key components in the flexbox model:</p>
      <ul>
        <li><strong>Flex Container:</strong> The parent element with <code>display: flex</code> applied</li>
        <li><strong>Flex Items:</strong> The direct children of the flex container</li>
      </ul>
      
      <pre><code>.container {
  display: flex;
  /* or */
  display: inline-flex;
}
</code></pre>
      
      <h4>Flex Container Properties</h4>
      
      <h5>1. flex-direction</h5>
      <p>Establishes the main axis of the container, defining the direction flex items are placed.</p>
      <pre><code>.container {
  flex-direction: row; /* default - left to right */
  /* alternatives */
  flex-direction: row-reverse; /* right to left */
  flex-direction: column; /* top to bottom */
  flex-direction: column-reverse; /* bottom to top */
}
</code></pre>
      
      <h5>2. flex-wrap</h5>
      <p>Controls whether items should wrap onto multiple lines or not.</p>
      <pre><code>.container {
  flex-wrap: nowrap; /* default - single line */
  /* alternatives */
  flex-wrap: wrap; /* multiple lines */
  flex-wrap: wrap-reverse; /* multiple lines, reversed */
}
</code></pre>
      
      <h5>3. justify-content</h5>
      <p>Defines alignment along the main axis (distributes extra space).</p>
      <pre><code>.container {
  justify-content: flex-start; /* default */
  /* alternatives */
  justify-content: flex-end;
  justify-content: center;
  justify-content: space-between;
  justify-content: space-around;
  justify-content: space-evenly;
}
</code></pre>
      
      <h5>4. align-items</h5>
      <p>Defines alignment along the cross axis (perpendicular to main axis).</p>
      <pre><code>.container {
  align-items: stretch; /* default */
  /* alternatives */
  align-items: flex-start;
  align-items: flex-end;
  align-items: center;
  align-items: baseline;
}
</code></pre>
      
      <h4>Flex Item Properties</h4>
      
      <h5>1. flex-grow</h5>
      <p>Determines how much an item should grow relative to others if extra space is available.</p>
      <pre><code>.item {
  flex-grow: 0; /* default - do not grow */
  /* Example: item with flex-grow: 2 grows twice as much as items with flex-grow: 1 */
}
</code></pre>
      
      <h5>2. flex-shrink</h5>
      <p>Defines how much an item will shrink relative to others when there's not enough space.</p>
      <pre><code>.item {
  flex-shrink: 1; /* default - items shrink if needed */
  /* higher values shrink faster */
}
</code></pre>
      
      <h5>3. flex-basis</h5>
      <p>Sets the initial main size of a flex item before growing or shrinking.</p>
      <pre><code>.item {
  flex-basis: auto; /* default - respects width/height */
  /* can be set in px, %, em, etc. */
}
</code></pre>
      
      <h5>4. The flex shorthand</h5>
      <p>Combines flex-grow, flex-shrink, and flex-basis in one declaration.</p>
      <pre><code>.item {
  flex: 0 1 auto; /* default (flex-grow, flex-shrink, flex-basis) */
  /* common patterns */
  flex: 1; /* same as flex: 1 1 0% - grow and shrink equally */
  flex: auto; /* same as flex: 1 1 auto */
  flex: none; /* same as flex: 0 0 auto - fully inflexible */
}
</code></pre>
      
      <h4>Practical Applications</h4>
      <p>Flexbox is perfect for:</p>
      <ul>
        <li>Navigation bars and menus</li>
        <li>Card layouts with equal heights</li>
        <li>Centering elements vertically and horizontally</li>
        <li>Creating responsive form layouts</li>
        <li>Building simple grid systems</li>
      </ul>
      
      <p>By mastering flexbox, you can create complex layouts with cleaner and more manageable code. It's become an essential tool in modern web development, especially when combined with CSS Grid for two-dimensional layouts.</p>
    `
  },
  {
    id: 4,
    title: "How I Landed My First Developer Job",
    category: "career",
    date: "July 5, 2023",
    excerpt: "Breaking into the tech industry can be challenging. Here's my personal journey from self-taught programmer to professional web developer, with practical advice for newcomers.",
    content: `
      <p>Breaking into the tech industry can be challenging, especially without a traditional computer science background. Here's my personal journey from self-taught programmer to professional web developer, with practical advice for newcomers.</p>
      
      <h4>My Background</h4>
      <p>Before transitioning to tech, I worked in marketing for three years. While I enjoyed certain aspects of my job, I found myself increasingly drawn to the technical side of our projects. I started learning HTML and CSS to help with our company website, and soon discovered that I genuinely enjoyed coding.</p>
      
      <h4>The Learning Phase</h4>
      <p>My learning journey wasn't linear, but here's what worked for me:</p>
      
      <h5>1. Structured Learning</h5>
      <p>I started with free resources like freeCodeCamp and The Odin Project to build a foundation. This gave me structure and a clear learning path.</p>
      
      <h5>2. Project-Based Learning</h5>
      <p>Theory alone wasn't enough. I challenged myself to build projects that solved real problems:</p>
      <ul>
        <li>A personal portfolio website</li>
        <li>A recipe organizer for my own use</li>
        <li>A simple budget tracking app</li>
      </ul>
      <p>Each project taught me more than any tutorial could.</p>
      
      <h5>3. Learning in Public</h5>
      <p>I shared my journey on Twitter and GitHub, which helped me connect with other developers and stay accountable. Getting feedback from more experienced developers was invaluable.</p>
      
      <h4>Building a Portfolio</h4>
      <p>My portfolio was crucial in landing interviews. I focused on quality over quantity, ensuring each project demonstrated:</p>
      <ul>
        <li>Clean, well-documented code</li>
        <li>Thoughtful UI/UX considerations</li>
        <li>Problem-solving skills</li>
        <li>Technical versatility</li>
      </ul>
      
      <p>I also wrote detailed READMEs explaining my design decisions, challenges faced, and how I overcame them.</p>
      
      <h4>The Job Hunt</h4>
      <p>After about 8 months of consistent learning, I felt ready to apply for jobs. Here's what my process looked like:</p>
      
      <h5>1. Resume Tailoring</h5>
      <p>I customized my resume for each application, emphasizing relevant skills and projects. I framed my previous marketing experience in terms of transferable skills like communication, user empathy, and project management.</p>
      
      <h5>2. Job Search Strategy</h5>
      <p>Rather than applying to hundreds of positions, I focused on:</p>
      <ul>
        <li>Small to medium-sized companies where I could make a direct impact</li>
        <li>Startups open to non-traditional backgrounds</li>
        <li>Companies with values that aligned with mine</li>
      </ul>
      
      <h5>3. Networking</h5>
      <p>Local meetups and tech events were incredibly helpful. I met my future team lead at a JavaScript meetup where I had volunteered to help organize.</p>
      
      <h4>The Interview Process</h4>
      <p>After submitting 42 applications, I received 8 interview requests. Most processes involved:</p>
      <ol>
        <li>An initial screening call</li>
        <li>A technical assessment or take-home project</li>
        <li>A technical interview with senior developers</li>
        <li>A final interview with the broader team</li>
      </ol>
      
      <p>The take-home project for my current company involved building a small web app that consumed an API. I spent extra time making it polished and accessible, which made a strong impression.</p>
      
      <h4>Key Lessons Learned</h4>
      <ul>
        <li><strong>Build in public:</strong> Sharing your work creates opportunities.</li>
        <li><strong>Focus on fundamentals:</strong> Deep understanding of core concepts is more valuable than surface-level knowledge of many frameworks.</li>
        <li><strong>Embrace the struggle:</strong> Document challenges and how you overcame them—this shows problem-solving abilities.</li>
        <li><strong>Communicate effectively:</strong> Technical skills alone aren't enough; employers want people who can explain complex concepts clearly.</li>
        <li><strong>Be authentic:</strong> In interviews, I was honest about what I knew and what I was still learning.</li>
      </ul>
      
      <h4>Final Thoughts</h4>
      <p>Landing your first dev job is challenging, but absolutely possible with persistence and strategic effort. The journey doesn't end with that first job—in many ways, it's just beginning. Continuous learning remains essential, but now I have the benefit of supportive colleagues and real-world problems to solve.</p>
      
      <p>If you're currently on this journey, remember that everyone starts somewhere, and the tech industry needs diverse perspectives and backgrounds. Your unique path can be an asset rather than a liability.</p>
    `
  },
  {
    id: 5,
    title: "Understanding React Hooks",
    category: "javascript",
    date: "June 18, 2023",
    excerpt: "React Hooks revolutionized how we build components. Learn how to use the most important hooks and create your own custom hooks to simplify your React applications.",
    content: `
      <p>React Hooks revolutionized how we build React components when they were introduced in React 16.8. They allow you to use state and other React features without writing a class component. Let's explore how to use the most important hooks and create custom hooks to simplify your React applications.</p>
      
      <h4>Why Hooks?</h4>
      <p>Before hooks, complex logic often required class components, leading to several challenges:</p>
      <ul>
        <li>Stateful logic was difficult to reuse between components</li>
        <li>Complex components became hard to understand</li>
        <li>Classes can be confusing with 'this' binding and lifecycle methods</li>
      </ul>
      
      <p>Hooks solve these problems by allowing you to:</p>
      <ul>
        <li>Reuse stateful logic without changing your component hierarchy</li>
        <li>Split one component into smaller functions based on related pieces</li>
        <li>Use React features without classes</li>
      </ul>
      
      <h4>Essential Built-in Hooks</h4>
      
      <h5>1. useState</h5>
      <p>The useState hook lets you add state to functional components:</p>
      <pre><code>import React, { useState } from 'react';

function Counter() {
  // Declare a state variable 'count' with initial value 0
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
</code></pre>
      
      <h5>2. useEffect</h5>
      <p>The useEffect hook handles side effects in functional components, replacing lifecycle methods like componentDidMount, componentDidUpdate, and componentWillUnmount:</p>
      <pre><code>import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate
  useEffect(() => {
    // Update the document title using the browser API
    document.title = \`You clicked ${count} times\`;
    
    // Optional cleanup function (similar to componentWillUnmount)
    return () => {
      document.title = 'React App';
    };
  }, [count]); // Only re-run if count changes
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
</code></pre>
      
      <h5>3. useContext</h5>
      <p>The useContext hook provides a way to pass data through the component tree without having to pass props down manually at every level:</p>
      <pre><code>import React, { useContext } from 'react';

// Create a context
const ThemeContext = React.createContext('light');

function ThemedButton() {
  // Use the context
  const theme = useContext(ThemeContext);
  
  return (
    <button style={{ background: theme === 'dark' ? '#333' : '#fff', 
                     color: theme === 'dark' ? '#fff' : '#333' }}>
      I am styled based on the theme context!
    </button>
  );
}
</code></pre>
      
      <h5>4. useReducer</h5>
      <p>The useReducer hook is an alternative to useState for complex state logic. It's similar to how Redux works:</p>
      <pre><code>import React, { useReducer } from 'react';

// Reducer function
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  // Initial state and reducer
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  
  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
    </div>
  );
}
</code></pre>
      
      <h4>Creating Custom Hooks</h4>
      <p>One of the most powerful features of hooks is the ability to create your own to extract and reuse component logic. A custom hook is a JavaScript function whose name starts with "use" and that may call other hooks.</p>
      
      <p>Here's an example of a custom hook for form handling:</p>
      <pre><code>import { useState } from 'react';

// Custom hook for form handling
function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };
  
  const resetForm = () => {
    setValues(initialValues);
  };
  
  return {
    values,
    handleChange,
    resetForm
  };
}

// Using the custom hook
function ContactForm() {
  const { values, handleChange, resetForm } = useForm({
    name: '',
    email: '',
    message: ''
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with values:', values);
    resetForm();
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={values.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <textarea
        name="message"
        value={values.message}
        onChange={handleChange}
        placeholder="Message"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
</code></pre>
      
      <h4>Rules of Hooks</h4>
      <p>To ensure hooks work correctly, follow these two rules:</p>
      <ol>
        <li><strong>Only call hooks at the top level.</strong> Don't call hooks inside loops, conditions, or nested functions.</li>
        <li><strong>Only call hooks from React function components or custom hooks.</strong> Don't call hooks from regular JavaScript functions.</li>
      </ol>
      
      <h4>Conclusion</h4>
      <p>React Hooks provide a more direct way to use React's features and create reusable, composable logic. They dramatically simplify code, making it more readable and maintainable while reducing the overall complexity of your React applications.</p>
      
      <p>By mastering built-in hooks and creating your own custom hooks, you can write more elegant, efficient React code that's easier to test and maintain.</p>
    `
  },
  {
    id: 6,
    title: "Designing Better User Interfaces",
    category: "webdev",
    date: "May 10, 2023",
    excerpt: "Good UI design goes beyond aesthetics. Learn the key principles of effective user interface design and how to apply them to create more intuitive, accessible experiences.",
    content: `
      <p>Good UI design goes beyond aesthetics—it's about creating interfaces that are intuitive, accessible, and help users achieve their goals efficiently. Let's explore the key principles of effective user interface design and how to apply them in your projects.</p>
      
      <h4>1. Clarity is King</h4>
      <p>The most important principle of UI design is clarity. Users should instantly understand what they can do and how to do it.</p>
      
      <h5>Design Tips:</h5>
      <ul>
        <li>Use clear, descriptive labels for buttons and links</li>
        <li>Create visual hierarchies that guide users to important elements first</li>
        <li>Eliminate unnecessary elements that don't support user tasks</li>
        <li>Use familiar patterns that users already understand</li>
      </ul>
      
      <p>When users have to think too hard about how to use your interface, you've already failed. As Steve Krug famously said, "Don't make me think!"</p>
      
      <h4>2. Consistency Creates Comfort</h4>
      <p>Consistent interfaces are easier to use because they reduce the learning curve as users move through your application.</p>
      
      <h5>Design Tips:</h5>
      <ul>
        <li>Maintain consistent visual language (colors, typography, spacing)</li>
        <li>Use the same interactions for similar functions</li>
        <li>Create and follow a design system or component library</li>
        <li>Follow platform conventions when appropriate</li>
      </ul>
      
      <p>Consistency doesn't mean boring—it means creating a reliable system that users can learn once and apply throughout their experience.</p>
      
      <h4>3. Provide Feedback for Actions</h4>
      <p>Users need to know that their actions have been recognized and processed by the system.</p>
      
      <h5>Design Tips:</h5>
      <ul>
        <li>Use visual feedback for interactive elements (hover/active states)</li>
        <li>Acknowledge form submissions and other important actions</li>
        <li>Show progress indicators for operations that take time</li>
        <li>Communicate errors clearly with actionable solutions</li>
      </ul>
      
      <pre><code>.button {
  background-color: #4a90e2;
  transition: background-color 0.2s;
}

.button:hover {
  background-color: #3a80d2; /* Darker shade for feedback */
}

.button:active {
  background-color: #2a70c2; /* Even darker when clicked */
}

.button.loading {
  background-color: #cccccc;
  cursor: not-allowed;
}
</code></pre>
      
      <h4>4. Design for Accessibility</h4>
      <p>Good UI design is accessible to all users, including those with disabilities.</p>
      
      <h5>Design Tips:</h5>
      <ul>
        <li>Maintain sufficient color contrast (WCAG AA minimum)</li>
        <li>Don't rely solely on color to convey information</li>
        <li>Ensure keyboard navigability for all interactive elements</li>
        <li>Support screen readers with appropriate ARIA attributes</li>
        <li>Create focus states that are clearly visible</li>
      </ul>
      
      <pre><code>/* Good focus state example */
button:focus {
  outline: 2px solid #4a90e2;
  outline-offset: 2px;
}

/* Color contrast example */
.text-on-dark {
  color: #f0f0f0; /* Light text */
  background-color: #333333; /* Dark background */
  /* This provides a 13.4:1 contrast ratio, well above WCAG AAA */
}
</code></pre>
      
      <h4>5. Reduce Cognitive Load</h4>
      <p>The best interfaces reduce the mental effort required to use them.</p>
      
      <h5>Design Tips:</h5>
      <ul>
        <li>Break complex tasks into manageable steps</li>
        <li>Use progressive disclosure to reveal information as needed</li>
        <li>Provide defaults that make sense for most users</li>
        <li>Minimize the number of options shown at once</li>
        <li>Group related information visually</li>
      </ul>
      
      <p>Remember Miller's Law: the average person can hold only about 7 (plus or minus 2) items in their working memory at once.</p>
      
      <h4>6. Forgiveness in Design</h4>
      <p>Well-designed interfaces forgive mistakes and allow users to easily recover.</p>
      
      <h5>Design Tips:</h5>
      <ul>
        <li>Make destructive actions difficult to trigger accidentally</li>
        <li>Provide undo functionality where possible</li>
        <li>Ask for confirmation only for significant actions</li>
        <li>Design clear paths back to previous states</li>
      </ul>
      
      <p>Users should feel safe to explore your interface without fear of making irreversible mistakes.</p>
      
      <h4>7. Performance is a Feature</h4>
      <p>Speed is a critical aspect of good UI design. Slow interfaces frustrate users and reduce engagement.</p>
      
      <h5>Design Tips:</h5>
      <ul>
        <li>Optimize images and assets for quick loading</li>
        <li>Use skeleton screens or loaders for content that takes time to load</li>
        <li>Apply lazy loading for offscreen content</li>
        <li>Consider perceived performance through visual design</li>
      </ul>
      
      <p>Studies show that users perceive interfaces as less usable when they're slow, regardless of how well-designed they are otherwise.</p>
      
      <h4>8. Mobile-First Thinking</h4>
      <p>With most web traffic coming from mobile devices, designing for small screens first forces you to focus on what's essential.</p>
      
      <h5>Design Tips:</h5>
      <ul>
        <li>Prioritize content and features based on user needs</li>
        <li>Design touch-friendly interfaces (target size minimum 44×44px)</li>
        <li>Consider thumb zones for important actions</li>
        <li>Test on actual devices, not just emulators</li>
      </ul>
      
      <p>Designing for constraints first makes it easier to enhance the experience for larger screens later.</p>
      
      <h4>Conclusion</h4>
      <p>Great UI design isn't about following trends or creating flashy interfaces—it's about deeply understanding your users and creating experiences that help them accomplish their goals with minimum friction.</p>
      
      <p>When designing interfaces, always ask: "Am I making this easier for my users?" If the answer is yes, you're on the right track.</p>
    `
  }
];

// DOM elements and initialization
document.addEventListener('DOMContentLoaded', function() {
  // Theme toggle functionality
  initThemeToggle();
  
  // Page-specific initialization
  const currentPage = getCurrentPage();
  
  if (currentPage === 'blog.html') {
    displayBlogPosts(blogPosts);
    initializeBlogFilters();
    initializeSearchFunctionality();
    addReadMoreListeners();
  } else if (currentPage === 'projects.html') {
    initializeProjectFilters();
  } else if (currentPage === 'contact.html') {
    initializeContactForm();
  }
  
  // Fix console errors related to React content in blog posts
  fixReactCodeExamples();
});

// Helper function to get current page
function getCurrentPage() {
  const path = window.location.pathname;
  const page = path.split('/').pop();
  return page || 'index.html';
}

// Theme toggle functionality is now in separate theme.js file
function initThemeToggle() {
  // This function is now empty as theme toggle is handled in theme.js
  // This is just kept here for compatibility
}

// Blog post display function
function displayBlogPosts(posts, category = 'all') {
  const blogContainer = document.getElementById('blog-posts');
  const template = document.getElementById('blog-post-template');
  
  if (!blogContainer || !template) return;
  
  // Clear existing content
  blogContainer.innerHTML = '';
  
  // Filter posts by category if needed
  const filteredPosts = category === 'all' 
    ? posts 
    : posts.filter(post => post.category === category);
  
  // Display "no results" message if no posts match
  if (filteredPosts.length === 0) {
    blogContainer.innerHTML = '<div class="no-results">No posts found matching your criteria.</div>';
    return;
  }
  
  // Create and append blog post elements
  filteredPosts.forEach(post => {
    const blogPost = document.createElement('article');
    blogPost.className = 'blog-post';
    blogPost.setAttribute('data-id', post.id);
    blogPost.setAttribute('data-category', post.category);
    
    // Create blog header with category
    const header = document.createElement('div');
    header.className = 'blog-header';
    header.textContent = getCategoryIcon(post.category);
    
    const categorySpan = document.createElement('div');
    categorySpan.className = 'blog-category';
    categorySpan.textContent = post.category.charAt(0).toUpperCase() + post.category.slice(1);
    header.appendChild(categorySpan);
    
    // Create blog content
    const content = document.createElement('div');
    content.className = 'blog-content';
    
    const title = document.createElement('h3');
    title.className = 'blog-title';
    title.textContent = post.title;
    
    const date = document.createElement('span');
    date.className = 'blog-date';
    date.textContent = post.date;
    
    const excerpt = document.createElement('div');
    excerpt.className = 'blog-excerpt';
    excerpt.textContent = post.excerpt;
    
    const fullContent = document.createElement('div');
    fullContent.className = 'blog-full-content';
    fullContent.innerHTML = post.content;
    
    const readMoreBtn = document.createElement('button');
    readMoreBtn.className = 'btn read-more';
    readMoreBtn.textContent = 'Read More';
    
    const readLessBtn = document.createElement('button');
    readLessBtn.className = 'btn read-less';
    readLessBtn.textContent = 'Show Less';
    
    // Assemble the content
    content.appendChild(title);
    content.appendChild(date);
    content.appendChild(excerpt);
    content.appendChild(fullContent);
    content.appendChild(readMoreBtn);
    content.appendChild(readLessBtn);
    
    // Build the complete post
    blogPost.appendChild(header);
    blogPost.appendChild(content);
    
    // Add to container
    blogContainer.appendChild(blogPost);
  });
  
  // Add event listeners to the newly created elements
  addReadMoreListeners();
}

// Get category icon/emoji for blog posts
function getCategoryIcon(category) {
  switch(category) {
    case 'javascript':
      return 'JS';
    case 'webdev':
      return '🌐';
    case 'career':
      return '💼';
    default:
      return '📝';
  }
}

// Initialize blog filters
function initializeBlogFilters() {
  const filterButtons = document.querySelectorAll('.blog-filters .filter-btn');
  
  if (!filterButtons.length) return;
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get selected category
      const category = this.getAttribute('data-category');
      
      // Filter and display posts
      displayBlogPosts(blogPosts, category);
    });
  });
}

// Initialize project filters
function initializeProjectFilters() {
  const filterButtons = document.querySelectorAll('.project-filters .filter-btn');
  const projects = document.querySelectorAll('.project');
  
  if (!filterButtons.length || !projects.length) return;
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get selected category
      const category = this.getAttribute('data-category');
      
      // Show/hide projects based on category
      projects.forEach(project => {
        if (category === 'all' || project.getAttribute('data-category').includes(category)) {
          project.style.display = 'flex';
        } else {
          project.style.display = 'none';
        }
      });
    });
  });
}

// Blog search functionality
function initializeSearchFunctionality() {
  const searchInput = document.getElementById('blog-search-input');
  const searchButton = document.getElementById('blog-search-btn');
  
  if (!searchInput || !searchButton) return;
  
  const searchBlog = () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
      // If search is empty, show all posts
      displayBlogPosts(blogPosts);
      return;
    }
    
    // Filter posts based on search term
    const filteredPosts = blogPosts.filter(post => 
      post.title.toLowerCase().includes(searchTerm) || 
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.content.toLowerCase().includes(searchTerm)
    );
    
    // Display filtered posts
    displayBlogPosts(filteredPosts);
  };
  
  // Search on button click
  searchButton.addEventListener('click', searchBlog);
  
  // Search on Enter key
  searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      searchBlog();
    }
  });
}

// Add read more/less functionality to blog posts
function addReadMoreListeners() {
  const readMoreButtons = document.querySelectorAll('.read-more');
  const readLessButtons = document.querySelectorAll('.read-less');
  
  readMoreButtons.forEach(button => {
    button.addEventListener('click', function() {
      const blogPost = this.closest('.blog-post');
      blogPost.classList.add('expanded');
    });
  });
  
  readLessButtons.forEach(button => {
    button.addEventListener('click', function() {
      const blogPost = this.closest('.blog-post');
      blogPost.classList.remove('expanded');
      
      // Scroll back to top of post
      blogPost.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// Contact form initialization
function initializeContactForm() {
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  
  if (!contactForm || !formStatus) return;
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value
    };
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      formStatus.textContent = 'Please fill out all required fields.';
      formStatus.className = 'form-status error';
      return;
    }
    
    // Simulate form submission
    formStatus.textContent = 'Sending message...';
    formStatus.className = 'form-status';
    
    // In a real application, you would send the data to a server here
    setTimeout(() => {
      contactForm.reset();
      formStatus.textContent = 'Message sent successfully! I will get back to you soon.';
      formStatus.className = 'form-status success';
    }, 1500);
  });
}

// Fix for React code examples in blog posts to prevent console errors
function fixReactCodeExamples() {
  // This function prevents JavaScript errors from React code examples in blog posts
  // by finding and fixing any variable references that might be executed
  
  // Define a dummy 'useState' function to prevent React-related errors
  window.useState = function(initialValue) {
    return [initialValue, function() {}];
  };
  
  // Define a dummy 'useContext' function
  window.useContext = function() {
    return null;
  };
  
  // Define a dummy 'useReducer' function
  window.useReducer = function(reducer, initialState) {
    return [initialState, function() {}];
  };
}