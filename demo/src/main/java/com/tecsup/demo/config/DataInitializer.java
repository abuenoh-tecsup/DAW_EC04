package com.tecsup.demo.config;

import com.tecsup.demo.entity.User;
import com.tecsup.demo.repository.UserRepository;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void initUsers() {
        createUserIfNotExists(
                "admin", "admin", "admin@mail.com", "Admin", "Root", "999111222", User.UserRole.admin);
        createUserIfNotExists(
                "profesor", "profesor", "profesor@mail.com", "Ricardo", "Coello", "999222333", User.UserRole.professor);
        createUserIfNotExists(
                "estudiante", "estudiante", "estudiante@mail.com", "Alvaro", "Bueno", "999333444", User.UserRole.student);
    }

    private void createUserIfNotExists(String username, String rawPassword, String email, String firstName,
                                       String lastName, String phone, User.UserRole role) {

        if (userRepository.findByUsername(username).isEmpty()) {
            User user = new User();
            user.setUsername(username);
            user.setPassword(passwordEncoder.encode(rawPassword));
            user.setEmail(email);
            user.setFirstName(firstName);
            user.setLastName(lastName);
            user.setPhone(phone);
            user.setRole(role);
            userRepository.save(user);
            System.out.println("✔ Usuario creado: " + username);
        } else {
            System.out.println("ℹ Usuario ya existe: " + username);
        }
    }
}
