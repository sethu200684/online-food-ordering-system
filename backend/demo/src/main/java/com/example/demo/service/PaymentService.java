package com.example.demo.service;

import com.example.demo.entity.Payment;
import com.example.demo.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class PaymentService {

    private static final Logger log = LoggerFactory.getLogger(PaymentService.class);

    @Autowired
    private PaymentRepository paymentRepository;

    public Payment processPayment(Payment payment) {
        log.info("Processing payment of amount: {}", payment.getAmount());
        payment.setPaymentDate(LocalDateTime.now());
        payment.setStatus(Payment.Status.COMPLETED);
        return paymentRepository.save(payment);
    }

    public Optional<Payment> getPaymentById(Long id) {
        log.info("Fetching payment with id: {}", id);
        return paymentRepository.findById(id);
    }
}