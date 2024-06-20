import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Slide from '@mui/material/Slide';
import { forwardRef } from "react";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const AddFoodDialog = ({ openDialog, setterFun, handler }) => {
  return (
    <Dialog open={openDialog} onClose={() => setterFun(false)} TransitionComponent={Transition}>
      <DialogTitle>AddFood</DialogTitle>
      <DialogContent dividers={true}>hello</DialogContent>
    </Dialog>
  );
};

export default AddFoodDialog;
