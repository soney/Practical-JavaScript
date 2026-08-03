import _ from 'lodash';

const facts = [
  'Ann Arbor was founded in 1824.',
  'The University of Michigan moved here from Detroit in 1837.',
  'Michigan Stadium holds more than 107,000 people.',
  'The city has more than 150 parks.',
  'Ann Arbor sits on the Huron River.'
];

export function randomFacts(count) {
  return _.sampleSize(facts, count);
}
