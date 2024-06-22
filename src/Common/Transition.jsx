import React, { forwardRef } from "react";
import Slide from "@mui/material/Slide"; // Assuming Slide is imported from MUI or another library

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default Transition;
