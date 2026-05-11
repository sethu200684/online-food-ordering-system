package com.example.demo.controller;

import com.example.demo.entity.Order;
import com.example.demo.service.OrderService;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private static final Logger log = LoggerFactory.getLogger(OrderController.class);

    @Autowired
    private OrderService orderService;

    @GetMapping
    public List<Order> getAllOrders() {
        log.info("GET request - fetch all orders");
        return orderService.getAllOrders();
    }

    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUser(@PathVariable Long userId) {
        log.info("GET request - fetch orders for user id: {}", userId);
        return orderService.getOrdersByUserId(userId);
    }

    @PostMapping
    public ResponseEntity<?> placeOrder(@RequestBody Order order) {
        log.info("POST request - place new order");
        return ResponseEntity.ok(orderService.placeOrder(order));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id,
                                          @RequestParam Order.Status status) {
        log.info("PUT request - update order id: {} status to {}", id, status);                                    
        return ResponseEntity.ok(orderService.updateOrderStatus(id, status));
    }
}