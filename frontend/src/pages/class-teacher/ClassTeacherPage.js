import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Button,
  Typography,
  Grid,
  Box,
  Chip,
  Slide,
  AppBar,
  Dialog,
  Toolbar,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Iconify from "../../components/iconify";
import { useEffect, useState, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Notification from "../../components/notification";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ClassTeacherPage() {
  const [classList, setClassList] = useState([]);
  const navigate = useNavigate();

  //-----------------------------------------------------
  useEffect(() => {
    axios
      .get(`/api/teacher/classes`)
      .then((res) => {
        let tmp_name = localStorage.getItem("name");
        var myList = res.data.filter((item) => item.teacher_name === tmp_name);
        setClassList(myList);
      })
      .catch((error) => navigate("/", { replace: true }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //-----------------------------------------------------
  const [studentClassList, setStudentClassList] = useState([]);
  const handleEnterGrade = (class_id) => {
    axios
      .get(`/api/teacher/student-class`)
      .then((res) => {
        var myList = res.data.filter((item) => item.class_id === class_id);
        setStudentClassList(myList);
        setOpen(true);
      })
      .catch((error) => navigate("/", { replace: true }));
  };

  const [open, setOpen] = useState(false);

  const handleSave = () => {
    //handle submit data
    axios
      .put("/api/teacher/enter-grade", studentClassList)
      .then((res) => {
        //to-do: handle success
        setActStatus(true);
        setOpenNoti(true);
        setOpen(false);
      })
      .catch((error) => {
        //to-do: handle fail
        if (error.response) setActMessage(error.response.data.message);
        else setActMessage(error.message);
        setActStatus(false);
        setOpenNoti(true);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  //-----------------------------------------------------

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    var tmp_list = [...studentClassList];
    let idx = tmp_list.findIndex((item) => item.student_id === id);
    if (name === "overall") {
      tmp_list[idx].grade_overall = Number(value);
    } else if (name === "reading") {
      tmp_list[idx].grade_reading = Number(value);
    } else if (name === "listening") {
      tmp_list[idx].grade_listening = Number(value);
    } else if (name === "writing") {
      tmp_list[idx].grade_writing = Number(value);
    } else if (name === "speaking") {
      tmp_list[idx].grade_speaking = Number(value);
    }
    setStudentClassList(tmp_list);
  };

  //-----------------------------------------------------

  const [openNoti, setOpenNoti] = useState(false);
  const [actStatus, setActStatus] = useState(false);
  const [actMessage, setActMessage] = useState("");

  const handleCloseNoti = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenNoti(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: 12,
        }}
      >
        <Grid container spacing={4}>
          {classList.map((_class, idx) => {
            const {
              course_id,
              class_id,
              start_date,
              end_date,
              form,
              branch_id,
              room,
              time,
              teacher_name,
            } = _class;

            return (
              <Grid item xs={12} key={idx}>
                <Card sx={{ px: 4, pt: 2, minWidth: 275, height: "100%" }}>
                  <CardHeader
                    title={
                      <Typography variant="h3" color="blue">
                        Lớp học {class_id} (Khoá học {course_id})
                      </Typography>
                    }
                    subheader={
                      start_date > (new Date()).toISOString().split('T')[0]
                      ? <Chip label={ "Chưa diễn ra" } color="info" />
                      : end_date >= (new Date()).toISOString().split('T')[0]
                      ? <Chip label={ "Đang diễn ra" } color="success" />
                      : <Chip label={ "Đã hoàn thành" } color="default" />
                    }
                  />

                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="body1">
                          <b>Ngày bắt đầu:</b> {start_date}
                          <br />
                          <b>Ngày kết thúc:</b> {end_date}
                          <br />
                          <b>Hình thức:</b> {form}
                          <br />
                          <b>Chi nhánh:</b> {branch_id}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="body1">
                          <b>Phòng:</b> {room}
                          <br />
                          <b>Thời gian học:</b> {time}
                          <br />
                          <b>Giảng viên:</b> {teacher_name}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="outlined"
                      color="error"
                      sx={{
                        fontSize: "16px",
                        borderRadius: 30,
                        margin: "0 auto 15px",
                      }}
                      disabled={end_date >= (new Date()).toISOString().split('T')[0]}
                      startIcon={<Iconify icon="eva:plus-fill" />}
                      onClick={() => handleEnterGrade(class_id)}
                    >
                      Nhập điểm
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Nhập điểm
            </Typography>
            <Button
              autoFocus
              variant="contained"
              color="success"
              onClick={handleSave}
            >
              Lưu lại
            </Button>
          </Toolbar>
        </AppBar>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell key="id">ID học viên</TableCell>
                <TableCell align="center" key="overall">Overall</TableCell>
                <TableCell align="center" key="reading">Reading</TableCell>
                <TableCell align="center" key="listening">Listening</TableCell>
                <TableCell align="center" key="writing">Writing</TableCell>
                <TableCell align="center" key="speaking">Speaking</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentClassList.map((row) => (
                <TableRow
                  key={row.student_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" key="id">
                    {row.student_id}
                  </TableCell>
                  <TableCell align="center" key="overall">
                    {" "}
                    <TextField
                      type="number"
                      value={row.grade_overall}
                      name="overall"
                      disabled
                      sx={{
                        width: 70,
                      }}
                      onChange={(e) => handleInputChange(e, row.student_id)}
                    />
                  </TableCell>
                  <TableCell align="center" key="reading">
                    {" "}
                    <TextField
                      type="number"
                      value={row.grade_reading}
                      name="reading"
                      sx={{
                        width: 70,
                      }}
                      onChange={(e) => handleInputChange(e, row.student_id)}
                    />
                  </TableCell>
                  <TableCell align="center" key="listening">
                    {" "}
                    <TextField
                      type="number"
                      value={row.grade_listening}
                      name="listening"
                      sx={{
                        width: 70,
                      }}
                      onChange={(e) => handleInputChange(e, row.student_id)}
                    />
                  </TableCell>
                  <TableCell align="center" key="writing">
                    {" "}
                    <TextField
                      type="number"
                      value={row.grade_writing}
                      name="writing"
                      sx={{
                        width: 70,
                      }}
                      onChange={(e) => handleInputChange(e, row.student_id)}
                    />
                  </TableCell>
                  <TableCell align="center" key="speaking">
                    {" "}
                    <TextField
                      type="number"
                      value={row.grade_speaking}
                      name="speaking"
                      sx={{
                        width: 70,
                      }}
                      onChange={(e) => handleInputChange(e, row.student_id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Dialog>
      <Notification
        open={openNoti}
        handleClose={handleCloseNoti}
        status={actStatus}
        message={actMessage}
      />
    </>
  );
}
