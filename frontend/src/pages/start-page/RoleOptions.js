import { useNavigate } from "react-router-dom";
//@mui
import { Link, Button, Typography, Box, Container } from "@mui/material";

import Logo from "../../assets/logo.png";

// -------------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const handleNavToRegister = () => {
    navigate("/register", { replace: true });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          sx={{
            height: 100,
            width: 100,
            m: 2,
          }}
          alt="bklogo"
          src={Logo}
        />
        <Typography component="h1" variant="h3">
          BK English Center
        </Typography>
        <Box
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <Typography variant="h5">Đăng nhập dành cho</Typography>

          <Button
            color="grey"
            fullWidth
            variant="contained"
            onClick={() => navigate("/login-student", { replace: true })}
          >
            Học viên trung tâm
          </Button>

          <Button
            color="grey"
            fullWidth
            variant="contained"
            onClick={() => navigate("/login-teacher", { replace: true })}
          >
            Giáo viên trung tâm
          </Button>

          <Button
            color="grey"
            fullWidth
            variant="contained"
            onClick={() => navigate("/login-admin", { replace: true })}
          >
            Quản trị hệ thống
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 0.5,
            mt: 3,
          }}
        >
          <Typography variant="body2">Bạn chưa có tài khoản?</Typography>
          <Link
            onClick={handleNavToRegister}
            tabIndex={0}
            component="button"
            variant="body2"
          >
            {"Đăng ký"}
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
