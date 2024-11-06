package com.teddymalhan;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.teddymalhan")
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}