package com.pymes.backend.services;

import com.pymes.backend.entities.User;
import com.pymes.backend.models.AuthResponse;
import com.pymes.backend.models.AuthenticationRequest;

public interface AuthService {

    AuthResponse login(AuthenticationRequest request);

    User findByUsername(String username);

    boolean authenticateUser(String username, String password);
}
