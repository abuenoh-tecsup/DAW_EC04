package com.tecsup.demo.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TaskDTO {

    @NotBlank(message = "El título es obligatorio")
    @Size(max = 200, message = "El título no debe superar los 200 caracteres")
    private String title;

    @NotBlank(message = "La descripción es obligatoria")
    private String description;

    @NotNull(message = "La fecha de publicación es obligatoria")
    private LocalDateTime publicationDate;

    @NotNull(message = "La fecha de vencimiento es obligatoria")
    private LocalDateTime dueDate;
}
