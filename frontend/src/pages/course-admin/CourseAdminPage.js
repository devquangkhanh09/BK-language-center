import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
} from "@mui/material";
// components
import Iconify from "../../components/iconify";
import Scrollbar from "../../components/scrollbar";
import ConfirmPopup from "../../components/confirm-popup";
import ListHead from "../../components/list-head";
import Notification from "../../components/notification";

const TABLE_HEAD = [
  { id: "course_id", label: "Mã khóa", align: "left" },
  { id: "name", label: "Tên khóa", align: "left" },
  { id: "type", label: "Loại", align: "left" },
  { id: "requirement", label: "Yêu cầu", align: "center" },
  { id: "target", label: "Mục tiêu", align: "center" },
  { id: "cost", label: "Phí (VND)", align: "left" },
  { id: "num_of_lec", label: "Số buổi", align: "center" },
  { id: "view_class" },
  { id: "option" },
];

//----------------------------------------------

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//----------------------------------------------

export default function CourseAdminPage() {
  const navigate = useNavigate();

  const navToCreate = () => {
    navigate("/admin/course-create", { replace: true });
  };

  const navToEdit = () => {
    navigate("/admin/course-edit", { replace: true });
  };

  const navToClass = (id) => {
    navigate(`/admin/classes/${id}`, { replace: true });
  };

  const navToCurriculum = (id) => {
    navigate(`/admin/course-curriculum/${id}`, { replace: true });
  };

  //-------------------------------------------------------------
  const [courseList, setCourseList] = useState([]);
  useEffect(() => {
    axios
      .get("/api/admin/courses")
      .then((res) => {
        var myList = res.data.courses;
        setCourseList(myList);
      })
      .catch((error) => navigate("/", { replace: true }));
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
  // const handleOpenConfirm = () => {
  //   setOpenConfirm(true);
  // };
  //--------------------------------------
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - courseList.length) : 0;
  //--------------------------------------

  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  //----------------------------------------
  
  const [courseID, setCourseID] = useState("");

  const [openNoti, setOpenNoti] = useState(false);
  const handleCloseNoti = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenNoti(false);
  };

  const [actStatus, setActStatus] = useState(false);
  const [actMessage, setActMessage] = useState("");

  const confirmAction = ({course_id}) => {
    axios
      .delete("/api/admin/course-delete", {
        params: {
          course_id
        }
      })
      .then((res) => {
        setOpenConfirm(false);
        setCourseList(courseList.filter(course => {
          return course.course_id !== course_id 
        }));
        setActStatus(true);
        setOpenNoti(true);
      })
      .catch((error) => {
        setOpenConfirm(false);
        setActStatus(false);
        if (error.response) setActMessage(error.response.data.message);
        else setActMessage(error.message);
        setOpenNoti(true);
      });
  }

  return (
    <>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Danh sách khóa học
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={navToCreate}
          >
            Tạo khóa học
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 900 }}>
              <Table>
                <ListHead headLabel={TABLE_HEAD} />
                <TableBody>
                  {courseList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((course, idx) => {
                      const {
                        course_id,
                        name,
                        type,
                        requirement,
                        target,
                        cost,
                        numOfLecture,
                      } = course;

                      return (
                        <TableRow hover key={idx} tabIndex={-1}>
                          <TableCell align="left">{course_id}</TableCell>

                          <TableCell align="left">{name}</TableCell>

                          <TableCell align="left">{type}</TableCell>

                          <TableCell align="center">{requirement}</TableCell>

                          <TableCell align="center">{target}</TableCell>

                          <TableCell align="left">
                            {numberWithCommas(cost)}
                          </TableCell>

                          <TableCell align="center">{numOfLecture}</TableCell>

                          <TableCell align="center">
                            <Button
                              variant="outlined"
                              sx={{ fontSize: "13px", borderRadius: 30 }}
                              onClick={() => navToClass(course_id)}
                            >
                              Xem các lớp
                            </Button>
                          </TableCell>

                          <TableCell align="right">
                            <IconButton
                              size="large"
                              color="inherit"
                              onClick={(e) => {handleOpenMenu(e); setCourseID(course_id)}}
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
            count={courseList.length}
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
        content="Bạn có chắc chắn muốn xóa khóa học này?"
        confirmParams={{course_id: courseID}}
        confirmAction={confirmAction}
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
        <MenuItem onClick={() => navToCurriculum(courseID)}>
          <Iconify icon={"material-symbols:book-rounded"} sx={{ mr: 2 }} />
          Chương trình học
        </MenuItem>

        <MenuItem onClick={navToEdit}>
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

      <Notification
        open={openNoti}
        handleClose={handleCloseNoti}
        status={actStatus}
        message={actMessage}
      />
    </>
  );
}
