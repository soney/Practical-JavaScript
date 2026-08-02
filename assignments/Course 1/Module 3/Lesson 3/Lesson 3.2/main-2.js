const isMember = someFunctionToCheckIfMember();  // BOOLEAN. Do not modify this line
const hasCoupon = someFunctionToCheckIfCoupon(); // BOOLEAN. Do not modify this line

// ===== YOUR TASK =====
// Edit this file to complete the assignment. Write your solution here, using the provided isMember/hasCoupon booleans above; do not modify the setup lines or the export block at the bottom.
// TODO: Create finalDiscount (isMember || hasCoupon) and freeShipping (isMember && hasCoupon); then log "User gets a discount!", "User gets free shipping!", or "No discount or free shipping available." based on their values.


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