import React, { useState } from "react";

const IntroductionHTML = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const htmlCode = `<!DOCTYPE html>
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
</html>`;

  return (
    <div className="notes-container">
      <div className="header-section">
        <h1>HTML & CSS Fundamentals for React Developers</h1>
        <p>Complete guide to HTML tags, CSS styling, and applying them in React</p>
      </div>

      {/* Company Info */}
      <div className="company-info">
        <h2>LIGAND SOFTWARE SOLUTIONS</h2>
        <p>Your Launchpad To Tech Success</p>
        <p>Happy Coding!!!!!</p>
        <p>Sankeshwar</p>
        <p>8722585715</p>
        <p>www.ligandsoftware.com</p>
      </div>

      {/* Part 1: HTML Basics */}
      <div className="section-header">
        <h2>📄 HTML Basics - Essential Tags You Must Know</h2>
      </div>

      <div className="notes-card">
        <h3>HTML Document Structure</h3>
        <p>Every HTML document starts with these essential tags:</p>
        <div className="code-block">
          <button className={`copy-button ${copiedIndex === 0 ? 'copied' : ''}`} onClick={() => copyToClipboard(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title</title>
</head>
<body>
    <!-- Content goes here -->
</body>
</html>`, 0)}>
            {copiedIndex === 0 ? 'Copied!' : 'Copy'}
          </button>
          <pre>{`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title</title>
</head>
<body>
    <!-- Content goes here -->
</body>
</html>`}</pre>
        </div>
      </div>

      <div className="notes-card">
        <h3>HTML Form Elements (Used in the Assignment)</h3>
        <p>Form elements are crucial for user input. Here are the key ones:</p>
        
        <h4>Text Inputs:</h4>
        <div className="code-block">
          <button className={`copy-button ${copiedIndex === 1 ? 'copied' : ''}`} onClick={() => copyToClipboard(`<input type="text">    <!-- Regular text -->
<input type="password"> <!-- Hidden text -->
<input type="email">    <!-- Email validation -->
<input type="tel">      <!-- Phone number -->
<input type="url">      <!-- Website URL -->`, 1)}>
            {copiedIndex === 1 ? 'Copied!' : 'Copy'}
          </button>
          <pre>{`<input type="text">    <!-- Regular text -->
<input type="password"> <!-- Hidden text -->
<input type="email">    <!-- Email validation -->
<input type="tel">      <!-- Phone number -->
<input type="url">      <!-- Website URL -->`}</pre>
        </div>

        <h4>Selection Elements:</h4>
        <div className="code-block">
          <button className={`copy-button ${copiedIndex === 2 ? 'copied' : ''}`} onClick={() => copyToClipboard(`<input type="radio">     <!-- Single choice -->
<input type="checkbox">   <!-- Multiple choices -->
<select>                 <!-- Dropdown -->
  <option>Choice 1</option>
</select>`, 2)}>
            {copiedIndex === 2 ? 'Copied!' : 'Copy'}
          </button>
          <pre>{`<input type="radio">     <!-- Single choice -->
<input type="checkbox">   <!-- Multiple choices -->
<select>                 <!-- Dropdown -->
  <option>Choice 1</option>
</select>`}</pre>
        </div>

        <h4>Date & Time Inputs:</h4>
        <div className="code-block">
          <button className={`copy-button ${copiedIndex === 3 ? 'copied' : ''}`} onClick={() => copyToClipboard(`<input type="date">
<input type="time">
<input type="datetime-local">
<input type="month">
<input type="week">`, 3)}>
            {copiedIndex === 3 ? 'Copied!' : 'Copy'}
          </button>
          <pre>{`<input type="date">
<input type="time">
<input type="datetime-local">
<input type="month">
<input type="week">`}</pre>
        </div>

        <h4>Other Important Inputs:</h4>
        <div className="code-block">
          <button className={`copy-button ${copiedIndex === 4 ? 'copied' : ''}`} onClick={() => copyToClipboard(`<input type="number">
<input type="range">
<input type="color">
<input type="file">
<textarea rows="5"></textarea>`, 4)}>
            {copiedIndex === 4 ? 'Copied!' : 'Copy'}
          </button>
          <pre>{`<input type="number">
<input type="range">
<input type="color">
<input type="file">
<textarea rows="5"></textarea>`}</pre>
        </div>

        <h4>Media Elements:</h4>
        <div className="code-block">
          <button className={`copy-button ${copiedIndex === 5 ? 'copied' : ''}`} onClick={() => copyToClipboard(`<img src="image.jpg" alt="description">
<audio controls>
  <source src="audio.mp3" type="audio/mpeg">
</audio>
<video controls>
  <source src="video.mp4" type="video/mp4">
</video>`, 5)}>
            {copiedIndex === 5 ? 'Copied!' : 'Copy'}
          </button>
          <pre>{`<img src="image.jpg" alt="description">
<audio controls>
  <source src="audio.mp3" type="audio/mpeg">
</audio>
<video controls>
  <source src="video.mp4" type="video/mp4">
</video>`}</pre>
        </div>

        <h4>Structural Elements:</h4>
        <div className="code-block">
          <button className={`copy-button ${copiedIndex === 6 ? 'copied' : ''}`} onClick={() => copyToClipboard(`<table>    <!-- Data tables -->
<ul>       <!-- Unordered lists -->
<ol>       <!-- Ordered lists -->
<dl>       <!-- Description lists -->
<div>      <!-- Division/Container -->
<span>     <!-- Inline container -->
<header>   <!-- Header section -->
<footer>   <!-- Footer section -->
<section>  <!-- Content section -->
<form>     <!-- Form container -->`, 6)}>
            {copiedIndex === 6 ? 'Copied!' : 'Copy'}
          </button>
          <pre>{`<table>    <!-- Data tables -->
<ul>       <!-- Unordered lists -->
<ol>       <!-- Ordered lists -->
<dl>       <!-- Description lists -->
<div>      <!-- Division/Container -->
<span>     <!-- Inline container -->
<header>   <!-- Header section -->
<footer>   <!-- Footer section -->
<section>  <!-- Content section -->
<form>     <!-- Form container -->`}</pre>
        </div>
      </div>

      {/* Part 2: CSS Basics */}
      <div className="section-header">
        <h2>🎨 CSS Fundamentals - The 3 Levels of CSS</h2>
      </div>

      <div className="notes-card">
        <h3>What is CSS?</h3>
        <p>
          CSS (Cascading Style Sheets) is used to style HTML elements. It controls:
        </p>
        <ul>
          <li>Colors and backgrounds</li>
          <li>Fonts and text styling</li>
          <li>Layout and positioning</li>
          <li>Responsive design</li>
          <li>Animations and transitions</li>
        </ul>
      </div>

      <div className="notes-card">
        <h3>Level 1: Inline CSS (Highest Priority)</h3>
        <p>Applied directly to HTML elements using the <code>style</code> attribute:</p>
        <div className="code-block">
          <button className={`copy-button ${copiedIndex === 7 ? 'copied' : ''}`} onClick={() => copyToClipboard(`<div style="color: red; font-size: 16px;">
  This text is red and 16px
</div>

<button style="
  background: blue; 
  color: white; 
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
">
  Click Me
</button>`, 7)}>
            {copiedIndex === 7 ? 'Copied!' : 'Copy'}
          </button>
          <pre>{`<div style="color: red; font-size: 16px;">
  This text is red and 16px
</div>

<button style="
  background: blue; 
  color: white; 
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
">
  Click Me
</button>`}</pre>
        </div>
        <div className="note-box">
          <p><strong>Pros:</strong> Highest priority, good for quick testing</p>
          <p><strong>Cons:</strong> Hard to maintain, not reusable, mixes content with style</p>
        </div>
      </div>

      <div className="notes-card">
        <h3>Level 2: Internal/Embedded CSS (Medium Priority)</h3>
        <p>Placed inside a <code>&lt;style&gt;</code> tag in the HTML head:</p>
        <div className="code-block">
          <button className={`copy-button ${copiedIndex === 8 ? 'copied' : ''}`} onClick={() => copyToClipboard(`<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }
    
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    
    .button {
      background: #3498db;
      color: white;
      padding: 10px 20px;
      border-radius: 5px;
    }
    
    #header {
      background: #2c3e50;
      color: white;
      padding: 20px;
    }
  </style>
</head>`, 8)}>
            {copiedIndex === 8 ? 'Copied!' : 'Copy'}
          </button>
          <pre>{`<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }
    
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    
    .button {
      background: #3498db;
      color: white;
      padding: 10px 20px;
      border-radius: 5px;
    }
    
    #header {
      background: #2c3e50;
      color: white;
      padding: 20px;
    }
  </style>
