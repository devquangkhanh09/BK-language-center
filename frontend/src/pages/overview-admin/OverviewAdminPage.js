import axios from "axios";
import { useState, useEffect } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { Chart } from "chart.js/auto";
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import SchoolIcon from '@mui/icons-material/School';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
    Card,
    Button,
    Box,
    Container,
    Grid,
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
    Paper,
} from "@mui/material";

const UserData = [
    {
        id: 1,
        day: "Thứ hai",
        userGain: 20,
        userLost: 823,
    },
    {
        id: 2,
        day: "Thứ ba",
        userGain: 35,
        userLost: 345,
    },
    {
        id: 3,
        day: "Thứ tư",
        userGain: 32,
        userLost: 555,
    },
    {
        id: 4,
        day: "Thứ năm",
        userGain: 15,
        userLost: 4555,
    },
    {
        id: 5,
        day: "Thứ sáu",
        userGain: 40,
        userLost: 234,
    },
    {
        id: 6,
        day: "Thứ bảy",
        userGain: 54,
        userLost: 234,
    },
    {
        id: 7,
        day: "Chủ nhật",
        userGain: 27,
        userLost: 234,
    },
];
function LineChart({ chartData }) {
    return <Line data={chartData} />;
}
function BarChart({ chartData }) {
    return <Bar data={chartData} />;
}
function PieChart({ chartData }) {
    return <Pie data={chartData} />;
}

function OverviewAdminPage() {
    const navigate = useNavigate();
    const [statList, setStatList] = useState([]);
    useEffect(() => {
        axios
        .get("/api/admin/courses")
        .then((res) => {
            var myList = res.data.stat;
            setStatList(myList);
        })
        .catch((error) => navigate("/", { replace: true }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [userData] = useState({
        labels: UserData.map((data) => data.day),
        datasets: [
        {
            label: "Số lượt đăng ký",
            data: UserData.map((data) => data.userGain),
            backgroundColor: "#2a71d0",

            borderColor: "black",
            borderWidth: 2,
        },
        ],
    });

    return (
        <div style={{ width: 1000 }}>
        <Container>
            <Typography variant="h4" gutterBottom>
                Tổng quan
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ border: 1, borderRadius: '7px', borderColor: "grey.300" }}>
                        <SchoolIcon/>
                        <Typography variant="h7" align="center">Tổng số khóa học</Typography>
                        <Typography variant="h5" align="center">{statList.course}</Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ border: 1, borderRadius: '7px', borderColor: "grey.300" }}>
                        <MeetingRoomIcon/>
                        <Typography variant="h7" align="center">Tổng số lớp mở</Typography>
                        <Typography variant="h5" align="center">{statList.class}</Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ border: 1, borderRadius: '7px', borderColor: "grey.300"}}>
                        <AccountCircleIcon/>
                        <Typography variant="h7" align="center">Tổng số học viên</Typography>
                        <Typography variant="h5" align="center">{statList.student}</Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ border: 1, borderRadius: '7px', borderColor: "grey.300" }}>
                        <CastForEducationIcon/>

                        <Typography variant="h7" align="center">Tổng số giáo viên</Typography>
                        <Typography variant="h5" align="center">{statList.teacher}</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Container>



        <Container>
            <p></p>
            <p></p>
            <Typography variant="h4" gutterBottom>
                Thống kê số lượt đăng ký
            </Typography>
            <BarChart chartData={userData}></BarChart>
        </Container>

        </div>
    );
}

export default OverviewAdminPage;
