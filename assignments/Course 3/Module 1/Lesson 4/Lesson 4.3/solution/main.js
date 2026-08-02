// SOLUTION: import lodash here; build capitalizedNames below
import _ from 'lodash';

const names = ['ada', 'grace', 'alan', 'katherine'];

const capitalizedNames = _.map(names, _.capitalize);

export default capitalizedNames;
