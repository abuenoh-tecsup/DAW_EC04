import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useAuthStore } from "../../store/authStore";
import { getTasks, deleteTask } from "../../services/task.service";

const TaskList = () => {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!token || !user) {
      navigate("/login");
    } else {
      loadTasks();
    }
  }, [token, user]);

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error al cargar tareas:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar esta tarea?")) return;
    try {
      await deleteTask(id);
      loadTasks();
    } catch (err) {
      console.error("Error al eliminar tarea:", err);
    }
  };

  const isProfessor = user?.role === "professor";

  return (
    <>
      <Header />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Listado de Tareas</h2>
          {isProfessor && (
            <button
              className="btn btn-primary"
              onClick={() => navigate("/tasks/new")}
            >
              Nueva Tarea
            </button>
          )}
        </div>

        {tasks.length === 0 ? (
          <p>No hay tareas disponibles.</p>
        ) : (
          <div className="row">
            {tasks.map((task) => (
              <div className="col-md-6 mb-3" key={task.id}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{task.title}</h5>
                    <p className="card-text">{task.description}</p>
                    <p className="card-text text-muted">
                      <small>
                        Publicada:{" "}
                        {new Date(task.publicationDate).toLocaleString()}
                        <br />
                        Vence: {new Date(task.dueDate).toLocaleString()}
                      </small>
                    </p>
                    <div className="d-flex justify-content-end gap-2">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => navigate(`/tasks/${task.id}`)}
                      >
                        Ver Detalle
                      </button>
                      {isProfessor && (
                        <>
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => navigate(`/tasks/edit/${task.id}`)}
                          >
                            Editar
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(task.id)}
                          >
                            Eliminar
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default TaskList;
