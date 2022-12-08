import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({
    open,
    handleClose,
    status,
    message
}) {
  return (
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={status? "success": "error"}  sx={{ width: "100%" }}>
          {status? 'Thao tác thành công!' : `Thao tác thất bại! Lỗi: ${message}`}
        </Alert>
      </Snackbar>
  );
}
