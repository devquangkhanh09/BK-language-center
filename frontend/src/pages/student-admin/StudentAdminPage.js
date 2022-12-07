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
  { id: "id", label: "ID học viên", align: "left" },
  { id: "level_overall", label: "OVERALL", align: "center" },
  { id: "level_listening", label: "LISTENING", align: "center" },
  { id: "level_reading", label: "READING", align: "center" },
  { id: "level_writing", label: "WRITING", align: "center" },
  { id: "level_speaking", label: "SPEAKING", align: "center" },
];

//--------------------------------------------------

export default function StudentAdminPage() {
  const navigate = useNavigate();

  //----------------------------------------------------
  const [studentList, setstudentList] = useState([]);
  useEffect(() => {
    axios
      .get("/api/admin/students")
      .then((res) => {
        var myList = res.data;
        setstudentList(myList);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - studentList.length) : 0;
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
            Danh sách học viên
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
            <TableContainer sx={{ minWidth: 900 }}>
              <Table>
                <ListHead headLabel={TABLE_HEAD} />
                <TableBody>
                  {studentList
                    .filter((student) =>
                      student.id.toLowerCase().includes(textSearch)
                    )
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((student, idx) => {
                      const {
                        id,
                        level_overall,
                        level_listening,
                        level_reading,
                        level_writing,
                        level_speaking,
                      } = student;

                      return (
                        <TableRow hover key={idx} tabIndex={-1}>
                          <TableCell align="left">{id}</TableCell>

                          <TableCell align="center">{level_overall}</TableCell>

                          <TableCell align="center">
                            {level_listening}
                          </TableCell>

                          <TableCell align="center">{level_reading}</TableCell>

                          <TableCell align="center">{level_writing}</TableCell>

                          <TableCell align="center">{level_speaking}</TableCell>
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
              studentList.filter((student) =>
                student.id.toLowerCase().includes(textSearch)
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
