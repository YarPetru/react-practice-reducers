import { useReducer } from "react";
// import produce from 'immer';

import Button from "../components/Button";
import Panel from "../components/Panel";

const INCREMENT_COUNT = "increment";
const DECREMENT_COUNT = "decrement";
const SET_VALUE_TO_ADD = "change-value-to-add";
const ADD_VALUE_TO_COUNT = "add-value-to-count";

const reducer = (state, action) => {
  switch (action.type) {
    case INCREMENT_COUNT:
      return {
        ...state,
        count: state.count + 1,
      };
    case DECREMENT_COUNT:
      return {
        ...state,
        count: state.count - 1,
      };
    case SET_VALUE_TO_ADD:
      return {
        ...state,
        valueToAdd: action.payload,
      };
    case ADD_VALUE_TO_COUNT:
      return {
        ...state,
        // count: action.payload,
        count: state.count + state.valueToAdd,
        valueToAdd: 0,
      };
    default:
      return state;
  }
  // if (action.type === INCREMENT_COUNT) {
  //   return {
  //     ...state,
  //     count: state.count + 1,
  //   };
  // }

  // if (action.type === DECREMENT_COUNT) {
  //   return {
  //     ...state,
  //     count: state.count - 1,
  //   };
  // }

  // if (action.type === SET_VALUE_TO_ADD) {
  //   return {
  //     ...state,
  //     valueToAdd: action.payload,
  //   };
  // }

  // return state;
};

function CounterPage({ initialCount }) {
  // const [count, setCount] = useState(initialCount);
  // const [valueToAdd, setValueToAdd] = useState(0);

  const [state, dispatch] = useReducer(reducer, {
    count: initialCount,
    valueToAdd: 0,
  });
  console.log(state);

  const increment = () => {
    dispatch({
      type: INCREMENT_COUNT,
    });
  };

  const decrement = () => {
    dispatch({
      type: DECREMENT_COUNT,
    });

    // setCount(count - 1);
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value) || 0;

    dispatch({
      type: SET_VALUE_TO_ADD,
      payload: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: ADD_VALUE_TO_COUNT,
      // payload: state.count + state.valueToAdd,   BEST WAY TO HAVE IN DISPATCH MINIMUM LOGIC, AND STUFF LOGIN INTO THE REDUCER
    });
  };

  return (
    <Panel className="m-3">
      <h1 className="text-lg">Count is {state.count}</h1>
      <div className="flex flex-row">
        <Button onClick={increment}>Increment</Button>
        <Button onClick={decrement}>decrement</Button>
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="addalot">Add a lot!</label>
        <input
          value={state.valueToAdd || ""}
          onChange={handleChange}
          type="number"
          className="p-1 m-3 bg-gray-50 border-gray-500"
          id="addalot"
        />
        <Button>Add it!</Button>
      </form>
    </Panel>
  );
}

export default CounterPage;
