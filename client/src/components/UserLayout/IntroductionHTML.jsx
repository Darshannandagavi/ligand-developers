import React, { useState } from "react";

const IntroductionHTML = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState("document");
  const [activeSection, setActiveSection] = useState("html"); // 'html', 'css', 'react-css'

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Categories of HTML Tags
  const htmlTags = {
    document: {
      title: "Document Structure Tags",
      description:
        "These define the basic structure and metadata of an HTML page",
      tags: [
        {
          tag: "<!DOCTYPE html>",
          name: "Document Type Declaration",
          description: "Defines the document type and HTML version (HTML5)",
          example: `<!DOCTYPE html>`,
          attributes: "None",
          usage: "Must be the very first line in HTML document",
        },
        {
          tag: "<html>",
          name: "HTML Root Element",
          description: "Root element that wraps all content on the page",
          example: `<html lang="en">
  <!-- All content goes here -->
</html>`,
          attributes: "lang, xmlns",
          usage: "Contains the entire HTML document",
        },
        {
          tag: "<head>",
          name: "Document Head",
          description: "Contains meta-information about the document",
          example: `<head>
  <meta charset="UTF-8">
  <title>My Page</title>
</head>`,
          attributes: "None",
          usage: "Contains metadata, title, links to CSS/JS",
        },
        {
          tag: "<title>",
          name: "Document Title",
          description: "Defines the title shown in browser tab/bookmarks",
          example: `<title>Ligand Software Solutions</title>`,
          attributes: "None",
          usage: "Required in <head>, important for SEO",
        },
        {
          tag: "<meta>",
          name: "Metadata",
          description: "Provides metadata about the HTML document",
          example: `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Learn web development">`,
          attributes: "charset, name, content, http-equiv",
          usage: "Character encoding, viewport settings, SEO info",
        },
        {
          tag: "<style>",
          name: "Internal CSS",
          description: "Used to define internal CSS styles",
          example: `<style>
  body { font-family: Arial; }
  h1 { color: blue; }
</style>`,
          attributes: "type, media",
          usage: "CSS written directly in HTML file",
        },
        {
          tag: "<body>",
          name: "Document Body",
          description: "Contains all visible content of the webpage",
          example: `<body>
  <h1>Welcome</h1>
  <p>Content goes here</p>
</body>`,
          attributes: "class, id, style, etc.",
          usage: "All visible elements go inside body",
        },
      ],
    },
    semantic: {
      title: "Semantic Layout Tags",
      description: "Give meaning and structure to page content (HTML5)",
      tags: [
        {
          tag: "<header>",
          name: "Header",
          description: "Represents introductory content or navigation",
          example: `<header>
  <h1>Website Title</h1>
  <nav>Navigation</nav>
</header>`,
          attributes: "class, id, style",
          usage: "Top section, contains logo, navigation",
        },
        {
          tag: "<main>",
          name: "Main Content",
          description: "Contains the main content of the document",
          example: `<main>
  <article>Main article</article>
  <aside>Sidebar</aside>
</main>`,
          attributes: "class, id, style",
          usage: "Only one per page, main content area",
        },
        {
          tag: "<section>",
          name: "Section",
          description: "Defines a section in a document",
          example: `<section>
  <h2>About Us</h2>
  <p>Our story...</p>
</section>`,
          attributes: "class, id, style",
          usage: "Group related content thematically",
        },
        {
          tag: "<footer>",
          name: "Footer",
          description: "Defines a footer for a document or section",
          example: `<footer>
  <p>&copy; 2024 Company Name</p>
  <p>Contact info</p>
</footer>`,
          attributes: "class, id, style",
          usage: "Bottom section, copyright, links, contact",
        },
        {
          tag: "<nav>",
          name: "Navigation",
          description: "Defines navigation links",
          example: `<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>`,
          attributes: "class, id, style",
          usage: "Main navigation menu",
        },
        {
          tag: "<article>",
          name: "Article",
          description: "Defines independent, self-contained content",
          example: `<article>
  <h2>Blog Post Title</h2>
  <p>Article content...</p>
</article>`,
          attributes: "class, id, style",
          usage: "Blog posts, news articles, forum posts",
        },
        {
          tag: "<aside>",
          name: "Aside",
          description: "Defines content aside from main content",
          example: `<aside>
  <h3>Related Links</h3>
  <p>Additional info...</p>
</aside>`,
          attributes: "class, id, style",
          usage: "Sidebars, pull quotes, advertisements",
        },
        {
          tag: "<figure>",
          name: "Figure",
          description: "Groups media content with a caption",
          example: `<figure>
  <img src="image.jpg" alt="Description">
  <figcaption>Figure 1: Description</figcaption>
</figure>`,
          attributes: "class, id, style",
          usage: "Images, diagrams, code snippets with captions",
        },
        {
          tag: "<figcaption>",
          name: "Figure Caption",
          description: "Defines a caption for a <figure> element",
          example: `<figcaption>Beautiful sunset photo</figcaption>`,
          attributes: "class, id, style",
          usage: "Always inside <figure> element",
        },
      ],
    },
    text: {
      title: "Text & Heading Tags",
      description: "Used for headings, paragraphs, and text formatting",
      tags: [
        {
          tag: "<h1> to <h6>",
          name: "Headings",
          description: "HTML headings from most important (h1) to least (h6)",
          example: `<h1>Main Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>`,
          attributes: "class, id, style",
          usage: "Structure content hierarchy, important for SEO",
        },
        {
          tag: "<p>",
          name: "Paragraph",
          description: "Defines a paragraph of text",
          example: `<p>This is a paragraph of text that contains information about our topic.</p>`,
          attributes: "class, id, style",
          usage: "For regular text content",
        },
        {
          tag: "<strong>",
          name: "Strong Importance",
          description: "Indicates strong importance, seriousness, or urgency",
          example: `<p>This is <strong>very important</strong> information.</p>`,
          attributes: "class, id, style",
          usage: "Bold text with semantic importance",
        },
        {
          tag: "<em>",
          name: "Emphasis",
          description: "Marks text that has stress emphasis",
          example: `<p>I <em>really</em> want to learn HTML.</p>`,
          attributes: "class, id, style",
          usage: "Italicized text with emphasis",
        },
        {
          tag: "<small>",
          name: "Small Text",
          description: "Represents side-comments or small print",
          example: `<p>Regular text <small>small print text</small></p>`,
          attributes: "class, id, style",
          usage: "Legal disclaimers, copyright, side comments",
        },
        {
          tag: "<mark>",
          name: "Highlighted Text",
          description: "Represents text highlighted for reference",
          example: `<p>Search results for <mark>HTML tags</mark></p>`,
          attributes: "class, id, style",
          usage: "Highlight search terms or important text",
        },
        {
          tag: "<br>",
          name: "Line Break",
          description: "Produces a line break in text",
          example: `<p>First line<br>Second line</p>`,
          attributes: "class, id, style",
          usage: "Force line breaks in text",
        },
        {
          tag: "<hr>",
          name: "Horizontal Rule",
          description: "Represents a thematic break between content",
          example: `<p>Section 1 content</p>
<hr>
<p>Section 2 content</p>`,
          attributes: "class, id, style",
          usage: "Visual separation between sections",
        },
      ],
    },
    form: {
      title: "Form Tags",
      description: "Used to create interactive forms for user input",
      tags: [
        {
          tag: "<form>",
          name: "Form Container",
          description: "Creates an HTML form for user input",
          example: `<form action="/submit" method="POST">
  <!-- Form elements go here -->
</form>`,
          attributes: "action, method, enctype, target, novalidate",
          usage: "Wraps all form elements",
        },
        {
          tag: "<label>",
          name: "Form Label",
          description: "Defines a label for a form element",
          example: `<label for="username">Username:</label>
<input type="text" id="username">`,
          attributes: "for, form",
          usage: "Improves accessibility, clickable labels",
        },
        {
          tag: "<input>",
          name: "Input Field",
          description: "Creates interactive controls for forms",
          example: `<input type="text" name="username" placeholder="Enter username">`,
          attributes: "type, name, value, placeholder, required, disabled",
          usage: "Most common form element (see input types below)",
        },
        {
          tag: "<textarea>",
          name: "Multi-line Text Input",
          description: "Creates a multi-line text input control",
          example: `<textarea name="comments" rows="4" cols="50">
Default text here
</textarea>`,
          attributes: "name, rows, cols, placeholder, maxlength",
          usage: "Long text input (comments, descriptions)",
        },
        {
          tag: "<select>",
          name: "Drop-down List",
          description: "Creates a drop-down list",
          example: `<select name="country">
  <option value="us">USA</option>
  <option value="uk">UK</option>
</select>`,
          attributes: "name, multiple, size, required",
          usage: "Selection from multiple options",
        },
        {
          tag: "<option>",
          name: "Drop-down Option",
          description: "Defines an option in a drop-down list",
          example: `<option value="html">HTML</option>`,
          attributes: "value, selected, disabled",
          usage: "Individual items in <select>",
        },
        {
          tag: "<optgroup>",
          name: "Option Group",
          description: "Groups related options in a drop-down list",
          example: `<optgroup label="Frontend">
  <option>HTML</option>
  <option>CSS</option>
</optgroup>`,
          attributes: "label, disabled",
          usage: "Organize long drop-down lists",
        },
        {
          tag: "<fieldset>",
          name: "Fieldset",
          description: "Groups related elements in a form",
          example: `<fieldset>
  <legend>Personal Info</legend>
  <!-- Form fields here -->
</fieldset>`,
          attributes: "disabled, form, name",
          usage: "Visual grouping of form controls",
        },
        {
          tag: "<legend>",
          name: "Fieldset Caption",
          description: "Defines a caption for a <fieldset> element",
          example: `<legend>Contact Information</legend>`,
          attributes: "None specific",
          usage: "Always inside <fieldset>, first child",
        },
        {
          tag: "<button>",
          name: "Clickable Button",
          description: "Creates a clickable button",
          example: `<button type="submit">Submit Form</button>`,
          attributes: "type, name, value, disabled",
          usage: "Submit, reset, or custom buttons",
        },
        {
          tag: "<output>",
          name: "Calculation Output",
          description: "Represents the result of a calculation",
          example: `<output name="result">0</output>`,
          attributes: "for, form, name",
          usage: "Display calculation results",
        },
      ],
    },
    input: {
      title: "Input Types",
      description: "Different <input> types for various data collection",
      tags: [
        {
          tag: 'type="text"',
          name: "Single-line Text",
          description: "Default input for single-line text",
          example: `<input type="text" name="username">`,
          usage: "Names, usernames, search terms",
        },
        {
          tag: 'type="password"',
          name: "Password Field",
          description: "Hides entered characters with dots/stars",
          example: `<input type="password" name="password">`,
          usage: "Passwords, sensitive information",
        },
        {
          tag: 'type="email"',
          name: "Email Address",
          description: "For email addresses with built-in validation",
          example: `<input type="email" name="email">`,
          usage: "Email input with @ validation",
        },
        {
          tag: 'type="tel"',
          name: "Telephone Number",
          example: `<input type="tel" name="phone">`,
          usage: "Phone numbers",
        },
        {
          tag: 'type="url"',
          name: "URL Input",
          description: "For web addresses",
          example: `<input type="url" name="website">`,
          usage: "Website URLs",
        },
        {
          tag: 'type="radio"',
          name: "Radio Button",
          description: "Single choice from multiple options",
          example: `<input type="radio" name="gender" value="male">`,
          usage: "Gender selection, single choice questions",
        },
        {
          tag: 'type="checkbox"',
          name: "Checkbox",
          description: "Multiple selections allowed",
          example: `<input type="checkbox" name="interests" value="coding">`,
          usage: "Multiple selections, to-do lists",
        },
        {
          tag: 'type="date"',
          name: "Date Picker",
          description: "Select date from calendar",
          example: `<input type="date" name="birthdate">`,
          usage: "Birth dates, appointment dates",
        },
        {
          tag: 'type="time"',
          name: "Time Input",
          description: "Select time (no time zone)",
          example: `<input type="time" name="appointment">`,
          usage: "Appointment times",
        },
        {
          tag: 'type="datetime-local"',
          name: "Date and Time",
          description: "Select both date and time",
          example: `<input type="datetime-local" name="meeting">`,
          usage: "Meeting schedules",
        },
        {
          tag: 'type="month"',
          name: "Month Input",
          description: "Select month and year",
          example: `<input type="month" name="graduation">`,
          usage: "Credit card expiry, graduation month",
        },
        {
          tag: 'type="week"',
          name: "Week Input",
          description: "Select week of the year",
          example: `<input type="week" name="vacation">`,
          usage: "Week selection for planning",
        },
        {
          tag: 'type="number"',
          name: "Number Input",
          description: "Only numeric input with increment/decrement",
          example: `<input type="number" name="age" min="0" max="120">`,
          usage: "Age, quantity, ratings",
        },
        {
          tag: 'type="range"',
          name: "Range Slider",
          description: "Slider control for selecting a value",
          example: `<input type="range" name="volume" min="0" max="100">`,
          usage: "Volume control, satisfaction levels",
        },
        {
          tag: 'type="color"',
          name: "Color Picker",
          description: "Color selection tool",
          example: `<input type="color" name="favcolor">`,
          usage: "Color preferences, theme selection",
        },
        {
          tag: 'type="file"',
          name: "File Upload",
          description: "File selection for upload",
          example: `<input type="file" name="document">`,
          usage: "Upload images, documents",
        },
        {
          tag: 'type="submit"',
          name: "Submit Button",
          description: "Submits the form data",
          example: `<input type="submit" value="Send">`,
          usage: "Form submission",
        },
        {
          tag: 'type="reset"',
          name: "Reset Button",
          description: "Resets all form fields to default",
          example: `<input type="reset" value="Clear Form">`,
          usage: "Clear form data",
        },
        {
          tag: 'type="button"',
          name: "General Button",
          description: "Clickable button with custom JavaScript",
          example: `<input type="button" value="Click Me" onclick="alert('Hello')">`,
          usage: "Custom JavaScript actions",
        },
      ],
    },
    media: {
      title: "Media Tags",
      description: "Used to display images, audio, and video content",
      tags: [
        {
          tag: "<img>",
          name: "Image",
          description: "Embeds an image in the document",
          example: `<img src="photo.jpg" alt="Description" width="300" height="200">`,
          attributes: "src, alt, width, height, loading",
          usage: "Display photos, logos, graphics",
        },
        {
          tag: "<audio>",
          name: "Audio Player",
          description: "Embeds sound content",
          example: `<audio controls>
  <source src="audio.mp3" type="audio/mpeg">
</audio>`,
          attributes: "controls, autoplay, loop, muted",
          usage: "Music, podcasts, sound effects",
        },
        {
          tag: "<source>",
          name: "Media Source",
          description: "Specifies media resources for media elements",
          example: `<source src="video.mp4" type="video/mp4">`,
          attributes: "src, type, media",
          usage: "Inside <audio> or <video> for multiple formats",
        },
        {
          tag: "<video>",
          name: "Video Player",
          description: "Embeds video content",
          example: `<video controls width="640">
  <source src="movie.mp4" type="video/mp4">
</video>`,
          attributes: "controls, width, height, autoplay, muted",
          usage: "Movie clips, tutorials, presentations",
        },
        {
          tag: "<track>",
          name: "Text Track",
          description: "Specifies text tracks for media elements",
          example: `<track kind="subtitles" src="subs_en.vtt" srclang="en">`,
          attributes: "kind, src, srclang, label",
          usage: "Subtitles, captions, descriptions",
        },
      ],
    },
    table: {
      title: "Table Tags",
      description: "Used to create structured tables for data display",
      tags: [
        {
          tag: "<table>",
          name: "Table Container",
          description: "Defines an HTML table",
          example: `<table>
  <!-- Table content -->
</table>`,
          attributes: "border, cellpadding, cellspacing",
          usage: "Wraps all table elements",
        },
        {
          tag: "<caption>",
          name: "Table Caption",
          description: "Defines a table caption",
          example: `<caption>Student Grades</caption>`,
          attributes: "None specific",
          usage: "First child of <table>, describes table",
        },
        {
          tag: "<thead>",
          name: "Table Header",
          description: "Groups header content in a table",
          example: `<thead>
  <tr><th>Name</th><th>Age</th></tr>
</thead>`,
          attributes: "None specific",
          usage: "Contains header rows",
        },
        {
          tag: "<tbody>",
          name: "Table Body",
          description: "Groups the body content in a table",
          example: `<tbody>
  <tr><td>John</td><td>25</td></tr>
</tbody>`,
          attributes: "None specific",
          usage: "Contains main table data",
        },
        {
          tag: "<tfoot>",
          name: "Table Footer",
          description: "Groups footer content in a table",
          example: `<tfoot>
  <tr><td>Total</td><td>100</td></tr>
</tfoot>`,
          attributes: "None specific",
          usage: "Contains summary/footer rows",
        },
        {
          tag: "<tr>",
          name: "Table Row",
          description: "Defines a row in a table",
          example: `<tr>
  <td>Cell 1</td>
  <td>Cell 2</td>
</tr>`,
          attributes: "None specific",
          usage: "Contains table cells",
        },
        {
          tag: "<th>",
          name: "Table Header Cell",
          description: "Defines a header cell in a table",
          example: `<th>Student Name</th>`,
          attributes: "colspan, rowspan, scope",
          usage: "Header cells (bold and centered by default)",
        },
        {
          tag: "<td>",
          name: "Table Data Cell",
          description: "Defines a standard cell in a table",
          example: `<td>John Doe</td>`,
          attributes: "colspan, rowspan",
          usage: "Regular data cells",
        },
        {
          tag: "<colgroup>",
          name: "Column Group",
          description: "Specifies a group of columns for formatting",
          example: `<colgroup>
  <col span="2" style="background-color:red">
</colgroup>`,
          attributes: "span",
          usage: "Apply styles to multiple columns",
        },
        {
          tag: "<col>",
          name: "Column",
          description: "Specifies column properties for each column",
          example: `<col style="width:50%">`,
          attributes: "span",
          usage: "Inside <colgroup> for column styling",
        },
      ],
    },
    list: {
      title: "List Tags",
      description: "Used to organize content into ordered or unordered lists",
      tags: [
        {
          tag: "<ul>",
          name: "Unordered List",
          description: "Defines an unordered (bulleted) list",
          example: `<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>`,
          attributes: "type (disc, circle, square, none)",
          usage: "Bulleted lists for non-sequential items",
        },
        {
          tag: "<ol>",
          name: "Ordered List",
          description: "Defines an ordered (numbered) list",
          example: `<ol>
  <li>First item</li>
  <li>Second item</li>
</ol>`,
          attributes: "type (1, A, a, I, i), start, reversed",
          usage: "Numbered lists for sequential items",
        },
        {
          tag: "<li>",
          name: "List Item",
          description: "Defines a list item",
          example: `<li>HTML Basics</li>`,
          attributes: "value (for <ol> only)",
          usage: "Individual items in <ul> or <ol>",
        },
        {
          tag: "<dl>",
          name: "Description List",
          description: "Defines a description list",
          example: `<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language</dd>
</dl>`,
          attributes: "None specific",
          usage: "Terms and their descriptions",
        },
        {
          tag: "<dt>",
          name: "Description Term",
          description: "Defines a term in a description list",
          example: `<dt>CSS</dt>`,
          attributes: "None specific",
          usage: "Term being described (inside <dl>)",
        },
        {
          tag: "<dd>",
          name: "Description Details",
          description: "Describes the term in a description list",
          example: `<dd>Cascading Style Sheets</dd>`,
          attributes: "None specific",
          usage: "Description of term (inside <dl>)",
        },
      ],
    },
    interactive: {
      title: "Interactive & Utility Tags",
      description:
        "Used for interaction, embedded content, and special elements",
      tags: [
        {
          tag: "<a>",
          name: "Anchor (Link)",
          description: "Creates hyperlinks to other pages or resources",
          example: `<a href="https://example.com" target="_blank">Visit Example</a>`,
          attributes: "href, target, download, rel",
          usage: "Navigation links, external links, anchors",
        },
        {
          tag: "<iframe>",
          name: "Inline Frame",
          description: "Embeds another HTML page within current page",
          example: `<iframe src="https://www.wikipedia.org/" width="800" height="600"></iframe>`,
          attributes: "src, width, height, title, sandbox",
          usage: "Embed maps, videos, external content",
        },
        {
          tag: "<details>",
          name: "Details Disclosure",
          description: "Creates interactive widget to show/hide content",
          example: `<details>
  <summary>Read More</summary>
  <p>Additional content here</p>
</details>`,
          attributes: "open",
          usage: "FAQ sections, additional info, collapsible content",
        },
        {
          tag: "<summary>",
          name: "Details Summary",
          description: "Visible heading for a <details> element",
          example: `<summary>Click to expand</summary>`,
          attributes: "None specific",
          usage: "First child of <details>, clickable label",
        },
        {
          tag: "<progress>",
          name: "Progress Bar",
          description: "Represents completion progress of a task",
          example: `<progress value="75" max="100">75%</progress>`,
          attributes: "value, max",
          usage: "File upload progress, course completion",
        },
        {
          tag: "<meter>",
          name: "Scalar Measurement",
          description: "Represents a scalar measurement within a known range",
          example: `<meter value="0.6" min="0" max="1">60%</meter>`,
          attributes: "value, min, max, low, high, optimum",
          usage: "Disk usage, ratings, survey results",
        },
        {
          tag: "<datalist>",
          name: "Data List",
          description: "Provides autocomplete options for input fields",
          example: `<input list="browsers">
<datalist id="browsers">
  <option value="Chrome">
  <option value="Firefox">
</datalist>`,
          attributes: "id",
          usage: "Autocomplete suggestions",
        },
        {
          tag: "<template>",
          name: "Content Template",
          description: "Contains content that can be cloned and inserted",
          example: `<template id="product-template">
  <div class="product"></div>
</template>`,
          attributes: "None specific",
          usage: "Reusable HTML templates via JavaScript",
        },
      ],
    },
    script: {
      title: "Script Tag",
      description: "Used to embed or reference executable code",
      tags: [
        {
          tag: "<script>",
          name: "Script",
          description: "Used to embed or reference executable JavaScript code",
          example: `<script>
  alert('Hello World!');
</script>

<script src="script.js"></script>`,
          attributes: "src, type, async, defer",
          usage: "Add interactivity, manipulate DOM, handle events",
        },
      ],
    },
  };

  // CSS Fundamentals Content
  const cssContent = {
    fundamentals: [
      {
        title: "What is CSS?",
        description:
          "CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation of HTML documents.",
        content: `CSS controls:
• Colors and backgrounds
• Fonts and text styling
• Layout and positioning
• Responsive design
• Animations and transitions`,
      },
      {
        title: "CSS Syntax",
        description: "Basic structure of CSS rules",
        example: `selector {
  property: value;
  property: value;
}

/* Example: */
h1 {
  color: blue;
  font-size: 24px;
  text-align: center;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}`,
      },
      {
        title: "CSS Selectors",
        description: "Different ways to target HTML elements",
        example: `/* Element Selector */
p { color: black; }

/* Class Selector */
.text-red { color: red; }

/* ID Selector */
#header { background: blue; }

/* Universal Selector */
* { margin: 0; padding: 0; }

/* Attribute Selector */
input[type="text"] { border: 1px solid #ccc; }

/* Pseudo-classes */
a:hover { color: red; }
li:first-child { font-weight: bold; }

/* Pseudo-elements */
p::first-line { font-size: 120%; }
p::before { content: "📝 "; }`,
      },
    ],
    levels: [
      {
        title: "Level 1: Inline CSS",
        description:
          "Applied directly to HTML elements using the style attribute",
        example: `<div style="color: red; font-size: 16px; padding: 10px;">
  This text is red with 16px font size
</div>

<button style="
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
">
  Click Me
</button>`,
        pros: ["Highest priority", "Quick to test"],
        cons: ["Hard to maintain", "Not reusable", "Mixes content with style"],
      },
      {
        title: "Level 2: Internal/Embedded CSS",
        description: "Placed inside a <style> tag in the HTML head section",
        example: `<!DOCTYPE html>
<html>
<head>
  <style>
    /* Global Styles */
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
   
    /* Class-based Styles */
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
   
    .button {
      background-color: #3498db;
      color: white;
      padding: 12px 24px;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s;
    }
   
    .button:hover {
      background-color: #2980b9;
    }
   
    /* ID-based Styles */
    #header {
      background-color: #2c3e50;
      color: white;
      padding: 20px;
      text-align: center;
    }
  </style>
</head>
<body>
  <!-- HTML content -->
</body>
</html>`,
        pros: [
          "Better organization",
          "Can use classes and IDs",
          "Applies to single page",
        ],
        cons: ["Not reusable across pages", "Increases HTML file size"],
      },
      {
        title: "Level 3: External CSS",
        description: "Separate .css file linked in HTML (BEST PRACTICE)",
        example: `<!-- In HTML file -->
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- HTML content -->
</body>
</html>

/* In styles.css file */
/* Reset and Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Typography */
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f8f9fa;
}

/* Layout Components */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Button Component */
.btn {
  display: inline-block;
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

/* Card Component */
.card {
  background: white;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  margin-bottom: 25px;
  transition: transform 0.3s;
}

.card:hover {
  transform: translateY(-5px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 0 15px;
  }
 
  .btn {
    padding: 10px 20px;
    font-size: 14px;
  }
}`,
        pros: [
          "Best practice",
          "Reusable across pages",
          "Maintainable",
          "Fast loading (cached)",
          "Clean separation",
        ],
        cons: ["Separate file to manage"],
      },
    ],
    specificity: {
      title: "CSS Specificity & Priority",
      description:
        "When multiple styles conflict, CSS follows this priority order:",
      levels: [
        {
          level: 1,
          name: "Inline styles",
          example: 'style="color: red;"',
          priority: "Highest",
        },
        {
          level: 2,
          name: "ID selectors",
          example: "#main-content",
          priority: "High",
        },
        {
          level: 3,
          name: "Class selectors",
          example: ".button-primary",
          priority: "Medium",
        },
        {
          level: 4,
          name: "Element selectors",
          example: "div, p, h1",
          priority: "Low",
        },
        {
          level: 5,
          name: "Universal selector",
          example: "*",
          priority: "Lowest",
        },
      ],
      example: `/* Specificity Example */
* { color: black; }                     /* Specificity: 0,0,0,0 */
p { color: blue; }                      /* Specificity: 0,0,0,1 */
.text { color: green; }                 /* Specificity: 0,0,1,0 */
#special.text { color: orange; }        /* Specificity: 0,1,1,0 */
<p style="color: red;">Text</p>         /* Specificity: 1,0,0,0 - WINS! */`,
    },
    boxModel: {
      title: "CSS Box Model",
      description:
        "Every element is a box with content, padding, border, and margin",
      diagram: `┌─────────────────────────────────────┐
│            Margin (outside)           │
│  ┌─────────────────────────────────┐  │
│  │         Border (edge)           │  │
│  │  ┌───────────────────────────┐  │  │
│  │  │       Padding (inside)    │  │  │
│  │  │  ┌─────────────────────┐  │  │  │
│  │  │  │     Content         │  │  │  │
│  │  │  │   (text, images)    │  │  │  │
│  │  │  └─────────────────────┘  │  │  │
│  │  └───────────────────────────┘  │  │
│  └─────────────────────────────────┘  │
└─────────────────────────────────────┘`,
      code: `.box {
  /* Content dimensions */
  width: 300px;
  height: 200px;
 
  /* Padding (inside space) */
  padding: 20px;
 
  /* Border (edge) */
  border: 2px solid #3498db;
  border-radius: 8px;
 
  /* Margin (outside space) */
  margin: 30px;
 
  /* Total width = width + padding + border + margin */
  /* Total: 300 + 40 + 4 + 60 = 404px */
}

/* Box-sizing property */
.normal-box {
  box-sizing: content-box; /* Default */
  /* Width = content width only */
}

.border-box {
  box-sizing: border-box;
  /* Width = content + padding + border */
  /* More predictable sizing */
}`,
    },
  };

  // React CSS Content
  const reactCSSContent = {
    methods: [
      {
        title: "Method 1: Inline Styles in React",
        description: "Use JavaScript objects with camelCase property names",
        example: `import React from 'react';

const InlineStylesExample = () => {
  // Define styles as JavaScript objects
  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '30px',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  };

  const headingStyle = {
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: '25px',
    fontSize: '2.2rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  const buttonStyle = {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '14px 28px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(52, 152, 219, 0.3)',
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: '#2980b9',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 18px rgba(52, 152, 219, 0.4)',
  };

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>
        Inline Styles in React
      </h1>
     
      <p style={{
        color: '#555',
        fontSize: '1.1rem',
        lineHeight: '1.7',
        marginBottom: '25px',
        textAlign: 'center',
      }}>
        This component uses inline styles defined as JavaScript objects.
      </p>
     
      <div style={{ textAlign: 'center' }}>
        <button
          style={isHovered ? buttonHoverStyle : buttonStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => alert('Button clicked!')}
        >
          Hover & Click Me
        </button>
      </div>
    </div>
  );
};

export default InlineStylesExample;`,
        pros: [
          "Scoped to component",
          "Dynamic styles easy",
          "No CSS class conflicts",
        ],
        cons: [
          "No media queries",
          "No pseudo-classes",
          "Harder to maintain",
          "Performance concerns",
        ],
      },
      {
        title: "Method 2: CSS Modules (Recommended)",
        description: "Create separate .module.css files for each component",
        example: `/* Button.module.css */
.button {
  display: inline-block;
  padding: 14px 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  transition: left 0.4s ease;
  z-index: -1;
}

.button:hover::before {
  left: 0;
}

.button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
}

.button:active {
  transform: translateY(-1px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

.button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

.button.loading {
  position: relative;
  color: transparent;
}

.button.loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin: -10px 0 0 -10px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Responsive styles */
@media (max-width: 768px) {
  .button {
    padding: 12px 24px;
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .button {
    width: 100%;
    padding: 14px;
  }
}

/* Button.jsx */
import React from 'react';
import styles from './Button.module.css';

const Button = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  type = 'button'
}) => {
  const buttonClasses = \`\${styles.button} \${loading ? styles.loading : ''}\`;

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
    >
      {loading ? '' : children}
    </button>
  );
};

export default Button;`,
        pros: [
          "Local scoping by default",
          "Real CSS features",
          "Media queries work",
          "Pseudo-classes work",
          "Best performance",
        ],
        cons: ["Extra .module.css files", "Learning curve", "Setup required"],
      },
      {
        title: "Method 3: Styled Components (CSS-in-JS)",
        description:
          "Write CSS directly in JavaScript using tagged template literals",
        example: `import styled from 'styled-components';

// Create styled components
const Container = styled.div\`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  background: \${props => props.dark ? '#2c3e50' : '#f8f9fa'};
  color: \${props => props.dark ? 'white' : '#333'};
  border-radius: 15px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, \${props => props.dark ? 0.3 : 0.1});
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, \${props => props.dark ? 0.4 : 0.15});
  }

  @media (max-width: 768px) {
    padding: 30px 15px;
    margin: 0 15px;
  }
\`;

const Heading = styled.h1\`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 25px;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  &::after {
    content: '';
    display: block;
    width: 100px;
    height: 4px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    margin: 15px auto;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
\`;

const Button = styled.button\`
  display: inline-block;
  padding: 15px 35px;
  background: \${props =>
    props.variant === 'primary'
      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      : props.variant === 'secondary'
      ? 'linear-gradient(135deg, #3498db 0%, #2ecc71 100%)'
      : '#f1f1f1'
  };
  color: \${props => props.variant ? 'white' : '#333'};
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    transition: left 0.4s ease;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }

  /* Responsive */
  @media (max-width: 768px) {
    padding: 12px 25px;
    font-size: 15px;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 14px;
  }
\`;

// Usage in component
const StyledComponentExample = () => {
  const [theme, setTheme] = React.useState('light');

  return (
    <Container dark={theme === 'dark'}>
      <Heading>
        Styled Components Example
      </Heading>
     
      <p style={{
        fontSize: '1.1rem',
        lineHeight: '1.7',
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        This uses styled-components for scoped, dynamic styling.
      </p>
     
      <div style={{
        display: 'flex',
        gap: '15px',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <Button
          variant="primary"
          onClick={() => alert('Primary button clicked!')}
        >
          Primary Action
        </Button>
       
        <Button
          variant="secondary"
          onClick={() => alert('Secondary button clicked!')}
        >
          Secondary Action
        </Button>
       
        <Button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          Toggle Theme
        </Button>
      </div>
    </Container>
  );
};

export default StyledComponentExample;`,
        pros: [
          "Scoped styles",
          "Dynamic props",
          "Full CSS features",
          "Great for theming",
        ],
        cons: ["Runtime overhead", "Learning curve", "Extra dependency"],
      },
      {
        title: "Method 4: CSS Framework with React",
        description:
          "Using frameworks like Tailwind CSS or Bootstrap with React",
        example: `// With Tailwind CSS (Utility-first)
const TailwindExample = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Tailwind CSS with React
      </h1>
     
      <p className="text-gray-700 text-lg mb-8 text-center leading-relaxed">
        Utility-first CSS framework that works great with React components.
      </p>
     
      <div className="flex flex-wrap gap-4 justify-center">
        <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl">
          Primary Button
        </button>
       
        <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-teal-600 transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl">
          Secondary Button
        </button>
       
        <button className="px-6 py-3 bg-gray-100 text-gray-800 font-semibold rounded-lg hover:bg-gray-200 transform hover:-translate-y-1 transition-all duration-200 border border-gray-300">
          Outline Button
        </button>
      </div>
     
      {/* Responsive Grid */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Card 1</h3>
          <p className="text-gray-600">Responsive card that stacks on mobile.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Card 2</h3>
          <p className="text-gray-600">Built with utility classes.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Card 3</h3>
          <p className="text-gray-600">Fast development workflow.</p>
        </div>
      </div>
    </div>
  );
};

// With Bootstrap
const BootstrapExample = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">Bootstrap with React</h3>
            </div>
            <div className="card-body">
              <p className="card-text">
                Bootstrap components work seamlessly with React.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <button className="btn btn-primary">Primary</button>
                <button className="btn btn-secondary">Secondary</button>
                <button className="btn btn-success">Success</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};`,
        pros: [
          "Rapid development",
          "Consistent design",
          "Responsive built-in",
          "Large community",
        ],
        cons: [
          "Bloat/unused CSS",
          "Limited customization",
          "Learning specific syntax",
        ],
      },
    ],
    bestPractices: [
      "Use CSS Modules for component-scoped styles",
      "Keep global styles in separate CSS files",
      "Use CSS variables for theming",
      "Follow mobile-first responsive design",
      "Use semantic class names",
      "Organize CSS with comments and logical grouping",
      "Avoid !important unless absolutely necessary",
      "Use flexbox/grid for layouts instead of floats",
      "Test in multiple browsers",
      "Optimize CSS for performance (minify, purge unused)",
    ],
  };

  // Complete HTML Form Code for Practice
  const htmlCode = `
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
  `;

  return (
    <div className="html-tutorial-container">
      {/* Header */}
      <header className="tutorial-header">
        <h1>📚 Complete HTML, CSS & React Styling Guide</h1>
        <p className="subtitle">
          Master Web Development Fundamentals - Ligand Software Solutions
        </p>
      </header>

      {/* Company Info */}
      <div className="company-banner">
        <h2>LIGAND SOFTWARE SOLUTIONS</h2>
        <p>Your Launchpad To Tech Success</p>
        <div className="contact-info">
          <p>📍 Sankeshwar | 📞 8722585715 | 🌐 www.ligandsoftware.com</p>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="main-nav">
        <button
          className={`main-nav-btn ${activeSection === "html" ? "active" : ""}`}
          onClick={() => setActiveSection("html")}
        >
          🏗️ HTML Tags Reference
        </button>
        <button
          className={`main-nav-btn ${activeSection === "css" ? "active" : ""}`}
          onClick={() => setActiveSection("css")}
        >
          🎨 CSS Fundamentals
        </button>
        <button
          className={`main-nav-btn ${activeSection === "react-css" ? "active" : ""}`}
          onClick={() => setActiveSection("react-css")}
        >
          ⚛️ CSS in React
        </button>
      </div>

      {/* HTML Section */}
      {activeSection === "html" && (
        <>
          {/* Categories Navigation */}
          <div className="categories-nav">
            {Object.keys(htmlTags).map((categoryKey) => (
              <button
                key={categoryKey}
                className={`category-btn ${activeCategory === categoryKey ? "active" : ""}`}
                onClick={() => setActiveCategory(categoryKey)}
              >
                {htmlTags[categoryKey].title}
              </button>
            ))}
          </div>

          {/* Current Category Display */}
          <div className="category-content">
            <div className="category-header">
              <h2>{htmlTags[activeCategory].title}</h2>
              <p>{htmlTags[activeCategory].description}</p>
            </div>

            <div className="tags-grid">
              {htmlTags[activeCategory].tags.map((tag, index) => (
                <div key={index} className="tag-card">
                  <div className="tag-header">
                    <h3>{tag.tag}</h3>
                    <span className="tag-name">{tag.name}</span>
                  </div>

                  <div className="tag-body">
                    <p className="description">{tag.description}</p>

                    <div className="example-section">
                      <h4>Example:</h4>
                      <div className="code-example">
                        <button
                          className={`copy-btn ${copiedIndex === index ? "copied" : ""}`}
                          onClick={() => copyToClipboard(tag.example, index)}
                        >
                          {copiedIndex === index ? "✓ Copied" : "Copy"}
                        </button>
                        <pre>{tag.example}</pre>
                      </div>
                    </div>

                    {tag.attributes && (
                      <div className="attributes">
                        <h4>Common Attributes:</h4>
                        <code>{tag.attributes}</code>
                      </div>
                    )}

                    <div className="usage">
                      <h4>Usage:</h4>
                      <p>{tag.usage}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* CSS Fundamentals Section */}
      {activeSection === "css" && (
        <div className="css-section">
          <div className="section-header">
            <h2>🎨 CSS Fundamentals - The 3 Levels of CSS</h2>
            <p>Learn how to style HTML elements with Cascading Style Sheets</p>
          </div>

          {/* CSS Basics */}
          <div className="css-basics">
            <h3>CSS Basics</h3>
            <div className="basics-grid">
              {cssContent.fundamentals.map((item, index) => (
                <div key={index} className="basics-card">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                  {item.example && (
                    <div className="code-example">
                      <button
                        className={`copy-btn ${copiedIndex === 200 + index ? "copied" : ""}`}
                        onClick={() =>
                          copyToClipboard(item.example, 200 + index)
                        }
                      >
                        {copiedIndex === 200 + index ? "✓ Copied" : "Copy"}
                      </button>
                      <pre>{item.example}</pre>
                    </div>
                  )}
                  {item.content && (
                    <pre className="content-text">{item.content}</pre>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CSS Levels */}
          <div className="css-levels">
            <h3>The 3 Levels of CSS</h3>
            <div className="levels-grid">
              {cssContent.levels.map((level, index) => (
                <div key={index} className="level-card">
                  <h4>{level.title}</h4>
                  <p className="level-description">{level.description}</p>

                  <div className="code-example">
                    <button
                      className={`copy-btn ${copiedIndex === 210 + index ? "copied" : ""}`}
                      onClick={() =>
                        copyToClipboard(level.example, 210 + index)
                      }
                    >
                      {copiedIndex === 210 + index ? "✓ Copied" : "Copy"}
                    </button>
                    <pre>{level.example}</pre>
                  </div>

                  <div className="pros-cons">
                    <div className="pros">
                      <h5>✅ Pros:</h5>
                      <ul>
                        {level.pros.map((pro, i) => (
                          <li key={i}>{pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="cons">
                      <h5>❌ Cons:</h5>
                      <ul>
                        {level.cons.map((con, i) => (
                          <li key={i}>{con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* CSS Specificity */}
          <div className="specificity-section">
            <h3>CSS Specificity & Priority</h3>
            <p>{cssContent.specificity.description}</p>

            <div className="specificity-levels">
              {cssContent.specificity.levels.map((level, index) => (
                <div key={index} className="specificity-card">
                  <div className="level-number">{level.level}</div>
                  <h5>{level.name}</h5>
                  <code>{level.example}</code>
                  <span className="priority">{level.priority} Priority</span>
                </div>
              ))}
            </div>

            <div className="code-example">
              <button
                className={`copy-btn ${copiedIndex === 220 ? "copied" : ""}`}
                onClick={() =>
                  copyToClipboard(cssContent.specificity.example, 220)
                }
              >
                {copiedIndex === 220 ? "✓ Copied" : "Copy"}
              </button>
              <pre>{cssContent.specificity.example}</pre>
            </div>
          </div>

          {/* Box Model */}
          <div className="box-model-section">
            <h3>CSS Box Model</h3>
            <p>{cssContent.boxModel.description}</p>

            <div className="box-model-visual">
              <pre className="box-model-diagram">
                {cssContent.boxModel.diagram}
              </pre>
              <div className="box-model-explanation">
                <div className="box-part">
                  <div className="color-swatch margin"></div>
                  <span>Margin: Outside space (transparent)</span>
                </div>
                <div className="box-part">
                  <div className="color-swatch border"></div>
                  <span>Border: Edge of element</span>
                </div>
                <div className="box-part">
                  <div className="color-swatch padding"></div>
                  <span>Padding: Inside space</span>
                </div>
                <div className="box-part">
                  <div className="color-swatch content"></div>
                  <span>Content: Text/images</span>
                </div>
              </div>
            </div>

            <div className="code-example">
              <button
                className={`copy-btn ${copiedIndex === 221 ? "copied" : ""}`}
                onClick={() => copyToClipboard(cssContent.boxModel.code, 221)}
              >
                {copiedIndex === 221 ? "✓ Copied" : "Copy"}
              </button>
              <pre>{cssContent.boxModel.code}</pre>
            </div>
          </div>
        </div>
      )}

      {/* React CSS Section */}
      {activeSection === "react-css" && (
        <div className="react-css-section">
          <div className="section-header">
            <h2>⚛️ How to Apply CSS in React</h2>
            <p>Different methods for styling React components</p>
          </div>

          {/* React CSS Methods */}
          <div className="react-methods">
            {reactCSSContent.methods.map((method, index) => (
              <div key={index} className="method-card">
                <div className="method-header">
                  <h3>
                    Method {index + 1}: {method.title}
                  </h3>
                  <span className="method-badge">
                    {index === 0
                      ? "🔄 Dynamic"
                      : index === 1
                        ? "🏆 Recommended"
                        : index === 2
                          ? "🎨 Advanced"
                          : "⚡ Fast"}
                  </span>
                </div>

                <p className="method-description">{method.description}</p>

                <div className="code-example">
                  <button
                    className={`copy-btn ${copiedIndex === 300 + index ? "copied" : ""}`}
                    onClick={() => copyToClipboard(method.example, 300 + index)}
                  >
                    {copiedIndex === 300 + index ? "✓ Copied" : "Copy"}
                  </button>
                  <pre>{method.example}</pre>
                </div>

                <div className="pros-cons">
                  <div className="pros">
                    <h5>✅ Advantages:</h5>
                    <ul>
                      {method.pros.map((pro, i) => (
                        <li key={i}>{pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="cons">
                    <h5>❌ Disadvantages:</h5>
                    <ul>
                      {method.cons.map((con, i) => (
                        <li key={i}>{con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Best Practices */}
          <div className="best-practices">
            <h3>🎯 Best Practices for CSS in React</h3>
            <div className="practices-grid">
              {reactCSSContent.bestPractices.map((practice, index) => (
                <div key={index} className="practice-card">
                  <div className="practice-number">{index + 1}</div>
                  <p>{practice}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison Table */}
          <div className="comparison-table">
            <h3>📊 CSS Method Comparison</h3>
            <table>
              <thead>
                <tr>
                  <th>Method</th>
                  <th>Best For</th>
                  <th>Performance</th>
                  <th>Learning Curve</th>
                  <th>Recommendation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Inline Styles</td>
                  <td>Quick prototypes, dynamic styles</td>
                  <td>Medium</td>
                  <td>Easy</td>
                  <td>Limited use</td>
                </tr>
                <tr>
                  <td>CSS Modules</td>
                  <td>Component-scoped styles, production apps</td>
                  <td>Excellent</td>
                  <td>Medium</td>
                  <td>⭐ Highly Recommended</td>
                </tr>
                <tr>
                  <td>Styled Components</td>
                  <td>Dynamic theming, design systems</td>
                  <td>Good</td>
                  <td>Steep</td>
                  <td>For advanced projects</td>
                </tr>
                <tr>
                  <td>CSS Frameworks</td>
                  <td>Rapid development, prototyping</td>
                  <td>Good</td>
                  <td>Easy</td>
                  <td>Startups, MVPs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Practice Section */}
      <div className="practice-section">
        <h2>💻 Practice Complete HTML Form</h2>
        <p className="practice-description">
          Below is a complete HTML form that uses many of the tags we've
          learned. Copy this code and practice modifying it to reinforce your
          learning.
        </p>

        <div className="complete-form-code">
          <div className="code-header">
            <h3>Practice this code</h3>
            <button
              className={`copy-btn-large ${copiedIndex === 100 ? "copied" : ""}`}
              onClick={() => copyToClipboard(htmlCode, 100)}
            >
              {copiedIndex === 100
                ? "✓ Full Code Copied!"
                : "Copy Complete Code"}
            </button>
          </div>

          <div className="code-container">
            <pre>{htmlCode}</pre>
          </div>
        </div>

        <div className="practice-instructions">
          <h3>📝 Practice Instructions:</h3>
          <div className="instructions-grid">
            <div className="instruction-card">
              <h4>Step 1: Copy & Run</h4>
              <ul>
                <li>Copy the complete code above</li>
                <li>
                  Save as <code>practice.html</code>
                </li>
                <li>Open in browser to see the form</li>
                <li>Test all form elements</li>
              </ul>
            </div>

            <div className="instruction-card">
              <h4>Step 2: Modify CSS</h4>
              <ul>
                <li>Try all 3 CSS levels</li>
                <li>Change color scheme</li>
                <li>Add responsive design</li>
                <li>Create hover effects</li>
              </ul>
            </div>

            <div className="instruction-card">
              <h4>Step 3: React Practice</h4>
              <ul>
                <li>Convert to React component</li>
                <li>Try CSS Modules</li>
                <li>Add styled-components</li>
                <li>Make it interactive</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="tutorial-footer">
        <div className="encouragement">
          <h2>Keep Practicing! 🚀</h2>
          <p>
            HTML and CSS are the foundation of web development. Master them
            well!
          </p>
          <p className="quote">
            "First learn HTML & CSS thoroughly, then everything else becomes
            easier."
          </p>
        </div>

        <div className="final-notes">
          <p>
            Join us for Programming, Coding, Project Training and Internship
            opportunities.
          </p>
          <p>Let's learn, code and build together. Happy Coding! 💻</p>
        </div>
      </footer>

      {/* Styles */}
      <style jsx>{`
        .html-tutorial-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
          line-height: 1.6;
        }

        .tutorial-header {
          text-align: center;
          margin-bottom: 40px;
          padding: 30px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .tutorial-header h1 {
          font-size: 2.5rem;
          margin-bottom: 15px;
        }

        .tutorial-header .subtitle {
          font-size: 1.2rem;
          opacity: 0.9;
        }

        .company-banner {
          background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
          color: white;
          padding: 25px;
          border-radius: 12px;
          margin-bottom: 30px;
          text-align: center;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .company-banner h2 {
          margin-bottom: 10px;
          font-size: 1.8rem;
        }

        .company-banner p {
          margin: 5px 0;
          font-size: 1.1rem;
        }

        .contact-info {
          margin-top: 15px;
          font-size: 0.9rem;
          opacity: 0.9;
        }

        .main-nav {
          display: flex;
          gap: 15px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }

        .main-nav-btn {
          flex: 1;
          min-width: 200px;
          padding: 20px;
          background: #f8f9fa;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          cursor: pointer;
          font-size: 1.1rem;
          font-weight: 600;
          color: #555;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .main-nav-btn:hover {
          background: #667eea;
          color: white;
          border-color: #667eea;
          transform: translateY(-3px);
        }

        .main-nav-btn.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-color: #667eea;
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        /* Rest of the styles remain the same as before */
        .categories-nav {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #f0f0f0;
        }

        .category-btn {
          padding: 12px 24px;
          background: #f8f9fa;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.95rem;
          font-weight: 600;
          color: #555;
          transition: all 0.3s ease;
        }

        .category-btn:hover {
          background: #667eea;
          color: white;
          border-color: #667eea;
          transform: translateY(-2px);
        }

        .category-btn.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-color: #667eea;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .category-content {
          background: white;
          border-radius: 12px;
          padding: 30px;
          margin-bottom: 40px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
        }

        .category-header {
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #f0f0f0;
        }

        .category-header h2 {
          color: #2c3e50;
          margin-bottom: 10px;
          font-size: 1.8rem;
        }

        .category-header p {
          color: #666;
          font-size: 1.1rem;
        }

        .tags-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 25px;
        }

        .tag-card {
          background: #f8f9fa;
          border-radius: 10px;
          padding: 20px;
          border: 1px solid #e0e0e0;
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .tag-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .tag-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 2px solid #667eea;
        }

        .tag-header h3 {
          color: #2c3e50;
          margin: 0;
          font-size: 1.3rem;
          font-family: monospace;
        }

        .tag-name {
          background: #667eea;
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .tag-body {
          color: #444;
        }

        .description {
          margin-bottom: 20px;
          line-height: 1.7;
        }

        .example-section h4,
        .attributes h4,
        .usage h4 {
          color: #2c3e50;
          margin: 15px 0 10px 0;
          font-size: 1rem;
        }

        .code-example {
          position: relative;
          background: #2d3748;
          color: #e2e8f0;
          padding: 15px;
          border-radius: 6px;
          font-family: "Consolas", monospace;
          font-size: 0.9rem;
          margin-bottom: 15px;
        }

        .code-example pre {
          margin: 0;
          white-space: pre-wrap;
          line-height: 1.5;
        }

        .copy-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: #3498db;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.8rem;
          transition: background 0.3s;
        }

        .copy-btn:hover {
          background: #2980b9;
        }

        .copy-btn.copied {
          background: #27ae60;
        }

        .attributes code {
          background: #e8f4fc;
          color: #2c3e50;
          padding: 8px 12px;
          border-radius: 4px;
          font-family: monospace;
          display: inline-block;
          margin-top: 5px;
        }

        .usage p {
          background: #f0f9ff;
          padding: 12px;
          border-radius: 6px;
          border-left: 4px solid #3498db;
          margin: 10px 0 0 0;
        }

        /* CSS Section Styles */
        .css-section,
        .react-css-section {
          background: white;
          border-radius: 12px;
          padding: 30px;
          margin-bottom: 40px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
        }

        .section-header {
          margin-bottom: 40px;
          padding-bottom: 20px;
          border-bottom: 2px solid #f0f0f0;
        }

        .section-header h2 {
          color: #2c3e50;
          margin-bottom: 10px;
          font-size: 1.8rem;
        }

        .section-header p {
          color: #666;
          font-size: 1.1rem;
        }

        .css-basics,
        .css-levels,
        .specificity-section,
        .box-model-section {
          margin-bottom: 50px;
        }

        .css-basics h3,
        .css-levels h3,
        .specificity-section h3,
        .box-model-section h3 {
          color: #2c3e50;
          margin-bottom: 20px;
          font-size: 1.5rem;
        }

        .basics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
        }

        .basics-card {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 10px;
          border: 1px solid #e0e0e0;
        }

        .basics-card h4 {
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 10px;
        }

        .content-text {
          background: #e8f4fc;
          padding: 15px;
          border-radius: 6px;
          font-family: "Consolas", monospace;
          font-size: 0.9rem;
          line-height: 1.5;
          white-space: pre-wrap;
        }

        .levels-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 25px;
        }

        .level-card {
          background: #f8f9fa;
          padding: 25px;
          border-radius: 10px;
          border: 1px solid #e0e0e0;
        }

        .level-card h4 {
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 10px;
        }

        .pros-cons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-top: 20px;
        }

        .pros h5,
        .cons h5 {
          color: #2c3e50;
          margin-bottom: 10px;
        }

        .pros ul,
        .cons ul {
          margin: 0;
          padding-left: 20px;
        }

        .pros li {
          color: #27ae60;
        }

        .cons li {
          color: #e74c3c;
        }

        .specificity-levels {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin: 20px 0;
        }

        .specificity-card {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          border: 2px solid #3498db;
        }

        .level-number {
          background: #3498db;
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 10px;
          font-weight: bold;
        }

        .priority {
          display: block;
          margin-top: 10px;
          padding: 5px 10px;
          background: #2ecc71;
          color: white;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .box-model-visual {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          margin: 30px 0;
          align-items: start;
        }

        .box-model-diagram {
          background: #2d3748;
          color: #e2e8f0;
          padding: 20px;
          border-radius: 8px;
          font-family: "Consolas", monospace;
          font-size: 12px;
          line-height: 1.2;
        }

        .box-model-explanation {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .box-part {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .color-swatch {
          width: 25px;
          height: 25px;
          border-radius: 4px;
          border: 1px solid #ddd;
        }

        .color-swatch.margin {
          background: transparent;
          border: 2px dashed #95a5a6;
        }

        .color-swatch.border {
          background: #e74c3c;
        }

        .color-swatch.padding {
          background: #3498db;
        }

        .color-swatch.content {
          background: #2ecc71;
        }

        /* React CSS Styles */
        .react-methods {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .method-card {
          background: #f8f9fa;
          padding: 30px;
          border-radius: 12px;
          border: 1px solid #e0e0e0;
        }

        .method-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .method-header h3 {
          color: #2c3e50;
          margin: 0;
        }

        .method-badge {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 5px 15px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .method-description {
          color: #666;
          margin-bottom: 20px;
          font-size: 1.1rem;
        }

        .best-practices {
          margin: 50px 0;
        }

        .practices-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .practice-card {
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          border-left: 5px solid #667eea;
          position: relative;
        }

        .practice-number {
          position: absolute;
          top: -10px;
          left: -10px;
          background: #667eea;
          color: white;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 0.9rem;
        }

        .comparison-table {
          margin-top: 50px;
        }

        .comparison-table table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }

        .comparison-table th {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 15px;
          text-align: left;
          font-weight: 600;
        }

        .comparison-table td {
          padding: 15px;
          border: 1px solid #ddd;
          color: #555;
        }

        .comparison-table tr:nth-child(even) {
          background: #f8f9fa;
        }

        .practice-section {
          background: white;
          border-radius: 12px;
          padding: 30px;
          margin: 40px 0;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
        }

        .practice-section h2 {
          color: #2c3e50;
          margin-bottom: 15px;
          font-size: 1.8rem;
        }

        .practice-description {
          color: #666;
          margin-bottom: 25px;
          font-size: 1.1rem;
          line-height: 1.7;
        }

        .complete-form-code {
          margin: 30px 0;
        }

        .code-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .code-header h3 {
          color: #2c3e50;
          margin: 0;
        }

        .copy-btn-large {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: transform 0.2s;
        }

        .copy-btn-large:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .copy-btn-large.copied {
          background: #27ae60;
        }

        .code-container {
          background: #2d3748;
          color: #e2e8f0;
          padding: 20px;
          border-radius: 8px;
          overflow-x: auto;
          max-height: 500px;
          overflow-y: auto;
        }

        .code-container pre {
          margin: 0;
          font-family: "Consolas", "Monaco", "Courier New", monospace;
          font-size: 12px;
          line-height: 1.4;
        }

        .practice-instructions {
          margin-top: 40px;
        }

        .instructions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
          margin-top: 20px;
        }

        .instruction-card {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 10px;
          border-left: 5px solid #667eea;
        }

        .instruction-card h4 {
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 15px;
        }

        .instruction-card ul {
          margin: 0;
          padding-left: 20px;
        }

        .instruction-card li {
          margin-bottom: 8px;
          color: #555;
        }

        .instruction-card code {
          background: #e8f4fc;
          padding: 2px 6px;
          border-radius: 3px;
          font-family: monospace;
          font-size: 0.9rem;
        }

        .tutorial-footer {
          margin-top: 60px;
          padding-top: 40px;
          border-top: 2px solid #f0f0f0;
        }

        .encouragement {
          text-align: center;
          padding: 30px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 15px;
          margin-bottom: 30px;
        }

        .encouragement h2 {
          font-size: 2.2rem;
          margin-bottom: 15px;
        }

        .encouragement p {
          font-size: 1.2rem;
          margin-bottom: 10px;
        }

        .encouragement .quote {
          font-style: italic;
          opacity: 0.9;
          margin-top: 20px;
        }

        .final-notes {
          text-align: center;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 10px;
        }

        .final-notes p {
          color: #666;
          margin: 10px 0;
        }

        @media (max-width: 768px) {
          .tutorial-header h1 {
            font-size: 2rem;
          }

          .tags-grid {
            grid-template-columns: 1fr;
          }

          .categories-nav {
            justify-content: center;
          }

          .instruction-card,
          .concept-card {
            padding: 15px;
          }

          .code-container {
            max-height: 300px;
            font-size: 10px;
          }

          .box-model-visual {
            grid-template-columns: 1fr;
          }

          .main-nav-btn {
            min-width: 100%;
          }

          .pros-cons {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .html-tutorial-container {
            padding: 15px;
          }

          .tutorial-header {
            padding: 20px;
          }

          .tutorial-header h1 {
            font-size: 1.7rem;
          }

          .category-btn {
            padding: 10px 15px;
            font-size: 0.85rem;
          }

          .company-banner h2 {
            font-size: 1.5rem;
          }
        }




        /* Add to your existing styles */

.css-levels {
  margin-bottom: 50px;
}

.levels-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;
}

.level-card {
  background: #f8f9fa;
  padding: 25px;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  min-height: 650px; /* Fixed minimum height */
  max-height: 650px; /* Fixed maximum height */
  overflow: hidden; /* Hide overflow */
}

/* Level 1 (Inline CSS) - No scroll */
.level-card:nth-child(1) {
  height: auto;
  min-height: auto;
  max-height: none;
}

/* Level 2 (Internal CSS) - With scroll */
.level-card:nth-child(2) .code-example {
  flex: 1;
  overflow-y: auto;
}

/* Level 3 (External CSS) - With scroll */
.level-card:nth-child(3) .code-example {
  flex: 1;
  overflow-y: auto;
}

.level-card h4 {
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 1.3rem;
}

.level-description {
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
  flex-shrink: 0; /* Prevent shrinking */
}

.code-example {
  position: relative;
  background: #2d3748;
  color: #e2e8f0;
  padding: 15px;
  border-radius: 6px;
  font-family: 'Consolas', monospace;
  font-size: 0.85rem; /* Slightly smaller font */
  margin-bottom: 15px;
  flex-grow: 1; /* Allow growing */
  min-height: 300px; /* Minimum height for code area */
}

/* Add scrollbar styling */
.code-example::-webkit-scrollbar {
  width: 8px;
}

.code-example::-webkit-scrollbar-track {
  background: #1a202c;
  border-radius: 4px;
}

.code-example::-webkit-scrollbar-thumb {
  background: #4a5568;
  border-radius: 4px;
}

.code-example::-webkit-scrollbar-thumb:hover {
  background: #718096;
}

.code-example pre {
  margin: 0;
  white-space: pre-wrap;
  line-height: 1.4;
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 15px;
  flex-shrink: 0; /* Prevent shrinking */
}

.pros h5, .cons h5 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 0.95rem;
}

.pros ul, .cons ul {
  margin: 0;
  padding-left: 20px;
}

.pros li {
  color: #27ae60;
  font-size: 0.9rem;
  margin-bottom: 5px;
}

.cons li {
  color: #e74c3c;
  font-size: 0.9rem;
  margin-bottom: 5px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .levels-grid {
    grid-template-columns: 1fr;
  }
 
  .level-card {
    min-height: 600px;
    max-height: 600px;
  }
 
  .code-example {
    min-height: 250px;
  }
 
  .pros-cons {
    grid-template-columns: 1fr;
    gap: 15px;
  }
}

@media (max-width: 480px) {
  .level-card {
    min-height: 550px;
    max-height: 550px;
    padding: 20px;
  }
 
  .code-example {
    font-size: 0.8rem;
    min-height: 200px;
  }
}
      `}</style>
    </div>
  );
};

export default IntroductionHTML;