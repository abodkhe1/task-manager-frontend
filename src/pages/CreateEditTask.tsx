// src/pages/CreateEditTask.tsx
import { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, MenuItem, Select, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext'; // Import the context
import Swal from 'sweetalert2';

export default function CreateEditTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, createTask, editTask } = useTaskContext(); // Use task context

  useEffect(() => {
    if (id) {
      const task = tasks.find(t => t._id === id);
      if (task) {
        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);
      }
    }
  }, [id, tasks]);

  const handleSubmit = () => {
    if (!title || !description) {
      setError('Title and description are required');
      return;
    }

    const newTask = { title, description, status };
    if (id) {
      editTask(id, newTask, Swal);
      
    } else {
      createTask(newTask);
       Swal.fire({
              title: 'Success!',
              text: 'Data Add successfully ',
              icon: 'success',
              confirmButtonText: 'Cool',
            });
    }

    navigate('/taskdashboard');
  };

  return (
    <Container maxWidth="sm">
      <Box mt={10}>
        <Typography variant="h4" gutterBottom>{id ? 'Edit Task' : 'Create Task'}</Typography>
        {/* Form inputs */}
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          error={!!error && !title}
          helperText={error && !title ? 'Title is required' : ''}
        />
        <TextField
          fullWidth
          label="Description"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          error={!!error && !description}
          helperText={error && !description ? 'Description is required' : ''}
        />
        {/* Status dropdown */}
        <FormControl fullWidth margin="normal" error={!!error && !status}>
          <InputLabel>Status</InputLabel>
          <Select value={status} onChange={(e) => setStatus(e.target.value)} label="Status">
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
          {!!error && !status && <FormHelperText>Status is required</FormHelperText>}
        </FormControl>
        {error && <Typography color="error" variant="body2">{error}</Typography>}
        <Button variant="contained" onClick={handleSubmit}>
          {id ? 'Update' : 'Create'}
        </Button>
      </Box>
    </Container>
  );
}
