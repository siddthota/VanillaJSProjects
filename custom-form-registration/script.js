//states to prepopulate in the dropdown options
let states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida',
  'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
  'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau',
  'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas',
  'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];
let dropdownData;

const form = document.getElementById('register');
let messageContainer = document.querySelector('.message-validator');
let message = document.getElementById('message');
let nameField = document.getElementById('name');
let radioField = document.getElementById('radio');
let dropdownField;
let emailField = document.getElementById('email');
let password1 = document.getElementById('password1');
let password2 = document.getElementById('password2');
let checkboxField = document.getElementById('checkbox');
let genderSelected, stateSelected, appTypeSelected;

// Form Validation checker
let isFormValid = false;

// Method to check if the form is valid
function validateForm() {
  //isFormValid = form.checkValidity();
  resetMessageBox();
  let nameValid = checkNameValid(form.name.value);
  let radioValid = checkRadioValid(form.male, form.female, form.unknown);
  dropdownField = document.querySelector('.state-input__selected');
  let stateValid = checkStateValid(dropdownField);
  let emailValid = checkEmailValid(form.email.value);
  let passwordValid = checkPasswordsValid(password1, password2);
  let appValid = checkCheckBoxValid(form.mobile, form.webapp);

  return nameValid && radioValid && stateValid && emailValid && passwordValid && appValid;
}

// Adds the respective  messages of fields that are invalid
function showInMessageBox(text) {
  if (message.textContent !== "Everything looks good") {
    message.textContent = message.textContent + ". " + text;
  } else {
    message.textContent = text;
  }
  message.style.color = "red";
  messageContainer.style.borderColor = 'red';
}

// Resets the message box to the initial state
function resetMessageBox() {
  message.textContent = "Everything looks good";
  message.style.color = "black";
  messageContainer.style.borderColor = "#8aadf7";
}

// Checks if Name field is valid
function checkNameValid(name) {
  if (name === "" || name === undefined || name === null) {
    showInMessageBox("Please enter your Full Name");
    nameField.style.borderColor = 'red';
    return false;
  }
  nameField.style.borderColor = 'cyan';
  return true;
}

// Checks if Radio Button Field is valid
function checkRadioValid(male, female, unknown) {
  if (!male.checked && !female.checked && !unknown.checked) {
    showInMessageBox("Please select the gender");
    radioField.style.color = 'red';
    return false;
  }
  if (male.checked) {
    genderSelected = "male";
  } else if (female.checked) {
    genderSelected = "female";
  } else {
    genderSelected = "unknown";
  }
  radioField.style.color = 'black';
  return true;
}

// Checks if state dropdown field is valid
function checkStateValid(nodeValue) {
  if (nodeValue === null || nodeValue === undefined) {
    showInMessageBox("State not selected");
    document.querySelector('.state-input').style.borderColor = 'red';
    return false;
  }
  stateSelected = nodeValue.textContent;
  document.querySelector('.state-input').style.borderColor = 'cyan';
  return true;
}

// Checks if email is valid based on regex
function checkEmailValid(email) {
  let regexMatch = new RegExp("[^@]+@[^\.]+\..+").test(email);
  if (email === null || email === "" || email === undefined) {
    showInMessageBox("Please enter your email");
    emailField.style.borderColor = 'red';
    return false;
  } else if (!regexMatch) {
    showInMessageBox("Please check your email pattern");
    emailField.style.borderColor = 'red';
    return false;
  }
  emailField.style.borderColor = 'cyan';
  return true;
}

// Checks if both passwords match and meets regex requirement
function checkPasswordsValid(password1, password2) {
  let p1RegexMatch = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})").test(password1.value);
  let p2RegexMatch = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})").test(password2.value);

  if (password1.value !== password2.value) {
    showInMessageBox("Make sure passwords match");
    password1.style.borderColor = 'red';
    password2.style.borderColor = 'red';
    return false;
  } else if (!p1RegexMatch || !p2RegexMatch) {
    showInMessageBox("Passwords are not strong, minimum 8 characters");
    password1.style.borderColor = 'red';
    password2.style.borderColor = 'red';
    return false;
  }
  password1.style.borderColor = 'cyan';
  password2.style.borderColor = 'cyan';
  return true;
}

