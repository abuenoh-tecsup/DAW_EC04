import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import GradeForm from "../../components/GradeForm";
import { useAuthStore } from "../../store/authStore";
import { getTaskById } from "../../services/task.service";
import {
  createSubmission,
  updateSubmission,
  getSubmissionsByTask,
} from "../../services/submission.service";
import axiosInstance from "../../utils/axiosInstance";

function TaskDetail() {
  const { id } = useParams();
  const user = useAuthStore((state) => state.user);

  const [task, setTask] = useState(null);
  const [submission, setSubmission] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [allSubmissions, setAllSubmissions] = useState([]);
  const [form, setForm] = useState({
    fileUrl: "",
    comments: "",
  });

  const isProfessor = user?.role === "professor";
  const isStudent = user?.role === "student";

  useEffect(() => {
    if (id && user) {
      loadTask();
      if (isProfessor) loadSubmissions();
      if (isStudent) loadMySubmission();
    }
  }, [id, user]);

  const loadTask = async () => {
    try {
      const data = await getTaskById(id);
      setTask(data);
    } catch (error) {
      console.error("Error al cargar tarea:", error);
    }
  };

  const loadSubmissions = async () => {
    try {
      const data = await getSubmissionsByTask(id);
      setAllSubmissions(data);
    } catch (error) {
      console.error("Error al cargar entregas:", error);
    }
  };

  const loadMySubmission = async () => {
    try {
      const res = await axiosInstance.get(`/submissions`);
      const my = res.data.find(
        (s) => s.task.id === Number(id) && s.user.id === user.id
      );
      if (my) {
        setSubmission(my);
        setForm({ fileUrl: my.fileUrl, comments: my.comments || "" });
        setHasSubmitted(true);
      } else {
        setSubmission(null);
        setHasSubmitted(false);
      }
    } catch (error) {
      console.error("Error al buscar entrega previa:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      submissionDate: new Date().toISOString(),
      status: "submitted",
      grade: null,
      userId: user.id,
      taskId: Number(id),
    };

    try {
      if (hasSubmitted && submission) {
        await updateSubmission(submission.id, payload);
        alert("Entrega actualizada");
      } else {
        await createSubmission(payload);
        alert("Entrega realizada");
      }
      await loadMySubmission();
    } catch (err) {
      console.error("Error al enviar entrega:", err);
      alert("Hubo un error al guardar la entrega.");
    }
  };

  if (!task) return <p className="text-center mt-4">Cargando tarea...</p>;

  return (
    <>
      <Header />
      <div className="container mt-4">
        {/* Detalles del Task */}
        <div className="mb-4">
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <p>
            <strong>Publicada:</strong>{" "}
            {new Date(task.publicationDate).toLocaleString()}
            <br />
            <strong>Vence:</strong> {new Date(task.dueDate).toLocaleString()}
          </p>
        </div>

        {/* Formulario de entrega (estudiante) */}
        {isStudent && (
          <div className="mb-5">
            <h4>{hasSubmitted ? "Editar Entrega" : "Realizar Entrega"}</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">URL del Archivo</label>
                <input
                  type="url"
                  className="form-control"
                  name="fileUrl"
                  value={form.fileUrl}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Comentarios</label>
                <textarea
                  className="form-control"
                  name="comments"
                  rows="3"
                  value={form.comments}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-success">
                {hasSubmitted ? "Actualizar Entrega" : "Enviar Entrega"}
              </button>
            </form>
          </div>
        )}

        {/* Lista de entregas (profesor) */}
        {isProfessor && (
          <div>
            <h4>Entregas de Estudiantes</h4>
            {allSubmissions.length === 0 ? (
              <p>No hay entregas aún.</p>
            ) : (
              <ul className="list-group">
                {allSubmissions.map((s) => (
                  <li key={s.id} className="list-group-item">
                    <strong>{s.user.firstName} {s.user.lastName}</strong> —{" "}
                    <a href={s.fileUrl} target="_blank" rel="noopener noreferrer">
                      Ver archivo
                    </a>
                    <br />
                    <small>
                      Entregado: {new Date(s.submissionDate).toLocaleString()}
                      {s.comments && <><br />Comentario: {s.comments}</>}
                    </small>

                    {s.grade != null ? (
                      <p className="mt-2 mb-0">
                        Nota: <strong>{s.grade}</strong>
                      </p>
                    ) : s.status === "submitted" ? (
                      <GradeForm submission={s} onGraded={loadSubmissions} />
                    ) : (
                      <p className="text-muted mt-2 mb-0">Estado: {s.status}</p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default TaskDetail;
