import React from "react";
import { useState } from "react";
import {
  TextField,
  AppBar,
  Container,
  Toolbar,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Alert,
  Stack,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Snackbar,
  IconButton,
  FormControl,
  Radio,
  FormLabel,
  RadioGroup,
} from "@mui/material";
import { Box } from "@mui/material";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import logo from "./images/circle-logo.webp";
import backgroundimage from "./images/background_2.jpg";
import ForwardIcon from "@mui/icons-material/Forward";
import CloseIcon from "@mui/icons-material/Close";

const Assignment = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [open, setOpen] = useState(false);
  const navItems = ["Home", "About", "Services", "Contact"];
  const handleAlert = () => {
    setShowAlert(true);
  };
  const handleForm = () => {
    setOpen(true);
  };
  const handleCloseSnackbar = () => {
    setOpen(false);
  };
  const handleClose = () => {
    setShowAlert(false);
  };

  const action = (
    <>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box
            component="img"
            src={logo}
            alt="Logo"
            style={{ maxWidth: "50px", marginRight: "auto" }}
          />
          <Stack direction="row">
            {navItems.map((item, index) => (
              <>
                <Button
                  key={index}
                  color="inherit"
                  sx={{
                    "&:hover": {
                      backgroundColor: "#FBEAEB",
                      color: "black",
                    },
                  }}
                >
                  {item}
                </Button>
              </>
            ))}
            <PersonPinIcon fontSize="large" />
          </Stack>
        </Toolbar>
      </AppBar>
      <Container
        color="primary"
        sx={{ pt: 3, pb: 3, backgroundColor: "#FBEAEB" }}
      >
        <Stack direction="row" spacing={2}>
          <Card sx={{ width: "50%" }}>
            <CardMedia
              component="img"
              alt="Background Image"
              height="object-fit"
              image={backgroundimage}
              title="Background Image"
            />
            <CardContent>
              <Typography variant="h6" component="div">
                Let's learn Material-UI
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
                onClick={handleAlert}
              >
                Learn More
              </Button>
            </CardContent>
            {showAlert && (
              <>
                <Alert severity="info" action={action}>
                  Learn More button clicked successfully!
                </Alert>
              </>
            )}
          </Card>
          <Card sx={{ width: "50%" }}>
            <CardContent>
              <Typography
                variant="h6"
                component="div"
                sx={{ mb: 3, textAlign: "center" }}
              >
                Form with Material-UI
              </Typography>
              <Box
                sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}
              >
                <TextField label="Enter First Name" variant="outlined" />
                <TextField label="Enter Last Name" variant="outlined" />
              </Box>
              <TextField
                label="Enter Password"
                type="password"
                variant="outlined"
                fullWidth
                sx={{ mb: 3 }}
              />
              <TextField
                select
                label="Hobby"
                variant="outlined"
                fullWidth
                sx={{ mb: 3 }}
              >
                <MenuItem>Cricket</MenuItem>
                <MenuItem>Chess</MenuItem>
                <MenuItem>Hockey</MenuItem>
                <MenuItem>Basketball</MenuItem>
              </TextField>
              <FormControl sx={{ mb: 3 }}>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
              <FormGroup sx={{ mb: 3 }}>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Terms and Conditions Applied"
                />
              </FormGroup>
              <Button
                variant="contained"
                color="primary"
                onClick={handleForm}
                endIcon={<ForwardIcon />}
              >
                Submit
              </Button>
            </CardContent>
            {open && (
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Clicked"
                action={action}
              >
                <Alert onClose={handleCloseSnackbar} severity="success">
                  Submit button clicked successfully!
                </Alert>
              </Snackbar>
            )}
          </Card>
        </Stack>
      </Container>
    </>
  );
};

export default Assignment;
