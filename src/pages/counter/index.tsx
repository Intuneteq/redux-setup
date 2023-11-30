import { useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";

import {
  decrement,
  increment,
  incrementByAmount,
  reset,
  selectCount,
} from "./counterSlice";

export function Counter() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  const [amount, setAmount] = useState("0");

  const addValue = Number(amount) || 0;

  function resetAll() {
    setAmount("0");
    dispatch(reset());
  }

  return (
    <section>
      <p>{count}</p>
      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
        <button onClick={() => resetAll()}>reset</button>
      </div>

      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <div>
        <button onClick={() => dispatch(incrementByAmount(addValue))}>
          Add Amount
        </button>
      </div>
    </section>
  );
}
