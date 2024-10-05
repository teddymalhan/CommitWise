package com.example.localstack.localstackdemo.controller;

import com.example.localstack.localstackdemo.model.Employee;
import com.github.javafaker.Faker;
import io.awspring.cloud.sns.core.SnsNotification;
import io.awspring.cloud.sns.core.SnsTemplate;
import io.awspring.cloud.sqs.annotation.SqsListener;
import io.awspring.cloud.sqs.operations.SqsTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class DemoController {

    Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private SqsTemplate sqsTemplate;

    @Autowired
    private SnsTemplate snsTemplate;

    @RequestMapping("/sendSQSMessage")
    @ResponseBody
    public String sendMessage() {
        Employee employee = getRandomEmployee();
        sqsTemplate.send(to -> to.queue("my-queue").payload(employee));
        return "Message sent to SQS - " + employee;
    }

    @RequestMapping("/publishSNSNotification")
    @ResponseBody
    public String publishNotification() {
        Employee employee = getRandomEmployee();
        snsTemplate.sendNotification("my-topic", SnsNotification.of(employee));
        return "Message published to SNS topic my-topic - " + employee;
    }

    @SqsListener("my-queue")
    public void listen(Employee message) {
        logger.info("Message received - {}", message);
    }

    private Employee getRandomEmployee() {
        Faker faker = new Faker();
        String firstName = faker.name().firstName();
        String lastName = faker.name().lastName();
        return Employee.builder()
                .id(faker.number().randomNumber())
                .firstName(firstName)
                .lastName(lastName)
                .emailId(firstName + "." + lastName + "@" + faker.internet().domainName())
                .build();
    }
}
