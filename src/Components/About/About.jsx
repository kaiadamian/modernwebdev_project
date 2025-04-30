import { Box, Typography, Container, Divider, Avatar, Stack } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

export default function About() {
  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <Box sx={{ boxShadow: 4, p: 5, borderRadius: 3, bgcolor: "background.paper" }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <InfoIcon color="primary" />
          <Typography variant="h4" fontWeight="bold">
            About Campus Connect
          </Typography>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        <Typography variant="body1">
          This platform was created to help students stay informed and involved in dorm-hosted events
          across Notre Dame’s campus. With so many fun, meaningful, and community-building activities happening
          every week, we wanted a central place to highlight them all — organized by dorm.
        </Typography>

        <Typography variant="body1">
          Campus Connect was designed by students, for students — with the goal of making campus feel smaller,
          more connected, and more engaging.
        </Typography>

        <Typography variant="body2" sx={{ mt: 4, mb: 1, fontStyle: "italic" }}>
          This site was created as a final project for SP25 CSE 40695 - Modern Web Development at the University of Notre Dame.
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Project Contributors
          </Typography>

          <Stack spacing={1}>
            <Box>
              <Typography variant="subtitle1" fontWeight="medium">
                Kaia Damian
              </Typography>
              <Typography variant="body2" color="text.secondary">
                kdamian@nd.edu
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle1" fontWeight="medium">
                Olivia Zino
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ozino@nd.edu
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}
