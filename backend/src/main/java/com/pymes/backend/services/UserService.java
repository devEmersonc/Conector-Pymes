package com.pymes.backend.services;

import com.pymes.backend.entities.User;

import java.util.List;

public interface UserService {

    List<User> findAllUsers();
    User registerUser(User user);

    User getUser(Long id);

    User updateUser(User user, Long id);
}
