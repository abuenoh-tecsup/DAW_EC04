import { useState } from "react";
import { updateSubmission } from "../services/submission.service";

const GradeForm = ({ submission, onGraded }) => {
  const [grade, setGrade] = useState("");

  const handleGradeSubmit = async (e) => {
    e.preventDefault();
    const parsedGrade = parseFloat(grade);
    if (isNaN(parsedGrade) || parsedGrade < 0 || parsedGrade > 20) {
      alert("La nota debe estar entre 0 y 20");
      return;
    }

    try {
      await updateSubmission(submission.id, {
        submissionDate: submission.submissionDate,
        status: "graded",
        grade: parsedGrade,
        comments: submission.comments,
        fileUrl: submission.fileUrl,
        userId: submission.user.id,
        taskId: submission.task.id,
      });
      onGraded(); // recargar entregas
    } catch (err) {
      console.error("Error al calificar:", err);
      alert("No se pudo calificar la entrega.");
    }
  };

  return (
    <form onSubmit={handleGradeSubmit} className="d-flex align-items-center mt-2">
      <input
        type="number"
        className="form-control me-2"
        placeholder="Nota (0-20)"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        min="0"
        max="20"
        step="0.1"
        required
        style={{ maxWidth: "120px" }}
      />
      <button type="submit" className="btn btn-sm btn-success">
        Calificar
      </button>
    </form>
  );
};

export default GradeForm;
