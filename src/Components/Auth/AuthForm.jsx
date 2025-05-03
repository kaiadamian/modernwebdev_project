/* tAuthentication Form- Stateless Child Componen for reuse in AuthLogin, AuthRegister */
import { TextField, Button, Box, Typography, Paper } from "@mui/material"

const AuthForm = ({ user, isLogin, onChange, onSubmit, emailError }) => {
  return (
    // retrieve user's first name, last name, email, and password
      <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
        <Typography variant="h5" align="center" gutterBottom>
          {isLogin ? "Login" : "Register"}
        </Typography>

        <form onSubmit={onSubmit} autoComplete="off">
          {/* Autofill suppression honeypot */}
          <input
            type="text"
            name="fake-field"
            autoComplete="username"
            style={{ display: "none" }}
          />

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
                autoComplete="off"
              />
              <TextField
                label="Last Name"
                name="lastName"
                value={user.lastName || ""}
                onChange={onChange}
                fullWidth
                margin="normal"
                required
                autoComplete="off"
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
            autoComplete="off"
            inputProps={{ autoComplete: "new-password" }}
            error={emailError}
            helperText={emailError ? "Email must end with @nd.edu" : ""}
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
            autoComplete="off"
            inputProps={{ autoComplete: "new-password" }}
          />

          <Box mt={2}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "primary.main",
                "&:hover": {
                  backgroundColor: "primary.dark"
                }
              }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Paper>
  )
}

export default AuthForm
