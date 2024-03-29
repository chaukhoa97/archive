import { createStore, applyMiddleware } from 'redux';

const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + action.payload;
    case 'DECREMENT':
      return state - action.payload;
    default:
      return state;
  }
};

const middleware1 = (storeAPI) => (next) => (action) => {
  //* Khi `store.dispatch`, nếu có middleware thì tất cả các mw sẽ dc chạy TRƯỚC dispatch: `storeAPI.dispatch(action)` trở thành `mw 1 -> mw 2... -> storeAPI.dispatch(action)`
  //! In reality: Kẹp nhiều middleware và xét theo action type, đụng type nào thì thực hiện middleware tương ứng: middleware2 ở dưới chỉ khi đúng type mới làm
  //* Do anything here: Pass the action onwards with `next(action)`, restart the pipeline (calling the 1st middleware) with `storeAPI.dispatch(action)`, see current state with `storeAPI.getState()`
  setTimeout(() => {
    action.payload = 5; // Middleware can change action value, or do async stuff before passing the action to the next section
  }, 2000);
  let result = next(action); //! Pass the action onwards to the next middleware. Nếu đã execute hết middleware, thì lúc này `next(action)` sẽ là the original `store.dispatch(action)` (line 20)
  // ...Eventually the reducers run and the state is updated
  console.log('next state', storeAPI.getState()); // We can now see what the new state is
  return result; //! Luôn return next(action) ở last line trong middleware
};
const middleware2 = (storeAPI) => (next) => (action) => {
  if (action.type === 'todos/todoAdded') {
    setTimeout(() => {
      console.log('Added a new todo: ', action.payload);
    }, 1000);
  }
  return next(action);
};

const middlewares = applyMiddleware(middleware1, middleware2);
const store = createStore(reducer, middlewares); //* createStore(reducer, [initialState], [enhancer(middleware)])

store.subscribe(() => {
  //* store.subscribe( `fn dc chạy mỗi khi store thay đổi` )
  console.log('current state', store.getState());
});

store.dispatch({
  type: 'INCREMENT',
  payload: 5,
});
store.dispatch({
  type: 'DECREMENT',
  payload: 2,
});
