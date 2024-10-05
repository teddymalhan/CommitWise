package com.example.localstack.localstackdemo.model;

import lombok.*;

@Data
@Builder
public class Employee {
    private long id;
    private String firstName;
    private String lastName;
    private String emailId;
}
