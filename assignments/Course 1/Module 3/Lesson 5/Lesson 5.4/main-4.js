// ===== YOUR TASK =====
// Edit this file to complete the assignment. Write your solution here, above the export block at the bottom (do not modify that block; the tests use it).
// TODO: Define withdrawMoney(balance, amount): if amount > balance return "Insufficient balance", otherwise return balance - amount. Then call it with (1000, 400) and (500, 800), store the results in validWithdrawal and invalidWithdrawal, and log each.


// ============================================================
// THE FOLLOWING CODE LETS US TEST YOUR CODE ABOVE
//     normally, you do not need to *export* variables in your
//     solution file, but we need to do this so that the tests
//     can access them
// DO NOT MODIFY OR REMOVE:
// ============================================================

// Exports variables that are defined
export default {
    ...(typeof withdrawMoney !== 'undefined' && { withdrawMoney }),
    ...(typeof validWithdrawal !== 'undefined' && { validWithdrawal }),
    ...(typeof invalidWithdrawal !== 'undefined' && { invalidWithdrawal })
};