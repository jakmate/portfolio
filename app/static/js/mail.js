function submitForm(event) {
  event.preventDefault();

  const form = document.getElementById("form");
  const formData = new FormData(form);
  const submitButton = form.querySelector('button[type="submit"]');
  const responseDiv = document.getElementById("response");

  // Show loading state
  const originalText = submitButton.textContent;
  submitButton.textContent = "Sending...";
  submitButton.disabled = true;

  // Clear previous response
  responseDiv.innerHTML = "";
  responseDiv.className = "response-message";

  fetch("/sendMessage", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Success response
      responseDiv.innerHTML = `
            <div class="success-message">
                <strong>✓ Message sent successfully!</strong>
                <p>Thank you for reaching out. I'll get back to you soon.</p>
            </div>
        `;
      responseDiv.classList.add("success");

      // Reset form
      form.reset();

      // Add success animation
      responseDiv.style.opacity = "0";
      setTimeout(() => {
        responseDiv.style.opacity = "1";
      }, 100);
    })
    .catch((error) => {
      // Error response
      console.error("Error:", error);
      responseDiv.innerHTML = `
            <div class="error-message">
                <strong>✗ Failed to send message</strong>
                <p>Please try again or contact me directly via email.</p>
            </div>
        `;
      responseDiv.classList.add("error");
    })
    .finally(() => {
      // Reset button state
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    });
}

function validateField(event) {
  const field = event.target;
  const value = field.value.trim();

  // Remove existing validation classes
  field.classList.remove("is-valid", "is-invalid");

  // Validate based on field type
  let isValid = true;

  if (field.hasAttribute("required") && !value) {
    isValid = false;
  } else if (field.type === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isValid = emailRegex.test(value);
  }

  // Add validation class
  field.classList.add(isValid ? "is-valid" : "is-invalid");
}

function clearValidation(event) {
  const field = event.target;
  field.classList.remove("is-valid", "is-invalid");
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  const inputs = form.querySelectorAll("input, textarea");

  inputs.forEach((input) => {
    input.addEventListener("blur", validateField);
    input.addEventListener("input", clearValidation);
  });
});
