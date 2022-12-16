import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  Button,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

// components
import Iconify from "../../components/iconify";

//assets
import CourseImg from "../../assets/course_img.png";

//----------------------------------------------

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const typeColor = (type) => {
  if (type === "OVERALL") return "secondary";
  else if (type === "LISTENING") return "success";
  else if (type === "READING") return "primary";
  else if (type === "WRITING") return "warning";
  else if (type === "SPEAKING") return "error";
};

//----------------------------------------------

export default function CourseStudentPage() {
  const navigate = useNavigate();

  //-------------------------------------------------------------

  const [courseList, setCourseList] = useState([]);
  useEffect(() => {
    axios
      .get("/api/student/courses")
      .then((res) => {
        var myList = res.data;
        setCourseList(myList);
      })
      .catch((error) => navigate("/", { replace: true }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //--------------------------------------

  const [filterValue, setFilterValue] = useState("");

  //--------------------------------------

  const navToCourseDetail = (id, name, cost, requirement, target) => {
    navigate(`/student/course-detail/${id}`, { replace: true });
    localStorage.setItem("courseName", name);
    localStorage.setItem("courseCost", cost);
    localStorage.setItem("courseReq", requirement);
    localStorage.setItem("courseTar", target);
  };

  //--------------------------------------

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          px: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            mb: 3,
            alignItems: "center",
          }}
        >
          <Typography variant="h4">
            Các khóa học tại BK English Center
          </Typography>
          <FormControl sx={{ width: 200 }}>
            <InputLabel id="status-select-label">Loại</InputLabel>
            <Select
              labelId="status-select-label"
              value={filterValue}
              label="Loại"
              onChange={(e) => setFilterValue(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="OVERALL">OVERALL</MenuItem>
              <MenuItem value="LISTENING">LISTENING</MenuItem>
              <MenuItem value="READING">READING</MenuItem>
              <MenuItem value="WRITING">WRITING</MenuItem>
              <MenuItem value="SPEAKING">SPEAKING</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Grid container rowSpacing={4} columnSpacing={4}>
          {courseList
            .filter((course) => course.type.includes(filterValue))
            .map((course, idx) => {
              const { course_id, name, type, requirement, target, cost } =
                course;

              return (
                <Grid item xs={6} md={4}>
                  <Card>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={CourseImg}
                        alt="course"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h4" component="div">
                          {name}
                        </Typography>
                        <Typography variant="h5" color="primary" gutterBottom>
                          {numberWithCommas(cost)}đ
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          Đầu vào: <b>{requirement}</b> - Đầu ra:{" "}
                          <b>{target}+</b>
                        </Typography>
                        <Chip label={type} color={typeColor(type)} />
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button
                        startIcon={
                          <Iconify icon="material-symbols:keyboard-double-arrow-right" />
                        }
                        onClick={() =>
                          navToCourseDetail(
                            course_id,
                            name,
                            cost,
                            requirement,
                            target
                          )
                        }
                      >
                        Tìm hiểu thêm
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </>
  );
}
