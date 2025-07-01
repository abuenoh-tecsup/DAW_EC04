package com.tecsup.demo.controller;

import com.tecsup.demo.dto.SubmissionDTO;
import com.tecsup.demo.entity.Submission;
import com.tecsup.demo.entity.Task;
import com.tecsup.demo.entity.User;
import com.tecsup.demo.service.SubmissionService;
import com.tecsup.demo.service.TaskService;
import com.tecsup.demo.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/submissions")
public class SubmissionController {

    private final SubmissionService submissionService;
    private final UserService userService;
    private final TaskService taskService;

    public SubmissionController(SubmissionService submissionService, UserService userService, TaskService taskService) {
        this.submissionService = submissionService;
        this.userService = userService;
        this.taskService = taskService;
    }

    @GetMapping
    public List<Submission> listAll() {
        return submissionService.listAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Submission> getById(@PathVariable Long id) {
        return submissionService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/task/{taskId}")
    public ResponseEntity<List<Submission>> getByTask(@PathVariable Long taskId) {
        return taskService.findById(taskId)
                .map(task -> ResponseEntity.ok(submissionService.findByTask(task)))
                .orElse(ResponseEntity.notFound().build());
    }


    @PostMapping
    public ResponseEntity<?> create(@RequestBody SubmissionDTO dto) {
        User user = userService.findById(dto.getUserId()).orElse(null);
        Task task = taskService.findById(dto.getTaskId()).orElse(null);

        if (user == null || task == null) {
            return ResponseEntity.badRequest().body("User or Task not found");
        }

        Submission submission = new Submission();
        submission.setSubmissionDate(dto.getSubmissionDate());
        submission.setStatus(dto.getStatus());
        submission.setGrade(dto.getGrade());
        submission.setComments(dto.getComments());
        submission.setFileUrl(dto.getFileUrl());
        submission.setUser(user);
        submission.setTask(task);

        return ResponseEntity.ok(submissionService.save(submission));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody SubmissionDTO dto) {
        return submissionService.findById(id)
                .map(existing -> {
                    User user = userService.findById(dto.getUserId()).orElse(null);
                    Task task = taskService.findById(dto.getTaskId()).orElse(null);

                    if (user == null || task == null) {
                        return ResponseEntity.badRequest().body("User or Task not found");
                    }

                    existing.setSubmissionDate(dto.getSubmissionDate());
                    existing.setStatus(dto.getStatus());
                    existing.setGrade(dto.getGrade());
                    existing.setComments(dto.getComments());
                    existing.setFileUrl(dto.getFileUrl());
                    existing.setUser(user);
                    existing.setTask(task);

                    return ResponseEntity.ok(submissionService.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (submissionService.findById(id).isPresent()) {
            submissionService.delete(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
