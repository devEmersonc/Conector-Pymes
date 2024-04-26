package com.pymes.backend.services.servicesImp;

import com.pymes.backend.entities.User;
import com.pymes.backend.models.AuthResponse;
import com.pymes.backend.models.AuthenticationRequest;
import com.pymes.backend.repositories.UserRepository;
import com.pymes.backend.security.JwtService;
import com.pymes.backend.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImp implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Override
    public AuthResponse login(AuthenticationRequest request) {
        AuthResponse token = new AuthResponse();

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByUsername(request.getUsername());

        String jwt = jwtService.generateToken(user);
        token.setToken(jwt);

        return token;
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public boolean authenticateUser(String username, String password) {
        User user = userRepository.findByUsername(username);

        if(user == null){
            return false;
        }else{
            if(BCrypt.checkpw(password, user.getPassword())){
                return true;
            }else{
                return false;
            }
        }
    }
}
