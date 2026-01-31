import React, { useState } from 'react';
import Notes from './Notes';

const IntroductionHTML = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);


  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Internal CSS matching Chapter3 style
  const styles = {
    container: {
      fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#f9f9f9",
      color: "#333",
      lineHeight: "1.6"
    },
    header: {
      textAlign: "center",
      marginBottom: "30px",
      padding: "30px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      borderRadius: "12px",
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
      fontFamily: "cursive"
    },
    headerH1: {
      margin: "0 0 15px 0",
      fontSize: "2.8rem",
      fontWeight: "700"
    },
    headerP: {
      margin: "0",
      fontSize: "1.3rem",
      opacity: "0.95"
    },
    companyInfo: {
      textAlign: "center",
      margin: "40px 0",
      padding: "25px",
      background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
      color: "white",
      borderRadius: "12px",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)"
    },
    companyH2: {
      margin: "0 0 15px 0",
      fontSize: "2rem",
      fontWeight: "600"
    },
    companyP: {
      margin: "8px 0",
      fontSize: "1.1rem"
    },
    sectionsContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "30px"
    },
    sectionCard: {
      backgroundColor: "white",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.08)",
      borderLeft: "6px solid #667eea"
    },
    sectionH2: {
      color: "#2c3e50",
      marginTop: "0",
      marginBottom: "25px",
      fontSize: "1.9rem",
      borderBottom: "3px solid #f0f0f0",
      paddingBottom: "15px",
      textAlign: "left"
    },
    contentBlock: {
      marginBottom: "25px",
      textAlign: "left"
    },
    subtitleH3: {
      color: "#667eea",
      margin: "25px 0 15px 0",
      fontSize: "1.5rem",
      textAlign: "left"
    },
    subtitleH4: {
      color: "#4a5568",
      margin: "20px 0 10px 0",
      fontSize: "1.3rem",
      textAlign: "left"
    },
    textP: {
      margin: "0 0 18px 0",
      fontSize: "1.15rem",
      lineHeight: "1.7",
      textAlign: "left"
    },
    listBlock: {
      backgroundColor: "#f8f9fa",
      padding: "20px 25px 20px 45px",
      borderRadius: "10px",
      margin: "20px 0",
      borderLeft: "4px solid #667eea",
      textAlign: "left"
    },
    listH4: {
      margin: "0 0 15px 0",
      color: "#2c3e50",
      fontSize: "1.3rem",
      textAlign: "left"
    },
    listUl: {
      margin: "0",
      padding: "0",
      textAlign: "left"
    },
    listOl: {
      margin: "0 0 0 25px",
      padding: "0",
      textAlign: "left"
    },
    listLi: {
      marginBottom: "12px",
      fontSize: "1.1rem",
      paddingLeft: "5px",
      textAlign: "left"
    },
    codeBlock: {
      position: "relative",
      backgroundColor: "#2d3436",
      color: "#dfe6e9",
      padding: "18px",
      borderRadius: "8px",
      margin: "20px 0",
      overflowX: "auto",
      border: "1px solid #444",
      textAlign: "left"
    },
    code: {
      fontFamily: "'Fira Code', 'Monaco', 'Consolas', monospace",
      fontSize: "1rem",
      whiteSpace: "pre-wrap",
      textAlign: "left"
    },
    pre: {
      fontFamily: "'Fira Code', 'Monaco', 'Consolas', monospace",
      fontSize: "1rem",
      whiteSpace: "pre-wrap",
      margin: "0",
      lineHeight: "1.5",
      textAlign: "left"
    },
    copyBtn: {
      position: "absolute",
      top: "12px",
      right: "12px",
      backgroundColor: "#3498db",
      color: "white",
      border: "none",
      padding: "8px 15px",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "0.9rem",
      transition: "all 0.3s ease"
    },
    copiedBtn: {
      backgroundColor: "#27ae60"
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      margin: "20px 0",
      textAlign: "left"
    },
    tableHead: {
      backgroundColor: "#667eea",
      color: "white"
    },
    tableRow: {
      borderBottom: "1px solid #ddd"
    },
    tableCell: {
      padding: "12px 15px",
      border: "1px solid #ddd"
    },
    footer: {
      textAlign: "center",
      marginTop: "50px",
      padding: "30px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      borderRadius: "12px",
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)"
    },
    footerP: {
      margin: "8px 0",
      fontSize: "1.15rem"
    },
    noteBox: {
      backgroundColor: "#fff3cd",
      borderLeft: "6px solid #ffc107",
      padding: "20px",
      margin: "20px 0",
      borderRadius: "8px"
    }
  };

  const htmlExample = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Web Page</title>
</head>
<body>
    <h1>Welcome to HTML!</h1>
    <p>This is a paragraph.</p>
    <a href="https://www.example.com">Visit Example</a>
</body>
</html>`;

  const htmlListExample = `<!-- Unordered List -->
<ul>
    <li>Apple</li>
    <li>Banana</li>
    <li>Cherry</li>
</ul>

<!-- Ordered List -->
<ol>
    <li>First item</li>
    <li>Second item</li>
    <li>Third item</li>
</ol>

<!-- Description List -->
<dl>
    <dt>HTML</dt>
    <dd>HyperText Markup Language</dd>
    <dt>CSS</dt>
    <dd>Cascading Style Sheets</dd>
