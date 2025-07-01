package com.tecsup.demo.service;

import com.tecsup.demo.entity.Submission;
import com.tecsup.demo.entity.Task;
import com.tecsup.demo.entity.User;
import com.tecsup.demo.repository.SubmissionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubmissionService {

    private final SubmissionRepository submissionRepository;

    public SubmissionService(SubmissionRepository submissionRepository) {
        this.submissionRepository = submissionRepository;
    }

    public List<Submission> listAll() {
        return submissionRepository.findAll();
    }

    public Optional<Submission> findById(Long id) {
        return submissionRepository.findById(id);
    }

    public Optional<Submission> findByTaskAndUser(Task task, User user) {
        return submissionRepository.findByTaskAndUser(task, user);
    }

    public List<Submission> findByUser(User user) {
        return submissionRepository.findByUser(user);
    }

    public List<Submission> findByTask(Task task) {
        return submissionRepository.findByTask(task);
    }

    public Submission save(Submission submission) {
        return submissionRepository.save(submission);
    }

    public void delete(Long id) {
        submissionRepository.deleteById(id);
    }
}
