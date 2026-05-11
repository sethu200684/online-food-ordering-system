package com.example.demo.service;

import com.example.demo.entity.Order;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class OrderService {

    private static final Logger log = LoggerFactory.getLogger(OrderService.class);

    @Autowired
    private OrderRepository orderRepository;

    public List<Order> getAllOrders() {
        log.info("Fetching all orders");
        return orderRepository.findAll();
    }

    public List<Order> getOrdersByUserId(Long userId) {
        log.info("Fetching orders for user id: {}", userId);
        return orderRepository.findByUserId(userId);
    }

    public Optional<Order> getOrderById(Long id) {
        log.info("Fetching order with id: {}", id);
        return orderRepository.findById(id);
    }

    public Order placeOrder(Order order) {
        log.info("Placing order for user id: {}", order.getUser().getId());
        order.setOrderDate(LocalDateTime.now());
        order.setStatus(Order.Status.PLACED);
        return orderRepository.save(order);
    }

    public Order updateOrderStatus(Long id, Order.Status status) {
        log.info("Updating order status for order id: {} to {}", id, status);
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));
        order.setStatus(status);
        return orderRepository.save(order);
    }
}