</dl>`;

  const cssListExample = `/* Styling Lists */
ul.custom-list {
    list-style-type: square; /* circle, disc, none */
    list-style-position: inside;
    padding-left: 20px;
}

ol.custom-ol {
    list-style-type: upper-roman; /* decimal, lower-alpha, etc. */
}

/* Custom List Item Markers */
li.special::before {
    content: "✓ ";
    color: green;
    font-weight: bold;
}

/* Removing Default List Styles */
.no-bullets {
    list-style-type: none;
    padding-left: 0;
}`;

  const cssDisplayExample = `/* Display Property Examples */
.block-element {
    display: block; /* Takes full width, starts new line */
    width: 100%;
    margin: 10px 0;
}

.inline-element {
    display: inline; /* Only takes needed width, no new line */
    padding: 5px;
}

.inline-block-element {
    display: inline-block; /* Like inline but accepts width/height */
    width: 100px;
    height: 100px;
}

.hidden-element {
    display: none; /* Completely removed from layout */
}

.visible-element {
    visibility: visible; /* Element takes space but is invisible */
}

.hidden-visibility {
    visibility: hidden; /* Element takes space but is invisible */
}`;

  const cssPositionExample = `/* Positioning Examples */
.static {
    position: static; /* Default, normal flow */
}

.relative {
    position: relative; /* Relative to normal position */
    top: 10px;
    left: 20px;
}

.absolute {
    position: absolute; /* Relative to nearest positioned ancestor */
    top: 0;
    right: 0;
}

.fixed {
    position: fixed; /* Relative to viewport */
    top: 0;
    left: 0;
    width: 100%;
}

.sticky {
    position: sticky; /* Toggles between relative and fixed */
    top: 0;
}

/* z-index Example */
.layer-1 {
    position: relative;
    z-index: 1;
    background: red;
}

.layer-2 {
    position: relative;
    z-index: 2;
    background: blue;
    margin-top: -20px;
}`;

  const sections = [
    {
      title: "HTML Basics",
      content: [
        {
          subtitle: "What is HTML?",
          text: "HTML (HyperText Markup Language) is the foundation of all websites. It's not a programming language, but a markup language that structures content on the web. Think of HTML as the skeleton of a webpage - it defines the structure and content."
        },
        {
          subtitle: "Basic HTML Document Structure",
          text: "Every HTML document has a specific structure that browsers understand:",
          code: {
            text: htmlExample,
            index: 0
          },
          list: {
            items: [
              "<!DOCTYPE html>: Tells the browser this is an HTML5 document",
              "<html>: The root element wrapping all content",
              "<head>: Contains meta information (not visible on page)",
              "<title>: Sets the browser tab title",
              "<body>: Contains all visible content"
            ]
          }
        },
        {
          subtitle: "HTML Elements and Tags",
          text: "HTML uses tags to create elements. Tags usually come in pairs: opening tag and closing tag.",
          list: {
            title: "Common HTML Elements:",
            items: [
              "<h1> to <h6>: Headings (h1 is most important, h6 is least)",
              "<p>: Paragraphs for text content",
              "<a href='url'>: Links to other pages",
              "<img src='image.jpg' alt='description'>: Images",
              "<div>: Generic container (block-level)",
              "<span>: Generic container (inline)",
              "<br>: Line break (self-closing)",
              "<hr>: Horizontal rule (self-closing)"
            ]
          }
        }
      ]
    },
    {
      title: "HTML Structure & Elements",
      content: [
        {
          subtitle: "Semantic HTML Elements",
          text: "Semantic elements clearly describe their meaning to both browser and developer.",
          list: {
            items: [
              "<header>: Introductory content or navigation",
              "<nav>: Navigation links",
              "<main>: Main content of the document",
              "<section>: Thematic grouping of content",
              "<article>: Self-contained composition",
              "<aside>: Side content (like sidebar)",
              "<footer>: Footer for document or section"
            ]
          },
          note: "Using semantic elements improves SEO and accessibility!"
        },
        {
          subtitle: "HTML Attributes",
          text: "Attributes provide additional information about elements. They are always in the opening tag.",
          list: {
            items: [
              "class: Specifies one or more class names",
              "id: Specifies a unique id",
              "style: Inline CSS styling",
              "src: Source for images, scripts",
              "href: URL for links",
              "alt: Alternative text for images",
              "title: Extra information (tooltip)"
            ]
          }
        }
      ]
    },
    {
      title: "HTML Lists",
      content: [
        {
          subtitle: "Types of HTML Lists",
          text: "HTML provides three types of lists for organizing content:",
          code: {
            text: htmlListExample,
            index: 1
          },
          list: {
            items: [
              "Unordered List (<ul>): Bulleted lists for items without specific order",
              "Ordered List (<ol>): Numbered lists for sequential items",
              "Description List (<dl>): Terms and their descriptions"
            ]
          }
        },
        {
          subtitle: "Nested Lists",
          text: "You can put lists inside other lists to create hierarchies:",
          code: {
            text: `<ul>
    <li>Fruits
        <ul>
            <li>Apple</li>
            <li>Banana</li>
        </ul>
    </li>
    <li>Vegetables
        <ul>
            <li>Carrot</li>
            <li>Broccoli</li>
        </ul>
    </li>
