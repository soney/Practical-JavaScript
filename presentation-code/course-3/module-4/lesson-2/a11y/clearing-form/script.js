document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const errorMessage = document.getElementById("error-message");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent actual submission

    const passcode = document.getElementById("passcode").value;
    const isPasscodeValid = /^\d{6}$/.test(passcode);

    if (!isPasscodeValid) {
      // THE ACCESSIBILITY/USABILITY PROBLEM:
      // Clearing the entire form when just one field is invalid forces the user
      // to re-enter all their data, increasing cognitive load, physical effort,
      // and frustration. This is especially punishing for users with motor
      // disabilities or cognitive impairments.

      form.reset();

      errorMessage.classList.remove("hidden");

      // Scroll to top so they see the error
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Put focus on the first field again
      document.getElementById("firstName").focus();
    } else {
      errorMessage.classList.add("hidden");
      alert("Registration successful! (Not really, just an example)");
      form.reset();
    }
  });

  // Hide error banner when they start typing again
  form.addEventListener("input", () => {
    if (!errorMessage.classList.contains("hidden")) {
      errorMessage.classList.add("hidden");
    }
  });
});
