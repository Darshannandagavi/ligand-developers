// // CreateAppPassword.jsx
// import React from 'react';

// const CreateAppPassword = () => {
//   return (
//     <div className="app-password-container">
//       <h1 className="app-password-title">
//          Creating App Password for User Registration Emails
//       </h1>

//       {/* Section 1.1 */}
//       <div className="section-container">
//         <h2 className="section-title">1.1. Open Chrome and Login to Google</h2>
//         <div className="content-box">
//           <ul className="instruction-list">
//             <li>Open Google Chrome browser</li>
//             <li>Login to your Gmail account if not already logged in</li>
//             <li>Click on your Profile picture in the top right corner</li>
//           </ul>
//         </div>
//         <div className="image-container">
//           <img 
//             src="/chrome-profile.png" 
//             alt="Google Chrome profile selection"
//             className="instruction-image"
//           />
//           <p className="image-caption">
//             Image: Google Chrome profile selection screen
//           </p>
//         </div>
//       </div>

//       {/* Section 1.2 */}
//       <div className="section-container">
//         <h2 className="section-title">1.2. Search for 2-Step Verification</h2>
//         <div className="content-box">
//           <ul className="instruction-list">
//             <li>Navigate to your Google Account page</li>
//             <li>In the search bar, type "2 step verification"</li>
//             <li>Select the 2-Step Verification option from search results</li>
//           </ul>
//         </div>
//         <div className="image-container">
//           <img 
//             src="/2step-search.png" 
//             alt="Search for 2-step verification"
//             className="instruction-image"
//           />
//           <p className="image-caption">
//             Image: Google Account search bar with "2 step verification"
//           </p>
//         </div>
//       </div>

//       {/* Section 1.3 */}
//       <div className="section-container">
//         <h2 className="section-title">1.3. Select the Highlighted Option</h2>
//         <div className="content-box">
//           <ul className="instruction-list">
//             <li>Navigate to the 2-Step Verification section</li>
//             <li>Select the appropriate option to proceed with setup</li>
//           </ul>
//         </div>
//         <div className="image-container">
//           <img 
//             src="/2step-option.png" 
//             alt="2-Step Verification option"
//             className="instruction-image"
//           />
//           <p className="image-caption">
//             Image: 2-Step Verification option highlighted
//           </p>
//         </div>
//       </div>

//       {/* Section 1.4 */}
//       <div className="section-container">
//         <h2 className="section-title">1.4. Turn on 2-Step Verification</h2>
//         <div className="content-box">
//           <ul className="instruction-list">
//             <li>Click on "Turn on 2-Step Verification" button</li>
//             <li>Follow the prompts to set up 2-step verification</li>
//             <li>Complete the verification process</li>
//           </ul>
//         </div>
//         <div className="image-container">
//           <img 
//             src="/turn-on-2step.png" 
//             alt="Turn on 2-step verification"
//             className="instruction-image"
//           />
//           <p className="image-caption">
//             Image: 2-Step Verification page with "Turn on" button
//           </p>
//         </div>
//       </div>

//       {/* Section 1.5 */}
//       <div className="section-container">
//         <h2 className="section-title">1.5. Return to Previous Screen</h2>
//         <div className="content-box">
//           <ul className="instruction-list">
//             <li>After successfully enabling 2-step verification</li>
//             <li>Click the back button to return to main security settings</li>
//           </ul>
//         </div>
//         <div className="image-container">
//           <img 
//             src="/2step-enabled.png" 
//             alt="2-Step Verification enabled"
//             className="instruction-image"
//           />
//           <p className="image-caption">
//             Image: 2-Step Verification enabled confirmation screen
//           </p>
//         </div>
//       </div>

//       {/* Section 1.6 */}
//       <div className="section-container">
//         <h2 className="section-title">1.6. Search for App Passwords</h2>
//         <div className="content-box">
//           <ul className="instruction-list">
//             <li>In the search bar, type "App Passwords"</li>
//             <li>Click on the first option in search results</li>
//           </ul>
//         </div>
//         <div className="image-container">
//           <img 
//             src="/app-passwords-search.png" 
//             alt="Search for App Passwords"
//             className="instruction-image"
//           />
//           <p className="image-caption">
//             Image: Search for "App Passwords" in Google Account
//           </p>
//         </div>
//       </div>