</ul>`,
            index: 2
          }
        }
      ]
    },
    {
      title: "HTML Visuals & Media",
      content: [
        {
          subtitle: "Images in HTML",
          text: "The <img> tag is used to embed images. Always include alt text for accessibility.",
          list: {
            items: [
              "src: Path to image file",
              "alt: Alternative text (required)",
              "width/height: Image dimensions",
              "title: Tooltip text"
            ]
          },
          code: {
            text: `<img src="photo.jpg" alt="Beautiful sunset" width="800" height="600">
<img src="logo.png" alt="Company Logo" title="Click to go home">`,
            index: 3
          }
        },
        {
          subtitle: "Audio and Video",
          text: "HTML5 provides native audio and video support:",
          code: {
            text: `<!-- Audio Player -->
<audio controls>
    <source src="audio.mp3" type="audio/mpeg">
    Your browser does not support audio.
</audio>

<!-- Video Player -->
<video width="640" height="360" controls>
    <source src="video.mp4" type="video/mp4">
    Your browser does not support video.
</video>`,
            index: 4
          }
        },
        {
          subtitle: "Embedding Content",
          text: "Use iframes to embed external content:",
          code: {
            text: `<!-- Embed YouTube Video -->
<iframe width="560" height="315" 
        src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
        frameborder="0" 
        allowfullscreen>
</iframe>

<!-- Embed Google Map -->
<iframe src="https://maps.google.com/maps?q=mumbai&output=embed" 
        width="600" 
        height="450">
</iframe>`,
            index: 5
          }
        }
      ]
    },
    {
      title: "HTML Layouts & Designs",
      content: [
        {
          subtitle: "Traditional Layout with Divs",
          text: "Before semantic HTML5, layouts were created using <div> elements:",
          code: {
            text: `<div class="header">Header Content</div>
<div class="nav">Navigation</div>
<div class="main">
    <div class="sidebar">Sidebar</div>
    <div class="content">Main Content</div>
</div>
<div class="footer">Footer</div>`,
            index: 6
          }
        },
        {
          subtitle: "Modern Semantic Layout",
          text: "HTML5 semantic elements provide better structure:",
          code: {
            text: `<header>
    <h1>Website Title</h1>
    <nav>Navigation Links</nav>
</header>

<main>
    <article>
        <h2>Article Title</h2>
        <p>Article content...</p>
    </article>
    
    <aside>
        <h3>Related Links</h3>
        <p>Sidebar content...</p>
    </aside>
</main>

<footer>
    <p>&copy; 2024 Company Name</p>
</footer>`,
            index: 7
          }
        }
      ]
    },
    {
      title: "CSS Lists",
      content: [
        {
          subtitle: "Styling Lists with CSS",
          text: "CSS provides extensive control over list appearance:",
          code: {
            text: cssListExample,
            index: 8
          },
          table: {
            headers: ["Property", "Values", "Description"],
            rows: [
              ["list-style-type", "disc, circle, square, none, decimal, lower-roman", "Type of list item marker"],
              ["list-style-position", "inside, outside", "Position of marker relative to content"],
              ["list-style-image", "url('image.png')", "Custom image as marker"],
              ["list-style", "shorthand for all list properties", "Combine type, position, image"]
            ]
          }
        },
        {
          subtitle: "Custom List Styles",
          text: "Create completely custom list styles using CSS pseudo-elements:",
          code: {
            text: `/* Custom Numbered List */
.custom-numbers {
    counter-reset: section;
    list-style-type: none;
}

.custom-numbers li::before {
    counter-increment: section;
    content: "Step " counter(section) ": ";
    font-weight: bold;
    color: #667eea;
}

/* Icon List */
.icon-list {
    list-style-type: none;
    padding-left: 0;
}

.icon-list li::before {
    content: "▶";
    color: green;
    margin-right: 10px;
}`,
            index: 9
          }
        }
      ]
    },
    {
      title: "CSS Tables",
      content: [
        {
          subtitle: "Styling HTML Tables",
          text: "CSS can transform plain HTML tables into beautiful, functional components:",
          code: {
            text: `/* Basic Table Styling */
table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
}

th {
    background-color: #667eea;
    color: white;
    padding: 12px;
    text-align: left;
}

td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
}

tr:hover {
    background-color: #f5f5f5;
}

/* Zebra Striping */
tr:nth-child(even) {
    background-color: #f8f9fa;
}

/* Responsive Table */
@media (max-width: 768px) {
    table {
        display: block;
        overflow-x: auto;
    }
}`,
            index: 10
          }
        },
        {
          subtitle: "Advanced Table Features",
          text: "Create modern table designs with CSS:",
          code: {
            text: `/* Modern Table Design */
