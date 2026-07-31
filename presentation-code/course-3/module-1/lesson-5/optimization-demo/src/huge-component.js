import _ from 'lodash';

export default function hugeComponent() {
  const element = document.createElement('div');
  element.innerHTML = _.join(['Hello', 'from', 'huge', 'component'], ' ');
  return element;
}
