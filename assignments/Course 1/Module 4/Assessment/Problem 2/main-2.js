// ===== YOUR TASK =====
// Edit this file to complete the assignment. Write your solution here, above the export block at the bottom (do not modify that block; the tests use it).
// TODO: Define a function statusReport() that calls console.log("Status is clear!"); then select the button with document.querySelector("#statusBtn") and call button.addEventListener("click", statusReport) (pass statusReport by name, no parentheses).


// ============================================================
// THE FOLLOWING CODE LETS US TEST YOUR CODE ABOVE
//     normally, you do not need to *export* variables in your
//     solution file, but we need to do this so that the tests
//     can access them
// DO NOT MODIFY OR REMOVE:
// ============================================================

// Exports variables that are defined
export default {
  ...(typeof statusReport !== "undefined" && { statusReport })
};