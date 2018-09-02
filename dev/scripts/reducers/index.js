export default (state, action) => {
  if(action.type === "user_change") {
    return Object.assign({}, state, action.payload);
  }

  return state;
};