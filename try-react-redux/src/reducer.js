const defaultState = { counter: 0 }
export function counter(state = defaultState, action) {
  switch(action.type) {
    case 'CLICK_ON_RIGHT':
      return { counter: state.counter + 1 };
    case 'CLICK_ON_LEFT':
      return { counter: state.counter - 1 };
    default:
      return state;
  }
}
