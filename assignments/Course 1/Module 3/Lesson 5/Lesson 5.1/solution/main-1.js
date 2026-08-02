// SOLUTION: learner-defined doublePoints function (the export block below is provided scaffolding)
function doublePoints(points) {
    const doubled = points * 2;
    console.log(doubled);
    return doubled;
}

export default {
  ...(typeof doublePoints !== 'undefined' && { doublePoints })
};
