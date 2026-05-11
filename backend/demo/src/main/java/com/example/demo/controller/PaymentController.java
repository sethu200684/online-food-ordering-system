package com.example.demo.controller;

import com.example.demo.entity.Payment;
import com.example.demo.service.PaymentService;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private static final Logger log = LoggerFactory.getLogger(PaymentController.class);

    @Autowired
    private PaymentService paymentService;

    @PostMapping
    public ResponseEntity<?> processPayment(@RequestBody Payment payment) {
        log.info("POST request - process payment of amount: {}", payment.getAmount());
        return ResponseEntity.ok(paymentService.processPayment(payment));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPayment(@PathVariable Long id) {
        log.info("GET request - fetch payment with id: {}", id);
        return paymentService.getPaymentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}