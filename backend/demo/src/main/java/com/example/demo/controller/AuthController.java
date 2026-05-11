package com.example.demo.controller;

import com.example.demo.dto.AuthResponse;
import com.example.demo.dto.SignInRequest;
import com.example.demo.dto.SignUpRequest;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequest request) {
        log.info("Sign up request received for email: {}", request.getEmail());
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            log.warn("Email already in use: {}", request.getEmail());
            return ResponseEntity.badRequest().body("Email already in use");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(User.Role.CUSTOMER);
        userRepository.save(user);

        log.info("User registered successfully: {}", request.getEmail());
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@RequestBody SignInRequest request) {
        log.info("Sign in request received for email: {}", request.getEmail());
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(), request.getPassword()));

        String token = jwtUtil.generateToken(request.getEmail());
        User user = userRepository.findByEmail(request.getEmail()).get();

        log.info("User signed in successfully: {}", request.getEmail());
        return ResponseEntity.ok(new AuthResponse(token, user.getRole().name()));
    }
}