package com.example.demo.controller;

import com.example.demo.entity.Category;
import com.example.demo.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private static final Logger log = LoggerFactory.getLogger(CategoryController.class);


    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public List<Category> getAllCategories() {
        log.info("GET request - fetch all categories");
        return categoryService.getAllCategories();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCategoryById(@PathVariable Long id) {
        log.info("GET request - fetch category with id: {}", id);
        return categoryService.getCategoryById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Category createCategory(@RequestBody Category category) {
        log.info("POST request - create category: {}", category.getName());
        return categoryService.saveCategory(category);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        log.info("DELETE request - delete category with id: {}", id);
        categoryService.deleteCategory(id);
        return ResponseEntity.ok("Category deleted");
    }
}