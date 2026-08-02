// Yjs organizes shared data as named types inside a document: calling
// doc.getText('note') anywhere in the app returns THE SAME shared text
// object, and observers registered on it run whenever the text changes.
//
// This page builds a small version of that idea. Two panes ("User A" and
// "User B") each ask the document for the text named 'note' and observe
// it. If your getText and insert work, appending from either pane updates
// both panes, because both panes hold the same object.

// createTextType builds one shared text object. observe() is already
// written; insert() is yours.
function createTextType() {
  const text = {
    content: '',
    observers: [],

    // Registers a callback that runs whenever the text changes.
    // Already written.
    observe(callback) {
      text.observers.push(callback);
    },

    // SOLUTION: splice the new text into the content, then notify every
    // observer so the panes re-render
    insert(index, newText) {
      text.content = text.content.slice(0, index) + newText + text.content.slice(index);
      for (const callback of text.observers) {
        callback();
      }
    }
  };
  return text;
}

// The shared document. getText is yours.
const doc = {
  shared: {},

  // SOLUTION: create the named text on first use; always return the same
  // object for the same name
  getText(name) {
    if (!doc.shared[name]) {
      doc.shared[name] = createTextType();
    }
    return doc.shared[name];
  }
};

// ---------------------------------------------------------------------------
// Everything below is provided. You do not need to change it.
// ---------------------------------------------------------------------------

function setupPane(displaySelector, inputSelector, buttonSelector) {
  const display = document.querySelector(displaySelector);
  const input = document.querySelector(inputSelector);
  const button = document.querySelector(buttonSelector);

  // Each pane asks the document for the same named text, exactly like a
  // second user opening the same shared note.
  const note = doc.getText('note');
  if (!note) {
    display.textContent = 'getText is not implemented yet.';
    return;
  }

  function render() {
    display.textContent = note.content;
  }

  note.observe(render);
  render();

  button.addEventListener('click', () => {
    if (!input.value) return;
    // Append at the end of the current content.
    note.insert(note.content.length, input.value);
    input.value = '';
  });
}

setupPane('#display-a', '#input-a', '#append-a-btn');
setupPane('#display-b', '#input-b', '#append-b-btn');
