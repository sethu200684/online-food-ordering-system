package com.example.demo.service;

import com.example.demo.entity.Category;
import com.example.demo.repository.CategoryRepository;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class CategoryService {

    private static final Logger log = LoggerFactory.getLogger(CategoryService.class);

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        log.info("Fetching all categories");
        return categoryRepository.findAll();
    }

    public Optional<Category> getCategoryById(Long id) {
        log.info("Fetching category with id: {}", id);
        return categoryRepository.findById(id);
    }

    public Category saveCategory(Category category) {
        log.info("Saving category: {}", category.getName());
        return categoryRepository.save(category);
    }

    public void deleteCategory(Long id) {
        log.info("Deleting category with id: {}", id);
        categoryRepository.deleteById(id);
    }
}