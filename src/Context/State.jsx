/* eslint-disable react/prop-types */
import { useReducer } from "react";
import Context from "./Context";
import Reducer from "./reducer";
import { SET_EDIT_DATA_OBJ, SET_DEFAULT_MODE } from "./action";

export default function State(props) {
  const initialState = {
    editableObj: {},
    defaultMode: false,
  };

  const [state, dispatch] = useReducer(Reducer, initialState);

  const setEditableObj = (project) => {
    dispatch({
      type: SET_EDIT_DATA_OBJ,
      payload: project,
    });
  };

  const setDefaultMode = (mode) => {
    dispatch({
      type: SET_DEFAULT_MODE,
      payload: mode,
    });
  };

  return (
    <Context.Provider
      value={{
        editableObj: state.editableObj,
        defaultMode: state.defaultMode,
        setEditableObj,
        setDefaultMode,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