//       {/* Section 1.7 */}
//       <div className="section-container">
//         <h2 className="section-title">1.7. Create App Password</h2>
//         <div className="content-box">
//           <ul className="instruction-list">
//             <li>Click on "Create App Password" or similar option</li>
//             <li>Give a name to your app (e.g., "Email Service", "NodeJS App")</li>
//             <li>Click on "Create" button</li>
//           </ul>
//         </div>
//         <div className="image-container">
//           <img 
//             src="/create-app-password.png" 
//             alt="Create App Password"
//             className="instruction-image"
//           />
//           <p className="image-caption">
//             Image: App password creation screen with name input field
//           </p>
//         </div>
//       </div>

//       {/* Section 1.8 */}
//       <div className="section-container">
//         <h2 className="section-title">1.8. Copy Generated Password</h2>
//         <div className="content-box">
//           <ul className="instruction-list">
//             <li>Google will generate a 16-character app password</li>
//             <li>Take screenshot or picture of this password in mobile</li>
//             <li>Copy this password immediately</li>
//             <li className="important-text">Important: This password will only be displayed once!</li>
//           </ul>
//         </div>
//         <div className="image-container">
//           <img 
//             src="/generated-password.png" 
//             alt="Generated App Password"
//             className="instruction-image"
//           />
//           <p className="image-caption">
//             Image: Generated app password screen with copy option
//           </p>
//         </div>
//       </div>

//       {/* Section 1.9 */}
//       <div className="section-container final-section">
//         <h2 className="section-title">1.9. Configure Environment Variables</h2>
//         <div className="content-box white-bg">
//           <ul className="instruction-list">
//             <li>Paste the copied app password in your <code>.env</code> file</li>
//             <li>Add your email address in the same <code>.env</code> file</li>
//           </ul>
//           <div className="code-block">
//             <code>
//               EMAIL=youremail@gmail.com<br/>
//               EMAIL_PASSWORD=your-generated-app-password
//             </code>
//           </div>
//           <div className="image-container">
//             <img 
//               src="/env-file.png" 
//               alt="Environment File Configuration"
//               className="instruction-image"
//             />
//             <p className="image-caption">
//               Image: .env file configuration example
//             </p>
//           </div>
//           <p className="info-text">
//             This setup enables your Node.js application to send emails to users after registration using Nodemailer with Gmail's SMTP service.
//           </p>
//         </div>
//       </div>

//       {/* Important Notes */}
//       <div className="notes-container">
//         <h3 className="notes-title">📝 Important Notes:</h3>
//         <ul className="notes-list">
//           <li>App passwords are required when 2-Step Verification is enabled</li>
//           <li>Each app should have its own unique app password</li>
//           <li>Keep your app passwords secure and don't share them</li>
//           <li>You can revoke app passwords anytime from your Google Account</li>
//           <li>This password is different from your regular Gmail password</li>
//         </ul>
//       </div>
//       <style >{`

//       /* CreateAppPassword.css */
// .app-password-container {
//   max-width: 4xl;
//   margin: 0 auto;
//   padding: 1.5rem;
//   background-color: white;
//   box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
//   border-radius: 0.5rem;
// }

// .app-password-title {
//   font-size: 1.875rem;
//   font-weight: bold;
//   text-align: center;
//   color: #2563eb;
//   margin-bottom: 2rem;
// }

// .section-container {
//   margin-bottom: 2rem;
//   padding: 1.5rem;
//   border: 1px solid #e5e7eb;
//   border-radius: 0.5rem;
// }

// .section-title {
//   font-size: 1.25rem;
//   font-weight: 600;
//   color: #374151;
//   margin-bottom: 1rem;
// }

// .content-box {
//   background-color: #f9fafb;
//   padding: 1rem;
//   border-radius: 0.5rem;
//   margin-bottom: 1rem;
// }

// .instruction-list {
//   list-style-type: disc;
//   list-style-position: inside;
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;
//   color: #374151;
// }

// .important-text {
//   color: #dc2626;
//   font-weight: 600;
// }

// .image-container {
//   margin-top: 1rem;
//   text-align: center;
// }

// .instruction-image {
//   width: 100%;
//   max-width: 28rem;
//   margin: 0 auto;
//   border: 1px solid #d1d5db;
//   border-radius: 0.5rem;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
// }

// .image-caption {
//   text-align: center;
//   font-size: 0.875rem;
//   color: #6b7280;
//   margin-top: 0.5rem;
// }

// .final-section {
//   background-color: #f0fdf4;
//   border-color: #bbf7d0;
// }

// .white-bg {
//   background-color: white;
// }

// .code-block {
//   background-color: #1f2937;
//   color: #4ade80;
//   padding: 1rem;
//   border-radius: 0.5rem;
//   font-family: monospace;
//   font-size: 0.875rem;
//   margin-top: 1rem;
//   margin-bottom: 1rem;
// }

