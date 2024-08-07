export const HTMLCSSJS_DIALOGUES = [
  {
    name: "Sunfire Guardian",
    text: "Traveler, your brother is held captive by the monsters of this isle. To rescue him, you must master the art of web development - HTML, CSS, and JavaScript. These are the tools to forge your path to victory.",
  },
  {
    name: "player",
    text: "I'm ready to learn, guardian. Show me the way.",
  },
  {
    name: "Sunfire Guardian",
    text: "Good. Let us begin.",
  },
  {
    name: "Sunfire Guardian",
    text: "The Document Object Model (DOM) is like a blueprint of a webpage, allowing JavaScript to interact with its structure and content.",
  },
  {
    name: "Sunfire Guardian",
    text: "Imagine the webpage as a living organism, with each element representing a part of its body. The DOM is like a map of this organism, allowing you to navigate and interact with its different parts.",
  },
  {
    name: "Sunfire Guardian",
    text: "There are different ways to find specific elements on the webpage.",
  },
  {
    name: "Sunfire Guardian",
    text: "document.getElementById('elementId'): This is like finding a specific part of the body by its unique name.",
  },
  {
    name: "Sunfire Guardian",
    text: "document.getElementsByTagName('tagName'): This is like finding all parts of the same type (e.g., p, a, div and other tags).",
  },
  {
    name: "Sunfire Guardian",
    text: "document.querySelector('selector'): This is like finding an element based on its appearance or location.",
  },
  {
    name: "Sunfire Guardian",
    text: "document.querySelectorAll('selector'): This is like finding multiple elements based on a specific description.",
  },
  {
    name: "Sunfire Guardian",
    text: "This code creates a basic HTML structure and corresponding JavaScript variables to interact with those elements.",
  },
  {
    name: "Sunfire Guardian",
    text: "The HTML portion defines a webpage with a heading, a paragraph, a button within a container. The JavaScript part then selects these elements and assigns them to variables for later manipulation.",
  },
  {
    name: "Sunfire Guardian",
    text: "Once you've found an element, you can change its appearance or content.",
  },
  {
    name: "Sunfire Guardian",
    text: "element.textContent: This changes the text content of an element.",
  },
  {
    name: "Sunfire Guardian",
    text: "element.innerHTML: This changes the entire HTML content within an element.",
  },
  {
    name: "Sunfire Guardian",
    text: "element.style: This allows you to change the style of an element (like color, size, etc.).",
  },
  {
    name: "Sunfire Guardian",
    text: "element.classList: This helps you manage the classes of an element.",
  },
  {
    name: "Sunfire Guardian",
    text: "This code modifies the previously selected HTML elements using the assigned JavaScript variables.",
  },
  {
    name: "Sunfire Guardian",
    text: "heading.textContent = 'Your Adventure Begins!';: This line changes the text content of the element referenced by the heading variable (which targets the element with the ID 'mainHeading') to 'Your Adventure Begins!'.",
  },
  {
    name: "Sunfire Guardian",
    text: "paragraphs[0].innerHTML = '<p>This paragraph has been modified!</p>'; This line modifies the inner HTML content of the first element retrieved using paragraphs[0] (which selects all paragraphs using getElementsByTagName).",
  },
  {
    name: "Sunfire Guardian",
    text: "It replaces the original content with a new paragraph element containing the text 'This paragraph has been modified!'",
  },
  {
    name: "Sunfire Guardian",
    text: "container.style.backgroundColor = 'yellow';: This line sets the background color of the element referenced by the container variable (which targets the element with the ID 'container') to yellow.",
  },
  {
    name: "Sunfire Guardian",
    text: "It modifies the element's style directly.",
  },
  {
    name: "Sunfire Guardian",
    text: "changeButton.classList.add('important');: This line manipulates the class list of the button referenced by the changeButton variable (which targets the element with the ID 'changeButton').",
  },
  {
    name: "Sunfire Guardian",
    text: "It adds a new class named 'important' to the button's existing classes (if any). This likely modifies the button's appearance based on a CSS definition for the 'important' class.",
  },
  {
    name: "Sunfire Guardian",
    text: "Creating Elements: You can create new elements and add them to the webpage.",
  },
  {
    name: "Sunfire Guardian",
    text: "document.createElement('elementName'): This creates a new element.",
  },
  {
    name: "Sunfire Guardian",
    text: "element.appendChild(childElement): This adds a new element as a child of another element.",
  },
  {
    name: "Sunfire Guardian",
    text: "This code dynamically creates a new paragraph element and appends it to an existing container.",
  },
  {
    name: "Sunfire Guardian",
    text: "const newParagraph = document.createElement('p');: This line creates a new paragraph element and stores it in the newParagraph variable.",
  },
  {
    name: "Sunfire Guardian",
    text: "newParagraph.textContent = 'This is a new paragraph!';: This line sets the text content of the newly created paragraph to 'This is a new paragraph!'.",
  },
  {
    name: "Sunfire Guardian",
    text: "container.appendChild(newParagraph);: This line adds the newly created paragraph element as a child of the element referenced by the container variable (which is the element with the ID 'container').",
  },
  {
    name: "Sunfire Guardian",
    text: "Forms allow user input, and event listeners make your webpage interactive.",
  },
  {
    name: "Sunfire Guardian",
    text: "<form>: Defines a form for user input.",
  },
  {
    name: "Sunfire Guardian",
    text: "<input>: Creates different types of input fields (text, password, email, checkbox, radio, etc.).",
  },
  {
    name: "Sunfire Guardian",
    text: "<textarea>: Creates a multi-line text input area.",
  },
  {
    name: "Sunfire Guardian",
    text: "<select>: Creates a dropdown list.",
  },
  {
    name: "Sunfire Guardian",
    text: "<label>: Provides a user-friendly description for form elements.",
  },
  {
    name: "Sunfire Guardian",
    text: "This code creates a basic HTML form with a single text input field and a submit button.",
  },
  {
    name: "Sunfire Guardian",
    text: "<form id='myForm'>: This tag defines a form element with the ID 'myForm'. Forms are used to collect user input.",
  },
  {
    name: "Sunfire Guardian",
    text: "<label for='name'>Name:</label>: This creates a label for the input field. The for attribute links the label to the input field with the ID 'name'.",
  },
  {
    name: "Sunfire Guardian",
    text: "<input type='text' id='name' name='name'>: This creates a text input field for the user to enter their name. The id and name attributes are both set to 'name' for consistency.",
  },
  {
    name: "Sunfire Guardian",
    text: "<button type='submit'>Submit</button>: This creates a submit button that, when clicked, will send the form data.",
  },
  {
    name: "Sunfire Guardian",
    text: "Internal JavaScript: You can embed JavaScript directly within an HTML file using the ‘<script>’ tag.",
  },
  {
    name: "Sunfire Guardian",
    text: "This code creates a simple HTML page with interactive functionality.",
  },
  {
    name: "Sunfire Guardian",
    text: "HTML Structure: Defines a basic HTML structure with a head and body section.Includes a paragraph with the id 'demo' and a button with an onclick event handler.",
  },
  {
    name: "Sunfire Guardian",
    text: "JavaScript Functionality: Creates a JavaScript function named changeText(). When the button is clicked, the onclick attribute calls the changeText() function. Inside the changeText() function, the text content of the paragraph with the id 'demo' is changed to 'Text changed!'.",
  },
  {
    name: "Sunfire Guardian",
    text: "addEventListener(event, function): Attaches an event listener to an element.",
  },
  {
    name: "Sunfire Guardian",
    text: "This code demonstrates how to handle form submission using JavaScript",
  },
  {
    name: "Sunfire Guardian",
    text: `const form = document.getElementById('myForm');: This line selects the form element with the ID "myForm" and stores it in the form variable.`,
  },
  {
    name: "Sunfire Guardian",
    text: "form.addEventListener('submit', function(event) { ... });: This line adds an event listener to the form element. The event listener is triggered when the form is submitted (e.g., when the user clicks the submit button). The function passed as an argument to addEventListener will be executed when the event occurs.",
  },
  {
    name: "Sunfire Guardian",
    text: "event.preventDefault();: This line prevents the default behavior of the form submission, which would normally send the form data to the server. By preventing the default behavior, we can handle the form data in JavaScript before submitting it or performing other actions.",
  },
  {
    name: "Sunfire Guardian",
    text: "// Handle form data here: This comment indicates where you would typically write the code to process the form data. This might involve extracting values from input fields, validating the data, or updating the page content based on the form data.",
  },
  {
    name: "Sunfire Guardian",
    text: "This code creates a simple HTML page with a button that displays an alert message when clicked.",
  },
  {
    name: "Sunfire Guardian",
    text: "Selects the button element using document.getElementById('myButton') and stores it in the button variable then adds an event listener to the button using addEventListener('click', function() { ... }).",
  },
  {
    name: "Sunfire Guardian",
    text: `Defines an anonymous function that will be executed when the button is clicked amd inside the function, an alert box is displayed with the message "Button clicked!".`,
  },
  {
    name: "Sunfire Guardian",
    text: "This code demonstrates how to change the color of a paragraph element when the user hovers over it with the mouse",
  },
  {
    name: "Sunfire Guardian",
    text: `Selects the paragraph element with the ID "myParagraph" using document.getElementById('myParagraph') and stores it in the paragraph variable and adds an event listener to the paragraph using addEventListener('mouseover', function() { ... }).`,
  },
  {
    name: "Sunfire Guardian",
    text: "The event listener triggers the anonymous function when the mouse hovers over the paragraph (mouseover event) and inside the function, the style.color property of the paragraph element is set to 'red', changing its text color.",
  },
  {
    name: "Sunfire Guardian",
    text: "This code demonstrates how to change the background color of a div element back to white when the mouse cursor leaves the element (mouseout event).",
  },
  {
    name: "Sunfire Guardian",
    text: `Selects the div element with the ID "myDiv" using document.getElementById('myDiv') and stores it in the div variable and adds an event listener to the div using addEventListener('mouseout', function() { ... }).`,
  },
  {
    name: "Sunfire Guardian",
    text: "The event listener triggers the anonymous function when the mouse cursor leaves the element (mouseout event) and inside the function, the style.backgroundColor property of the div element is set to 'white', resetting its background color.",
  },
  {
    name: "Sunfire Guardian",
    text: "Keydown Event:",
  },
  {
    name: "Sunfire Guardian",
    text: "This code demonstrates how to detect when a user presses a key while an input field is focused.",
  },
  {
    name: "Sunfire Guardian",
    text: "Selects the input element using document.getElementById('myInput') and stores it in the input variable and adds an event listener to the input using addEventListener('keydown', function(event) { ... }).",
  },
  {
    name: "Sunfire Guardian",
    text: `The event listener triggers the anonymous function when a key is pressed while the input field is focused (keydown event) and inside the function, it checks if the pressed key is the "Enter" key using event.key === 'Enter'. If the pressed key is "Enter", an alert box is displayed with the message "You pressed Enter!".`,
  },
  {
    name: "Sunfire Guardian",
    text: "event.key: The ‘event.key’ property provides information about the key that was pressed during a keyboard event.",
  },
  {
    name: "Sunfire Guardian",
    text: "This code listens for any key pressed on the entire document and performs specific actions based on the key.",
  },
  {
    name: "Sunfire Guardian",
    text: "Event Listener: document.addEventListener('keydown', function(event) { ... }) adds an event listener to the entire document. This means that whenever a key is pressed anywhere on the page, the provided function will be executed.",
  },
  {
    name: "Sunfire Guardian",
    text: `Key Detection: if (event.key === 'Enter') { ... } checks if the pressed key is the "Enter" key. The event.key property provides information about the key that was pressed.`,
  },
  {
    name: "Sunfire Guardian",
    text: `Action for Enter Key: If the pressed key is "Enter", an alert box is displayed with the message "You pressed Enter!".`,
  },
  {
    name: "Sunfire Guardian",
    text: "Logging Key Pressed: console.log('Pressed key:', event.key); logs the pressed key to the browser's console for debugging or informational purposes.",
  },
  {
    name: "Sunfire Guardian",
    text: "Enter: Enter key, Space: Spacebar Backspace: Backspace key Tab: Tab key ArrowLeft, ArrowRight, ArrowUp, ArrowDown: Arrow keys Control, Alt, Shift: Control, Alt, and Shift keys Escape: Escape key Delete: Delete key",
  },
  {
    name: "Sunfire Guardian",
    text: "This code displays the pressed key in a paragraph element when a key is released.",
  },
  {
    name: "Sunfire Guardian",
    text: "Selects the input element and the output paragraph using their IDs and stores them in input and output variables respectively and it adds an event listener to the input element using addEventListener('keyup', function(event) { ... }).",
  },
  {
    name: "Sunfire Guardian",
    text: "The event listener triggers the anonymous function when a key is released (keyup event)and Inside the function, the output.textContent property is set to display the pressed key using event.key",
  },
  {
    name: "Sunfire Guardian",
    text: "This code demonstrates how to handle form submission using JavaScript.   ",
  },
  {
    name: "Sunfire Guardian",
    text: "Selects the form element using document.getElementById('myForm') and stores it in the form variable and adds an event listener to the form using addEventListener('submit', function(event) { ... }). The event listener triggers the anonymous function when the form is submitted",
  },
  {
    name: "Sunfire Guardian",
    text: "Inside the function: event.preventDefault() prevents the default form submission behaviorand gets the value of the name input field then handles form data (in this case, just logs the name to the console, but you would typically send data to a server).",
  },
  {
    name: "Sunfire Guardian",
    text: "Inline Event Handlers: You can also attach event handlers directly to HTML elements using attributes like onclick, onsubmit, onmouseover, etc.",
  },
  {
    name: "Sunfire Guardian",
    text: "Are you ready to save your brother using the knowledge you've learned?",
  },
  {
    name: "player",
    text: "Yes, I’m ready!",
  },
  {
    name: "Sunfire Guardian",
    text: "Be careful Traveler those monsters are really strong and dangerous...",
  },
];
