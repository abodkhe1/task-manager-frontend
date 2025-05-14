// src/pages/LoginPage.tsx
import { 
  Button, 
  TextField, 
  Container, 
  Typography, 
  Box,
  Paper,
  Link,
  Stack,
  CircularProgress,
  Alert
} from '@mui/material';
import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../context/UserContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const authContext = useContext(UserContext);

  if (!authContext) {
    throw new Error('LoginPage must be used within a UserProvider');
  }

  const { login, isLoading, error, clearError } = authContext;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      clearError();
      return;
    }

    try {
      await login(email, password);
      navigate('/taskdashboard');
    } catch (err) {
      // Error is already handled in context
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box 
          component="form" 
          onSubmit={handleLogin}
          sx={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: 3
          }}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            align="center" 
            sx={{ 
              mb: 2,
              fontWeight: 700,
              color: 'primary.main'
            }}
          >
            Welcome Back
          </Typography>
          
          {error && (
            <Alert severity="error" onClose={clearError} sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <Stack spacing={3}>
            <TextField
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              variant="outlined"
              autoComplete="email"
            />
            
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              variant="outlined"
              autoComplete="current-password"
              inputProps={{ minLength: 6 }}
            />
          </Stack>
          
          <Button 
            type="submit"
            variant="contained"
            size="large"
            disabled={isLoading}
            sx={{ 
              mt: 2,
              py: 1.5,
              textTransform: 'none',
              fontSize: '1rem'
            }}
            fullWidth
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Sign In'
            )}
          </Button>
          
          <Typography align="center" sx={{ mt: 2 }}>
            New user?{' '}
            <Link 
              component={RouterLink} 
              to="/register" 
              underline="hover"
              color="primary"
              fontWeight="medium"
            >
              Create an account
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}