// .info-text {
//   margin-top: 1rem;
//   color: #4b5563;
//   font-size: 0.875rem;
// }

// .notes-container {
//   margin-top: 2rem;
//   padding: 1.5rem;
//   background-color: #dbeafe;
//   border: 1px solid #93c5fd;
//   border-radius: 0.5rem;
// }

// .notes-title {
//   font-size: 1.125rem;
//   font-weight: 600;
//   color: #1e40af;
//   margin-bottom: 0.75rem;
// }

// .notes-list {
//   list-style-type: disc;
//   list-style-position: inside;
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;
//   color: #1e40af;
// }

// /* Responsive Design */
// @media (max-width: 768px) {
//   .app-password-container {
//     padding: 1rem;
//     margin: 0.5rem;
//   }

//   .section-container {
//     padding: 1rem;
//   }

//   .app-password-title {
//     font-size: 1.5rem;
//   }

//   .section-title {
//     font-size: 1.125rem;
//   }
// }

// @media (max-width: 480px) {
//   .instruction-image {
//     max-width: 100%;
//   }

//   .code-block {
//     font-size: 0.75rem;
//     padding: 0.75rem;
//   }
// }
//       `}</style>
//     </div>
//   );
// };

// export default CreateAppPassword;


// CreateAppPassword.jsx
import React from 'react';

