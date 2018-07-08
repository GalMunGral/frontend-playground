const initialState = {
  items: [{
    done: false,
    content: {
      title: "Item 1",
      detail: "First item!!",
    }
  }, {
    done: true,
    content: {
      title: "Some Hidden Item",
      detail: "I'm already done...",
    }
  }, {
    done: false,
    content: {
      title: "Item 3",
      detail: "Number 2 is gone",
    }
  }]
};

function app(state = initialState, action) {
  switch(action.type) {
    case 'COMPLETE TASK':
      return {
        items: state.items.map((item, i) => {
          return i === action.i ? {
            done: true,
            content: item.content
          } : item
        })
      }
    default:
      return state;
  }
}

export default app;