package com.teddymalhan.controller;

import com.teddymalhan.repository.CommitRepository;

public class CommitControllerBuilder {
    private CommitRepository commitRepository;

    public CommitControllerBuilder setCommitRepository(CommitRepository commitRepository) {
        this.commitRepository = commitRepository;
        return this;
    }

    public CommitController createCommitController() {
        return new CommitController(commitRepository);
    }
}