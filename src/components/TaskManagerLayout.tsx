import { AppBar, Toolbar, Typography, Box, Container, IconButton, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../context/UserContext'; // import UserContext

const TaskManagerLayout = () => {
  const { user, token, logout } = useContext(UserContext); // Use context to access user and token
  const navigate = useNavigate(); // Hook to navigate on button click

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logging out
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Task Manager
          </Typography>

          {/* Navigation Links */}
          <Link to="/taskdashboard" style={{ color: 'inherit', textDecoration: 'none' }}>
            <Button color="inherit">Task List</Button>
          </Link>
          <Link to="/create-task" style={{ color: 'inherit', textDecoration: 'none' }}>
            <Button color="inherit">Create Task</Button>
          </Link>

          {/* Show Login if no token, else show Logout */}
          {token ? (
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          ) : (
            <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container component="main" sx={{ flex: 1, py: 4 }}>
        <Outlet /> {/* This renders the content for each route */}
      </Container>

      {/* Footer */}
      <Box component="footer" sx={{ py: 2, px: 2, backgroundColor: '#f5f5f5', textAlign: 'center' }}>
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} Task Manager. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default TaskManagerLayout;
