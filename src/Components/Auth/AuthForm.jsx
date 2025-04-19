import { TextField, Button, Box, Typography, Paper } from "@mui/material";

const AuthForm = ({ user, isLogin, onChange, onSubmit }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
        <Typography variant="h5" align="center" gutterBottom>
          {isLogin ? "Login" : "Register"}
        </Typography>

        <form onSubmit={onSubmit} autoComplete="off">
          {!isLogin && (
            <>
              <TextField
                label="First Name"
                name="firstName"
                value={user.firstName || ""}
                onChange={onChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Last Name"
                name="lastName"
                value={user.lastName || ""}
                onChange={onChange}
                fullWidth
                margin="normal"
                required
              />
            </>
          )}

          <TextField
            label="Email"
            name="email"
            type="email"
            value={user.email || ""}
            onChange={onChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={user.password || ""}
            onChange={onChange}
            fullWidth
            margin="normal"
            required
          />

          <Box mt={2}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "green",
              "&:hover": {
                backgroundColor: "darkgreen"
              }
            }}
          >
            Submit
          </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default AuthForm;
