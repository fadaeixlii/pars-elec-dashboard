import * as React from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { LoadingButton } from "@mui/lab";
import { Dialog } from "@mui/material";

// eslint-disable-next-line react-refresh/only-export-components
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface useDialogProps {
  title: string;
  description: string;
  onCancel?: () => void;
  onOk: () => Promise<void> | void;
}

export default function useDialog(props: useDialogProps) {
  const { description, onCancel, onOk, title } = props;

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (onCancel) onCancel();
    setOpen(false);
  };

  return {
    Dialog: (
      <React.Fragment>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {description}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <LoadingButton
              loading={loading}
              variant="outlined"
              color="error"
              onClick={handleClose}
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              loading={loading}
              variant="outlined"
              color="success"
              onClick={async () => {
                setLoading(true);
                await onOk();
                setOpen(false);
                setLoading(false);
              }}
            >
              OK
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    ),
    handleOpen: handleClickOpen,
    handleClose,
  };
}
