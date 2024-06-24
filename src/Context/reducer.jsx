import { SET_EDIT_DATA_OBJ, SET_DEFAULT_MODE } from "./action";
const Reducer = (state, action) => {
  switch (action.type) {
    case SET_EDIT_DATA_OBJ:
      return {
        ...state,
        editableObj: action.payload,
      };
    case SET_DEFAULT_MODE:
      return {
        ...state,
        defaultMode: action.payload,
      };
    default:
      return state;
  }
};
export default Reducer;
