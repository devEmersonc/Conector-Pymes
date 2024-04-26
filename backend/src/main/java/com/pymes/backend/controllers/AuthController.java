package com.pymes.backend.controllers;

import com.pymes.backend.entities.User;
import com.pymes.backend.models.AuthenticationRequest;
import com.pymes.backend.security.CustomUserDetailsService;
import com.pymes.backend.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest request){
        Map<String, Object> response = new HashMap<>();

        if(authService.authenticateUser(request.getUsername(), request.getPassword())){
            return ResponseEntity.ok(authService.login(request));
        }

        List<String> errors = new ArrayList<>();
        String error = "Credenciales inválidas.";
        errors.add(error);

        response.put("errors", errors);
        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/current_user")
    public User getCurrentUser(Principal principal){
        return (User) userDetailsService.loadUserByUsername(principal.getName());
    }
}
