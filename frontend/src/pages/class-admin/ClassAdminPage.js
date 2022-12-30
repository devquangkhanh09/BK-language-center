import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

//@mui
import {
  Card,
  Button,
  Container,
  Stack,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  TablePagination,
  Popover,
  MenuItem,
  Grid,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
// components
import Iconify from "../../components/iconify";
import Scrollbar from "../../components/scrollbar";
import ConfirmPopup from "../../components/confirm-popup";
import ListHead from "../../components/list-head";
import Popup from "../../components/popup";
import Notification from "../../components/notification";

const TABLE_HEAD = [
  { id: "class_id", label: "Mã lớp", align: "left" },
  { id: "start_date", label: "Ngày bắt đầu", align: "left" },
  { id: "end_date", label: "Ngày kết thúc", align: "left" },
  { id: "form", label: "Hình thức", align: "left" },
  { id: "branch_id", label: "Chi nhánh", align: "left" },
  { id: "room", label: "Phòng", align: "left" },
  { id: "time", label: "Thời gian", align: "center" },
  { id: "teacher_id", label: "ID Giáo viên", align: "left" },
  { id: "status", label: "Trạng thái", align: "left" },
  { id: "numOfStudent", label: "Số lượng", align: "center" },
  { id: "option" },
];

//-------------------------------------------------

const initClass = {
  class_id: "",
  start_date: "",
  form: "",
  branch_id: "",
  room: "",
  time: "",
  teacher_id: "",
};

//-------------------------------------------------

export default function ClassAdminPage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const navToCourse = () => {
    navigate("/admin/courses", { replace: true });
  };

  //-------------------------------------------------------------
  const [classList, setClassList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [branchList, setBranchList] = useState([]);

  const [classID, setClassID] = useState("");

  useEffect(() => {
    axios
      .get("/api/admin/class")
      .then((res) => {
        var myList = res.data.filter((item) => item.course_id === id);
        setClassList(myList);
      })
      .catch((error) => console.log(error));

    axios
      .get("/api/admin/teachers")
      .then((res) => {
        setTeacherList(res.data);
      })
      .catch((error) => console.log(error));

    axios
      .get("/api/admin/branches")
      .then((res) => {
        setBranchList(res.data);
      })
      .catch((error) => console.log(error));
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //--------------------------------------
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  //--------------------------------------
  const [openConfirm, setOpenConfirm] = useState(false);

  //--------------------------------------
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - classList.length) : 0;
  //--------------------------------------

  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  //----------------------------------------

  const [openPopup, setOpenPopup] = useState(false);

  const [classInfo, setClassInfo] = useState(initClass);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClassInfo({
      ...classInfo,
      [name]: value,
    });
  };

  const resetForm = () => {
    setClassInfo(initClass);
  };

  const handleSubmitInfo = (e) => {
    e.preventDefault();
    const newClass = { course_id: id, ...classInfo };
    axios
      .post("/api/admin/class-create", newClass)
      .then((res) => {
        //to-do: handle success
        setActStatus(true);
        setOpenNoti(true);
        // insert in front-end
        resetForm();
        setOpenPopup(false);

        axios
          .get("/api/admin/class")
          .then((res) => {
            var myList = res.data.filter((item) => item.course_id === id);
            setClassList(myList);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        //to-do: handle fail
        if (error.response) setActMessage(error.response.data.message);
        else setActMessage(error.message);
        setActStatus(false);
        setOpenNoti(true);
      });
  };

  //----------------------------------------

  const [openNoti, setOpenNoti] = useState(false);

  const [actStatus, setActStatus] = useState(false);
  const [actMessage, setActMessage] = useState("");

  const handleCloseNoti = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenNoti(false);
  };

  //------------------------------------------------

  const handleDeleteClass = () => {
    const send_data = {
      course_id: id,
      class_id: classID,
    };
    axios
      .post("/api/admin/class-delete", send_data)
      .then((res) => {
        setActStatus(true);
        setOpenNoti(true);
        setOpenConfirm(false);
        // delete in front-end
        var newClassList = classList.filter(
          (item) => item.class_id !== classID
        );
        setClassList(newClassList);
        setOpen(null);
      })
      .catch((error) => {
        if (error.response) setActMessage(error.response.data.message);
        else setActMessage(error.message);
        setActStatus(false);
        setOpenNoti(true);
      });
  };

  //----------------------------------------

  const [openEditPopup, setOpenEditPopup] = useState(false);

  const [classEditInfo, setClassEditInfo] = useState(initClass);

  const handleInputEditChange = (e) => {
    const { name, value } = e.target;
    setClassEditInfo({
      ...classEditInfo,
      [name]: value,
    });
  };

  const handleSubmitEditInfo = (e) => {
    e.preventDefault();
    axios
      .post("/api/admin/class-edit", classEditInfo)
      .then((res) => {
        //to-do: handle success
        setActStatus(true);
        setOpenNoti(true);
        // edit in front-end
        axios
          .get("/api/admin/class")
          .then((res) => {
            var myList = res.data.filter((item) => item.course_id === id);
            setClassList(myList);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        //to-do: handle fail
        if (error.response) setActMessage(error.response.data.message);
        else setActMessage(error.message);
        setActStatus(false);
        setOpenNoti(true);
      });
  };

  const handleOpenEditPopup = () => {
    var edit_data = classList.filter((item) => item.class_id === classID)[0];
    edit_data.start_date = edit_data.start_date.split("T")[0];
    setClassEditInfo(edit_data);
    setOpenEditPopup(true);
    handleCloseMenu();
  };

  //----------------------------------------

  return (
    <>
      <Container>
        <Button
          startIcon={<Iconify icon="material-symbols:arrow-back" />}
          onClick={navToCourse}
          sx={{ mb: 2 }}
        >
          Quay lại
        </Button>
        <Typography variant="h2" gutterBottom>
          {id}
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          my={5}
        >
          <Typography variant="h4" gutterBottom>
            Danh sách lớp học
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => setOpenPopup(true)}
          >
            Tạo lớp học
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 1100 }}>
              <Table>
                <ListHead headLabel={TABLE_HEAD} />
                <TableBody>
                  {classList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((class_, idx) => {
                      const {
                        class_id,
                        start_date,
                        end_date,
                        form,
                        branch_id,
                        room,
                        time,
                        teacher_id,
                        numOfStudent,
                      } = class_;

                      return (
                        <TableRow hover key={idx} tabIndex={-1}>
                          <TableCell align="left">{class_id}</TableCell>

                          <TableCell align="left">
                            {start_date.split("T")[0]}
                          </TableCell>

                          <TableCell align="left">
                            {end_date.split("T")[0]}
                          </TableCell>

                          <TableCell align="left">{form}</TableCell>

                          <TableCell align="left">{branch_id}</TableCell>

                          <TableCell align="left">{room}</TableCell>

                          <TableCell align="center">{time}</TableCell>

                          <TableCell align="left">{teacher_id}</TableCell>

                          <TableCell align="left">{(start_date > (new Date()).toISOString().split('T')[0])? "Chưa diễn ra": (end_date >= (new Date()).toISOString().split('T')[0])? "Đang diễn ra":"Đã hoàn thành"}</TableCell>

                          <TableCell align="center">{numOfStudent}</TableCell>
                          <TableCell align="right">
                            <IconButton
                              size="large"
                              color="inherit"
                              onClick={(e) => {
                                handleOpenMenu(e);
                                setClassID(class_id);
                              }}
                            >
                              <Iconify icon={"eva:more-vertical-fill"} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={classList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <ConfirmPopup
        open={openConfirm}
        setOpen={setOpenConfirm}
        content="Bạn có chắc chắn muốn xóa lớp học này?"
        confirmAction={handleDeleteClass}
      />

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 180,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={handleOpenEditPopup}>
          <Iconify icon={"material-symbols:edit"} sx={{ mr: 2 }} />
          Chỉnh sửa
        </MenuItem>

        <MenuItem
          sx={{ color: "error.main" }}
          onClick={() => setOpenConfirm(true)}
        >
          <Iconify icon={"mdi:trash-can-outline"} sx={{ mr: 2 }} />
          Xóa
        </MenuItem>
      </Popover>

      <Popup
        title="Tạo lớp học"
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
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                  gap: 3,
                }}
              >
                <TextField
                  fullWidth
                  label="Mã lớp"
                  name="class_id"
                  value={classInfo.class_id}
                  onChange={handleInputChange}
                />

                <TextField
                  fullWidth
                  label="Ngày bắt đầu (YYYY-MM-DD)"
                  name="start_date"
                  value={classInfo.start_date}
                  onChange={handleInputChange}
                />

                <FormControl fullWidth>
                  <InputLabel id="form-select-label">Hình thức</InputLabel>
                  <Select
                    labelId="form-select-label"
                    label="Hình thức"
                    name="form"
                    value={classInfo.form}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="online" key={0}>Online</MenuItem>
                    <MenuItem value="offline" key={1}>Offline</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                  gap: 3,
                }}
              >

                <FormControl fullWidth>
                  <InputLabel id="form-select-label">Chi nhánh</InputLabel>
                  <Select
                    labelId="form-select-label"
                    label="Chi nhánh"
                    name="branch_id"
                    value={classInfo.branch_id}
                    onChange={handleInputChange}
                  >
                    {
                      branchList.map((branch, idx) => <MenuItem value={branch.branch_id} key={idx}>{branch.branch_id}</MenuItem>)
                    }
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="Phòng học"
                  name="room"
                  value={classInfo.room}
                  onChange={handleInputChange}
                />

                <FormControl fullWidth>
                  <InputLabel id="time-select-label">Thời gian</InputLabel>
                  <Select
                    labelId="time-select-label"
                    label="Thời gian"
                    name="time"
                    value={classInfo.time}
                    onChange={handleInputChange}
                  >
                    <MenuItem value={1} key={0}>1</MenuItem>
                    <MenuItem value={2} key={1}>2</MenuItem>
                    <MenuItem value={3} key={2}>3</MenuItem>
                    <MenuItem value={4} key={3}>4</MenuItem>
                    <MenuItem value={5} key={4}>5</MenuItem>
                    <MenuItem value={6} key={5}>6</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="form-select-label">Giảng viên</InputLabel>
                  <Select
                    labelId="form-select-label"
                    label="Giảng viên"
                    name="teacher_id"
                    value={classInfo.teacher_id}
                    onChange={handleInputChange}
                  >
                    {
                      teacherList.map((teacher, idx) => <MenuItem value={teacher.id} key={idx}>{teacher.id}</MenuItem>)
                    }
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>

          <Button variant="contained" sx={{ mt: 3 }} onClick={handleSubmitInfo}>
            Xác nhận
          </Button>
        </Box>
      </Popup>

      <Popup
        title="Chỉnh sửa lớp học"
        openPopup={openEditPopup}
        setOpenPopup={setOpenEditPopup}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                  gap: 3,
                }}
              >
                <TextField
                  fullWidth
                  label="Mã lớp"
                  name="class_id"
                  disabled
                  value={classEditInfo.class_id}
                  onChange={handleInputEditChange}
                />

                <TextField
                  fullWidth
                  label="Ngày bắt đầu (YYYY-MM-DD)"
                  name="start_date"
                  value={classEditInfo.start_date}
                  onChange={handleInputEditChange}
                />

                <FormControl fullWidth>
                  <InputLabel id="form-select-label">Hình thức</InputLabel>
                  <Select
                    labelId="form-select-label"
                    label="Hình thức"
                    name="form"
                    value={classEditInfo.form}
                    onChange={handleInputEditChange}
                  >
                    <MenuItem value="online" key={0}>Online</MenuItem>
                    <MenuItem value="offline" key={1}>Offline</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                  gap: 3,
                }}
              >
                <FormControl fullWidth>
                  <InputLabel id="form-select-label">Chi nhánh</InputLabel>
                  <Select
                    labelId="form-select-label"
                    label="Chi nhánh"
                    name="branch_id"
                    value={classEditInfo.branch_id}
                    onChange={handleInputEditChange}
                  >
                    {
                      branchList.map((branch, idx) => <MenuItem value={branch.branch_id} key={idx}>{branch.branch_id}</MenuItem>)
                    }
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="Phòng học"
                  name="room"
                  value={classEditInfo.room}
                  onChange={handleInputEditChange}
                />

                <FormControl fullWidth>
                  <InputLabel id="time-select-label">Thời gian</InputLabel>
                  <Select
                    labelId="time-select-label"
                    label="Thời gian"
                    name="time"
                    value={classEditInfo.time}
                    onChange={handleInputEditChange}
                  >
                    <MenuItem value={1} key={0}>1</MenuItem>
                    <MenuItem value={2} key={1}>2</MenuItem>
                    <MenuItem value={3} key={2}>3</MenuItem>
                    <MenuItem value={4} key={3}>4</MenuItem>
                    <MenuItem value={5} key={4}>5</MenuItem>
                    <MenuItem value={6} key={5}>6</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="form-select-label">Giảng viên</InputLabel>
                  <Select
                    labelId="form-select-label"
                    label="Giảng viên"
                    name="teacher_id"
                    value={classEditInfo.teacher_id}
                    onChange={handleInputEditChange}
                  >
                    {
                      teacherList.map((teacher, idx) => <MenuItem value={teacher.id} key={idx}>{teacher.id}</MenuItem>)
                    }
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>

          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={handleSubmitEditInfo}
          >
            Xác nhận
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
