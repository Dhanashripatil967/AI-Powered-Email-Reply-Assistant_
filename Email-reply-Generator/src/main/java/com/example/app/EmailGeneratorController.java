package com.example.app;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.beans.factory.annotation.Autowired;


@RestController
@RequestMapping("/api/email")
@CrossOrigin(origins = {"http://127.0.0.1:5500", "http://localhost:5500"}) // allow frontend
public class EmailGeneratorController {

    private EmailGeneratorService emailGeneratorService;

    @Autowired
    public EmailGeneratorController(EmailGeneratorService emailGeneratorService) {
        this.emailGeneratorService = emailGeneratorService;
    }

    @PostMapping("/generate")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest) {
        String response = emailGeneratorService.generateEmailReply(emailRequest);
        return ResponseEntity.ok(response);
    }
}
