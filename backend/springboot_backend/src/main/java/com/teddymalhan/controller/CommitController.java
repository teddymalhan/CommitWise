package com.teddymalhan.controller;


import com.teddymalhan.model.Commit;
import com.teddymalhan.repository.CommitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/commits")
public class CommitController {
    private final CommitRepository commitRepository;

    // Using AutoWired to inject the CommitRepository dependency
    @Autowired
    // Constructor-based dependency injection
    public CommitController(CommitRepository commitRepository) {
        this.commitRepository = commitRepository;
    }

    // Parses the request body into a Commit object and saves it to the database
    @PostMapping
    public void createCommit(@RequestBody Commit commit) {
        commitRepository.saveCommit(commit);
    }

    @GetMapping("/{commitId}")
    public Commit getCommit(@PathVariable String commitId) {
        return commitRepository.getCommitById(commitId);
    }

    @DeleteMapping("/{commitId}")
    public void deleteCommit(@PathVariable String commitId) {
        commitRepository.deleteCommitById(commitId);
    }
}
