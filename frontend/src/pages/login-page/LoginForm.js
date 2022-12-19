import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
//@mui
import {
  TextField,
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
import axios from "axios";

const initialFValues = {
  username: "",
  password: "",
};

// -------------------------------------------------------------------------

export default function LoginForm({role}) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});
  const [signInError, setSignInError] = useState(false);

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
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateNotEmpty()) { 
      axios
        .post(`/api/signin-${role}`, values)
        .then((res) => {
          localStorage.setItem("isAuthenticated", true);
          localStorage.setItem("role", res.data.role);
          localStorage.setItem("name", res.data.name);
          if (res.data.role === "admin") navigate("/admin/courses", { replace: true });
          else if (res.data.role === "student") navigate("/student/courses", { replace: true });
          else navigate("/teacher/classes", { replace: true });
        })
        .catch((error) => setSignInError(true));
      resetForm();
    }
  };

  const navToStart = () => {
    navigate("/", { replace: true });
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
          {signInError ? (
            <Typography variant="body2" color="error">
              <em>Nhập sai tên tài khoản hoặc mật khẩu.</em>
            </Typography>
          ) : null}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ height: 50, mt: 2, mb: 1 }}
            onClick={handleSubmit}
          >
            Đăng nhập
          </Button>
        </Box>
        <Button onClick={navToStart} sx={{ fontWeight: 500 }}>
          Quay lại
        </Button>
      </Box>
    </Container>
  );
}
