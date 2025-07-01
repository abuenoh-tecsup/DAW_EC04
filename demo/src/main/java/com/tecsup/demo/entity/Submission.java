package com.tecsup.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "submission", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"task_id", "user_id"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "submission_date", nullable = false)
    private LocalDateTime submissionDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private SubmissionStatus status;

    @Column
    private Double grade;

    @Column(columnDefinition = "TEXT")
    private String comments;

    @Column(name = "file_url", length = 200)
    private String fileUrl;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "task_id", nullable = false)
    private Task task;

    public enum SubmissionStatus {
        submitted, graded, pending, late, empty
    }
}
