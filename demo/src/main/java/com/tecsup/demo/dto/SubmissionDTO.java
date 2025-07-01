package com.tecsup.demo.dto;

import com.tecsup.demo.entity.Submission.SubmissionStatus;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class SubmissionDTO {

    @NotNull(message = "La fecha de entrega es obligatoria")
    private LocalDateTime submissionDate;

    @NotNull(message = "El estado es obligatorio")
    private SubmissionStatus status;

    @DecimalMin(value = "0.0", inclusive = true, message = "La nota no puede ser menor que 0")
    @DecimalMax(value = "20.0", inclusive = true, message = "La nota no puede ser mayor que 20")
    private Double grade;

    private String comments;

    @Size(max = 200, message = "La URL del archivo no debe superar los 200 caracteres")
    private String fileUrl;

    @NotNull(message = "El ID del usuario es obligatorio")
    private Long userId;

    @NotNull(message = "El ID de la tarea es obligatorio")
    private Long taskId;
}
