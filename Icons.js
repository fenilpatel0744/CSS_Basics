import React from "react";
import { Button, TextField, Container, Typography, Box } from "@mui/material";
import { Send } from "@mui/icons-material";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";

const Icons = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <InsertEmoticonIcon
          fontSize="large"
          sx={{ mt: "10px" }}
          color="primary"
        />
        <Typography component="h1" variant="h5" sx={{ marginTop: "16px" }}>
          Welcome to My App
        </Typography>

        <form sx={{ width: "100%", marginTop: "16px" }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ margin: "16px 0" }}
            startIcon={<Send />}
          >
            Log In
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Icons;
