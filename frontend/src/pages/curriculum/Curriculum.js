import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

//@mui
import {
  Card,
  Container,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Button
} from "@mui/material";
// components
import Scrollbar from "../../components/scrollbar";
import ListHead from "../../components/list-head";
import Iconify from "../../components/iconify";

//--------------------------------------------------
const TABLE_HEAD = [
  { id: "lecture", label: "Thứ tự buổi", align: "center" },
  { id: "description", label: "Nội dung", align: "left" },
];

//--------------------------------------------------

export default function Curriculum() {
  const navigate = useNavigate();

  const { id } = useParams();

  const navToCourse = () => {
    navigate("/admin/courses", { replace: true });
  };


  //----------------------------------------------------
  const [curList, setCurList] = useState([]);
  useEffect(() => {
    axios
      .get("/api/admin/curriculums")
      .then((res) => {
        var myList = res.data.filter(item => item.course_id === id);
        setCurList(myList);
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
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - curList.length) : 0;
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
        <Typography variant="h3" sx={{ mb: 3 }}>
          {id}
        </Typography>

        <Card>
          <Scrollbar>
            <TableContainer>
              <Table>
                <ListHead headLabel={TABLE_HEAD} />
                <TableBody>
                  {curList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((curr, idx) => {
                      const { lecture, description } = curr;

                      return (
                        <TableRow hover key={idx} tabIndex={-1}>
                          <TableCell align="center" sx={{ width: 130 }}>
                            {lecture}
                          </TableCell>

                          <TableCell align="left">{description}</TableCell>
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
            count={curList.length}
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