</head>`}</pre>
        </div>
        <div className="note-box">
          <p><strong>Pros:</strong> Better organization, can use classes and IDs</p>
          <p><strong>Cons:</strong> Only applies to single HTML file</p>
        </div>
      </div>

      <div className="notes-card">
        <h3>Level 3: External CSS (Lowest Priority)</h3>
        <p>Separate .css file linked in HTML:</p>
        <div className="code-block">
          <button className={`copy-button ${copiedIndex === 9 ? 'copied' : ''}`} onClick={() => copyToClipboard(`<!-- In HTML head -->
<link rel="stylesheet" href="styles.css">

/* In styles.css */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.button-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}`, 9)}>
            {copiedIndex === 9 ? 'Copied!' : 'Copy'}
          </button>
          <pre>{`<!-- In HTML head -->
<link rel="stylesheet" href="styles.css">

/* In styles.css */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.button-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}`}</pre>
        </div>
        <div className="note-box">
          <p><strong>Pros:</strong> Best practice, reusable, maintainable, fast loading</p>
          <p><strong>Cons:</strong> Separate file to manage</p>
        </div>
      </div>

      <div className="notes-card">
        <h3>CSS Priority Order (Specificity)</h3>
        <p>When multiple styles conflict, CSS follows this priority order:</p>
        <ol>
          <li><strong>Inline styles</strong> (style attribute) - Highest priority</li>
          <li><strong>ID selectors</strong> (#id-name)</li>
          <li><strong>Class selectors</strong> (.class-name)</li>
          <li><strong>Element selectors</strong> (div, p, h1)</li>
          <li><strong>Universal selector</strong> (*) - Lowest priority</li>
        </ol>
        <div className="code-block">
          <button className={`copy-button ${copiedIndex === 10 ? 'copied' : ''}`} onClick={() => copyToClipboard(`/* Example of CSS specificity */
