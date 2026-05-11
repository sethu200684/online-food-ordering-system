package com.example.demo.service;

import com.example.demo.entity.FoodItem;
import com.example.demo.repository.FoodItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Service
public class FoodItemService {

    private static final Logger log = LoggerFactory.getLogger(FoodItemService.class);

    @Autowired
    private FoodItemRepository foodItemRepository;

    public List<FoodItem> getAllFoodItems() {
        log.info("Fetching all food items");
        return foodItemRepository.findAll();
    }

    public List<FoodItem> getFoodItemsByCategory(Long categoryId) {
        log.info("Fetching food items for category id: {}", categoryId);
        return foodItemRepository.findByCategoryId(categoryId);
    }

    public Optional<FoodItem> getFoodItemById(Long id) {
        log.info("Fetching food item with id: {}", id);
        return foodItemRepository.findById(id);
    }

    public FoodItem saveFoodItem(FoodItem foodItem) {
        log.info("Saving food item: {}", foodItem.getName());
        return foodItemRepository.save(foodItem);
    }

    public void deleteFoodItem(Long id) {
        log.info("Deleting food item with id: {}", id);
        foodItemRepository.deleteById(id);
    }
}