document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.getElementById("bookingForm");
  const successMessage = document.getElementById("successMessage");

  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Simple navigation for Admin buttons
      function navigateTo(page) {
        window.location.href = page;
      }

      if (!bookingForm.checkValidity()) {
        bookingForm.classList.add("was-validated");
        return;
      }

      // Get form data
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const destination = document.getElementById("destination").value;
      const date = document.getElementById("date").value;
      const people = document.getElementById("people").value;

      // Save booking to localStorage
      const booking = { name, email, phone, destination, date, people };
      let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
      bookings.push(booking);
      localStorage.setItem("bookings", JSON.stringify(bookings));

      // Show success message
      successMessage.classList.remove("d-none");
      bookingForm.reset();
      bookingForm.classList.remove("was-validated");
    });
  }
});
// --- Admin Login Handling ---
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("adminLoginForm");
  const logoutBtn = document.getElementById("logoutBtn");

  // Handle login form submission
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      // Simple demo credentials — change as needed
      if (username === "admin" && password === "admin123") {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "dashboard.html";
      } else {
        alert("Invalid username or password!");
      }
    });
  }

  // Handle logout button
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("isLoggedIn");
      window.location.href = "login.html";
    });
  }

  // Protect admin pages (except login.html)
  const protectedPages = [
    "dashboard.html",
    "add_service.html",
    "manage_bookings.html",
    "manage_services.html",
  ];

  const currentPage = window.location.pathname.split("/").pop();

  if (protectedPages.includes(currentPage)) {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn !== "true") {
      // Not logged in — redirect to login
      window.location.href = "login.html";
    }
  }
});