* { color: black; }              /* Lowest priority */
p { color: blue; }               /* Higher than * */
.text { color: green; }          /* Higher than element */
#special { color: orange; }      /* Higher than class */
<p style="color: red;">          /* Highest priority */`, 10)}>
            {copiedIndex === 10 ? 'Copied!' : 'Copy'}
          </button>
          <pre>{`/* Example of CSS specificity */
* { color: black; }              /* Lowest priority */
p { color: blue; }               /* Higher than * */
.text { color: green; }          /* Higher than element */
#special { color: orange; }      /* Higher than class */
<p style="color: red;">          /* Highest priority */`}</pre>
        </div>
      </div>

      {/* Part 3: Applying CSS in React */}
      <div className="section-header">
        <h2>⚛️ How to Apply CSS in React</h2>
      </div>

      <div className="notes-card">
        <h3>Method 1: Inline Styles in React</h3>
        <p>Use JavaScript objects with camelCase property names:</p>
        <div className="code-block">
          <button className={`copy-button ${copiedIndex === 11 ? 'copied' : ''}`} onClick={() => copyToClipboard(`function MyComponent() {
  const buttonStyle = {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px'
  };

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px'
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ color: '#2c3e50', textAlign: 'center' }}>
        Welcome to React
      </h1>
      <button style={buttonStyle}>
        Click Me
      </button>
    </div>
  );
}`, 11)}>
            {copiedIndex === 11 ? 'Copied!' : 'Copy'}
          </button>
          <pre>{`function MyComponent() {
  const buttonStyle = {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px'
  };

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px'
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ color: '#2c3e50', textAlign: 'center' }}>
        Welcome to React
      </h1>
      <button style={buttonStyle}>
        Click Me
      </button>
    </div>
  );
}`}</pre>
        </div>
      </div>

      <div className="notes-card">
        <h3>Method 2: CSS Modules (Recommended)</h3>
        <p>Create separate .module.css files for each component:</p>
        <div className="code-block">
          <button className={`copy-button ${copiedIndex === 12 ? 'copied' : ''}`} onClick={() => copyToClipboard(`/* Button.module.css */
.button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: transform 0.2s;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Button.jsx */
import styles from './Button.module.css';

function Button() {
  return (
    <button className={styles.button}>
      Click Me
    </button>
  );
}`, 12)}>
            {copiedIndex === 12 ? 'Copied!' : 'Copy'}
          </button>
          <pre>{`/* Button.module.css */
.button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: transform 0.2s;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Button.jsx */
import styles from './Button.module.css';

