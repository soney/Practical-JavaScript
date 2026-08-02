const flour = someFunctionToCheckIfFlourIsAvailable(); // flour is a BOOLEAN. Assume this function is defined elsewhere; do not modify this line
const egg   = someFunctionToCheckIfEggIsAvailable();   // egg is a BOOLEAN.   Assume this function is defined elsewhere; do not modify this line
const sugar = someFunctionToCheckIfSugarIsAvailable(); // sugar is a BOOLEAN. Assume this function is defined elsewhere; do not modify this line

// ===== YOUR TASK =====
// Edit this file to complete the assignment. Write your solution here, using the provided flour/egg/sugar booleans above; do not modify the setup lines or the export block at the bottom.
// TODO: Create canMakeBread, canMakePasta, canMakeCake (each starts false); use a separate if for each recipe (flour; flour && egg; flour && egg && sugar) to set the flag true and log its message; then if none are possible, log "Cannot make anything!".


// ============================================================
// THE FOLLOWING CODE LETS US TEST YOUR CODE ABOVE
//     normally, you do not need to *export* variables in your
//     solution file, but we need to do this so that the tests
//     can access them
// DO NOT MODIFY OR REMOVE:
// ============================================================

// Exports variables that are defined
export default {
    ...(typeof canMakeBread !== 'undefined' && { canMakeBread }),
    ...(typeof canMakePasta !== 'undefined' && { canMakePasta }),
    ...(typeof canMakeCake !== 'undefined' && { canMakeCake }),
    ...(typeof flour !== 'undefined' && { flour }),
    ...(typeof egg !== 'undefined' && { egg }),
    ...(typeof sugar !== 'undefined' && { sugar })
};