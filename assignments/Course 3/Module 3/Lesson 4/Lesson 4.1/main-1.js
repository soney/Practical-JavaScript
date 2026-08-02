// Practice writing json0 operations, the op format ShareDB uses for JSON
// documents. In a real app, doc.submitOp(ops) would send these operations
// to a ShareDB server so every connected user sees the change. Here,
// submitOp is provided below and applies the ops locally, so you can focus
// on writing the operations themselves.
//
// The shared document:
const doc = {
  data: {
    points: 0,
    status: 'Online',
    badges: []
  }
};

// TODO: (1) Complete createAddPointsOp so it returns an operation list that
// adds 5 to the points value. A json0 op has a path p plus one action.
// The "na" action adds a number:
//   return [{ p: ['points'], na: 5 }];
function createAddPointsOp() {
  return null;
}

// TODO: (2) Complete createStatusOp so it returns an operation list that
// replaces the status. Replacing an object value uses "od" (the old value
// being removed) and "oi" (the new value being inserted). The od must be
// the CURRENT value, which is in doc.data.status:
//   return [{ p: ['status'], od: doc.data.status, oi: newStatus }];
function createStatusOp(newStatus) {
  return null;
}

// TODO: (3) Complete createBadgeOp so it returns an operation list that
// inserts a badge at the END of the badges list. Inserting into a list
// uses "li", and the path ends with the position to insert at, which for
// the end of the list is doc.data.badges.length:
//   return [{ p: ['badges', doc.data.badges.length], li: badgeName }];
function createBadgeOp(badgeName) {
  return null;
}

// ---------------------------------------------------------------------------
// Everything below is provided. You do not need to change it.
// ---------------------------------------------------------------------------

const pointsDisplay = document.querySelector('#points');
const statusDisplay = document.querySelector('#status-value');
const badgesList = document.querySelector('#badges-list');
const lastOpDisplay = document.querySelector('#last-op');
const statusInput = document.querySelector('#status-input');
const badgeInput = document.querySelector('#badge-input');

// A small local version of doc.submitOp(ops). It checks and applies each
// op to doc.data, then re-renders the card.
function submitOp(ops) {
  if (!Array.isArray(ops)) {
    lastOpDisplay.textContent = 'Not implemented yet: the function returned ' + ops + ' instead of an operation list.';
    return;
  }
  for (const op of ops) {
    const field = op.p[0];
    if (op.na !== undefined) {
      doc.data[field] = doc.data[field] + op.na;
    } else if (op.oi !== undefined) {
      if (op.od !== doc.data[field]) {
        lastOpDisplay.textContent = 'Rejected: op.od was "' + op.od + '" but the current value is "' + doc.data[field] + '".';
        return;
      }
      doc.data[field] = op.oi;
    } else if (op.li !== undefined) {
      doc.data[field].splice(op.p[1], 0, op.li);
    }
  }
  lastOpDisplay.textContent = JSON.stringify(ops);
  render();
}

function render() {
  pointsDisplay.textContent = doc.data.points;
  statusDisplay.textContent = doc.data.status;
  badgesList.innerHTML = '';
  for (const badge of doc.data.badges) {
    const li = document.createElement('li');
    li.textContent = badge;
    badgesList.append(li);
  }
}

document.querySelector('#add-points-btn').addEventListener('click', () => {
  submitOp(createAddPointsOp());
});

document.querySelector('#set-status-btn').addEventListener('click', () => {
  const newStatus = statusInput.value.trim();
  if (!newStatus) return;
  submitOp(createStatusOp(newStatus));
  statusInput.value = '';
});

document.querySelector('#add-badge-btn').addEventListener('click', () => {
  const badgeName = badgeInput.value.trim();
  if (!badgeName) return;
  submitOp(createBadgeOp(badgeName));
  badgeInput.value = '';
});

render();
