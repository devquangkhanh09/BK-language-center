import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
//@mui
import {
  TextField,
  Link,
  Button,
  Typography,
  Box,
  Container,
  InputAdornment,
  IconButton,
} from "@mui/material";
// components
import Iconify from "../../components/iconify";

import Logo from "../../assets/logo.png";

const initialFValues = {
  username: "",
  password: "",
};

// -------------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    validateNotEmpty({ [name]: value });
  };

  const validateNotEmpty = (fieldValues = values) => {
    let temp = { ...errors };
    if ("username" in fieldValues)
      temp.username = fieldValues.username ? "" : "Điền tên tài khoản!";
    if ("password" in fieldValues)
      temp.password = fieldValues.password ? "" : "Điền mật khẩu";
    setErrors({ ...temp });

    // return true if there aren't any errors
    return Object.values(temp).every((x) => x === "");
  }

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateNotEmpty()) {
      navigate("/admin/courses", { replace: true });
      resetForm();
    }
  };

  const handleNavToRegister = () => {
    navigate("/register", { replace: true });
  }

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
        <Typography component="h1" variant="h4">
          BK English Center
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Tên tài khoản"
            name="username"
            value={values.username}
            onChange={handleInputChange}
            {...(errors.username && {
              error: true,
              helperText: errors.username,
            })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Mật khẩu"
            name="password"
            value={values.password}
            onChange={handleInputChange}
            {...(errors.password && {
              error: true,
              helperText: errors.password,
            })}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ height: 50, my: 2 }}
            onClick={handleSubmit}
          >
            Đăng nhập
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 0.5,
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