function Button() {
  return (
    <button className={styles.button}>
      Click Me
    </button>
  );
}`}</pre>
        </div>
      </div>

      <div className="notes-card">
        <h3>Method 3: Styled Components (CSS-in-JS)</h3>
        <p>Write CSS directly in JavaScript using tagged template literals:</p>
        <div className="code-block">
          <button className={`copy-button ${copiedIndex === 13 ? 'copied' : ''}`} onClick={() => copyToClipboard(`import styled from 'styled-components';

const Container = styled.div\`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
\`;

const Button = styled.button\`
  background: \${props => props.primary ? '#3498db' : '#95a5a6'};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: \${props => props.primary ? '#2980b9' : '#7f8c8d'};
  }
\`;

function MyComponent() {
  return (
    <Container>
      <Button primary>Primary Button</Button>
      <Button>Secondary Button</Button>
    </Container>
  );
}`, 13)}>
            {copiedIndex === 13 ? 'Copied!' : 'Copy'}
          </button>
          <pre>{`import styled from 'styled-components';

const Container = styled.div\`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
\`;

const Button = styled.button\`
  background: \${props => props.primary ? '#3498db' : '#95a5a6'};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: \${props => props.primary ? '#2980b9' : '#7f8c8d'};
  }
\`;

function MyComponent() {
  return (
    <Container>
      <Button primary>Primary Button</Button>
      <Button>Secondary Button</Button>
    </Container>
  );
}`}</pre>
        </div>
      </div>

      {/* Assignment Section */}
      <div className="section-header">
        <h2>📝 Practice the Code</h2>
      </div>

      <div className="practice-card">
        <h3>Complete HTML Form Code</h3>
        <p>Study this complete HTML form code. It contains examples of all 3 levels of CSS:</p>
        
        <div className="code-explanation">
          <h4>CSS Levels Used in This Code:</h4>
          <div className="levels-grid">
            <div className="level-card">
              <h5>🎯 Inline CSS</h5>
              <p>Used in specific elements:</p>
              <div className="code-example">
                <pre>{`<div style="flex: 1;">
<col style="background-color:#f2f2f2">
<td style="text-align:right">`}</pre>
              </div>
            </div>
            
            <div className="level-card">
              <h5>📁 Internal CSS</h5>
              <p>Main styling in &lt;style&gt; tag:</p>
              <div className="code-example">
                <pre>{`<style>
  body { background-color: #f0f2f5; }
  .container { max-width: 800px; }
  h1 { color: #2c3e50; }
</style>`}</pre>
              </div>
            </div>
            
            <div className="level-card">
              <h5>🎨 External CSS (Concept)</h5>
              <p>Could be moved to external file:</p>
              <div className="code-example">
                <pre>{`/* In separate styles.css */
* { margin: 0; padding: 0; }
.form-section { padding: 20px; }
button { background: #3498db; }`}</pre>
              </div>
            </div>
          </div>
        </div>

        <div className="complete-code">
          <h4>Complete HTML Form Code:</h4>
          <div className="code-block-large">
            <button className={`copy-button ${copiedIndex === 14 ? 'copied' : ''}`} onClick={() => copyToClipboard(htmlCode, 14)}>
              {copiedIndex === 14 ? 'Copied!' : 'Copy'}
            </button>
            <pre>{htmlCode}</pre>
          </div>
        </div>

        <div className="practice-instructions">
          <h4>Practice Instructions:</h4>
          <ol>
            <li>Copy this entire code into a new HTML file</li>
            <li>Save it as <code>complete-form.html</code></li>
            <li>Open it in your browser to see the form</li>
            <li>Try modifying the CSS in these ways:
              <ul>
                <li>Change color schemes (try different colors)</li>
                <li>Modify layout (change from flex to grid)</li>
                <li>Adjust responsive breakpoints</li>
                <li>Add new form elements</li>
              </ul>
            </li>
            <li>Practice identifying all 3 CSS levels in the code</li>
          </ol>
        </div>
      </div>

      {/* Homework Section */}
      <div className="homework-section">
        <h2>📚 Homework Assignment</h2>
        <div className="homework-card">
          <h3>Task 1: Analyze the Code</h3>
          <p>Study the complete HTML form code and identify:</p>
          <ul>
            <li>All HTML form elements used</li>
            <li>Examples of inline CSS (find at least 5)</li>
            <li>Internal CSS selectors and properties</li>
            <li>How responsive design is implemented</li>
          </ul>
          
          <h3>Task 2: Recreate from Memory</h3>
          <p>Without looking at the code, try to recreate:</p>
          <ul>
            <li>The complete form structure</li>
            <li>CSS styling for at least 3 sections</li>
            <li>Responsive design for mobile</li>
            <li>Form validation features</li>
          </ul>
          
          <h3>Task 3: Improve the Code</h3>
          <p>Make these improvements:</p>
          <ul>
            <li>Convert inline CSS to classes</li>
            <li>Move CSS to external file</li>
            <li>Add more form validation</li>
            <li>Improve accessibility features</li>
          </ul>
          
          <div className="deadline">
            <p><strong>Due Date:</strong> [Enter Due Date]</p>
            <p><strong>Student Name:</strong> ________________</p>
          </div>
        </div>
      </div>

      {/* Key Takeaways */}
      <div className="key-takeaways">
        <h2>🎯 Key Takeaways</h2>
        <div className="takeaways-grid">
          <div className="takeaway-card">
            <h3>HTML Mastery</h3>
            <ul>
              <li>Form elements for user input</li>
              <li>Semantic HTML structure</li>
              <li>Proper element nesting</li>
              <li>Accessibility features</li>
            </ul>
          </div>
          
          <div className="takeaway-card">
            <h3>CSS Levels</h3>
            <ul>
              <li>Inline: style attribute</li>
              <li>Internal: &lt;style&gt; tag</li>
              <li>External: .css files</li>
              <li>Specificity hierarchy</li>
            </ul>
          </div>
          
          <div className="takeaway-card">
            <h3>Best Practices</h3>
            <ul>
              <li>Use external CSS files</li>
              <li>Follow mobile-first design</li>
              <li>Maintain consistent naming</li>
              <li>Test across browsers</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer-section">
        <div className="congratulations">
          <h2>Practice Makes Perfect! 💪</h2>
          <p>Code daily to master HTML, CSS, and web development!</p>
          <h3>Every skilled web developer once started with HTML and CSS.</h3>
        </div>
        
        <div className="notes-footer">
          <p>
            Join us for Programming, Coding, Project Training and Internship opportunities.
          </p>
          <p>Let's learn, code and build together.</p>
        </div>
      </div>

      <style jsx>{`
        .notes-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
          line-height: 1.6;
        }

        .header-section {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 3px solid #3498db;
        }

        .header-section h1 {
          color: #2c3e50;
          margin-bottom: 10px;
          font-size: 2.5rem;
        }

        .header-section p {
          color: #7f8c8d;
          font-size: 1.2rem;
        }

        .company-info {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 25px;
          border-radius: 10px;
          margin-bottom: 30px;
          text-align: center;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .company-info h2 {
          margin-bottom: 10px;
          font-size: 1.8rem;
        }

        .company-info p {
          margin: 5px 0;
          font-size: 1.1rem;
        }

        .section-header {
          background-color: #2c3e50;
          color: white;
          padding: 15px 25px;
          border-radius: 6px;
          margin: 40px 0 20px 0;
        }

        .section-header h2 {
          margin: 0;
          font-size: 1.5rem;
        }

        .notes-card {
          background-color: white;
          border-radius: 8px;
          padding: 25px;
          margin-bottom: 25px;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
          border-left: 4px solid #3498db;
        }

        .notes-card h3 {
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 15px;
          font-size: 1.3rem;
        }

        .notes-card h4 {
          color: #34495e;
          margin: 15px 0 10px 0;
        }

        .notes-card p {
          color: #34495e;
          margin-bottom: 15px;
          line-height: 1.7;
        }

        .notes-card ul, .notes-card ol {
          margin-left: 20px;
          margin-bottom: 15px;
        }

        .notes-card li {
          margin-bottom: 8px;
          color: #34495e;
        }

        .note-box {
          background-color: #fff3cd;
          border-left: 4px solid #ffc107;
          padding: 15px;
          margin: 15px 0;
          border-radius: 4px;
        }

        .note-box p {
          margin: 5px 0;
          color: #856404;
        }

        .code-block {
          position: relative;
          background-color: #2d3748;
          color: #e2e8f0;
          padding: 20px;
          border-radius: 6px;
          margin: 15px 0;
          overflow-x: auto;
          max-height: 400px;
          overflow-y: auto;
        }

        .copy-button {
          position: absolute;
          top: 12px;
          right: 12px;
          background-color: #3498db;
          color: white;
          border: none;
          padding: 8px 15px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .copy-button:hover {
          background-color: #2980b9;
        }

        .copy-button.copied {
          background-color: #27ae60;
        }

        .code-block pre {
          margin: 0;
          white-space: pre-wrap;
          font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
          font-size: 14px;
          line-height: 1.5;
        }

        .code-block code {
          font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
          font-size: 14px;
          color: #e2e8f0;
        }

        .practice-card {
          background-color: #f0f9ff;
          border-radius: 10px;
          padding: 30px;
          margin-bottom: 30px;
          border: 2px solid #3498db;
        }

        .practice-card h3 {
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 20px;
        }

        .code-explanation {
          margin: 25px 0;
        }

        .levels-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 15px;
        }

        .level-card {
          background-color: white;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .level-card h5 {
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 10px;
          font-size: 1.1rem;
        }

        .code-example {
          background-color: #f8f9fa;
          padding: 10px;
          border-radius: 4px;
          margin-top: 10px;
          font-size: 12px;
        }

        .code-example pre {
          margin: 0;
          font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
        }

        .complete-code {
          margin: 30px 0;
        }

        .code-block-large {
          position: relative;
          background-color: #2d3748;
          color: #e2e8f0;
          padding: 20px;
          border-radius: 6px;
          margin: 15px 0;
          overflow-x: auto;
          max-height: 600px;
          overflow-y: auto;
          border: 1px solid #4a5568;
        }

        .code-block-large pre {
          margin: 0;
          font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
          font-size: 12px;
          line-height: 1.4;
        }

        .practice-instructions {
          background-color: #e8f4fc;
          padding: 20px;
          border-radius: 8px;
          margin-top: 25px;
          border-left: 4px solid #3498db;
        }

        .practice-instructions h4 {
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 15px;
        }

        .practice-instructions ol {
          margin-left: 20px;
        }

        .practice-instructions li {
          margin-bottom: 10px;
        }

        .practice-instructions ul {
          margin-left: 20px;
          margin-top: 5px;
        }

        .homework-section {
          margin: 50px 0;
        }

        .homework-section h2 {
          color: #2c3e50;
          text-align: center;
          margin-bottom: 20px;
          font-size: 2rem;
        }

        .homework-card {
          background-color: #f8f9fa;
          border-radius: 10px;
          padding: 30px;
        }

        .homework-card h3 {
          color: #2c3e50;
          margin-top: 20px;
          margin-bottom: 10px;
        }

        .deadline {
          background-color: #fff3cd;
          padding: 15px;
          border-radius: 6px;
          margin-top: 20px;
          border-left: 4px solid #ffc107;
        }

        .key-takeaways {
          margin: 40px 0;
        }

        .takeaways-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .takeaway-card {
          background-color: white;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
          border-top: 4px solid #2ecc71;
        }

        .takeaway-card h3 {
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 15px;
        }

        .footer-section {
          margin-top: 50px;
          padding-top: 30px;
          border-top: 2px solid #f0f0f0;
        }

        .congratulations {
          text-align: center;
          margin: 40px 0;
          padding: 30px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 10px;
        }

        .congratulations h2 {
          font-size: 2.5rem;
          margin-bottom: 15px;
        }

        .congratulations p {
          font-size: 1.2rem;
          margin-bottom: 15px;
        }

        .congratulations h3 {
          font-size: 1.5rem;
          font-weight: 300;
        }

        .notes-footer {
          text-align: center;
          margin-top: 40px;
          padding: 20px;
          background-color: #f8f9fa;
          border-radius: 8px;
        }

        .notes-footer p {
          color: #7f8c8d;
          margin: 10px 0;
        }

        @media (max-width: 768px) {
          .notes-container {
            padding: 15px;
          }
          
          .header-section h1 {
            font-size: 2rem;
          }
          
          .levels-grid, .takeaways-grid {
            grid-template-columns: 1fr;
          }
          
          .notes-card, .practice-card {
            padding: 20px;
          }
          
          .homework-card {
            padding: 20px;
          }
          
          .code-block-large {
            max-height: 400px;
          }
        }

        @media (max-width: 480px) {
          .company-info {
            padding: 15px;
          }
          
          .company-info h2 {
            font-size: 1.5rem;
          }
          
          .header-section h1 {
            font-size: 1.8rem;
          }
          
          .code-block-large {
            font-size: 10px;
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default IntroductionHTML;