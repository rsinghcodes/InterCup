import React from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Paper,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        py="1.5rem"
        flexDirection="column"
      >
        <Typography variant="h5" component="h5" fontWeight="600">
          Hi, Welcome back
        </Typography>
        <Box textAlign="center">
          <Chip
            variant="outlined"
            label="Manage your application here..."
            color="primary"
            sx={{ my: '1rem', mr: '0.5rem' }}
          />
        </Box>
      </Box>
      <Divider />
      <Card sx={{ mb: 3 }}>
        <CardHeader title="Dashboard" />

        <CardContent>
          <Box
            sx={{
              display: 'grid',
              gap: 2,
              gridTemplateColumns: 'repeat(3, 1fr)',
            }}
          >
            <CardActionArea component={Link} to="/admin/manage-users">
              <Paper variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
                <Typography variant="h6">App Users</Typography>
              </Paper>
            </CardActionArea>
            <CardActionArea component={Link} to="/admin/manage-questions">
              <Paper variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
                <Typography variant="h6">Theory Questions</Typography>
              </Paper>
            </CardActionArea>
            <CardActionArea component={Link} to="/admin/manage-quizzes">
              <Paper variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
                <Typography variant="h6">Quiz Questions</Typography>
              </Paper>
            </CardActionArea>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default AdminDashboard;
