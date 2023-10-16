import React, { useState } from "react";
import { Button, Snackbar, Alert, Container, Typography } from "@mui/material";

const SnackbarExample = () => {
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSnackbar = () => {
    setOpen(true);
  };

  return (
    <Container>
      <Typography variant="h4" align="center" sx={{ mt: 4 }}>
        Snackbar and alert example
      </Typography>
      <br />
      <br />
      <Button variant="contained" color="primary" onClick={handleSnackbar}>
        Show Snackbar
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        message="Snackbar Example"
        action={
          <Button color="inherit" size="small" onClick={handleClose}>
            Close
          </Button>
        }
      ></Snackbar>
      <br />
      <br />
      <br />
      <Alert severity="error">This is an error alert — check it out!</Alert>
    </Container>
  );
};

export default SnackbarExample;
