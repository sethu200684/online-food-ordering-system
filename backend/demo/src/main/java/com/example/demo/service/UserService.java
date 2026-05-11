package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Service
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        log.info("Fetching all users");
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        log.info("Fetching user with id: {}", id);
        return userRepository.findById(id);
    }

    public Optional<User> getUserByEmail(String email) {
        log.info("Fetching user with email: {}", email);
        return userRepository.findByEmail(email);
    }

    public User saveUser(User user) {
        log.info("Saving user with email: {}", user.getEmail());
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        log.info("Deleting user with id: {}", id);
        userRepository.deleteById(id);
    }
}