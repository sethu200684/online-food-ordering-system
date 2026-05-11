package com.example.demo.controller;

import com.example.demo.entity.FoodItem;
import com.example.demo.service.FoodItemService;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/foods")
public class FoodItemController {

    private static final Logger log = LoggerFactory.getLogger(FoodItemController.class);


    @Autowired
    private FoodItemService foodItemService;

    @GetMapping
    public List<FoodItem> getAllFoodItems() {
        log.info("GET request - fetch all food items");
        return foodItemService.getAllFoodItems();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getFoodItemById(@PathVariable Long id) {
        log.info("GET request - fetch food item with id: {}", id);
        return foodItemService.getFoodItemById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/category/{categoryId}")
    public List<FoodItem> getFoodItemsByCategory(@PathVariable Long categoryId) {
        log.info("GET request - fetch food items for category id: {}", categoryId);
        return foodItemService.getFoodItemsByCategory(categoryId);
    }

    @PostMapping
    public FoodItem createFoodItem(@RequestBody FoodItem foodItem) {
        log.info("POST request - create food item: {}", foodItem.getName());
        return foodItemService.saveFoodItem(foodItem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFoodItem(@PathVariable Long id) {
        log.info("DELETE request - delete food item with id: {}", id);
        foodItemService.deleteFoodItem(id);
        return ResponseEntity.ok("Food item deleted");
    }
}