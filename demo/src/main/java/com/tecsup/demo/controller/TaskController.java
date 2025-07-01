package com.tecsup.demo.controller;

import com.tecsup.demo.dto.TaskDTO;
import com.tecsup.demo.entity.Task;
import com.tecsup.demo.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public List<Task> listAll() {
        return taskService.listAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getById(@PathVariable Long id) {
        return taskService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Task create(@RequestBody TaskDTO dto) {
        Task task = new Task();
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setPublicationDate(dto.getPublicationDate());
        task.setDueDate(dto.getDueDate());
        return taskService.save(task);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> update(@PathVariable Long id, @RequestBody TaskDTO dto) {
        return taskService.findById(id)
                .map(task -> {
                    task.setTitle(dto.getTitle());
                    task.setDescription(dto.getDescription());
                    task.setPublicationDate(dto.getPublicationDate());
                    task.setDueDate(dto.getDueDate());
                    return ResponseEntity.ok(taskService.save(task));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (taskService.findById(id).isPresent()) {
            taskService.delete(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
