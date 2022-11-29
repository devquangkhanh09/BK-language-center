import { useState } from "react";
import { useNavigate } from "react-router-dom";
//@mui
import {
  TextField,
  Link,
  Button,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  Grid,
} from "@mui/material";
// components
import Iconify from "../../components/iconify";

import Logo from "../../assets/logo.png";

const initialFValues = {
  full_name: "",
  phone_number: "",
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
    validate({ [name]: value });
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("full_name" in fieldValues)
      temp.full_name = fieldValues.full_name ? "" : "Điền họ và tên!";
    if ("phone_number" in fieldValues)
      temp.phone_number = fieldValues.phone_number ? "" : "Điền số điện thoại!";
    if ("username" in fieldValues)
      temp.username = fieldValues.username ? "" : "Điền tên tài khoản!";
    if ("password" in fieldValues)
      temp.password = fieldValues.password ? "" : "Điền mật khẩu!";
    setErrors({ ...temp });

    // return true if there're any errors
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate("/", { replace: true });
      resetForm();
    }
  };

  const handleNavToLogin = () => {
    navigate("/", { replace: true });
  };

  return (
    <Box
      sx={{
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
        Đăng ký học viên
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            margin="normal"
            fullWidth
            label="Họ và tên"
            name="full_name"
            value={values.full_name}
            onChange={handleInputChange}
            {...(errors.full_name && {
              error: true,
              helperText: errors.full_name,
            })}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            margin="normal"
            fullWidth
            label="Số điện thoại"
            name="phone_number"
            value={values.phone_number}
            onChange={handleInputChange}
            {...(errors.phone_number && {
              error: true,
              helperText: errors.phone_number,
            })}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            margin="normal"
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
        </Grid>
        <Grid item xs={6}>
          <TextField
            margin="normal"
            fullWidth
            label="Mật khẩu"
            name="password"
            value={values.password}
            onChange={handleInputChange}
            {...(errors.password && {
              error: true,
              helperText: errors.password,
            })}
            type={showPassword ? "password" : "text"}
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
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ height: 50, m: 2, width: "50%" }}
        onClick={handleSubmit}
      >
        Đăng ký
      </Button>

      <Box
        sx={{
          display: "flex",
          gap: 0.5,
        }}
      >
        <Typography variant="body2">Bạn đã có tài khoản?</Typography>
        <Link
          onClick={handleNavToLogin}
          tabIndex={0}
          component="button"
          variant="body2"
        >
          {"Đăng nhập"}
        </Link>
      </Box>
    </Box>
  );
}
