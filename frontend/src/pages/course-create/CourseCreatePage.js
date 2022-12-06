import axios from "axios";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
//@mui
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
  Pagination,
  IconButton,
} from "@mui/material";

import Iconify from "../../components/iconify";
import Popup from "../../components/popup";
import Notification from "../../components/notification";

import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const ITEM_PER_PAGE = 3;
const MAX_PAGE = 5;

//-------------------------------------------------

const initCourse = {
  id: "",
  name: "",
  type: "",
  requirement: -1,
  target: -1,
  cost: -1,
  numOfLecture: 0,
};

const initLesson = {
  lecture: 0,
  description: "",
};

//-------------------------------------------------

export default function CourseCreatePage() {
  const [notiPage, setNotiPage] = useState(0);

  const [openPopup, setOpenPopup] = useState(false);

  const navigate = useNavigate();

  //------------------------------------------------

  const [courseInfo, setCourseInfo] = useState(initCourse);

  const [error, setError] = useState(false);

  const validateNotEmpty = (field = courseInfo) => {
    var bool_exp =
      field.id === "" ||
      field.name === "" ||
      field.type === "" ||
      !field.requirement ||
      !field.target ||
      !field.cost;
    if (bool_exp) setError(true);
    else setError(false);
    return !bool_exp;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseInfo({
      ...courseInfo,
      [name]: value,
    });
    validateNotEmpty({ [name]: value });
  };

  const resetForm = () => {
    setCourseInfo(initCourse);
    setError(false);
  };

  const handleSubmitInfo = (e) => {
    e.preventDefault();
    if (validateNotEmpty()) {
      //console.log(courseInfo);
      const newCourse = {
        id: courseInfo.id,
        name: courseInfo.name,
        type: courseInfo.type,
        requirement: courseInfo.requirement,
        target: courseInfo.target,
        cost: courseInfo.cost,
        numOfLecture: curriculum.length,
        curriculum: curriculum,
      };
      //console.log(newCourse.id);
      axios
        .post("/api/admin/course-create", newCourse)
        .then((res) => {
          //to-do: handle success
          setActStatus(true);
          setOpenNoti(true);
        })
        .catch((error) => {
          //to-do: handle fail
          setActStatus(false);
          setOpenNoti(true);
        });
      resetForm();
    } else {
      //to-do: handle error
      setActStatus(false);
      setOpenNoti(true);
    }
  };

  //------------------------------------------------

  const [lesson, setLesson] = useState(initLesson);

  const [curriculum, setCurriculum] = useState([]);

  const [lesError, setLesError] = useState(false);

  const [dupError, setDupError] = useState(0);

  const handleInputLesson = (e) => {
    const { name, value } = e.target;
    setLesson({
      ...lesson,
      [name]: value,
    });
  };

  const resetLessonForm = () => {
    setLesson({ ...initLesson, lecture: Number(lesson.lecture) + 1 });
    setLesError(false);
    setDupError(0);
  };

  const handleAddLesson = () => {
    let i = 0;
    for (; i < curriculum.length; i++)
      if (curriculum[i].lecture === lesson.lecture) break;

    if (
      lesson.description !== "" &&
      lesson.lecture !== 0 &&
      i === curriculum.length
    ) {
      //to-do
      var newLesson = { ...lesson };
      setCurriculum([...curriculum, newLesson]);
      resetLessonForm();
    } else {
      if (lesson.description === "" || lesson.lecture === 0) setLesError(true);
      if (i < curriculum.length) setDupError(lesson.lecture);
    }
  };

  const handleDeleteLesson = (e, lecture) => {
    e.preventDefault();
    var new_list = curriculum.filter((item) => item.lecture !== lecture);
    setCurriculum(new_list);
  };

  //------------------------------------------------

  const [openNoti, setOpenNoti] = useState(false);

  const [actStatus, setActStatus] = useState(false);

  const handleCloseNoti = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenNoti(false);
  };

  //--------------------------------------------------

  return (
    <>
      <Container>
        <Typography variant="h4" gutterBottom>
          Tạo khóa học
        </Typography>
        <Box
          sx={{
            mt: 5,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Grid container spacing={5}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Thông tin khóa học
              </Typography>
              <TextField
                margin="normal"
                fullWidth
                label="Mã khóa học"
                name="id"
                value={courseInfo.id}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Tên khóa học"
                name="name"
                value={courseInfo.name}
                onChange={handleInputChange}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="type-select-label">Loại khóa học</InputLabel>
                <Select
                  labelId="type-select-label"
                  label="Loại khóa học"
                  name="type"
                  value={courseInfo.type}
                  onChange={handleInputChange}
                >
                  <MenuItem value="OVERALL">OVERALL</MenuItem>
                  <MenuItem value="LISTENING">LISTENING</MenuItem>
                  <MenuItem value="READING">READING</MenuItem>
                  <MenuItem value="SPEAKING">SPEAKING</MenuItem>
                  <MenuItem value="WRITING">WRITING</MenuItem>
                </Select>
              </FormControl>
              <TextField
                margin="normal"
                fullWidth
                label="Yêu cầu đầu vào"
                name="requirement"
                value={courseInfo.requirement}
                onChange={handleInputChange}
                type="number"
              />
              <TextField
                margin="normal"
                fullWidth
                label="Mục tiêu đầu ra"
                name="target"
                value={courseInfo.target}
                onChange={handleInputChange}
                type="number"
              />
              <TextField
                margin="normal"
                fullWidth
                label="Phí"
                name="cost"
                value={courseInfo.cost}
                onChange={handleInputChange}
                type="number"
              />
              {error ? (
                <Typography variant="body2" color="error">
                  <em>Điền đầy đủ tất cả các trường.</em>
                </Typography>
              ) : null}
              <Button
                variant="contained"
                startIcon={<SaveAsOutlinedIcon />}
                onClick={handleSubmitInfo}
                sx={{ mt: 2 }}
              >
                Lưu khóa học
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">Chương trình học</Typography>
                <Button
                  variant="contained"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                  onClick={() => setOpenPopup(true)}
                >
                  Thêm buổi học
                </Button>
              </Box>
              <Paper
                elevation={3}
                sx={{
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mt: 4,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    mb: 3,
                  }}
                >
                  Danh sách đã thêm
                </Typography>
                {curriculum
                  .sort((a, b) => a.lecture - b.lecture)
                  .slice(
                    notiPage * ITEM_PER_PAGE,
                    notiPage * ITEM_PER_PAGE + ITEM_PER_PAGE
                  )
                  .map((item, idx) => {
                    const { lecture, description } = item;
                    return (
                      <Box
                        key={idx}
                        sx={{
                          padding: 2,
                          display: "flex",
                          flexDirection: "column",
                          bgcolor: "#ebf1ff",
                          borderRadius: 3,
                          mb: 2,
                          width: "100%",
                          gap: 0.5,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 0.5,
                            alignItems: "center",
                          }}
                        >
                          <IconButton
                            color="error"
                            size="small"
                            onClick={(e) => handleDeleteLesson(e, lecture)}
                          >
                            <RemoveCircleOutlineIcon />
                          </IconButton>

                          <Typography variant="subtitle1">
                            <em>Buổi thứ {lecture}</em>
                          </Typography>
                        </Box>
                        <Typography variant="body1" sx={{ mx: 4.5 }}>
                          {description}
                        </Typography>
                      </Box>
                    );
                  })}
                <Pagination
                  count={MAX_PAGE}
                  color="primary"
                  onChange={(e, value) => setNotiPage(value - 1)}
                />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Popup
        title="Thêm buổi học"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            fullWidth
            label="Thứ tự buổi"
            name="lecture"
            value={lesson.lecture}
            onChange={handleInputLesson}
            type="number"
          />
          <TextField
            multiline
            rows={4}
            label="Mô tả"
            name="description"
            value={lesson.description}
            onChange={handleInputLesson}
            type="text"
            sx={{
              width: "100%",
              my: 2,
            }}
          />
          {lesError ? (
            <Typography gutterBottom variant="body2" color="error">
              <em>Điền đầy đủ tất cả các trường.</em>
            </Typography>
          ) : null}
          {dupError !== 0 ? (
            <Typography gutterBottom variant="body2" color="error">
              <em>Buổi {dupError} đã có trong chương trình học.</em>
            </Typography>
          ) : null}
          <Button
            sx={{ my: 1, height: 50, width: "30%" }}
            variant="contained"
            startIcon={<SaveAsOutlinedIcon />}
            onClick={handleAddLesson}
          >
            Lưu lại
          </Button>
        </Box>
      </Popup>

      <Notification
        open={openNoti}
        handleClose={handleCloseNoti}
        status={actStatus}
      />
    </>
  );
}
