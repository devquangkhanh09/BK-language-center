import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Button,
  Box,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// components
import Iconify from "../../components/iconify";

//assets
import CourseImg from "../../assets/course_img.png";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function CourseDetailPage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const navToCourse = () => {
    navigate("/student/courses", { replace: true });
  };

  //----------------------------------------------------
  const [curList, setCurList] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [courseCost, setCourseCost] = useState("");
  const [courseReq, setCourseReq] = useState("");
  const [courseTar, setCourseTar] = useState("");

  useEffect(() => {
    let tmp = localStorage.getItem("courseName");
    setCourseName(tmp);
    tmp = localStorage.getItem("courseCost");
    setCourseCost(tmp);
    tmp = localStorage.getItem("courseReq");
    setCourseReq(tmp);
    tmp = localStorage.getItem("courseTar");
    setCourseTar(tmp);

    axios
      .get("/api/student/curriculums")
      .then((res) => {
        var myList = res.data.filter((item) => item.course_id === id);
        setCurList(myList);
      })
      .catch((error) => navigate("/", { replace: true }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //--------------------------------------

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "left",
        gap: 1,
        px: 3,
      }}
    >
      <Button
        startIcon={<Iconify icon="material-symbols:arrow-back" />}
        onClick={navToCourse}
        sx={{ mb: 2, width: 120 }}
      >
        Quay lại
      </Button>
      <Typography variant="h3" sx={{ mb: 3 }}>
        {courseName}
      </Typography>
      <Grid container rowSpacing={4} columnSpacing={5}>
        <Grid item xs={12} md={8}>
          <Typography variant="body2" sx={{ mb: 3 }}>
            Khóa học IELTS cho người mới bắt đầu - IELTS Foundation sẽ giúp bạn
            vượt qua “nỗi sợ” này, xây dựng một nền tảng kiến thức vững chắc cho
            kỳ thi phía trước.
          </Typography>
          <Typography variant="h4" component="div">
            Khóa học dành cho ai?
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <ThumbUpIcon />
              </ListItemIcon>
              <ListItemText primary="Chưa có nền tảng tiếng Anh vững chắc;" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ThumbUpIcon />
              </ListItemIcon>
              <ListItemText primary="Yếu ngữ pháp, chưa biết nhận dạng và sử dụng các dạng từ phổ biến;" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ThumbUpIcon />
              </ListItemIcon>
              <ListItemText primary="Phát âm chưa chuẩn, còn sai nhiều âm cơ bản." />
            </ListItem>
          </List>
          <Typography variant="h4" component="div" sx={{ mt: 3, mb: 0.5 }}>
            Nội dung khóa học
          </Typography>
          <Typography variant="body1" component="div" sx={{ mb: 2 }}>
            <b>{curList.length}</b> buổi học
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {curList.map((curr, id) => {
              const { description } = curr;
              return (
                <Button
                  style={{ justifyContent: "flex-start" }}
                  startIcon={<KeyboardArrowDownIcon />}
                  sx={{
                    color: "black",
                    backgroundColor: "#E2E2E2",
                    borderColor: "green",
                  }}
                >
                  {description}
                </Button>
              );
            })}
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            component="img"
            sx={{
              borderRadius: 3,
              width: "100%",
              mb: 2,
            }}
            alt="course"
            src={CourseImg}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              mb: 4,
            }}
          >
            <Typography
              variant="h3"
              component="div"
              sx={{ mb: 1, color: "#FF5607" }}
            >
              {numberWithCommas(courseCost)}đ
            </Typography>
            <Button
              size="large"
              sx={{
                width: "60%",
                color: "white",
                backgroundColor: "#FF5607",
              }}
            >
              Đăng ký lớp
            </Button>
          </Box>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              mb: 1,
              ml: 2,
            }}
          >
            <CheckCircleIcon />
            <Typography variant="body1" component="div" sx={{ mb: 1 }}>
              Tổng số <b>{curList.length}</b> buổi học
            </Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              mb: 1,
              ml: 2,
            }}
          >
            <CheckCircleIcon />
            <Typography variant="body1" component="div" sx={{ mb: 1 }}>
              Học online hoặc offine
            </Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={2}
            sx={{
              mb: 1,
              ml: 2,
            }}
          >
            <CheckCircleIcon />
            <Typography variant="body1" gutterBottom>
              Đầu vào: <b>{courseReq}</b> - Đầu ra: <b>{courseTar}+</b>
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
