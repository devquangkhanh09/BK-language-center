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
  TablePagination,
} from "@mui/material";
// components
import Scrollbar from "../../components/scrollbar";
import ConfirmPopup from "../../components/confirm-popup";
import ListHead from "../../components/list-head";

const TABLE_HEAD = [
  { id: "course_id", label: "Mã khóa học", align: "left" },
  { id: "class_id", label: "Mã lớp học", align: "left" },
  { id: "student_id", label: "Mã học viên", align: "left" },
  { id: "student_name", label: "Tên học viên", align: "left" },
  { id: "cost ", label: "Học phí", align: "left" },
  { id: "register_date", label: "Ngày đăng ký", align: "left" },
  { id: "option" }
];

export default function HandleClassRegisterPage() {
  const navigate = useNavigate();

  //-------------------------------------------------------------
  const [registerList, setRegisterList] = useState([]);
  useEffect(() => {
    axios
      .get("/api/admin/handle-register")
      .then((res) => {
        var myList = res.data.registers;
        setRegisterList(myList);
      })
      .catch((error) => navigate('/', {replace: true}));
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - registerList.length) : 0;
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
            Danh sách đăng ký lớp học
          </Typography>
          
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 900 }}>
              <Table>
                <ListHead headLabel={TABLE_HEAD} />
                <TableBody>
                  {registerList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((register, idx) => {
                      const {
                        course_id,
                        class_id,
                        student_id,
                        student_name,
                        cost,
                        register_date,
                      } = register;

                      return (
                        <TableRow hover key={idx} tabIndex={-1}>
                          <TableCell align="left">{course_id}</TableCell>

                          <TableCell align="left">{class_id}</TableCell>

                          <TableCell align="left">{student_id}</TableCell>

                          <TableCell align="left">{student_name}</TableCell>

                          <TableCell align="left">{cost}</TableCell>

                          <TableCell align="left">{register_date}</TableCell>

                          <TableCell
                            align="left"
                            sx={{
                              display: "flex",
                            }}
                          >
                            <Button
                              variant="outlined"
                              sx={{ fontSize: "13px", borderRadius: 30 }}
                              onClick={() => setOpenConfirm(true)}
                            >
                              Xác nhận thanh toán
                            </Button>
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
            count={registerList.length}
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
        content="Bạn có chắc chắn muốn xác nhận thanh toán cho yêu cầu đăng ký này?"
      />
    </>
  );
}
