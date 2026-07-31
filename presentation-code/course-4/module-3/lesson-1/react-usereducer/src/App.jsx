import React from "react";

function counterReducer(state, action) {
  if(action.type === "increment") {
    return { count: state.count + action.amount, totalCount: state.totalCount + 1}
  } else if(action.type === "decrement") {
    return { count: state.count - action.amount, totalCount: state.totalCount + 1}
  } else if(action.type === "reset") {
    return { count: 0, totalCount: state.totalCount + 1}
  } else {
    return state;
  }
}

export default function Counter() {
  const [state, dispatch] = React.useReducer(counterReducer, {count: 0, totalCount: 0});

  return (
    <div>
      <p>{state.count} ({state.totalCount})</p>
      <button onClick={() => dispatch({type: "increment", amount: 5})}>+5</button>
      <button onClick={() => dispatch({type: "increment", amount: 1})}>+1</button>
      <button onClick={() => dispatch({type: "decrement", amount: 1})}>-1</button>
      <button onClick={() => dispatch({type: "reset"})}>reset</button>
    </div>
  );
}