import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createTask,
  getTaskById,
  updateTask,
} from "../../services/task.service";
import Header from "../../components/Header";
import { useAuthStore } from "../../store/authStore";

const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const [form, setForm] = useState({
    title: "",
    description: "",
    publicationDate: "",
    dueDate: "",
  });

  const [error, setError] = useState(null);

  const isEdit = Boolean(id);

  useEffect(() => {
    if (!user || user.role !== "professor") {
      navigate("/tasks");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (isEdit) {
      getTaskById(id)
        .then((data) => {
          setForm({
            title: data.title,
            description: data.description,
            publicationDate: data.publicationDate.slice(0, 16),
            dueDate: data.dueDate.slice(0, 16),
          });
        })
        .catch((err) => {
          console.error("Error al cargar tarea:", err);
          navigate("/tasks");
        });
    }
  }, [id, isEdit, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const payload = {
      ...form,
      publicationDate: new Date(form.publicationDate),
      dueDate: new Date(form.dueDate),
    };

    try {
      if (isEdit) {
        await updateTask(id, payload);
      } else {
        await createTask(payload);
      }
      navigate("/tasks");
    } catch (err) {
      console.error("Error al guardar tarea:", err);
      setError("Ocurrió un error al guardar la tarea");
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h2>{isEdit ? "Editar Tarea" : "Nueva Tarea"}</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Título</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={form.title}
              onChange={handleChange}
              required
              maxLength={200}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <textarea
              name="description"
              className="form-control"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Fecha de Publicación</label>
            <input
              type="datetime-local"
              name="publicationDate"
              className="form-control"
              value={form.publicationDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Fecha de Vencimiento</label>
            <input
              type="datetime-local"
              name="dueDate"
              className="form-control"
              value={form.dueDate}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-success">
            {isEdit ? "Actualizar" : "Crear"}
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => navigate("/tasks")}
          >
            Cancelar
          </button>
        </form>
      </div>
    </>
  );
};

export default TaskForm;
