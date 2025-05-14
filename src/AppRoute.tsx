import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import RegisterPage from './pages/RegisterPage';
import TaskManagerLayout from './components/TaskManagerLayout';
import LoginPage from './pages/LoginPage';
import UserProvider from './context/UserContextProvider';
import TaskDashboard from './pages/TaskDashboard';
import ProtectedRoute from './ProtectedRoute';
import CreateEditTask from './pages/CreateEditTask';
import { TaskProvider } from './context/TaskContext'; // Import the TaskProvider

function AppRoutes() {
  return (
    <UserProvider>
      <TaskProvider>
        <Routes>
          <Route path="/" element={<TaskManagerLayout />}>
            <Route index element={<RegisterPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route
              path="taskdashboard"
              element={
                <ProtectedRoute>
                  <TaskDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="create-task"
              element={
                <ProtectedRoute>
                  <CreateEditTask />
                </ProtectedRoute>
              }
            />
            <Route
              path="edit-task/:id"
              element={
                <ProtectedRoute>
                  <CreateEditTask />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </TaskProvider>
    </UserProvider>
  );
}

export default AppRoutes;
