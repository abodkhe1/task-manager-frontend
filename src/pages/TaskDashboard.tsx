// src/pages/TaskDashboard.tsx
import { useEffect, useState } from 'react';
import { Container, Box, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext'; // Import the context
import Swal from 'sweetalert2';
export default function TaskDashboard() {
  const { tasks, fetchTasks, deleteTask } = useTaskContext(); // Use task context
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks(page, 5);
  }, [page, fetchTasks]);

  const handleDelete = (id: string) => {
    deleteTask(id); // Delete task using context method
  
      Swal.fire({
        title: 'Success!',
        text: 'Data Delete successfully',
        icon: 'success',
        confirmButtonText: 'Cool',
      });
    
  };

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Task Dashboard
        </Typography>

        <Button variant="contained" onClick={() => navigate('/create-task')} sx={{ mb: 2 }}>
          Create New Task
        </Button>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map(task => (
              <TableRow key={task._id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>
                  <Button onClick={() => navigate(`/edit-task/${task._id}`)}>Edit</Button>
                  <Button color="error" onClick={() => handleDelete(task._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Box mt={2} display="flex" justifyContent="center">
          <Pagination count={totalPages} page={page} onChange={(e, value) => setPage(value)} />
        </Box>
      </Box>
    </Container>
  );
}
