<<<<<<< HEAD
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//@mui
import {
  Card,
  Container,
  Stack,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  TextField,
} from "@mui/material";
// components
import Scrollbar from "../../components/scrollbar";
import ListHead from "../../components/list-head";

//--------------------------------------------------
const TABLE_HEAD = [
  { id: "id", label: "ID giáo viên", align: "left" },
  { id: "start_date", label: "Ngày bắt đầu", align: "left" },
  { id: "exp_year", label: "Năm kinh nghiệm", align: "center" },
  { id: "level_overall", label: "OVERALL", align: "center" },
  { id: "level_listening", label: "LISTENING", align: "center" },
  { id: "level_reading", label: "READING", align: "center" },
  { id: "level_writing", label: "WRITING", align: "center" },
  { id: "level_speaking", label: "SPEAKING", align: "center" },
  { id: "type", label: "Loại GV", align: "center" },
];

//--------------------------------------------------

const toDateFormat = (date) => {
  return date.split("T")[0];
};

//--------------------------------------------------

export default function TeacherAdminPage() {
  const navigate = useNavigate();

  //----------------------------------------------------
  const [teacherList, setTeacherList] = useState([]);
  useEffect(() => {
    axios
      .get("/api/admin/teachers")
      .then((res) => {
        var myList = res.data;
        setTeacherList(myList);
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

  const [textSearch, setTextSearch] = useState("");
  const handleSearchChange = (e) => {
    setTextSearch(e.target.value.toLowerCase());
  };
  //--------------------------------------
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - teacherList.length) : 0;
  //--------------------------------------

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
            Danh sách giáo viên
          </Typography>

          <TextField
            id="outlined-search"
            label="Tìm kiếm theo ID"
            type="search"
            onChange={handleSearchChange}
          />
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 950 }}>
              <Table>
                <ListHead headLabel={TABLE_HEAD} />
                <TableBody>
                  {teacherList
                    .filter((teacher) =>
                      teacher.id.toLowerCase().includes(textSearch)
                    )
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((teacher, idx) => {
                      const {
                        id,
                        start_date,
                        exp_year,
                        level_overall,
                        level_listening,
                        level_reading,
                        level_writing,
                        level_speaking,
                        type,
                      } = teacher;

                      return (
                        <TableRow hover key={idx} tabIndex={-1}>
                          <TableCell align="left">{id}</TableCell>

                          <TableCell align="left">
                            {toDateFormat(start_date)}
                          </TableCell>

                          <TableCell align="center">{exp_year}</TableCell>

                          <TableCell align="center">{level_overall}</TableCell>

                          <TableCell align="center">
                            {level_listening}
                          </TableCell>

                          <TableCell align="center">{level_reading}</TableCell>

                          <TableCell align="center">{level_writing}</TableCell>

                          <TableCell align="center">{level_speaking}</TableCell>

                          <TableCell align="center">{type}</TableCell>
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
            count={
              teacherList.filter((teacher) =>
                teacher.id.toLowerCase().includes(textSearch)
              ).length
            }
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}
=======
// import axios from "axios";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// //@mui
// import {
//   Card,
//   Button,
//   Container,
//   Stack,
//   Typography,
//   TableContainer,
//   Table,
//   TableBody,
//   TableRow,
//   TableCell,
//   IconButton,
//   TablePagination,
//   Popover,
//   MenuItem,
// } from "@mui/material";
// // components
// import Iconify from "../../components/iconify";
// import Scrollbar from "../../components/scrollbar";
// import ConfirmPopup from "../../components/confirm-popup";
// import ListHead from "../../components/list-head";

// const TABLE_HEAD = [
//   { id: "id", label: "ID giáo viên", align: "left" },
//   { id: "start_date", label: "Ngày bắt đầu", align: "left" },
//   { id: "type", label: "Loại", align: "left" },
//   { id: "requirement", label: "Yêu cầu", align: "center" },
//   { id: "target", label: "Mục tiêu", align: "center" },
//   { id: "cost", label: "Phí", align: "left" },
//   { id: "num_of_lec", label: "Số buổi", align: "center" },
//   { id: "view_class" },
//   { id: "option" },
// ];

// export default function TeacherAdminPage() {
//   const navigate = useNavigate();

//   const navToCreate = () => {
//     navigate("/admin/course-create", { replace: true });
//   };

//   const navToEdit = () => {
//     navigate("/admin/course-edit", { replace: true });
//   };

//   const navToClass = () => {
//     navigate("/admin/classes", { replace: true });
//   };

//   //-------------------------------------------------------------
//   const [teacherList, setTeacherList] = useState([]);
//   useEffect(() => {
//     axios
//       .get("/api/admin/teachers")
//       .then((res) => {
//         var myList = res.data;
//         setTeacherList(myList);
//       })
//       .catch((error) => navigate("/", { replace: true }));
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   //--------------------------------------
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setPage(0);
//     setRowsPerPage(parseInt(event.target.value, 10));
//   };
//   //--------------------------------------
//   const [openConfirm, setOpenConfirm] = useState(false);
//   // const handleOpenConfirm = () => {
//   //   setOpenConfirm(true);
//   // };
//   //--------------------------------------
//   const emptyRows =
//     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - courseList.length) : 0;
//   //--------------------------------------

//   const [open, setOpen] = useState(null);

//   const handleOpenMenu = (event) => {
//     setOpen(event.currentTarget);
//   };

//   const handleCloseMenu = () => {
//     setOpen(null);
//   };

//   //----------------------------------------

//   return (
//     <>
//       <Container>
//         <Stack
//           direction="row"
//           alignItems="center"
//           justifyContent="space-between"
//           mb={5}
//         >
//           <Typography variant="h4" gutterBottom>
//             Danh sách khóa học
//           </Typography>
//           <Button
//             variant="contained"
//             startIcon={<Iconify icon="eva:plus-fill" />}
//             onClick={navToCreate}
//           >
//             Tạo khóa học
//           </Button>
//         </Stack>

//         <Card>
//           <Scrollbar>
//             <TableContainer sx={{ minWidth: 900 }}>
//               <Table>
//                 <ListHead headLabel={TABLE_HEAD} />
//                 <TableBody>
//                   {courseList
//                     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                     .map((course, idx) => {
//                       const {
//                         course_id,
//                         name,
//                         type,
//                         requirement,
//                         target,
//                         cost,
//                         numOfLecture,
//                       } = course;

//                       return (
//                         <TableRow hover key={idx} tabIndex={-1}>
//                           <TableCell align="left">{course_id}</TableCell>

//                           <TableCell align="left">{name}</TableCell>

//                           <TableCell align="left">{type}</TableCell>

//                           <TableCell align="center">{requirement}</TableCell>

//                           <TableCell align="center">{target}</TableCell>

//                           <TableCell align="left">{cost}</TableCell>

//                           <TableCell align="center">{numOfLecture}</TableCell>

//                           <TableCell align="center">
//                             <Button
//                               variant="outlined"
//                               sx={{ fontSize: "13px", borderRadius: 30 }}
//                               onClick={navToClass}
//                             >
//                               Xem các lớp
//                             </Button>
//                           </TableCell>

//                           <TableCell align="right">
//                             <IconButton
//                               size="large"
//                               color="inherit"
//                               onClick={(e) => handleOpenMenu(e)}
//                             >
//                               <Iconify icon={"eva:more-vertical-fill"} />
//                             </IconButton>
//                           </TableCell>
//                         </TableRow>
//                       );
//                     })}
//                   {emptyRows > 0 && (
//                     <TableRow style={{ height: 53 * emptyRows }}>
//                       <TableCell colSpan={6} />
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Scrollbar>

//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={courseList.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </Card>
//       </Container>

//       <ConfirmPopup
//         open={openConfirm}
//         setOpen={setOpenConfirm}
//         content="Bạn có chắc chắn muốn xóa khóa học này?"
//       />

//       <Popover
//         open={Boolean(open)}
//         anchorEl={open}
//         onClose={handleCloseMenu}
//         anchorOrigin={{ vertical: "top", horizontal: "left" }}
//         transformOrigin={{ vertical: "top", horizontal: "right" }}
//         PaperProps={{
//           sx: {
//             p: 1,
//             width: 180,
//             "& .MuiMenuItem-root": {
//               px: 1,
//               typography: "body2",
//               borderRadius: 0.75,
//             },
//           },
//         }}
//       >
//         <MenuItem onClick={navToEdit}>
//           <Iconify icon={"material-symbols:book-rounded"} sx={{ mr: 2 }} />
//           Chương trình học
//         </MenuItem>

//         <MenuItem onClick={navToEdit}>
//           <Iconify icon={"material-symbols:edit"} sx={{ mr: 2 }} />
//           Chỉnh sửa
//         </MenuItem>

//         <MenuItem
//           sx={{ color: "error.main" }}
//           onClick={() => setOpenConfirm(true)}
//         >
//           <Iconify icon={"mdi:trash-can-outline"} sx={{ mr: 2 }} />
//           Xóa
//         </MenuItem>
//       </Popover>
//     </>
//   );
// }
>>>>>>> e160bf8fe8f7cdc4c92f440f4acebf0dac3f9bb4
