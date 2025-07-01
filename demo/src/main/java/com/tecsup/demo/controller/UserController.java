package com.tecsup.demo.controller;

import com.tecsup.demo.dto.UserDTO;
import com.tecsup.demo.entity.User;
import com.tecsup.demo.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> listAll() {
        return userService.listAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getById(@PathVariable Long id) {
        return userService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public User create(@RequestBody UserDTO dto) {
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setPassword(dto.getPassword()); // TODO: cifrar con BCrypt
        user.setEmail(dto.getEmail());
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setPhone(dto.getPhone());
        user.setRole(dto.getRole());
        return userService.save(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> update(@PathVariable Long id, @RequestBody UserDTO dto) {
        return userService.findById(id)
                .map(user -> {
                    user.setUsername(dto.getUsername());
                    user.setPassword(dto.getPassword()); // TODO: cifrar
                    user.setEmail(dto.getEmail());
                    user.setFirstName(dto.getFirstName());
                    user.setLastName(dto.getLastName());
                    user.setPhone(dto.getPhone());
                    user.setRole(dto.getRole());
                    return ResponseEntity.ok(userService.save(user));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (userService.findById(id).isPresent()) {
            userService.delete(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(user);
    }

}