.modern-table {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.modern-table th {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.modern-table td {
    transition: background-color 0.3s;
}

.modern-table tr:hover td {
    background-color: rgba(102, 126, 234, 0.1);
}

/* Fixed Header Table */
.table-container {
    max-height: 400px;
    overflow-y: auto;
}

.table-container thead {
    position: sticky;
    top: 0;
    z-index: 10;
}`,
            index: 11
          }
        }
      ]
    },
    {
      title: "CSS Display Property",
      content: [
        {
          subtitle: "Understanding Display",
          text: "The display property determines how an element is rendered on the page.",
          code: {
            text: cssDisplayExample,
            index: 12
          },
          table: {
            headers: ["Display Value", "Behavior", "Common Elements"],
            rows: [
              ["block", "Takes full width, new line", "div, h1-h6, p, section"],
              ["inline", "Only needed width, no new line", "span, a, strong, em"],
              ["inline-block", "Inline with width/height", "button, input, img"],
              ["none", "Completely hidden", "N/A"],
              ["flex", "Flexbox layout", "Containers for flexible layouts"],
              ["grid", "Grid layout", "Containers for grid layouts"]
            ]
          }
        },
        {
          subtitle: "Display vs Visibility",
          text: "Important differences between display: none and visibility: hidden",
          list: {
            items: [
              "display: none: Element is completely removed from layout (no space taken)",
              "visibility: hidden: Element is invisible but still takes up space",
              "opacity: 0: Element is transparent but still interactive",
              "All three hide the element, but affect layout differently"
            ]
          }
        }
      ]
    },
    {
      title: "CSS max-width Property",
      content: [
        {
          subtitle: "Containing Element Width",
          text: "The max-width property sets the maximum width of an element.",
          code: {
            text: `/* Prevent element from becoming too wide */
.container {
    max-width: 1200px;
    margin: 0 auto; /* Center the container */
    padding: 20px;
}

/* Responsive images */
.responsive-img {
    max-width: 100%;
    height: auto;
}

/* Fluid typography */
.article {
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.6;
}

/* Mobile-first approach */
.card {
    max-width: 100%; /* Full width on mobile */
}

@media (min-width: 768px) {
    .card {
        max-width: 300px; /* Fixed width on desktop */
    }
}`,
            index: 13
          }
        },
        {
          subtitle: "max-width vs width",
          text: "Understanding when to use each:",
          list: {
            items: [
              "width: Sets fixed width (element won't shrink below this)",
              "max-width: Sets maximum width (element can be smaller but not larger)",
              "min-width: Sets minimum width (element can be larger but not smaller)",
              "Use max-width for responsive containers",
              "Use width for elements that must stay exact size"
            ]
          },
          note: "Always use max-width: 100% for images to prevent them from overflowing containers!"
        }
      ]
    },
    {
      title: "CSS Positioning Elements",
      content: [
        {
          subtitle: "Position Property Values",
          text: "CSS position property controls how elements are positioned.",
          code: {
            text: cssPositionExample,
            index: 14
          },
          table: {
            headers: ["Position Value", "Reference Point", "Use Case"],
            rows: [
              ["static (default)", "Normal document flow", "Default positioning"],
              ["relative", "Its normal position", "Minor adjustments, creating containing blocks"],
              ["absolute", "Nearest positioned ancestor", "Tooltips, dropdowns, overlays"],
              ["fixed", "Viewport (browser window)", "Headers, footers, chat buttons"],
              ["sticky", "Scroll position", "Sticky headers, table headers"]
            ]
          }
        },
        {
          subtitle: "Position Offsets",
          text: "When position is relative, absolute, fixed, or sticky, you can use offset properties:",
          list: {
            items: [
              "top: Moves element down from top edge",
              "right: Moves element left from right edge",
              "bottom: Moves element up from bottom edge",
              "left: Moves element right from left edge",
              "Values can be pixels, percentages, or other units"
            ]
          }
        }
      ]
    },
    {
      title: "CSS z-index Property",
      content: [
        {
          subtitle: "Understanding Stacking Context",
          text: "z-index controls the stacking order of positioned elements (elements with position other than static).",
          code: {
            text: `/* Basic z-index usage */
.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000; /* Appears above everything */
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 999; /* Below modal */
}

.dropdown {
    position: absolute;
    z-index: 100;
}

.tooltip {
    position: absolute;
    z-index: 200;
}

/* Negative z-index */
.background-element {
    position: relative;
    z-index: -1; /* Goes behind parent */
}`,
            index: 15
          }
        },
        {
          subtitle: "z-index Guidelines",
          text: "Best practices for using z-index:",
          list: {
            items: [
              "Only works on positioned elements (position: relative, absolute, fixed, sticky)",
              "Higher values appear in front of lower values",
              "Can be negative (goes behind content)",
              "Creates stacking context for child elements",
              "Common ranges: 0-10 (normal content), 100-200 (dropdowns/modals), 1000+ (overlays/alerts)",
              "Avoid extremely high values (like 999999)",
              "Use CSS variables for consistent z-index values"
            ]
          },
          note: "Remember: z-index only works within the same stacking context!"
        }
      ]
    },
    {
      title: "Projects & Advanced Topics",
      content: [
        {
          subtitle: "Beginner Projects",
          text: "Practice these projects to reinforce your HTML/CSS skills:",
          list: {
            items: [
              "Personal Portfolio Website: Showcase your work with about, projects, and contact sections",
              "Restaurant Menu: Create a beautiful menu with images and descriptions",
              "Blog Layout: Design a blog with header, articles, sidebar, and footer",
              "Product Landing Page: Single page for a product with features and testimonials",
              "Responsive Resume: Create a digital resume that looks good on all devices"
            ]
          }
        },
        {
          subtitle: "Advanced CSS Concepts",
          text: "Once you master basics, explore these advanced topics:",
          list: {
            items: [
              "CSS Flexbox: One-dimensional layout system for efficient space distribution",
              "CSS Grid: Two-dimensional layout system for complex designs",
              "CSS Animations: Create smooth transitions and animations",
              "CSS Variables: Reusable values for consistent theming",
              "CSS Preprocessors: SASS/SCSS for more powerful CSS",
              "CSS Frameworks: Bootstrap, Tailwind CSS for faster development",
              "Responsive Design: Media queries for different screen sizes"
            ]
          }
        },
        {
          subtitle: "HOME WORK ->  Practice Assignment",
          text: "This practice assignment is designed to help students apply HTML and CSS concepts. Analyze each section carefully and recreate the entire page yourself to strengthen your understanding.",
          code: {
            text: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Complete HTML Form with All Tags - Student Assignment</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
        }
        
        body {
            background-color: #f0f2f5;
            padding: 20px;
            line-height: 1.6;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }
        
        h1 {
            color: #2c3e50;
            text-align: center;
            margin-bottom: 10px;
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
        }
        
        .subtitle {
            text-align: center;
            color: #7f8c8d;
            margin-bottom: 30px;
            font-style: italic;
        }
        
        .form-section {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 25px;
            border-left: 4px solid #3498db;
        }
        
        h2 {
            color: #2c3e50;
            margin-bottom: 15px;
            font-size: 1.3rem;
        }
        
        h3 {
            color: #34495e;
            margin: 15px 0 10px 0;
        }
        
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #2c3e50;
        }
        
        input, select, textarea {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
        }
        
        input[type="checkbox"], input[type="radio"] {
            width: auto;
            margin-right: 10px;
        }
        
        fieldset {
            border: 2px solid #ddd;
            border-radius: 5px;
            padding: 15px;
            margin-bottom: 20px;
        }
        
        legend {
            padding: 0 10px;
            font-weight: bold;
            color: #2c3e50;
        }
        
        .inline-group {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            margin-bottom: 15px;
        }
        
        .inline-item {
            display: flex;
            align-items: center;
            margin-right: 20px;
        }
        
        button {
            background: #3498db;
            color: white;
            border: none;
            padding: 12px 25px;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            margin-right: 10px;
            transition: background 0.3s;
        }
        
        button:hover {
            background: #2980b9;
        }
        
        button[type="reset"] {
            background: #e74c3c;
        }
        
        button[type="reset"]:hover {
            background: #c0392b;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        
        th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }
        
        th {
            background-color: #3498db;
            color: white;
        }
        
        tr:nth-child(even) {
            background-color: #f2f2f2;
        }
        
        .media-container {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            margin: 20px 0;
        }
        
        .media-item {
            flex: 1;
            min-width: 200px;
        }
        
        img {
            max-width: 100%;
            border-radius: 5px;
            border: 1px solid #ddd;
        }
        
        audio, video {
            width: 100%;
            margin-top: 10px;
        }
        
        progress, meter {
            width: 100%;
            height: 25px;
            margin: 10px 0;
        }
        
        details {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
            border: 1px solid #ddd;
        }
        
        summary {
            font-weight: bold;
            cursor: pointer;
            color: #2c3e50;
        }
        
        .list-container {
            display: flex;
            flex-wrap: wrap;
            gap: 30px;
            margin: 20px 0;
        }
        
        .list-box {
            flex: 1;
            min-width: 250px;
            background: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
        }
        
        ul, ol {
            margin-left: 20px;
            margin-bottom: 15px;
        }
        
        li {
            margin-bottom: 5px;
        }
        
        dl {
            margin-left: 15px;
        }
        
        dt {
            font-weight: bold;
            color: #2c3e50;
            margin-top: 10px;
        }
        
        dd {
            margin-left: 20px;
            color: #555;
        }
        
        iframe {
            width: 100%;
            height: 200px;
            border: 1px solid #ddd;
            border-radius: 5px;
            margin: 15px 0;
        }
        
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #7f8c8d;
            font-size: 0.9rem;
        }
        
        .tag-info {
            background: #2c3e50;
            color: white;
            padding: 10px;
            border-radius: 4px;
            margin-bottom: 10px;
            font-family: monospace;
        }
        
        @media (max-width: 768px) {
            .container {
                padding: 15px;
            }
            
            .inline-group {
                flex-direction: column;
            }
            
            .media-container, .list-container {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Complete HTML Form with All Major Tags</h1>
            <p class="subtitle">Student Assignment: Recreate this exact form using HTML</p>
        </header>
        
        <main>
            <form id="completeForm" action="#" method="POST">
                <!-- Text Inputs Section -->
                <section class="form-section">
                    <h2>📝 Text Input Elements</h2>
                    
                    <div class="tag-info">&lt;input type="text"&gt;, &lt;input type="password"&gt;, &lt;input type="email"&gt;, &lt;input type="tel"&gt;</div>
                    
                    <div class="inline-group">
                        <div style="flex: 1;">
                            <label for="fullName">Full Name:</label>
                            <input type="text" id="fullName" name="fullName" placeholder="Enter your full name" required>
                        </div>
                        
                        <div style="flex: 1;">
                            <label for="username">Username:</label>
                            <input type="text" id="username" name="username" placeholder="Choose a username" required>
                        </div>
                    </div>
                    
                    <div class="inline-group">
                        <div style="flex: 1;">
                            <label for="password">Password:</label>
                            <input type="password" id="password" name="password" placeholder="Enter your password" required>
                        </div>
                        
                        <div style="flex: 1;">
                            <label for="email">Email Address:</label>
                            <input type="email" id="email" name="email" placeholder="example@domain.com" required>
                        </div>
                    </div>
                    
                    <div class="inline-group">
                        <div style="flex: 1;">
                            <label for="phone">Phone Number:</label>
                            <input type="tel" id="phone" name="phone" placeholder="(123) 456-7890">
                        </div>
                        
                        <div style="flex: 1;">
                            <label for="website">Website:</label>
                            <input type="url" id="website" name="website" placeholder="https://example.com">
                        </div>
                    </div>
                </section>
                
                <!-- Selection Elements Section -->
                <section class="form-section">
                    <h2>🔘 Selection Elements</h2>
                    
                    <div class="tag-info">&lt;select&gt;, &lt;option&gt;, &lt;optgroup&gt;, &lt;input type="radio"&gt;, &lt;input type="checkbox"&gt;</div>
                    
                    <fieldset>
                        <legend>Gender</legend>
                        <div class="inline-group">
                            <div class="inline-item">
                                <input type="radio" id="male" name="gender" value="male">
                                <label for="male">Male</label>
                            </div>
                            <div class="inline-item">
                                <input type="radio" id="female" name="gender" value="female">
                                <label for="female">Female</label>
                            </div>
                            <div class="inline-item">
                                <input type="radio" id="other" name="gender" value="other">
                                <label for="other">Other</label>
                            </div>
                            <div class="inline-item">
                                <input type="radio" id="preferNot" name="gender" value="preferNot">
                                <label for="preferNot">Prefer not to say</label>
                            </div>
                        </div>
                    </fieldset>
                    
                    <fieldset>
                        <legend>Interests (Select all that apply)</legend>
                        <div class="inline-group">
                            <div class="inline-item">
                                <input type="checkbox" id="webDev" name="interests" value="webDev">
                                <label for="webDev">Web Development</label>
                            </div>
                            <div class="inline-item">
                                <input type="checkbox" id="design" name="interests" value="design">
                                <label for="design">Graphic Design</label>
                            </div>
                            <div class="inline-item">
                                <input type="checkbox" id="mobile" name="interests" value="mobile">
                                <label for="mobile">Mobile Development</label>
                            </div>
                            <div class="inline-item">
                                <input type="checkbox" id="dataScience" name="interests" value="dataScience">
                                <label for="dataScience">Data Science</label>
                            </div>
                        </div>
                    </fieldset>
                    
                    <div class="inline-group">
                        <div style="flex: 1;">
                            <label for="country">Country:</label>
                            <select id="country" name="country">
                                <option value="">Select a country</option>
                                <optgroup label="North America">
                                    <option value="us">United States</option>
                                    <option value="ca">Canada</option>
                                    <option value="mx">Mexico</option>
                                </optgroup>
                                <optgroup label="Europe">
                                    <option value="uk">United Kingdom</option>
                                    <option value="fr">France</option>
                                    <option value="de">Germany</option>
                                </optgroup>
                                <optgroup label="Asia">
                                    <option value="jp">Japan</option>
                                    <option value="cn">China</option>
                                    <option value="in">India</option>
                                </optgroup>
                            </select>
                        </div>
                        
                        <div style="flex: 1;">
                            <label for="education">Education Level:</label>
                            <select id="education" name="education" multiple size="3">
                                <option value="highSchool">High School</option>
                                <option value="bachelors">Bachelor's Degree</option>
                                <option value="masters">Master's Degree</option>
                                <option value="phd">PhD</option>
                                <option value="other">Other</option>
                            </select>
                            <small>Hold Ctrl to select multiple options</small>
                        </div>
                    </div>
                </section>
                
                <!-- Date and Time Section -->
                <section class="form-section">
                    <h2>📅 Date and Time Elements</h2>
                    
                    <div class="tag-info">&lt;input type="date"&gt;, &lt;input type="time"&gt;, &lt;input type="datetime-local"&gt;, &lt;input type="month"&gt;, &lt;input type="week"&gt;</div>
                    
                    <div class="inline-group">
                        <div style="flex: 1;">
                            <label for="birthdate">Date of Birth:</label>
                            <input type="date" id="birthdate" name="birthdate">
                        </div>
                        
                        <div style="flex: 1;">
                            <label for="appointment">Appointment Time:</label>
                            <input type="time" id="appointment" name="appointment">
                        </div>
                    </div>
                    
                    <div class="inline-group">
                        <div style="flex: 1;">
                            <label for="meeting">Meeting Date & Time:</label>
                            <input type="datetime-local" id="meeting" name="meeting">
                        </div>
                        
                        <div style="flex: 1;">
                            <label for="graduation">Graduation Month:</label>
                            <input type="month" id="graduation" name="graduation">
                        </div>
                    </div>
                    
                    <div style="max-width: 300px;">
                        <label for="vacation">Vacation Week:</label>
                        <input type="week" id="vacation" name="vacation">
                    </div>
                </section>
                
                <!-- Number and Range Section -->
                <section class="form-section">
                    <h2>🔢 Number and Range Elements</h2>
                    
                    <div class="tag-info">&lt;input type="number"&gt;, &lt;input type="range"&gt;, &lt;progress&gt;, &lt;meter&gt;</div>
                    
                    <div class="inline-group">
                        <div style="flex: 1;">
                            <label for="age">Age:</label>
                            <input type="number" id="age" name="age" min="1" max="120" step="1" value="25">
                        </div>
                        
                        <div style="flex: 1;">
                            <label for="quantity">Quantity:</label>
                            <input type="number" id="quantity" name="quantity" min="0" max="100" step="5" value="10">
                        </div>
                    </div>
                    
                    <div>
                        <label for="satisfaction">Satisfaction Level: <span id="satisfactionValue">50</span>%</label>
                        <input type="range" id="satisfaction" name="satisfaction" min="0" max="100" value="50" oninput="document.getElementById('satisfactionValue').textContent = this.value">
                    </div>
                    
                    <div>
                        <label>Progress Bar:</label>
                        <progress value="75" max="100">75%</progress>
                    </div>
                    
                    <div>
                        <label>Meter Element:</label>
                        <meter value="0.7" min="0" max="1" low="0.3" high="0.8" optimum="0.6">70%</meter>
                    </div>
                </section>
                
                <!-- Text Area Section -->
                <section class="form-section">
                    <h2>📄 Text Area and Details</h2>
                    
                    <div class="tag-info">&lt;textarea&gt;, &lt;details&gt;, &lt;summary&gt;</div>
                    
                    <div>
                        <label for="bio">Biography:</label>
                        <textarea id="bio" name="bio" rows="5" placeholder="Tell us about yourself..."></textarea>
                    </div>
                    
                    <div>
                        <label for="comments">Comments:</label>
                        <textarea id="comments" name="comments" rows="3" placeholder="Any additional comments..."></textarea>
                    </div>
                    
                    <details>
                        <summary>Additional Information</summary>
                        <p>This is a details element. When you click the summary, this content becomes visible. It's useful for hiding additional information that isn't needed immediately.</p>
                        <label for="extra">Extra Notes:</label>
                        <textarea id="extra" name="extra" rows="2" placeholder="Extra notes..."></textarea>
                    </details>
                </section>
                
                <!-- Media Elements Section -->
                <section class="form-section">
                    <h2>🎬 Media Elements</h2>
                    
                    <div class="tag-info">&lt;img&gt;, &lt;audio&gt;, &lt;video&gt;, &lt;figure&gt;, &lt;figcaption&gt;</div>
                    
                    <div class="media-container">
                        <div class="media-item">
                            <label>Image Element:</label>
                            <figure>
                                <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=200&q=80" alt="Sample coding image">
                                <figcaption>Fig.1 - Sample Image with Caption</figcaption>
                            </figure>
                        </div>
                        
                        <div class="media-item">
                            <label>Audio Element:</label>
                            <audio controls>
                                <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg">
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    </div>
                    
                    <div class="media-item">
                        <label>Video Element:</label>
                        <video controls>
                            <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </section>
                
                <!-- Table Section -->
                <section class="form-section">
                    <h2>📊 Table Elements</h2>
                    
                    <div class="tag-info">&lt;table&gt;, &lt;thead&gt;, &lt;tbody&gt;, &lt;tfoot&gt;, &lt;tr&gt;, &lt;th&gt;, &lt;td&gt;, &lt;caption&gt;, &lt;colgroup&gt;, &lt;col&gt;</div>
                    
                    <table>
                        <caption>Sample Data Table</caption>
                        <colgroup>
                            <col span="1" style="background-color:#f2f2f2">
                            <col span="2" style="background-color:#e6f3ff">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Score</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>001</td>
                                <td>John Smith</td>
                                <td>85</td>
                                <td>Pass</td>
                            </tr>
                            <tr>
                                <td>002</td>
                                <td>Maria Garcia</td>
                                <td>92</td>
                                <td>Pass</td>
                            </tr>
                            <tr>
                                <td>003</td>
                                <td>David Johnson</td>
                                <td>78</td>
                                <td>Pass</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="3" style="text-align:right"><strong>Average:</strong></td>
                                <td><strong>85</strong></td>
                            </tr>
                        </tfoot>
                    </table>
                </section>
                
                <!-- List Elements Section -->
                <section class="form-section">
                    <h2>📋 List Elements</h2>
                    
                    <div class="tag-info">&lt;ul&gt;, &lt;ol&gt;, &lt;li&gt;, &lt;dl&gt;, &lt;dt&gt;, &lt;dd&gt;</div>
                    
                    <div class="list-container">
                        <div class="list-box">
                            <h3>Unordered List</h3>
                            <ul>
                                <li>Frontend Development
                                    <ul>
                                        <li>HTML</li>
                                        <li>CSS</li>
                                        <li>JavaScript</li>
                                    </ul>
                                </li>
                                <li>Backend Development</li>
                                <li>Database Management</li>
                            </ul>
                        </div>
                        
                        <div class="list-box">
                            <h3>Ordered List</h3>
                            <ol>
                                <li>Planning Phase</li>
                                <li>Design Phase
                                    <ol type="a">
                                        <li>Wireframing</li>
                                        <li>Mockups</li>
                                    </ol>
                                </li>
                                <li>Development Phase</li>
                                <li>Testing Phase</li>
                                <li>Deployment</li>
                            </ol>
                        </div>
                        
                        <div class="list-box">
                            <h3>Description List</h3>
                            <dl>
                                <dt>HTML</dt>
                                <dd>HyperText Markup Language</dd>
                                
                                <dt>CSS</dt>
                                <dd>Cascading Style Sheets</dd>
                                
                                <dt>JS</dt>
                                <dd>JavaScript</dd>
                            </dl>
                        </div>
                    </div>
                </section>
                
                <!-- Interactive Elements Section -->
                <section class="form-section">
                    <h2>🔗 Interactive Elements</h2>
                    
                    <div class="tag-info">&lt;a&gt;, &lt;button&gt;, &lt;iframe&gt;, &lt;output&gt;</div>
                    
                    <div class="inline-group">
                        <div style="flex: 1;">
                            <label for="favColor">Favorite Color:</label>
                            <input type="color" id="favColor" name="favColor" value="#3498db">
                        </div>
                        
                        <div style="flex: 1;">
                            <label for="fileUpload">Upload File:</label>
                            <input type="file" id="fileUpload" name="fileUpload">
                        </div>
                    </div>
                    
                    <div>
                        <label>Link Example:</label>
                        <p>Visit <a href="https://www.w3schools.com" target="_blank">W3Schools</a> for more HTML tutorials.</p>
                    </div>
                    
                    <div>
                        <label>Iframe Example:</label>
                        <iframe src="https://www.wikipedia.org/" title="Wikipedia"></iframe>
                    </div>
                    
                    <div>
                        <label>Output Element:</label>
                        <form oninput="result.value=parseInt(a.value)+parseInt(b.value)">
                            <input type="number" id="a" name="a" value="10"> +
                            <input type="number" id="b" name="b" value="20"> =
                            <output name="result" for="a b">30</output>
                        </form>
                    </div>
                </section>
                
                <!-- Form Buttons -->
                <div style="text-align: center; margin-top: 30px;">
                    <button type="submit">Submit Form</button>
                    <button type="reset">Reset Form</button>
                    <button type="button" onclick="alert('This is a button with type=button')">Click Me</button>
                </div>
            </form>
        </main>
        
        <footer class="footer">
            <p>Student Assignment: Recreate this complete form using HTML</p>
            <p>Include all the HTML tags shown above in your solution</p>
            <p>Due Date: [Enter Due Date] | Student Name: ________________</p>
        </footer>
    </div>
    
    <script>
        // Simple script for range input display
        document.getElementById('satisfaction').addEventListener('input', function() {
            document.getElementById('satisfactionValue').textContent = this.value;
        });
        
        // Form submission handler
        document.getElementById('completeForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Form submitted! (This is a demo)');
        });
    </script>
</body>
</html>
            `,
            index: 16
          }
        }
      ]
    }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.headerH1}>Complete HTML & CSS Tutorial</h1>
        <p style={styles.headerP}>From Basics to Advanced Concepts - Everything Beginners Need to Know</p>
      </div>

      <div style={styles.sectionsContainer}>
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} style={styles.sectionCard}>
            <h2 style={styles.sectionH2}>{section.title}</h2>

            {section.content.map((content, contentIndex) => (
              <div key={contentIndex} style={styles.contentBlock}>
                {content.subtitle && <h3 style={styles.subtitleH3}>{content.subtitle}</h3>}
                {content.text && <p style={styles.textP}>{content.text}</p>}

                {content.list && (
                  <div style={styles.listBlock}>
                    {content.list.title && <h4 style={styles.listH4}>{content.list.title}</h4>}
                    <ul style={styles.listUl}>
                      {content.list.items.map((item, itemIndex) => (
                        <li key={itemIndex} style={styles.listLi}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {content.table && (
                  <table style={styles.table}>
                    <thead style={styles.tableHead}>
                      <tr>
                        {content.table.headers.map((header, idx) => (
                          <th key={idx} style={styles.tableCell}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {content.table.rows.map((row, rowIndex) => (
                        <tr key={rowIndex} style={styles.tableRow}>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex} style={styles.tableCell}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {content.code && (
                  <div style={styles.codeBlock}>
                    <pre style={styles.pre}>
                      <code style={styles.code}>{content.code.text}</code>
                    </pre>
                    <button
                      style={{
                        ...styles.copyBtn,
                        ...(copiedIndex === content.code.index ? styles.copiedBtn : {})
                      }}
                      onClick={() => copyToClipboard(content.code.text, content.code.index)}
                    >
                      {copiedIndex === content.code.index ? '✓ Copied!' : 'Copy Code'}
                    </button>
                  </div>
                )}

                {content.note && (
                  <div style={styles.noteBox}>
                    <strong>Note: </strong>{content.note}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={styles.companyInfo}>
        <h2 style={styles.companyH2}>LIGAND SOFTWARE SOLUTIONS</h2>
        <p style={styles.companyP}>Your Launchpad To Tech Success</p>
        <p style={styles.companyP}>Master Web Development from Scratch</p>
        <p style={styles.companyP}>Happy Learning!!!!!</p>
        <p style={styles.companyP}>Sankeshwar</p>
        <p style={styles.companyP}>8722585715</p>
        <p style={styles.companyP}>www.ligandsoftware.com</p>
      </div>

      <div style={styles.footer}>
        <p style={styles.footerP}>Practice all concepts with hands-on projects.</p>
        <p style={styles.footerP}>Next: JavaScript Fundamentals and DOM Manipulation</p>
      </div>
      
      <Notes />
    </div>
  );
};

export default IntroductionHTML;