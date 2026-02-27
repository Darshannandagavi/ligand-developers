
import React, { useState } from "react";
import "./MyNotes.css";

const ItemFrontend = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const steps = [
    // ... (your existing steps remain the same)
    {
      title: "Complete Item Frontend Component",
      content:
        "Below is the complete code for the item management frontend component:",
      explanation:
        "This component provides a complete CRUD interface for managing items with image uploads, including form handling, API communication, and a responsive table display.",
      code: `import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  Table,
  Button,
  Container,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import { MdEdit, MdDelete } from "react-icons/md";

const Items = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [itemData, setItemData] = useState({
    itemName: "",
    quantity: "",
    description: "",
    category: "",
    itemImage: null,
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [itemId, setItemId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await axios.get("http://localhost:8000/item");
    setItems(response.data.items);
    console.log(response.data);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "itemImage") {
      setItemData({ ...itemData, itemImage: files[0] });
    } else {
      setItemData({ ...itemData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(itemData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      let response;
      if (isEditMode) {
        response = await axios.put(
          \`http://localhost:8000/item/\${itemId}\`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        response = await axios.post("http://localhost:8000/item", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      if (response.status === 200 || response.status === 201) {
        fetchItems();
        setItemData({
          itemName: "",
          quantity: "",
          description: "",
          category: "",
          itemImage: null,
        });
        setIsEditMode(false);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleEdit = (item) => {
    setItemData({
      itemName: item.itemName,
      quantity: item.quantity,
      description: item.description,
      category: item.category._id,
      itemImage: null,
    });
    setItemId(item._id);
    setIsEditMode(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Do you really want to delete this item?"
    );
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(\`hhttp://localhost:8000/item/\${id}\`);
      setItems(items.filter((item) => item._id !== id));
      alert(res.data.message);
    } catch (error) {
      alert(error.response.data.message);
      console.error("Error deleting item:", error);
    }
  };

  return (
    <Container className="mt-5">
      <h2>{isEditMode ? "Edit Item" : "Add Item"}</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type="text"
                name="itemName"
                value={itemData.itemName}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={itemData.quantity}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={itemData.category}
                onChange={handleChange}
                required
                placeholder="Enter category name"
              />
            </Form.Group>
          </Col>

          <Col sm={6}>
            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="itemImage"
                onChange={handleChange}
                accept="image/*"
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={itemData.description}
            onChange={handleChange}
            rows={3}
          />
        </Form.Group>

        <Button className="mt-3" type="submit">
          {isEditMode ? "Update Item" : "Add Item"}
        </Button>
      </Form>

      <h3 className="mt-5">Item List</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.itemName}</td>
              <td>{item.quantity}</td>
              <td>{item.category}</td>

              <td>
                <img
                  src={\`http://localhost:8000/uploads/\${item.itemImage}\`}
                  alt={item.itemName}
                  width="50"
                />
              </td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(item)}>
                  <MdEdit />
                </Button>{" "}
                <Button variant="danger" onClick={() => handleDelete(item._id)}>
                  <MdDelete />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Items;`,
      image: "/item-frontend-complete.png",
    },
  ];

  return (
    <div className="notes-container">
      <div className="notes-header">
        <h1>Item Frontend Guide</h1>
        <p>
          Follow these steps to create a complete item management interface with
          React
        </p>
      </div>

      <div className="company-info">
        <h2>LIGAND SOFTWARE SOLUTIONS</h2>
        <p>Your Launchpad To Tech Success</p>
        <p>Happy Coding!!!!!</p>
        <p>Sankeshwar</p>
        <p>8722585715</p>
        <p>www.ligandsoftware.com</p>
      </div>

      <div className="reference-item">
        <div className="image-container">
          <img src="/homeWork/Itemfilepath.png" alt="Item file path" />
        </div>
        <p>Employee Table Design</p>
      </div>

      <div className="steps-container">
        {steps.map((step, index) => (
          <div key={index} className="step-card">
            <h3>{step.title}</h3>
            <p>{step.content}</p>

            {step.explanation && (
              <div className="explanation-box">
                <h4>Explanation:</h4>
                <p>{step.explanation}</p>
              </div>
            )}

            {step.breakdown && (
              <div className="breakdown-list">
                <h4>Breakdown:</h4>
                {Array.isArray(step.breakdown) ? (
                  <ul>
                    {step.breakdown.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{step.breakdown}</p>
                )}
              </div>
            )}

            {step.command && (
              <div className="code-block">
                <code>{step.command}</code>
                <button
                  className={`copy-btn ${
                    copiedIndex === index ? "copied" : ""
                  }`}
                  onClick={() => copyToClipboard(step.command, index)}
                >
                  {copiedIndex === index ? "Copied!" : "Copy"}
                </button>
              </div>
            )}

            {step.code && (
              <div className="code-block">
                <pre>{step.code}</pre>
                <button
                  className={`copy-btn ${
                    copiedIndex === index ? "copied" : ""
                  }`}
                  onClick={() => copyToClipboard(step.code, index)}
                >
                  {copiedIndex === index ? "Copied!" : "Copy"}
                </button>
              </div>
            )}

            {step.image && (
              <div className="image-placeholder">
                <div className="image-container">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="step-image"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Detailed Code Explanation Section */}
      <div className="code-explanation-section">
        <h2 className="section-title">📝 Detailed Code Explanation</h2>
        
        <div className="explanation-card">
          <h3>1. Import Statements</h3>
          <div className="code-snippet">
            <pre>{`import React, { useEffect, useState } from "react";
import { Row, Col, Form, Table, Button, Container } from "react-bootstrap";
import axios from "axios";
import { MdEdit, MdDelete } from "react-icons/md";`}</pre>
          </div>
          <ul className="explanation-list">
            <li><strong>React, useEffect, useState:</strong> Core React hooks for state management and side effects</li>
            <li><strong>react-bootstrap components:</strong> Pre-built UI components for responsive layout</li>
            <li><strong>axios:</strong> HTTP client for making API requests</li>
            <li><strong>react-icons/md:</strong> Material Design icons for edit and delete buttons</li>
          </ul>
        </div>

        <div className="explanation-card">
          <h3>2. State Variables</h3>
          <div className="code-snippet">
            <pre>{`const [items, setItems] = useState([]);
const [categories, setCategories] = useState([]);
const [itemData, setItemData] = useState({
  itemName: "",
  quantity: "",
  description: "",
  category: "",
  itemImage: null,
});
const [isEditMode, setIsEditMode] = useState(false);
const [itemId, setItemId] = useState(null);`}</pre>
          </div>
          <table className="explanation-table">
            <thead>
              <tr>
                <th>State Variable</th>
                <th>Purpose</th>
                <th>Initial Value</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>items</td><td>Stores all items from API</td><td>[]</td></tr>
              <tr><td>categories</td><td>Stores categories (future use)</td><td>[]</td></tr>
              <tr><td>itemData</td><td>Form data object</td><td>{`{itemName:"", quantity:"", ...}`}</td></tr>
              <tr><td>isEditMode</td><td>Toggles between add/edit mode</td><td>false</td></tr>
              <tr><td>itemId</td><td>Stores ID of item being edited</td><td>null</td></tr>
            </tbody>
          </table>
        </div>

        <div className="explanation-card">
          <h3>3. useEffect Hook - Initial Data Fetch</h3>
          <div className="code-snippet">
            <pre>{`useEffect(() => {
  fetchItems();
}, []);`}</pre>
          </div>
          <p><strong>Explanation:</strong> Empty dependency array [] means this runs once when component mounts. Calls fetchItems() to load initial data.</p>
        </div>

        <div className="explanation-card">
          <h3>4. fetchItems Function - API GET Request</h3>
          <div className="code-snippet">
            <pre>{`const fetchItems = async () => {
  const response = await axios.get("http://localhost:8000/item");
  setItems(response.data.items);
  console.log(response.data);
};`}</pre>
          </div>
          <ul className="explanation-list">
            <li><strong>async/await:</strong> Handles asynchronous API call</li>
            <li><strong>axios.get():</strong> Makes GET request to backend endpoint</li>
            <li><strong>setItems():</strong> Updates state with fetched data</li>
            <li><strong>console.log():</strong> Debugging - shows API response</li>
          </ul>
        </div>

        <div className="explanation-card">
          <h3>5. handleChange - Form Input Handler</h3>
          <div className="code-snippet">
            <pre>{`const handleChange = (e) => {
  const { name, value, files } = e.target;
  if (name === "itemImage") {
    setItemData({ ...itemData, itemImage: files[0] });
  } else {
    setItemData({ ...itemData, [name]: value });
  }
};`}</pre>
          </div>
          <ul className="explanation-list">
            <li><strong>Destructuring:</strong> Extracts name, value, files from event target</li>
            <li><strong>Conditional logic:</strong> Handles file inputs differently from text inputs</li>
            <li><strong>Spread operator (...):</strong> Preserves existing state while updating specific field</li>
            <li><strong>Computed property name [name]:</strong> Dynamically updates the correct field</li>
          </ul>
        </div>

        <div className="explanation-card">
          <h3>6. handleSubmit - Form Submission</h3>
          <div className="code-snippet">
            <pre>{`const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    Object.entries(itemData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    let response;
    if (isEditMode) {
      response = await axios.put(
        \`http://localhost:8000/item/\${itemId}\`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
    } else {
      response = await axios.post("http://localhost:8000/item", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    if (response.status === 200 || response.status === 201) {
      fetchItems();
      setItemData({
        itemName: "",
        quantity: "",
        description: "",
        category: "",
        itemImage: null,
      });
      setIsEditMode(false);
    }
  } catch (error) {
    alert(error.response.data.message);
  }
};`}</pre>
          </div>
          <h4>Step-by-step breakdown:</h4>
          <ol className="explanation-list">
            <li><strong>e.preventDefault():</strong> Prevents default form submission behavior</li>
            <li><strong>try-catch block:</strong> Error handling for API calls</li>
            <li><strong>FormData object:</strong> Required for file uploads (multipart/form-data)</li>
            <li><strong>Object.entries().forEach():</strong> Converts itemData object to FormData entries</li>
            <li><strong>Conditional PUT/POST:</strong> Uses PUT for edit mode, POST for new items</li>
            <li><strong>Template literal:</strong> Dynamically inserts itemId in URL for PUT request</li>
            <li><strong>Headers:</strong> Sets correct content type for file upload</li>
            <li><strong>Success handling:</strong> Refreshes list, resets form, exits edit mode on success</li>
            <li><strong>Error handling:</strong> Displays error message from backend</li>
          </ol>
        </div>

        <div className="explanation-card">
          <h3>7. handleEdit - Edit Button Handler</h3>
          <div className="code-snippet">
            <pre>{`const handleEdit = (item) => {
  setItemData({
    itemName: item.itemName,
    quantity: item.quantity,
    description: item.description,
    category: item.category._id,
    itemImage: null,
  });
  setItemId(item._id);
  setIsEditMode(true);
};`}</pre>
          </div>
          <ul className="explanation-list">
            <li><strong>Populates form:</strong> Sets itemData with selected item's values</li>
            <li><strong>Sets itemId:</strong> Stores ID for PUT request</li>
            <li><strong>Sets edit mode:</strong> Changes button text and behavior</li>
            <li><strong>Note:</strong> itemImage set to null (new image optional)</li>
          </ul>
        </div>

        <div className="explanation-card">
          <h3>8. handleDelete - Delete Button Handler</h3>
          <div className="code-snippet">
            <pre>{`const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Do you really want to delete this item?"
  );
  if (!confirmDelete) return;

  try {
    const res = await axios.delete(\`http://localhost:8000/item/\${id}\`);
    setItems(items.filter((item) => item._id !== id));
    alert(res.data.message);
  } catch (error) {
    alert(error.response.data.message);
    console.error("Error deleting item:", error);
  }
};`}</pre>
          </div>
          <ul className="explanation-list">
            <li><strong>Confirmation dialog:</strong> Prevents accidental deletions</li>
            <li><strong>Early return:</strong> Cancels delete if user cancels</li>
            <li><strong>DELETE request:</strong> Calls API with item ID in URL</li>
            <li><strong>filter():</strong> Removes deleted item from local state</li>
            <li><strong>Success message:</strong> Shows backend response message</li>
          </ul>
        </div>

        <div className="explanation-card">
          <h3>9. Render Method - JSX Structure</h3>
          <div className="code-snippet">
            <pre>{`return (
  <Container className="mt-5">
    <h2>{isEditMode ? "Edit Item" : "Add Item"}</h2>
    <Form onSubmit={handleSubmit}>
      {/* Form fields... */}
      <Button type="submit">
        {isEditMode ? "Update Item" : "Add Item"}
      </Button>
    </Form>

    <h3 className="mt-5">Item List</h3>
    <Table striped bordered hover>
      <thead>{/* Table headers */}</thead>
      <tbody>
        {items.map((item) => (
          <tr key={item._id}>
            <td>{item.itemName}</td>
            <td>{item.quantity}</td>
            <td>{item.category}</td>
            <td>
              <img 
                src={\`http://localhost:8000/uploads/\${item.itemImage}\`} 
                alt={item.itemName} 
                width="50" 
              />
            </td>
            <td>
              <Button variant="warning" onClick={() => handleEdit(item)}>
                <MdEdit />
              </Button>
              <Button variant="danger" onClick={() => handleDelete(item._id)}>
                <MdDelete />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </Container>
);`}</pre>
          </div>
          <h4>Key JSX Features:</h4>
          <table className="explanation-table">
            <thead>
              <tr>
                <th>Element</th>
                <th>Purpose</th>
                <th>Key Props</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Container</td><td>Bootstrap container with margin</td><td>className="mt-5"</td></tr>
              <tr><td>Form</td><td>Handles form submission</td><td>{"onSubmit={handleSubmit}"}</td></tr>
              <tr><td>Form.Control</td><td>Input fields</td><td>name, value, onChange, type</td></tr>
              <tr><td>Table</td><td>Displays items</td><td>striped, bordered, hover</td></tr>
              <tr><td>img</td><td>Shows item image</td><td>src with template literal</td></tr>
              <tr><td>Button</td><td>Action buttons</td><td>variant, onClick</td></tr>
            </tbody>
          </table>
        </div>

        <div className="explanation-card">
          <h3>10. Key Concepts Summary</h3>
          <div className="concepts-grid">
            <div className="concept-item">
              <h4>React Hooks Used:</h4>
              <ul>
                <li><strong>useState</strong> - Managing component state</li>
                <li><strong>useEffect</strong> - Side effects (data fetching)</li>
              </ul>
            </div>
            <div className="concept-item">
              <h4>CRUD Operations:</h4>
              <ul>
                <li><strong>CREATE</strong> - POST request</li>
                <li><strong>READ</strong> - GET request</li>
                <li><strong>UPDATE</strong> - PUT request</li>
                <li><strong>DELETE</strong> - DELETE request</li>
              </ul>
            </div>
            <div className="concept-item">
              <h4>File Upload Handling:</h4>
              <ul>
                <li>FormData object</li>
                <li>multipart/form-data header</li>
                <li>File input type</li>
              </ul>
            </div>
            <div className="concept-item">
              <h4>Error Handling:</h4>
              <ul>
                <li>try-catch blocks</li>
                <li>User confirmation dialogs</li>
                <li>Alert messages</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      
      {/* Homework Section */}
      <div className="home-work-section">
        <div className="home-work-card">
          <div className="home-work-header">
            <h2>🏠 Homework Assignment</h2>
            <div className="difficulty-badge">Intermediate Level</div>
          </div>

          <div className="home-work-content">
            <h3>Develop Employee Frontend CRUD Operations</h3>

            <div className="objective-section">
              <h4>🎯 Objective</h4>
              <p>
                Create a complete Employee frontend system with CRUD operations
                following the same patterns and structure as the Item frontend
                we just built. The employee system should handle employee data
                with image uploads and provide a professional user interface in
                different folder.
              </p>
            </div>

            <div className="requirements-section">
              <h4>📋 Requirements</h4>
              <ul>
                <li>Create Employee.jsx component with all CRUD operations</li>
                <li>
                  Include form fields: employeeName, position, department,
                  salary, email, phone, hireDate, address, employeeImage
                </li>
                <li>Implement form validation for all required fields</li>
                <li>Add image upload functionality for employee photos</li>
                <li>Create a responsive table to display employee data</li>
                <li>
                  Implement edit and delete functionality with confirmation
                  dialogs
                </li>
                <li>Add proper error handling and loading states</li>
                <li>Make the design responsive and user-friendly</li>
                <li>Connect with the Employee backend API endpoint</li>
              </ul>
            </div>

            <div className="video-section">
              <h4>📺 Video Tutorial</h4>
              <div style={{ margin: "35px 0" }}>
                <iframe
                  width="100%"
                  height="515"
                  src="https://www.youtube.com/embed/fh5xkzS58h0?si=5IUSV8cqLMGxmWAU"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ borderRadius: "8px" }}
                ></iframe>
              </div>
            </div>

            <div className="reference-section">
              <h4>📊 Expected Employee Form Output</h4>

              <div className="reference-grid">
                <div className="reference-item">
                  <div className="image-container">
                    <img
                      src="/homeWork/home_work_emp_fileds.png"
                      alt="Employee Form Design"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/400x300?text=Employee+Form+Design";
                      }}
                    />
                  </div>
                  <p>Employee Form Design</p>
                </div>

                <div className="reference-item">
                  <div className="image-container">
                    <img
                      src="/homeWork/home_work_emp_output.png"
                      alt="Employee Table Design"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/400x300?text=Employee+Table+Design";
                      }}
                    />
                  </div>
                  <p>Employee Table Design</p>
                </div>
              </div>
            </div>

            <div className="api-endpoints-section">
              <h4>🔌 API Endpoints Reference</h4>
              <div className="endpoints-table">
                <table>
                  <thead>
                    <tr>
                      <th>Method</th>
                      <th>Endpoint</th>
                      <th>Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span className="method-post">POST</span></td>
                      <td>/employee</td>
                      <td>Create new employee with image upload</td>
                    </tr>
                    <tr>
                      <td><span className="method-get">GET</span></td>
                      <td>/employee</td>
                      <td>Get all employees</td>
                    </tr>
                    <tr>
                      <td><span className="method-get">GET</span></td>
                      <td>/employee/:id</td>
                      <td>Get specific employee by ID</td>
                    </tr>
                    <tr>
                      <td><span className="method-put">PUT</span></td>
                      <td>/employee/:id</td>
                      <td>Update employee data</td>
                    </tr>
                    <tr>
                      <td><span className="method-delete">DELETE</span></td>
                      <td>/employee/:id</td>
                      <td>Delete employee</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bonus-section">
              <h4>⭐ Bonus Challenges</h4>
              <ul>
                <li>Add search/filter functionality to the employee table</li>
                <li>Implement pagination for large datasets</li>
                <li>Add form validation with error messages</li>
                <li>Create a department dropdown from API</li>
                <li>Add loading spinners during API calls</li>
              </ul>
            </div>

            <div className="submission-section">
              <h4>📤 Submission Guidelines</h4>
              <ul>
                <li>Create a new folder 'Employee' in your components directory</li>
                <li>Name your main component file as 'Employee.jsx'</li>
                <li>Ensure all CRUD operations work correctly</li>
                <li>Test with different data types and image uploads</li>
                <li>Add proper comments in your code</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="notes-footer">
        <p>
          Join us for Programming, Coding, Project Training and Internship
          opportunities.
        </p>
        <p>Let's learn, code and build together.</p>
      </div>

      <style jsx>{`
        /* Previous styles remain the same */
        .notes-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
          line-height: 1.6;
          color: #2d3748;
          background: white;
        }

        .notes-header {
          text-align: center;
          margin-bottom: 50px;
          padding: 50px 0;
          border-bottom: 1px solid #e2e8f0;
        }

        .notes-header h1 {
          font-size: 3rem;
          font-weight: 700;
          color: #1a202c;
          margin: 0 0 16px 0;
        }

        .notes-header p {
          font-size: 1.3rem;
          color: #718096;
          margin: 0;
          font-weight: 400;
        }

        .company-info {
          text-align: center;
          margin: 50px 0;
          padding: 30px;
          background: #f8fafc;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }

        .company-info h2 {
          font-size: 1.8rem;
          font-weight: 700;
          color: #2d3748;
          margin: 0 0 10px 0;
        }

        .company-info p {
          color: #4a5568;
          margin: 5px 0;
          font-size: 1.1rem;
        }

        .reference-item {
          background: #f8fafc;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          border: 1px solid #e2e8f0;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          margin: 20px 0;
        }

        .reference-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .reference-item .image-container {
          background: white;
          border-radius: 6px;
          padding: 15px;
          margin-bottom: 12px;
          border: 1px solid #e2e8f0;
        }

        .reference-item img {
          max-width: 100%;
          height: auto;
          border-radius: 4px;
        }

        .steps-container {
          margin-bottom: 50px;
        }

        .step-card {
          margin-bottom: 40px;
          padding: 30px;
          background: #f8fafc;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }

        .step-card h3 {
          font-size: 1.8rem;
          font-weight: 600;
          color: #2d3748;
          margin: 0 0 16px 0;
          padding-bottom: 12px;
          border-bottom: 2px solid #667eea;
        }

        .step-card p {
          color: #4a5568;
          margin-bottom: 16px;
          line-height: 1.7;
          font-size: 1.1rem;
        }

        .step-card h4 {
          font-size: 1.3rem;
          font-weight: 600;
          color: #2d3748;
          margin: 20px 0 12px 0;
        }

        .explanation-box,
        .breakdown-list {
          background: white;
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          margin: 16px 0;
        }

        .code-block {
          position: relative;
          background: #1a202c;
          border-radius: 8px;
          margin: 20px 0;
          overflow: hidden;
          border: 1px solid #2d3748;
        }

        .code-block pre {
          color: #e2e8f0;
          padding: 25px;
          margin: 0;
          overflow-x: auto;
          font-family: "Fira Code", "Consolas", monospace;
          font-size: 0.9rem;
          line-height: 1.5;
          max-height: 500px;
        }

        .code-block code {
          color: #e2e8f0;
          padding: 20px;
          display: block;
          overflow-x: auto;
          font-family: "Fira Code", "Consolas", monospace;
        }

        .copy-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #e2e8f0;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .copy-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .copy-btn.copied {
          background: #48bb78;
          color: white;
        }

        .image-placeholder {
          margin: 20px 0;
          background: #e2e8f0;
          border-radius: 8px;
          padding: 30px;
          text-align: center;
          border: 2px dashed #cbd5e0;
        }

        .image-container {
          background: white;
          border-radius: 6px;
          padding: 20px;
          display: inline-block;
        }

        .step-image {
          max-width: 100%;
          height: auto;
          border-radius: 6px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        /* Code Explanation Section Styles */
        .code-explanation-section {
          margin: 60px 0;
        }

        .section-title {
          font-size: 2.2rem;
          font-weight: 700;
          color: #2d3748;
          margin: 0 0 30px 0;
          padding-bottom: 15px;
          border-bottom: 3px solid #667eea;
          display: inline-block;
        }

        .explanation-card {
          background: white;
          border-radius: 12px;
          padding: 30px;
          margin-bottom: 30px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .explanation-card h3 {
          font-size: 1.6rem;
          font-weight: 600;
          color: #2d3748;
          margin: 0 0 20px 0;
          padding-bottom: 10px;
          border-bottom: 2px solid #667eea;
        }

        .explanation-card h4 {
          font-size: 1.2rem;
          font-weight: 600;
          color: #4a5568;
          margin: 20px 0 10px 0;
        }

        .code-snippet {
          background: #1a202c;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
          overflow-x: auto;
          border: 1px solid #2d3748;
        }

        .code-snippet pre {
          color: #e2e8f0;
          margin: 0;
          font-family: "Fira Code", "Consolas", monospace;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .explanation-list {
          list-style-type: none;
          padding: 0;
        }

        .explanation-list li {
          margin-bottom: 12px;
          padding-left: 24px;
          position: relative;
          color: #4a5568;
          line-height: 1.6;
        }

        .explanation-list li:before {
          content: "•";
          color: #667eea;
          font-weight: bold;
          position: absolute;
          left: 8px;
        }

        .explanation-list li strong {
          color: #2d3748;
          font-weight: 600;
        }

        .explanation-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          background: #f8fafc;
          border-radius: 8px;
          overflow: hidden;
        }

        .explanation-table th {
          background: #667eea;
          color: white;
          padding: 12px;
          text-align: left;
          font-weight: 600;
        }

        .explanation-table td {
          padding: 12px;
          border-bottom: 1px solid #e2e8f0;
          color: #4a5568;
        }

        .explanation-table tr:last-child td {
          border-bottom: none;
        }

        .explanation-table tr:hover {
          background: #edf2f7;
        }

        .concepts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 25px;
          margin-top: 20px;
        }

        .concept-item {
          background: #f8fafc;
          border-radius: 8px;
          padding: 20px;
          border: 1px solid #e2e8f0;
        }

        .concept-item h4 {
          color: #2d3748;
          margin: 0 0 15px 0;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .concept-item ul {
          margin: 0;
          padding-left: 20px;
        }

        .concept-item li {
          color: #4a5568;
          margin-bottom: 8px;
          line-height: 1.5;
        }

        /* Output Images Section Styles */
        .output-section {
          margin: 60px 0;
        }

        .output-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 30px;
          margin-top: 30px;
        }

        .output-card {
          background: white;
          border-radius: 12px;
          padding: 25px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .output-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }

        .output-card h3 {
          font-size: 1.3rem;
          font-weight: 600;
          color: #2d3748;
          margin: 0 0 20px 0;
          text-align: center;
        }

        .output-card .image-container {
          background: #f8fafc;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 15px;
          border: 1px solid #e2e8f0;
        }

        .output-image {
          max-width: 100%;
          height: auto;
          border-radius: 6px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .image-caption {
          color: #718096;
          font-size: 0.95rem;
          text-align: center;
          margin: 0;
          line-height: 1.5;
        }

        /* Homework Section Styles */
        .home-work-section {
          margin: 60px 0;
        }

        .home-work-card {
          background: white;
          border-radius: 12px;
          padding: 40px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .home-work-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #667eea;
        }

        .home-work-header h2 {
          margin: 0;
          font-size: 2rem;
          font-weight: 700;
          color: #2d3748;
        }

        .difficulty-badge {
          background: #667eea;
          color: white;
          padding: 8px 20px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .home-work-content h3 {
          font-size: 1.6rem;
          margin: 0 0 25px 0;
          font-weight: 600;
          color: #2d3748;
        }

        .objective-section,
        .requirements-section,
        .video-section,
        .reference-section,
        .api-endpoints-section,
        .bonus-section,
        .submission-section {
          margin-bottom: 30px;
        }

        .objective-section h4,
        .requirements-section h4,
        .video-section h4,
        .reference-section h4,
        .api-endpoints-section h4,
        .bonus-section h4,
        .submission-section h4 {
          font-size: 1.3rem;
          margin: 0 0 15px 0;
          font-weight: 600;
          color: #2d3748;
          border-left: 4px solid #667eea;
          padding-left: 12px;
        }

        .objective-section p {
          font-size: 1.1rem;
          line-height: 1.6;
          color: #4a5568;
          margin: 0;
        }

        .requirements-section ul,
        .bonus-section ul,
        .submission-section ul {
          margin: 0;
          padding-left: 20px;
        }

        .requirements-section li,
        .bonus-section li,
        .submission-section li {
          margin-bottom: 10px;
          color: #4a5568;
          line-height: 1.5;
        }

        .reference-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
          margin: 20px 0;
        }

        .reference-item {
          background: #f8fafc;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          border: 1px solid #e2e8f0;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .reference-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .reference-item .image-container {
          background: white;
          border-radius: 6px;
          padding: 15px;
          margin-bottom: 12px;
          border: 1px solid #e2e8f0;
        }

        .reference-item img {
          max-width: 100%;
          height: auto;
          border-radius: 4px;
        }

        .reference-item p {
          margin: 0;
          font-weight: 500;
          font-size: 1rem;
          color: #4a5568;
        }

        .api-endpoints-section .endpoints-table {
          background: #f8fafc;
          border-radius: 8px;
          padding: 20px;
          border: 1px solid #e2e8f0;
        }

        .api-endpoints-section table {
          width: 100%;
          border-collapse: collapse;
        }

        .api-endpoints-section th {
          background: #667eea;
          color: white;
          padding: 12px;
          text-align: left;
          font-weight: 600;
        }

        .api-endpoints-section td {
          padding: 12px;
          border-bottom: 1px solid #e2e8f0;
          color: #4a5568;
        }

        .api-endpoints-section tr:hover {
          background: #edf2f7;
        }

        .method-post { color: #48bb78; font-weight: 600; }
        .method-get { color: #4299e1; font-weight: 600; }
        .method-put { color: #ed8936; font-weight: 600; }
        .method-delete { color: #f56565; font-weight: 600; }

        .notes-footer {
          text-align: center;
          margin-top: 40px;
          padding: 20px;
          color: #718096;
          font-size: 1rem;
          border-top: 1px solid #e2e8f0;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .notes-container {
            padding: 20px 16px;
          }

          .notes-header h1 {
            font-size: 2.2rem;
          }

          .step-card {
            padding: 20px;
          }

          .home-work-card {
            padding: 25px;
          }

          .home-work-header {
            flex-direction: column;
            gap: 15px;
            text-align: center;
          }

          .output-grid {
            grid-template-columns: 1fr;
          }

          .reference-grid {
            grid-template-columns: 1fr;
          }

          .concepts-grid {
            grid-template-columns: 1fr;
          }

          .home-work-content h3 {
            font-size: 1.4rem;
          }

          .api-endpoints-section table {
            font-size: 0.9rem;
          }

          .code-snippet pre {
            font-size: 0.8rem;
          }

          .explanation-table {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ItemFrontend;
