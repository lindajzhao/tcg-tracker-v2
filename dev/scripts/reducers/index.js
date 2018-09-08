export default (state, action) => {
  if(action.type === "user_change") {
    return Object.assign({}, state, action.payload);
  }
  else if (action.type === "set_cards") {
    console.log(action.payload, "Reducers");
    return Object.assign({}, state, action.payload);
  }
  return state;
};