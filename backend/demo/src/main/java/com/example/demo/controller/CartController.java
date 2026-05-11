package com.example.demo.controller;

import com.example.demo.entity.Cart;
import com.example.demo.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private static final Logger log = LoggerFactory.getLogger(CartController.class);

    @Autowired
    private CartService cartService;

    @GetMapping("/{userId}")
    public ResponseEntity<?> getCart(@PathVariable Long userId) {
        log.info("GET request - fetch cart for user id: {}", userId);
        Cart cart = cartService.getCartByUserId(userId);
        return ResponseEntity.ok(cart);
    }

    @PostMapping("/{userId}/add")
    public ResponseEntity<?> addToCart(@PathVariable Long userId,
                                       @RequestParam Long foodItemId,
                                       @RequestParam Integer quantity) {
        log.info("POST request - add food item id: {} to cart for user id: {}", foodItemId, userId);                                
        Cart cart = cartService.addItemToCart(userId, foodItemId, quantity);
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/item/{cartItemId}")
    public ResponseEntity<?> removeFromCart(@PathVariable Long cartItemId) {
        log.info("DELETE request - remove cart item with id: {}", cartItemId);
        cartService.removeItemFromCart(cartItemId);
        return ResponseEntity.ok("Item removed from cart");
    }
}