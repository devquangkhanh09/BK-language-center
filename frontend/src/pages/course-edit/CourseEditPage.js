import { useState } from "react";
import { useNavigate } from "react-router-dom";
//@mui
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
  Pagination,
} from "@mui/material";

import Iconify from "../../components/iconify";
import Popup from "../../components/popup";

import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";

const ITEM_PER_PAGE = 4;
const MAX_PAGE = 4;

const SYL = [
  {
    id: 1,
    description: "Sentences and common errors when making sentences",
  },
  {
    id: 2,
    description: "Sentences",
  },
  {
    id: 3,
    description: "Sentences",
  },
  {
    id: 4,
    description: "Sentences",
  },
  {
    id: 5,
    description: "Sentences",
  },
];
export default function CourseEditPage() {
  const [notiPage, setNotiPage] = useState(0);
  const [syllabus, setSyllabus] = useState(SYL);
  const [openPopup, setOpenPopup] = useState(false);
  
  const navigate = useNavigate();
  const handleSave = () => {
    navigate("/app", { replace: true });
  }

  return (
    <>
      <Container>
        <Typography variant="h4" gutterBottom>
          Chỉnh sửa khóa học
        </Typography>
        <Box
          sx={{
            mt: 5,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Grid container spacing={5}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Thông tin khóa học
              </Typography>
              <TextField
                margin="normal"
                fullWidth
                label="Mã khóa học"
                name="course_id"
                value=""
              />
              <TextField
                margin="normal"
                fullWidth
                label="Tên khóa học"
                name="name"
                value=""
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="type-select-label">Loại khóa học</InputLabel>
                <Select
                  labelId="type-select-label"
                  label="Loại khóa học"
                  value=""
                >
                  <MenuItem value="OVERRALL">OVERRALL</MenuItem>
                  <MenuItem value="LISTENING">LISTENING</MenuItem>
                  <MenuItem value="READING">READING</MenuItem>
                  <MenuItem value="SPEAKING">SPEAKING</MenuItem>
                  <MenuItem value="WRITING">WRITING</MenuItem>
                </Select>
              </FormControl>
              <TextField
                margin="normal"
                fullWidth
                label="Yêu cầu đầu vào"
                name="requirement"
                value=""
                type="number"
              />
              <TextField
                margin="normal"
                fullWidth
                label="Mục tiêu đầu ra"
                name="target"
                value=""
                type="number"
              />
              <TextField
                margin="normal"
                fullWidth
                label="Phí"
                name="cost"
                value=""
                type="number"
              />
              <Button
                sx={{ my: 3, height: 50, width: "100%" }}
                variant="contained"
                startIcon={<SaveAsOutlinedIcon />}
                onClick={handleSave}
              >
                Lưu khóa học
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                Chương trình học
              </Typography>
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
                onClick={() => setOpenPopup(true)}
              >
                Thêm buổi học
              </Button>
              <Paper
                elevation={3}
                sx={{
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mt: 5,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    mb: 3,
                  }}
                >
                  Danh sách đã thêm
                </Typography>
                {syllabus
                  .slice(
                    notiPage * ITEM_PER_PAGE,
                    notiPage * ITEM_PER_PAGE + ITEM_PER_PAGE
                  )
                  .map((item, idx) => {
                    const { id, description } = item;
                    return (
                      <Box
                        sx={{
                          padding: 2,
                          paddingBottom: 1,
                          display: "flex",
                          flexDirection: "column",
                          bgcolor: "#ebf1ff",
                          borderRadius: 3,
                          mb: 2,
                          width: "100%",
                          gap: 1,
                        }}
                      >
                        <Typography variant="subtitle1">
                          <em>Buổi thứ {idx + 1}</em>
                        </Typography>
                        <Typography
                          variant="body1"
                         
                        >
                          {description}
                        </Typography>
                        <Button
                          sx={{ mb: 1 }}
                          color="error"
                        >
                          Xóa
                        </Button>
                      </Box>
                    );
                  })}
                <Pagination
                  count={MAX_PAGE}
                  color="primary"
                  onChange={(e, value) => setNotiPage(value - 1)}
                />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Popup
        title="Thêm buổi học"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <TextField
            multiline
            rows={4}
            label="Mô tả"
            name="description"
            value=""
            type="text"
            sx={{
              width: "100%",
              mb: 2,
            }}
          />
          <Button
            sx={{ my: 1, height: 50, width: "30%" }}
            variant="contained"
            startIcon={<SaveAsOutlinedIcon />}
          >
            Lưu lại
          </Button>
        </Box>
      </Popup>
    </>
  );
}
