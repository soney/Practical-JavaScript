// SOLUTION: learner-defined windowWidth function (the export block below is provided scaffolding)
function windowWidth() {
    return window.innerWidth;
}

export default {
  ...(typeof windowWidth !== 'undefined' && { windowWidth })
};
