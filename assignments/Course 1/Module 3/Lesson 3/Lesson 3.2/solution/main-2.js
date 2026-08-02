const isMember = someFunctionToCheckIfMember();  // BOOLEAN. Do not modify this line
const hasCoupon = someFunctionToCheckIfCoupon(); // BOOLEAN. Do not modify this line

// SOLUTION: learner-written boolean variables and if statements (setup consts above and export block below are provided)
let finalDiscount = false;
let freeShipping = false;

if (isMember || hasCoupon) {
    finalDiscount = true;
    console.log("User gets a discount!");
}

if (isMember && hasCoupon) {
    freeShipping = true;
    console.log("User gets free shipping!");
}

if (!finalDiscount && !freeShipping) {
    console.log("No discount or free shipping available.");
}

// ============================================================
// THE FOLLOWING CODE LETS US TEST YOUR CODE ABOVE
// DO NOT MODIFY OR REMOVE:
// ============================================================
export default {
    ...(typeof isMember !== 'undefined' && { isMember }),
    ...(typeof hasCoupon !== 'undefined' && { hasCoupon }),
    ...(typeof finalDiscount !== 'undefined' && { finalDiscount }),
    ...(typeof freeShipping !== 'undefined' && { freeShipping })
};