//making reducer function
const initialState = {
  user: null,
  delete: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: { ...action.payload },
      };
    case "LOGOUT":
      localStorage.removeItem("userToken");
      return {
        ...state,
        user: null,
      };
    case "DELETE":
      return {
        ...state,
        delete: !state.delete,
      };
    default:
      return state;
  }
};

export default reducer;
