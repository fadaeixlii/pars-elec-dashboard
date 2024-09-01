import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Typography } from "@mui/material";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  minWidth: 700,
  maxHeight: "90vh",
  overflowY: "auto",
  p: 4,
};

interface useModalProps {
  children: React.ReactNode;
  title: string;
  onCancel?: () => void;
}

export default function useModal(props: useModalProps) {
  const { children, onCancel, title } = props;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    if (onCancel) onCancel();
    setOpen(false);
  };

  return {
    Modal: (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" align="center" color="HighlightText">
            {title}
          </Typography>
          {children}
        </Box>
      </Modal>
    ),
    handleOpen,
    handleClose,
  };
}
