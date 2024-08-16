document.addEventListener("DOMContentLoaded", function () {
  const signupToggle = document.getElementById("signup-toggle");
  const loginToggle = document.getElementById("login-toggle");
  const formContainer = document.querySelector(".form-container");
  const signupButton = document.getElementById("signup-button");
  const loginButton = document.getElementById("login-button");

  // Event listeners for toggling between login and signup forms
  signupToggle.addEventListener("click", function () {
    formContainer.classList.add("active");
  });

  loginToggle.addEventListener("click", function () {
    formContainer.classList.remove("active");
  });

  // Event listener for signup button
  signupButton.addEventListener("click", function () {
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    // Get existing users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user already exists
    const userExists = users.some((user) => user.email === email);

    if (userExists) {
      alert("User already exists. Please log in.");
    } else {
      // Add new user to the list
      users.push({ name, email, password });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Sign up successful! Please log in.");
      formContainer.classList.remove("active");
    }
  });

  // Event listener for login button
  loginButton.addEventListener("click", function () {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find user
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      console.log("Login successful!");
      // Save the logged-in user's name to sessionStorage
      sessionStorage.setItem("loggedInUser", user.name);
      console.log("User name saved to sessionStorage:", user.name);
      window.location.href = "music.html";
    } else {
      console.log("Invalid email or password");
      alert("Invalid email or password");
    }
  });
});
