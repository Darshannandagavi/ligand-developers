import React, { useState } from "react";

const VsCodeNodeInstallation = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const vsCodeSteps = [
    {
      title: "Step 1: Download VS Code",
      content: "Open a browser and go to the official Visual Studio Code website: https://code.visualstudio.com/",
      subContent: "Click on the 'Download for Windows' button.",
      image: "/vscode-download.png",
    },
    {
      title: "Step 2: Accept the License Agreement",
      content: "When the installer opens, read the License Agreement and check the box 'I accept the agreement.'",
      subContent: "Click Next to continue.",
      image: "/vscode-license.png",
    },
    {
      title: "Step 3: Select Additional Tasks",
      content: "Check the boxes for additional options like:",
      listItems: [
        "Create a desktop icon.",
        "Add 'Open with Code' action to the context menu.",
        "Register VS Code as the default text editor (optional)."
      ],
      subContent: "Click Next to continue.",
      image: "/vscode-tasks.png",
    },
    {
      title: "Step 4: Begin Installation",
      content: "Click the Install button to start the installation process.",
      image: "/vscode-install.png",
    },
    {
      title: "Step 5: Finish Installation",
      content: "Once the installation is complete, check the box 'Launch Visual Studio Code' and click Finish.",
      image: "/vscode-finish.png",
    },
    {
      title: "Step 6: Verify Installation",
      content: "VS Code will open. Verify the installation by checking the default Welcome screen.",
      image: "/vscode-welcome.png",
    },
  ];

  const vsCodeExtensions = [
    {
      title: "Install ES7+ or ES7",
      content: "This extension provides many useful code snippets for React, Redux, and GraphQL development. It allows you to quickly create class components, functional components, and more.",
      command: "Search for: ES7 React/Redux/GraphQL/React-Native snippets",
      image: "/es7-extension.png",
    },
    {
      title: "Install Prettier",
      content: "Prettier is an opinionated code formatter that ensures consistent code style across your project.",
      command: "Search for: Prettier - Code formatter",
      image: "/prettier-extension.png",
    },
  ];

  const vsCodeSettings = [
    {
      title: "How to configure Autosave",
      content: "To enable auto-save feature in VS Code:",
      steps: [
        "Go to File ",
        "In menu  enable 'Auto Save'",
      ],
      image: "/vscode-autosave.png",
    },
    
  ];

  const nodejsSteps = [
    {
      title: "Step 1: Download Node.js",
      content: "Go to the official Node.js website: https://nodejs.org/",
      subContent: "Choose the LTS (Long-Term Support) version for stability and click 'Download' for Windows.",
      image: "/nodejs-download.png",
    },
    {
      title: "Step 2: Run the Installer",
      content: "Open the .msi file from your Downloads folder by double-clicking it.",
      subContent: "This will start the Node.js setup wizard.",
      image: "/nodejs-installer.png",
    },
    {
      title: "Step 3: Accept the License Agreement",
      content: "Check the box 'I accept the terms in the License Agreement' and click Next.",
      image: "/nodejs-license.png",
    },
    {
      title: "Step 4: Choose Installation Location",
      content: "Use the default installation path or select a different folder if needed.",
      subContent: "Click Next to proceed.",
      image: "/nodejs-location.png",
    },
    {
      title: "Step 5: Select Features",
      content: "Leave the default features (Node.js runtime, npm, etc.) checked.",
      subContent: "Click Next to continue.",
      image: "/nodejs-features.png",
    },
    {
      title: "Step 6: Begin Installation",
      content: "Click the Install button to start the process.",
      subContent: "If prompted, allow administrative permissions.",
      image: "/nodejs-install.png",
    },
    {
      title: "Step 7: Complete Installation",
      content: "When the setup is finished, click Finish.",
      image: "/nodejs-complete.png",
    },
    {
      title: "Step 8: Verify the Installation",
      content: "Open Command Prompt or PowerShell and run the following commands:",
      code: `node -v  # Displays the installed Node.js version
npm -v   # Displays the installed npm version`,
      image: "/nodejs-verify.png",
    },
  ];

  const mongodbSteps = [
    {
      title: "Step 1: Create an Account",
      content: "Go to the official MongoDB Atlas website: https://www.mongodb.com/cloud/atlas/register",
      subContent: "Click on 'Sign up with Google' and fill in your details to create an account.",
      image: "/mongodb-signup.png",
    },
    {
      title: "Step 2: Choose Google Account",
      content: "Select your Google account to sign up with MongoDB Atlas.",
      image: "/mongodb-google.png",
    },
    {
      title: "Step 3: Accept Privacy Policy",
      content: "Accept privacy policy and terms and click on Submit.",
      image: "/mongodb-policy.png",
    },
    {
      title: "Step 4: Fill Details",
      content: "Fill your details accordingly and select your role.",
      image: "/mongodb-details.png",
    },
    {
      title: "Step 5: Create Free Cluster",
      content: "Select free cluster and click on 'Create Deployment'.",
      image: "/mongodb-cluster.png",
    },
    {
      title: "Step 6: Create Database User",
      content: "Create a database user with username and password.",
      note: "Important: Remember this password or copy it and store it somewhere safe!",
      image: "/mongodb-user.png",
    },
    {
      title: "Step 7: Choose Connection Method",
      content: "Click on 'Choose a Connection Method'.",
      image: "/mongodb-connect.png",
    },
    {
      title: "Step 8: Click on Drivers",
      content: "Select 'Drivers' connection method for Node.js.",
      image: "/mongodb-drivers.png",
    },
    {
      title: "Step 9: Copy Connection String",
      content: "Copy the connection URL - you will need this later for your server's .env file.",
      code: `mongodb+srv://username:password@cluster0.mongodb.net/your-database?retryWrites=true&w=majority`,
      note: "Save this connection string - you'll paste it in your .env file in the server setup.",
      image: "/mongodb-connection-string.png",
    },
    {
      title: "Step 10: View Sample Collections",
      content: "Once configured, you'll see your cluster dashboard with sample collections.",
      image: "/mongodb-dashboard.png",
    },
  ];

  const settingsCode = `{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000,
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "prettier.singleQuote": true,
  "prettier.trailingComma": "es5",
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  }
}`;

  return (
    <div className="installation-container">
      {/* Header */}
      <div className="header-section">
        <h1>Chapter 2: Installation Guide</h1>
        <p>Complete guide to installing VS Code, Node.js, and MongoDB Atlas</p>
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

      {/* Agenda */}
      <div className="agenda-card">
        <h2>Agenda</h2>
        <ul>
          <li>Introduction to VS Code and Node.js</li>
          <li>Downloading and installing VS Code</li>
          <li>Setting up extensions and configurations in VS Code</li>
          <li>Downloading and installing Node.js</li>
          <li>Verifying Node.js and npm installation</li>
          <li>Running JavaScript code using Node.js</li>
          <li>Installing and managing npm packages</li>
          <li>Writing and executing a basic script in VS Code</li>
          <li>Debugging JavaScript in VS Code</li>
          <li>Testing the setup with a sample project</li>
          <li>Troubleshooting common installation issues</li>
          <li>Creating a Free MongoDB Atlas Cluster</li>
        </ul>
      </div>

      {/* Part 1: VS Code Installation */}
      <div className="section-header">
        <h2>1. How to Install VS Code on Windows</h2>
      </div>

      <div className="intro-card">
        <h3>What is Visual Studio Code (VS Code)?</h3>
        <p>
          Visual Studio Code (VS Code) is a free, lightweight, and powerful source code editor 
          developed by Microsoft. It is designed for writing and managing code in various 
          programming languages. VS Code is widely popular among developers due to its 
          versatility, customization options, and extensions.
        </p>
      </div>

      <div className="steps-container">
        {vsCodeSteps.map((step, index) => (
          <div key={index} className="step-card">
            <h3>{step.title}</h3>
            <p>{step.content}</p>
            {step.subContent && <p className="sub-content">{step.subContent}</p>}
            {step.listItems && (
              <ul className="step-list">
                {step.listItems.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
            {step.image && (
              <div className="image-container">
                <img src={step.image} alt={step.title} className="step-image" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* VS Code Extensions */}
      <div className="section-header">
        <h2>Step 7: Install Necessary Extensions</h2>
      </div>

      <div className="steps-container">
        {vsCodeExtensions.map((extension, index) => (
          <div key={index} className="step-card">
            <h3>{extension.title}</h3>
            <p>{extension.content}</p>
            <div className="code-block">
              <code>{extension.command}</code>
            </div>
            {extension.image && (
              <div className="image-container">
                <img src={extension.image} alt={extension.title} className="step-image" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* VS Code Settings */}
      <div className="section-header">
        <h2>VS Code Settings Configuration</h2>
      </div>

      <div className="steps-container">
        {vsCodeSettings.map((setting, index) => (
          <div key={index} className="step-card">
            <h3>{setting.title}</h3>
            <p>{setting.content}</p>
            {setting.steps && (
              <ol className="step-list">
                {setting.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            )}
            {setting.image && (
              <div className="image-container">
                <img src={setting.image} alt={setting.title} className="step-image" />
              </div>
            )}
          </div>
        ))}
      </div>


      {/* Part 2: Node.js Installation */}
      <div className="section-header">
        <h2>2. How to Install Node.js on Windows</h2>
      </div>

      <div className="intro-card">
        <h3>What is Node.js?</h3>
        <p>
          Node.js is a JavaScript runtime environment that lets you run JavaScript on the 
          server side. It allows developers to build scalable and efficient applications, 
          such as web servers, APIs, and more.
        </p>
      </div>

      <div className="steps-container">
        {nodejsSteps.map((step, index) => (
          <div key={index} className="step-card">
            <h3>{step.title}</h3>
            <p>{step.content}</p>
            {step.subContent && <p className="sub-content">{step.subContent}</p>}
            {step.code && (
              <div className="code-block">
                <pre>{step.code}</pre>
                <button
                  className={`copy-btn ${copiedIndex === `nodejs-${index}` ? 'copied' : ''}`}
                  onClick={() => copyToClipboard(step.code, `nodejs-${index}`)}
                >
                  {copiedIndex === `nodejs-${index}` ? 'Copied!' : 'Copy'}
                </button>
              </div>
            )}
            {step.note && (
              <div className="note-box">
                <p><strong>Note:</strong> {step.note}</p>
              </div>
            )}
            {step.image && (
              <div className="image-container">
                <img src={step.image} alt={step.title} className="step-image" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Part 3: MongoDB Atlas Setup */}
      <div className="section-header">
        <h2>3. Steps to Create a Free Cluster in MongoDB Atlas</h2>
      </div>

      <div className="intro-card">
        <h3>What is MongoDB Atlas?</h3>
        <p>
          MongoDB Atlas is a cloud database service that provides a fully managed MongoDB 
          environment, allowing developers to store, manage, and access data in the cloud. 
          The free tier offers a shared cluster suitable for learning and small projects.
        </p>
      </div>

      <div className="steps-container">
        {mongodbSteps.map((step, index) => (
          <div key={index} className="step-card">
            <h3>{step.title}</h3>
            <p>{step.content}</p>
            {step.subContent && <p className="sub-content">{step.subContent}</p>}
            {step.code && (
              <div className="code-block">
                <pre>{step.code}</pre>
                <button
                  className={`copy-btn ${copiedIndex === `mongodb-${index}` ? 'copied' : ''}`}
                  onClick={() => copyToClipboard(step.code, `mongodb-${index}`)}
                >
                  {copiedIndex === `mongodb-${index}` ? 'Copied!' : 'Copy'}
                </button>
              </div>
            )}
            {step.note && (
              <div className="note-box">
                <p><strong>Note:</strong> {step.note}</p>
              </div>
            )}
            {step.listItems && (
              <ul className="step-list">
                {step.listItems.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
            {step.image && (
              <div className="image-container">
                <img src={step.image} alt={step.title} className="step-image" />
              </div>
            )}
          </div>
        ))}
      </div>

     
      {/* Footer */}
      <div className="footer-section">
        <div className="congratulations">
          <h2>Congratulations! 🎉</h2>
          <p>You have successfully completed the installation guide!</p>
          <h3>Every professional developer once installed these tools for the first time.</h3>
        </div>
        
        <div className="notes-footer">
          <p>
            Join us for Programming, Coding, Project Training and Internship opportunities.
          </p>
          <p>Let's learn, code and build together.</p>
          <p className="copyright">© 2022-2023 Ligand Software Solutions</p>
        </div>
      </div>

      <style jsx>{`
        .installation-container {
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

        .agenda-card {
          background-color: #f8f9fa;
          border-radius: 8px;
          padding: 25px;
          margin-bottom: 40px;
          border-left: 4px solid #2ecc71;
        }

        .agenda-card h2 {
          color: #2c3e50;
          margin-bottom: 20px;
        }

        .agenda-card ul {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 10px;
          padding-left: 20px;
        }

        .agenda-card li {
          margin-bottom: 8px;
          color: #34495e;
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

        .intro-card {
          background-color: #e8f4fc;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 25px;
          border-left: 4px solid #3498db;
        }

        .intro-card h3 {
          color: #2c3e50;
          margin-top: 0;
        }

        .intro-card p {
          color: #34495e;
          line-height: 1.7;
        }

        .steps-container {
          display: flex;
          flex-direction: column;
          gap: 25px;
          margin-bottom: 40px;
        }

        .step-card {
          background-color: white;
          border-radius: 8px;
          padding: 25px;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
          border-left: 4px solid #3498db;
          transition: transform 0.2s ease;
        }

        .step-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .step-card h3 {
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 15px;
          font-size: 1.3rem;
        }

        .step-card p {
          color: #34495e;
          margin-bottom: 10px;
          line-height: 1.6;
        }

        .sub-content {
          color: #7f8c8d !important;
          font-style: italic;
        }

        .step-list {
          margin: 15px 0;
          padding-left: 20px;
        }

        .step-list li {
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
          margin: 0;
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
        }

        .copy-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: #4a5568;
          color: white;
          border: none;
          padding: 8px 15px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          transition: background-color 0.2s;
        }

        .copy-btn:hover {
          background-color: #2d3748;
        }

        .copy-btn.copied {
          background-color: #38a169;
        }

        .image-container {
          margin: 20px 0;
          border-radius: 6px;
          overflow: hidden;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
        }

        .step-image {
          width: 100%;
          height: auto;
          display: block;
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
          background-color: #f0f9ff;
          border-radius: 10px;
          padding: 30px;
          border: 2px dashed #3498db;
        }

        .homework-card h3 {
          color: #2c3e50;
          margin-top: 20px;
          margin-bottom: 10px;
        }

        .homework-card ol {
          padding-left: 20px;
        }

        .homework-card li {
          margin-bottom: 8px;
          color: #34495e;
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

        .copyright {
          font-size: 0.9rem;
          color: #95a5a6 !important;
        }

        @media (max-width: 768px) {
          .installation-container {
            padding: 15px;
          }
          
          .header-section h1 {
            font-size: 2rem;
          }
          
          .agenda-card ul {
            grid-template-columns: 1fr;
          }
          
          .step-card {
            padding: 20px;
          }
          
          .homework-card {
            padding: 20px;
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
        }
      `}</style>
    </div>
  );
};

export default VsCodeNodeInstallation;