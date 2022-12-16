import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Iconify from "../../components/iconify";

// NOTE: not yet complete, testing purpose only
export default function ClassStudentPage() {
  const name = localStorage.getItem("name");
  // return `Welcome, ${name}`;
  return (
    <div>
      <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h3" color="blue" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
          variant="outlined"
          sx={{ fontSize: "13px", borderRadius: 30 }}
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>

    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h3" color="blue" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
          variant="outlined"
          sx={{ fontSize: "13px", borderRadius: 30 }}
          startIcon={<Iconify icon="eva:plus-fill" />}
          disabled
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
    </div>    
  );
}
