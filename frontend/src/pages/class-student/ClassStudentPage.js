import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Button,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import Iconify from "../../components/iconify";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ConfirmPopup from "../../components/confirm-popup";
import Notification from "../../components/notification";

const initClassList = [];

// NOTE: not yet complete, testing purpose only
export default function ClassStudentPage() {
  const [classList, setClassList] = useState(initClassList);
  const navigate = useNavigate();
  const { id } = useParams();

  const navToCourse = () => {
    navigate(`/student/course-detail/${id}`, { replace: true });
  };
  //-----------------------------------------------------
  useEffect(() => {
    axios
      .get(`/api/student/classes/${id}`)
      .then((res) => {
        var myList = res.data;
        setClassList(myList);
      })
      .catch((error) => navigate("/", { replace: true }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //-----------------------------------------------------
  const [openConfirm, setOpenConfirm] = useState(false);
  const [confirmParams, setConfirmParams] = useState({});

  const handleOpenConfirm = (class_id) => {
    setConfirmParams({
      course_id: id,
      class_id,
    });
    setOpenConfirm(true);
  };

  const [openNoti, setOpenNoti] = useState(false);
  const handleCloseNoti = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenNoti(false);
  };

  const [actStatus, setActStatus] = useState(false);
  const [actMessage, setActMessage] = useState("");

  const confirmAction = ({ course_id, class_id }) => {
    axios
      .post("/api/student/register-class", {
        course_id,
        class_id,
      })
      .then((res) => {
        setOpenConfirm(false);
        setClassList(
          classList.map((_class) => {
            if (_class.class_id === class_id) {
              _class.numOfStudent++;
              _class.studentStatus = 2;
              return _class;
            }
            return _class;
          })
        );
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
  };
  //-----------------------------------------------------

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
        <Typography variant="h2" gutterBottom>
          {id}
        </Typography>

        <Grid container spacing={2}>
          {classList.map((_class, idx) => {
            const {
              class_id,
              start_date,
              end_date,
              form,
              branch_id,
              room,
              time,
              teacher_name,
              numOfStudent,
              maxStudent,
              studentStatus,
            } = _class;

            return (
              <Grid item xs={6} key={idx}>
                <Card sx={{ minWidth: 275, height: "100%" }}>
                  <CardHeader
                    action={
                      <Typography
                        variant="h5"
                        color={numOfStudent === maxStudent ? "red" : "green"}
                      >
                        {numOfStudent} / {maxStudent}
                      </Typography>
                    }
                    title={
                      <Typography variant="h3" color="blue">
                        {class_id}
                      </Typography>
                    }
                    subheader={
                      <Typography
                        variant="subtitle1"
                        sx={{ fontStyle: "italic" }}
                        color={
                          studentStatus === 1 || studentStatus === 4
                            ? "red"
                            : studentStatus === 2
                            ? "gray"
                            : "green"
                        }
                      >
                        {studentStatus === 1 ? (
                          "???? ?????t s??? l?????ng ????ng k?? t???i ??a"
                        ) : studentStatus === 2 ? (
                          "??ang ?????i x??c nh???n..."
                        ) : studentStatus === 3 ? (
                          "X??c nh???n ????ng k?? th??nh c??ng"
                        ) : studentStatus === 4 ? (
                          "???? qu?? h???n ????ng k?? l???p h???c"
                        ) : (
                          <br />
                        )}
                      </Typography>
                    }
                  />

                  <CardContent>
                    <Typography variant="body2">
                      <b>Ng??y b???t ?????u:</b> {start_date}
                      <br />
                      <b>Ng??y k???t th??c:</b> {end_date}
                      <br />
                      <b>H??nh th???c:</b> {form}
                      <br />
                      <b>Chi nh??nh:</b> {branch_id}
                      <br />
                      <b>Ph??ng:</b> {room}
                      <br />
                      <b>Th???i gian h???c:</b> {time}
                      <br />
                      <b>Gi???ng vi??n:</b> {teacher_name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="outlined"
                      sx={{
                        fontSize: "13px",
                        borderRadius: 30,
                        margin: "0 auto 15px",
                      }}
                      startIcon={<Iconify icon="eva:plus-fill" />}
                      disabled={studentStatus === 0 ? false : true}
                      onClick={() => handleOpenConfirm(class_id)}
                    >
                      ????ng k?? l???p h???c
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      <ConfirmPopup
        open={openConfirm}
        setOpen={setOpenConfirm}
        content="B???n c?? ch???c ch???n mu???n ????ng k?? l???p h???c n??y?"
        confirmParams={confirmParams}
        confirmAction={confirmAction}
      />
      <Notification
        open={openNoti}
        handleClose={handleCloseNoti}
        status={actStatus}
        message={actMessage}
      />
    </>
  );
}
