import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  Avatar,
  Popover, 
  ButtonBase,
} from "@mui/material";
import AvaImg from '../../assets/avatar_default.jpg'

// ----------------------------------------------------------------------

export default function AccountPopover({name}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleSignOut = () => {
    axios.post('/api/signout')
      .then(() => {
        localStorage.setItem("isAuthenticated", false);
        localStorage.setItem("role", "");
        navigate("/", { replace: true });
      })
      .catch(err => console.log(err))
  }
  
  const iconBackColorOpen = (theme) => theme.palette.grey[300];

  return (
    <>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open ? iconBackColorOpen : "transparent",
          borderRadius: 1,
          "&:hover": { bgcolor: "background.neutral" },
        }}
        aria-label="open profile"
        aria-controls={open ? "profile-grow" : undefined}
        aria-haspopup="true"
        onClick={handleOpen}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
          <Avatar
            alt="profile user"
            src={AvaImg}
            sx={{ width: 40, height: 40 }}
          />
          <Typography variant="subtitle1" sx={{ color: "text.primary" }}>
            {name}
          </Typography>
        </Stack>
      </ButtonBase>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 200,
            "& .MuiMenuItem-root": {
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Box>


        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={handleSignOut} sx={{ m: 1 }}>
          Đăng xuất
        </MenuItem>
      </Popover>
    </>
  );
}
