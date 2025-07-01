package com.tecsup.demo.repository;

import com.tecsup.demo.entity.Submission;
import com.tecsup.demo.entity.Task;
import com.tecsup.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {

    Optional<Submission> findByTaskAndUser(Task task, User user);

    List<Submission> findByUser(User user);

    List<Submission> findByTask(Task task);
}
