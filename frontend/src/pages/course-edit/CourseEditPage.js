import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  requirement: "",
  target: "",
  cost: "",
  teacher_requirement: "",
  numOfLecture: 0,
};

const initLesson = {
  lecture: 1,
  description: "",
};

//-------------------------------------------------

export default function CourseEditPage() {
  const [notiPage, setNotiPage] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);

  const navigate = useNavigate();
  const navToCourse = () => {
    navigate("/admin/courses", { replace: true });
  };

  //------------------------------------------------
  const { id } = useParams();
  const [courseInfo, setCourseInfo] = useState(initCourse);
  const [error, setError] = useState(false);

  const validateNotEmpty = (field = courseInfo) => {
    var bool_exp =
      field.id === "" ||
      field.name === "" ||
      field.type === "" ||
      field.requirement === "" ||
      field.target === "" ||
      field.cost === "" ||
      field.teacher_requirement === "";
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

  const handleSubmitInfo = (e) => {
    e.preventDefault();
    if (validateNotEmpty()) {
      const editCourse = {
        id: courseInfo.id,
        name: courseInfo.name,
        type: courseInfo.type,
        requirement: parseFloat(courseInfo.requirement),
        target: parseFloat(courseInfo.target),
        cost: parseFloat(courseInfo.cost),
        teacher_requirement: parseFloat(courseInfo.teacher_requirement),
        numOfLecture: parseInt(curriculum.length),
        curriculum: curriculum,
      };
      axios
        .put("/api/admin/course-edit", editCourse)
        .then((res) => {
          //to-do: handle success
          setActStatus(true);
          setOpenNoti(true);
        })
        .catch((error) => {
          //to-do: handle fail
          if (error.response) setActMessage(error.response.data.message);
          else setActMessage(error.message);
          setActStatus(false);
          setOpenNoti(true);
        });
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
      var newLesson = { lecture: Number(lesson.lecture), description: lesson.description };
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

  useEffect(() => {
    axios
      .get(`/api/admin/course/${id}`)
      .then((res) => {
        const course = res.data.course;
        const courseCur = res.data.courseCur;
        setCourseInfo({
          id: course.course_id,
          ...course
        });

        setCurriculum(courseCur.map(cur => ({lecture: cur.lecture, description: cur.description})));
        setLesson({ lecture: courseInfo.numOfLecture + 1, description: "" });
      })
      .catch((error) => navigate("/", { replace: true }));
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //------------------------------------------------

  const [openNoti, setOpenNoti] = useState(false);
  const [actStatus, setActStatus] = useState(false);
  const [actMessage, setActMessage] = useState("");

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
        <Button
          startIcon={<Iconify icon="material-symbols:arrow-back" />}
          onClick={navToCourse}
          sx={{ mb: 2 }}
        >
          Quay l???i
        </Button>
        <Typography variant="h4" gutterBottom>
          Ch???nh s???a kh??a h???c: {id}
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
                Th??ng tin kh??a h???c
              </Typography>
              <TextField
                disabled
                margin="normal"
                fullWidth
                label="M?? kh??a h???c"
                name="id"
                value={courseInfo.id}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                fullWidth
                label="T??n kh??a h???c"
                name="name"
                value={courseInfo.name}
                onChange={handleInputChange}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="type-select-label">Lo???i kh??a h???c</InputLabel>
                <Select
                  labelId="type-select-label"
                  label="Lo???i kh??a h???c"
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
                label="Y??u c???u ?????u v??o"
                name="requirement"
                value={courseInfo.requirement}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                fullWidth
                label="M???c ti??u ?????u ra"
                name="target"
                value={courseInfo.target}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Ph??"
                name="cost"
                value={courseInfo.cost}
                onChange={handleInputChange}
              />
              <TextField 
                margin="normal"
                fullWidth
                label="Y??u c???u gi???ng vi??n"
                name="teacher_requirement"
                value={courseInfo.teacher_requirement}
                onChange={handleInputChange}
              />
              {error ? (
                <Typography variant="body2" color="error">
                  <em>??i???n ?????y ????? t???t c??? c??c tr?????ng.</em>
                </Typography>
              ) : null}
              <Button
                variant="contained"
                startIcon={<SaveAsOutlinedIcon />}
                onClick={handleSubmitInfo}
                sx={{ mt: 2 }}
              >
                L??u thay ?????i
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
                <Typography variant="h6">Ch????ng tr??nh h???c</Typography>
                <Button
                  variant="contained"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                  onClick={() => setOpenPopup(true)}
                >
                  Th??m bu???i h???c
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
                  Danh s??ch ???? th??m
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
                            <em>Bu???i th??? {lecture}</em>
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
        title="Th??m bu???i h???c"
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
            label="Th??? t??? bu???i"
            name="lecture"
            value={lesson.lecture}
            onChange={handleInputLesson}
            type="number"
          />
          <TextField
            multiline
            rows={4}
            label="M?? t???"
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
              <em>??i???n ?????y ????? t???t c??? c??c tr?????ng.</em>
            </Typography>
          ) : null}
          {dupError !== 0 ? (
            <Typography gutterBottom variant="body2" color="error">
              <em>Bu???i {dupError} ???? c?? trong ch????ng tr??nh h???c.</em>
            </Typography>
          ) : null}
          <Button
            sx={{ my: 1, height: 50, width: "30%" }}
            variant="contained"
            startIcon={<SaveAsOutlinedIcon />}
            onClick={handleAddLesson}
          >
            L??u l???i
          </Button>
        </Box>
      </Popup>

      <Notification
        open={openNoti}
        handleClose={handleCloseNoti}
        status={actStatus}
        message={actMessage}
      />
    </>
  );
}
