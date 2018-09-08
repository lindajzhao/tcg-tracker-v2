export default (state, action) => {
  if(action.type === "user_change") {
    return Object.assign({}, state, action.payload);
  }
  else if (action.type === "set_cards") {
    
    localStorage.setItem("test", JSON.stringify(action.payload));
    return Object.assign({}, state, action.payload);
  }
  return state;
};