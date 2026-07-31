import React, { useReducer } from "react";

(state, action) => {
  if (action.type === "increment") {
    return { count: state.count + action.amount };
  } else if (action.type === "decrement") {
    return { count: state.count - action.amount };
  } else if (action.type === "reset") {
    return { count: 0 };
  }
  return state;
}

export default function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: "increment", amount: 1 })}>+1</button>
      <button onClick={() => dispatch({ type: "increment", amount: 5 })}>+5</button>
      <button onClick={() => dispatch({ type: "decrement", amount: 1 })}>-1</button>
      <button onClick={() => dispatch({ type: "reset" })}>reset</button>
    </div>
  );
}