// Checks if either or both checkboxes are selected
function checkCheckBoxValid(mobile, webApp) {
  if (!mobile.checked && !webApp.checked) {
    showInMessageBox("Select at least one type of the app");
    checkboxField.style.color = 'red';
    return false;
  }
  if (mobile.checked) {
    appTypeSelected = (appTypeSelected === undefined || appTypeSelected === null) ?
      "mobile" : appTypeSelected + ", mobile";
  }
  if (webApp.checked) {
    appTypeSelected = (appTypeSelected === undefined || appTypeSelected === null) ?
      "webapp" : appTypeSelected + ", webapp";

  }
  checkboxField.style.color = 'black';
  return true;
}

const statesDropdown = (data) => {
  const stateArea = document.getElementById('states');
  const stateComponent = document.createElement('div');

  const stateInput = createInput();
  const stateDropdown = showDropdown(data);

  stateComponent.appendChild(stateInput);
  stateComponent.appendChild(stateDropdown);
  stateArea.appendChild(stateComponent);

}

// Inserts dropdown icon dynamically into state dropdown
const dropdownIcon = () => {
  const dropdown = document.createElement("span");
  //dropdown.className = `${data}`;
  dropdown.innerHTML = `<svg width="14px" height="7px" style="
  margin-right:15px" viewBox="0 0 10 5" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="Delivery" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="Transactions-(Landing)" transform="translate(-1360.000000, -29.000000)" fill="#CDCFD3" fill-rule="nonzero">
              <g id="Group-4" transform="translate(1360.000000, 29.000000)">
                  <polygon id="Shape" points="0 0 5 5 10 0"></polygon>
              </g>
          </g>
          </g>
      </svg>`;
  return dropdown;
};

// Creates input field in the state dropdown
const createInput = () => {
  // Creates the input outline
  const input = document.createElement("div");
  input.classList = 'state-input';
  input.addEventListener("click", toggleStateDropdown);

  // Creates the input placeholder content
  const inputPlaceholder = document.createElement("div");
  inputPlaceholder.classList = 'state-input__placeholder';

  const placeholder = document.createElement("p");
  placeholder.textContent = "Select state";

  placeholder.classList.add('state-placeholder');
  // Appends the placeholder and chevron (stored in assets.js)
  inputPlaceholder.appendChild(placeholder);
  inputPlaceholder.appendChild(dropdownIcon());
  input.appendChild(inputPlaceholder);

  return input;
}

// Inserts the data and displays the dropdown values
const showDropdown = (data) => {
  const structure = document.createElement("div");
  structure.classList.add('state-structure', "hide");

  data.forEach((data) => {
    const state = data;
    const option = document.createElement("div");
    option.addEventListener("click", () => selectOption(state));
    option.setAttribute("id", state);

    const n = document.createElement("h5");
    n.textContent = state;

    option.appendChild(n);
    structure.appendChild(option);
  });
  return structure;
};

// Toggle state dropdown
const toggleStateDropdown = () => {
  const dropdown = document.querySelector(".state-structure");
  dropdown.classList.toggle("hide");

  const input = document.querySelector(".state-input");
  input.classList.toggle("state-input__active");
};

// sets the selected option in the dropdown
const selectOption = (name) => {
  const text = document.querySelector(".state-placeholder");
  text.textContent = name;
  text.classList.add('state-input__selected');
  toggleStateDropdown();
};

// Mock method that submits the form data to the API
function submitFormToAPI() {
  let reqObj = {
    method: "POST",
    body: JSON.stringify({
      name: form.name.value,
      gender: genderSelected,
      state: stateSelected,
      email: form.email.value,
      password: password1.value,
      appType: appTypeSelected
    }),
    cache: "no-cache",
    headers: new Headers({
      "content-type": "application/json",
    })
  }

  // fetch('api/url', reqObj)
  //   .then((response) => response.json())
  //   .then((data) => data);

  console.log(reqObj);
}

// Main Function that triggers entire form validation
function submitForm(e) {
  e.preventDefault();

  isFormValid = validateForm();

  if (isFormValid) {
    submitFormToAPI();
  }
}

// Form Submit Event Listener
form.addEventListener('submit', submitForm);

// Waits for dom content to load and inserts states into the custom dropdown
window.addEventListener("DOMContentLoaded", (event) => {
  statesDropdown(states);
});