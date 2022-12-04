import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// component
import HelpIcon from "@mui/icons-material/Help";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  position: "absolute",
  "& .MuiDialog-container": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function ConfirmPopup({
  open,
  setOpen,
  content,
  confirmParams,
  confirmAction
}) {
  return (
    <StyledDialog open={open}>
      <Box
        sx={{
          padding: "24px",
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <HelpIcon color="warning" sx={{ fontSize: 80 }} />
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              paddingBottom: "18px",
            }}
          >
            {content}
          </Typography>
          <Box
            sx={{
              width: "90%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "18px",
            }}
          >
            <Button variant="outlined" onClick={() => confirmAction(confirmParams)}>
              Xác nhận
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setOpen(false)}
            >
              Hủy bỏ
            </Button>
          </Box>
        </DialogContent>
      </Box>
    </StyledDialog>
  );
}
