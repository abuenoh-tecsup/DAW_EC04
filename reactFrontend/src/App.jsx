import { Routes, Route, Navigate } from "react-router-dom";
import TaskList from "./pages/tasks/TaskList";
import TaskForm from "./pages/tasks/TaskForm";
import TaskDetail from "./pages/tasks/TaskDetail";
import Login from "./pages/Login";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/tasks" />} />

      <Route path="/login" element={<Login />} />

      <Route path="/tasks" element={<TaskList />} />
      <Route path="/tasks/new" element={<TaskForm />} />
      <Route path="/tasks/edit/:id" element={<TaskForm />} />
      <Route path="/tasks/:id" element={<TaskDetail />} />

    </Routes>
  );
};

export default App;