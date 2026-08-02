// SOLUTION: learner-defined withdrawMoney function plus the two calls and console.logs (the export block below is provided scaffolding)
function withdrawMoney(balance, amount) {
    if (amount > balance) {
        return 'Insufficient balance';
    }
    return balance - amount;
}

const validWithdrawal = withdrawMoney(1000, 400);
console.log(validWithdrawal);

const invalidWithdrawal = withdrawMoney(500, 800);
console.log(invalidWithdrawal);

export default {
    ...(typeof withdrawMoney !== 'undefined' && { withdrawMoney }),
    ...(typeof validWithdrawal !== 'undefined' && { validWithdrawal }),
    ...(typeof invalidWithdrawal !== 'undefined' && { invalidWithdrawal })
};