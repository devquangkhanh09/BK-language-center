import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { styled } from "@mui/material/styles";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  position: "absolute",
  "& .MuiDialog-container": {
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center",
  },
}));

export default function Popup(props) {
  const { title, children, openPopup, setOpenPopup } = props;

  return (
    <StyledDialog open={openPopup} fullWidth>
      <DialogTitle>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h3" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Button
            color="error"
            onClick={() => {
              setOpenPopup(false);
            }}
          >
            <CloseIcon />
          </Button>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </StyledDialog>
  );
}
