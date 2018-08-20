const initialState = {
  items: [...Array(5)].map((_, i) => {
    return {
      done: false,
      content: {
        title: `Item #${i}`,
        detail: "Something to do",
      }
    }
  })
};

function app(state = initialState, action) {
  switch(action.type) {
    case 'TOGGLE TASK':
      return {
        items: state.items.map((item, i) => {
          return i === action.i ? {
            done: !item.done,
            content: item.content
          } : item
        })
      }
    default:
      return state;
  }
}

export default app;
