package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

// Represents a food item. Belongs to one category

@Entity
@Table(name = "food_items")
@Data
public class FoodItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;
    private Double price;
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    private Status status;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonIgnoreProperties("foodItems")
    private Category category;

    public enum Status {
        AVAILABLE, OUT_OF_STOCK
    }
}