const CreateAppPassword = () => {
  return (
    <div className="notes-container">
      <div className="notes-header">
        <h1>Creating App Password for User Registration Emails</h1>
        <p>Complete guide to set up Google App Password for sending emails from your Node.js application</p>
      </div>



      {/* Section 1.1 */}
      <div className="step-card">
        <h3>1.1. Open Chrome and Login to Google</h3>
        <div className="content-box">
          <ul className="instruction-list">
            <li>Open Google Chrome browser</li>
            <li>Login to your Gmail account if not already logged in</li>
            <li>Click on your Profile picture in the top right corner</li>
          </ul>
        </div>
        <div className="image-placeholder">
          <div className="image-container">
            <img
              src="/chrome-profile.png"
              alt="Google Chrome profile selection"
              className="step-image"
            />
          </div>
          <p className="image-caption">
            Image: Google Chrome profile selection screen
          </p>
        </div>
      </div>

      {/* Section 1.2 */}
      <div className="step-card">
        <h3>1.2. Search for 2-Step Verification</h3>
        <div className="content-box">
          <ul className="instruction-list">
            <li>Navigate to your Google Account page</li>
            <li>In the search bar, type "2 step verification"</li>
            <li>Select the 2-Step Verification option from search results</li>
          </ul>
        </div>
        <div className="image-placeholder">
          <div className="image-container">
            <img
              src="/2step-search.png"
              alt="Search for 2-step verification"
              className="step-image"
            />
          </div>
          <p className="image-caption">
            Image: Google Account search bar with "2 step verification"
          </p>
        </div>
      </div>

      {/* Section 1.3 */}
      <div className="step-card">
        <h3>1.3. Select the Highlighted Option</h3>
        <div className="content-box">
          <ul className="instruction-list">
            <li>Navigate to the 2-Step Verification section</li>
            <li>Select the appropriate option to proceed with setup</li>
          </ul>
        </div>
        <div className="image-placeholder">
          <div className="image-container">
            <img
              src="/2step-option.png"
              alt="2-Step Verification option"
              className="step-image"
            />
          </div>
          <p className="image-caption">
            Image: 2-Step Verification option highlighted
          </p>
        </div>
      </div>

      {/* Section 1.4 */}
      <div className="step-card">
        <h3>1.4. Turn on 2-Step Verification</h3>
        <div className="content-box">
          <ul className="instruction-list">
            <li>Click on "Turn on 2-Step Verification" button</li>
            <li>Follow the prompts to set up 2-step verification</li>
            <li>Complete the verification process</li>
          </ul>
        </div>
        <div className="image-placeholder">
          <div className="image-container">
            <img
              src="/turn-on-2step.png"
              alt="Turn on 2-step verification"
              className="step-image"
            />
          </div>
          <p className="image-caption">
            Image: 2-Step Verification page with "Turn on" button
          </p>
        </div>
      </div>

      {/* Section 1.5 */}
      <div className="step-card">
        <h3>1.5. Return to Previous Screen</h3>
        <div className="content-box">
          <ul className="instruction-list">
            <li>After successfully enabling 2-step verification</li>
            <li>Click the back button to return to main security settings</li>
          </ul>
        </div>
        <div className="image-placeholder">
          <div className="image-container">
            <img
              src="/2step-enabled.png"
              alt="2-Step Verification enabled"
              className="step-image"
            />
          </div>
          <p className="image-caption">
            Image: 2-Step Verification enabled confirmation screen
          </p>
        </div>
      </div>

      {/* Section 1.6 */}
      <div className="step-card">
        <h3>1.6. Search for App Passwords</h3>
        <div className="content-box">
          <ul className="instruction-list">
            <li>In the search bar, type "App Passwords"</li>
            <li>Click on the first option in search results</li>
          </ul>
        </div>
        <div className="image-placeholder">
          <div className="image-container">
            <img
              src="/app-passwords-search.png"
              alt="Search for App Passwords"
              className="step-image"
            />
          </div>
          <p className="image-caption">
            Image: Search for "App Passwords" in Google Account
          </p>
        </div>
      </div>

      {/* Section 1.7 */}
      <div className="step-card">
        <h3>1.7. Create App Password</h3>
        <div className="content-box">
          <ul className="instruction-list">
            <li>Click on "Create App Password" or similar option</li>
            <li>Give a name to your app (e.g., "Email Service", "NodeJS App")</li>
            <li>Click on "Create" button</li>
          </ul>
        </div>
        <div className="image-placeholder">
          <div className="image-container">
            <img
              src="/create-app-password.png"
              alt="Create App Password"
              className="step-image"
            />
          </div>
          <p className="image-caption">
            Image: App password creation screen with name input field
          </p>
        </div>
      </div>

      {/* Section 1.8 */}
      <div className="step-card">
        <h3>1.8. Copy Generated Password</h3>
        <div className="content-box">
          <ul className="instruction-list">
            <li>Google will generate a 16-character app password</li>
            <li>Take screenshot or picture of this password in mobile</li>
            <li>Copy this password immediately</li>
            <li className="important-text">Important: This password will only be displayed once!</li>
          </ul>
        </div>
        <div className="image-placeholder">
          <div className="image-container">
            <img
              src="/generated-password.png"
              alt="Generated App Password"
              className="step-image"
            />
          </div>
          <p className="image-caption">
            Image: Generated app password screen with copy option
          </p>
        </div>
      </div>

      {/* Section 1.9 */}
      <div className="step-card final-section">
        <h3>1.9. Configure Environment Variables</h3>
        <div className="content-box white-bg">
          <ul className="instruction-list">
            <li>Paste the copied app password in your <code>.env</code> file</li>
            <li>Add your email address in the same <code>.env</code> file</li>
          </ul>
          <div className="code-block">
            <code>
              EMAIL=youremail@gmail.com<br />
              EMAIL_PASSWORD=your-generated-app-password
            </code>
          </div>
          <div className="image-placeholder">
            <div className="image-container">
              <img
                src="/env-file.png"
                alt="Environment File Configuration"
                className="step-image"
              />
            </div>
            <p className="image-caption">
              Image: .env file configuration example
            </p>
          </div>
          <p className="info-text">
            This setup enables your Node.js application to send emails to users after registration using Nodemailer with Gmail's SMTP service.
          </p>
        </div>
      </div>

      {/* Important Notes */}
      <div className="step-card">
        <h3>📝 Important Notes:</h3>
        <ul className="notes-list">
          <li>App passwords are required when 2-Step Verification is enabled</li>
          <li>Each app should have its own unique app password</li>
          <li>Keep your app passwords secure and don't share them</li>
          <li>You can revoke app passwords anytime from your Google Account</li>
          <li>This password is different from your regular Gmail password</li>
        </ul>
      </div>

     
      {/* Homework Section */}
      <div className="home-work">
        <h2>🧠 Home Work - Revision</h2>
        {/* <div className="step-card">
          <h4>Practice Exercise:</h4>
          <ul className="instruction-list">
            <li>Create a new Gmail account specifically for testing purposes</li>
            <li>Follow all the steps above to generate an app password for this test account</li>
            <li>Set up the environment variables in a test project</li>
            <li>Test email functionality by sending a test email from your Node.js application</li>
            <li>Practice revoking and regenerating app passwords to understand the process</li>
          </ul>

        </div> */}
      </div>

       <div className="company-info">
        <h2>LIGAND SOFTWARE SOLUTIONS</h2>
        <p>Your Launchpad To Tech Success</p>
        <p>Happy Coding!!!!!</p>
        <p>Sankeshwar</p>
        <p>8722585715</p>
        <p>www.ligandsoftware.com</p>
      </div>

      <div className="notes-footer">
        <p>Join us for Programming, Coding, Project Training and Internship opportunities.</p>
        <p>Let's learn, code and build together.</p>
      </div>
      

      <style>{`
      .notes-container {
        max-width: 1500px;
        margin: 0 auto;
        padding: 20px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        color: #333;
      }

      .notes-header {
        text-align: center;
        margin-bottom: 30px;
        padding-bottom: 20px;
        border-bottom: 2px solid #eaeaea;
      }

      .notes-header h1 {
        color: #2c3e50;
        margin-bottom: 10px;
        font-size: 2.5rem;
      }

      .notes-header p {
        color: #7f8c8d;
        font-size: 1.2rem;
      }

      .company-info {
        background-color: #f8f9fa;
        padding: 20px;
        border-radius: 8px;
        margin-bottom: 30px;
        text-align: center;
      }

      .company-info h2 {
        color: #3498db;
        margin-bottom: 10px;
      }

      .steps-container {
        display: flex;
        flex-direction: column;
        gap: 25px;
      }

      .step-card {
        background-color: white;
        border-radius: 8px;
        padding: 25px;
        box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s ease;
        border-left: 5px solid #3498db;
      }

      .step-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      }

      .step-card h3 {
        color: #2c3e50;
        margin-bottom: 15px;
        padding-bottom: 10px;
        border-bottom: 1px solid #eaeaea;
        font-size: 1.5rem;
      }

      .step-card h4 {
        color: #3498db;
        margin: 20px 0 10px 0;
        font-size: 1.2rem;
      }

      .content-box {
        background-color: #f8f9fa;
        padding: 20px;
        border-radius: 6px;
        margin-bottom: 15px;
        border-left: 4px solid #3498db;
      }

      .instruction-list {
        list-style-type: disc;
        list-style-position: inside;
        display: flex;
        flex-direction: column;
        gap: 8px;
        color: #374151;
        font-size: 1.1rem;
      }

      .important-text {
        color: #dc2626;
        font-weight: 600;
      }

      .notes-list {
        list-style-type: disc;
        list-style-position: inside;
        display: flex;
        flex-direction: column;
        gap: 8px;
        color: #1e40af;
        font-size: 1.1rem;
      }

      .code-block {
        position: relative;
        background-color: #2d2d2d;
        color: #f8f8f2;
        padding: 20px;
        border-radius: 6px;
        margin: 15px 0;
        overflow-x: auto;
        font-family: 'Consolas', 'Monaco', monospace;
      }

      .code-block code {
        font-family: 'Consolas', 'Monaco', monospace;
        font-size: 1rem;
        line-height: 1.5;
      }

      .copy-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: #3498db;
        color: white;
        border: none;
        padding: 8px 15px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.9rem;
        transition: background-color 0.2s;
      }

      .copy-btn:hover {
        background-color: #2980b9;
      }

      .copy-btn.copied {
        background-color: #27ae60;
      }

      .image-placeholder {
        margin: 20px 0;
        text-align: center;
      }

      .image-container {
        margin-top: 10px;
        padding: 0;
        background-color: transparent;
        border: none;
        border-radius: 8px;
        overflow: hidden;
      }

      .step-image {
        width: 100%;
        max-width: 100%;
        height: auto;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        border: 2px solid #e0e0e0;
      }

      .image-caption {
        margin-top: 10px;
        font-style: italic;
        color: #666;
        font-size: 0.95rem;
      }

      .final-section {
        background-color: #f0fdf4;
        border-left-color: #10b981;
      }

      .white-bg {
        background-color: white;
      }

      .info-text {
        margin-top: 15px;
        color: #4b5563;
        font-size: 1rem;
        font-style: italic;
      }

      .notes-footer {
        margin-top: 40px;
        padding-top: 20px;
        border-top: 2px solid #eaeaea;
        text-align: center;
        color: #7f8c8d;
        font-size: 1.1rem;
      }

      .home-work {
        margin-top: 30px;
      }

      .home-work h2 {
        margin-bottom: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        text-align: center;
        font-size: 1.5rem;
      }

      @media (max-width: 768px) {
        .notes-container {
          padding: 15px;
        }
        
        .step-card {
          padding: 20px;
        }
        
        .notes-header h1 {
          font-size: 2rem;
        }
        
        .instruction-list {
          font-size: 1rem;
        }
      }

      @media (max-width: 480px) {
        .notes-container {
          padding: 10px;
        }
        
        .step-card {
          padding: 15px;
        }
        
        .code-block {
          padding: 15px;
          font-size: 0.9rem;
        }
        
        .home-work h2 {
          font-size: 1.3rem;
          padding: 10px 15px;
        }
      }
      `}</style>
    </div>
  );
};

export default CreateAppPassword;