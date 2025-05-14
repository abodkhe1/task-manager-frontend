// src/pages/RegisterPage.tsx
import { 
  Button, 
  TextField, 
  Container, 
  Typography, 
  Box, 
  CircularProgress,
  Paper,
  Link,
  Stack,
  Alert
} from '@mui/material';
import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../context/UserContext';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const authContext = useContext(UserContext);

  if (!authContext) {
    throw new Error('RegisterPage must be used within a UserProvider');
  }

  const { register, isLoading, error, clearError } = authContext;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      clearError();
      return;
    }

    try {
      await register(name, email, password);
      navigate('/taskdashboard', { state: { registered: true } });
    } catch (err) {
      // Error is already handled in context
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box 
          component="form" 
          onSubmit={handleRegister}
          sx={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: 3
          }}
        >
          <Typography variant="h4" component="h1" align="center" sx={{ mb: 2 }}>
            Create Account
          </Typography>
          
          {error && (
            <Alert severity="error" onClose={clearError} sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <Stack spacing={2}>
            <TextField
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
              variant="outlined"
            />
            
            <TextField
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              variant="outlined"
            />
            
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              variant="outlined"
              inputProps={{ minLength: 6 }}
            />
          </Stack>
          
          <Button 
            type="submit"
            variant="contained"
            size="large"
            disabled={isLoading}
            sx={{ mt: 2 }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Register'
            )}
          </Button>
          
          <Typography align="center" sx={{ mt: 2 }}>
            Already have an account?{' '}
            <Link component={RouterLink} to="/login" underline="hover">
              Login
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
