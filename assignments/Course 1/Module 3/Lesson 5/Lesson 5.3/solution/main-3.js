// SOLUTION: learner-defined canDrive function (the export block below is provided scaffolding)
function canDrive(age) {
    if (age >= 16) {
        return true;
    }
    return false;
}

export default {
    ...(typeof canDrive !== 'undefined' && { canDrive })
};
