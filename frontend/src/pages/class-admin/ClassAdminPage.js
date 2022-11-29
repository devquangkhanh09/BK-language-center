import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";

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
} from "@mui/material";
// components
import Iconify from "../../components/iconify";
import Scrollbar from "../../components/scrollbar";
import ConfirmPopup from "../../components/confirm-popup";
import ListHead from "../../components/list-head";

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

export default function ClassAdminPage() {
  const navigate = useNavigate();

  const navToCreate = () => {
    navigate("/admin/course-create", { replace: true });
  };

  const navToEdit = () => {
    navigate("/admin/course-edit", { replace: true });
  };

  const navToCourse = () => {
    navigate("/admin/courses", { replace: true });
  };

  //-------------------------------------------------------------
  const [classList, setClassList] = useState([]);
  useEffect(() => {
    axios
      .get("/api/admin/classes")
      .then((res) => {
        var myList = res.data.myList;
        setClassList(myList);
        console.log(myList);
      })
      .catch((error) => console.log(error));
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
  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };
  //--------------------------------------
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - classList.length) : 0;
  //--------------------------------------

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
          FD-02
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
            onClick={navToCreate}
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
                        status,
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

                          <TableCell align="left">{status}</TableCell>

                          <TableCell align="center">{numOfStudent}</TableCell>
                          <TableCell
                            align="left"
                            sx={{
                              display: "flex",
                            }}
                          >
                            <IconButton onClick={() => setOpenConfirm(true)}>
                              <DeleteIcon />
                            </IconButton>
                            <IconButton onClick={navToEdit}>
                              <BorderColorIcon />
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
      />
    </>
  );
}
