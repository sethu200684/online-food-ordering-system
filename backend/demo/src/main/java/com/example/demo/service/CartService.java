package com.example.demo.service;

import com.example.demo.entity.Cart;
import com.example.demo.entity.CartItem;
import com.example.demo.entity.FoodItem;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.CartRepository;
import com.example.demo.repository.CartItemRepository;
import com.example.demo.repository.FoodItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class CartService {

    private static final Logger log = LoggerFactory.getLogger(CartService.class);

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private FoodItemRepository foodItemRepository;

    public Cart getCartByUserId(Long userId) {
        log.info("Fetching cart for user id: {}", userId);
        return cartRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found"));
    }

    public Cart addItemToCart(Long userId, Long foodItemId, Integer quantity) {
        log.info("Adding food item id: {} to cart for user id: {}", foodItemId, userId);
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found"));

        FoodItem foodItem = foodItemRepository.findById(foodItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Food item not found"));

        CartItem cartItem = new CartItem();
        cartItem.setCart(cart);
        cartItem.setFoodItem(foodItem);
        cartItem.setQuantity(quantity);
        cartItemRepository.save(cartItem);

        return cart;
    }

    public void removeItemFromCart(Long cartItemId) {
        log.info("Removing cart item with id: {}", cartItemId);
        cartItemRepository.deleteById(cartItemId);
    }
}