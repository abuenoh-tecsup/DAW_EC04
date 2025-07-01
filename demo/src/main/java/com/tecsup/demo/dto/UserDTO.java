package com.tecsup.demo.dto;

import com.tecsup.demo.entity.User.UserRole;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class UserDTO {

    @NotBlank(message = "El username es obligatorio")
    @Size(min = 3, max = 150, message = "El username debe tener entre 3 y 150 caracteres")
    private String username;

    @NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres")
    private String password;

    @NotBlank(message = "El email es obligatorio")
    @Email(message = "El email debe tener un formato válido")
    private String email;

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 30, message = "El nombre no debe superar los 30 caracteres")
    private String firstName;

    @NotBlank(message = "El apellido es obligatorio")
    @Size(max = 30, message = "El apellido no debe superar los 30 caracteres")
    private String lastName;

    @Size(max = 20, message = "El teléfono no debe superar los 20 caracteres")
    private String phone;

    @NotNull(message = "El rol es obligatorio")
    private UserRole role;
}
