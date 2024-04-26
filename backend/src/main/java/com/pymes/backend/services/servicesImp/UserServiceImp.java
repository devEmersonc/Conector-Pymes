package com.pymes.backend.services.servicesImp;

import com.pymes.backend.entities.User;
import com.pymes.backend.repositories.RoleRepository;
import com.pymes.backend.repositories.UserRepository;
import com.pymes.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private RoleRepository roleRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<User> findAllUsers() {
        return userRepo.findAll();
    }

    @Override
    public User registerUser(User user) {
        User newUser = new User();

        newUser.setUsername(user.getUsername());
        newUser.setFirstname(user.getFirstname());
        newUser.setLastname(user.getLastname());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        newUser.setRoles(roleRepo.findByName("ROLE_USER"));

        return userRepo.save(newUser);
    }

    @Override
    public User getUser(Long id) {
       return userRepo.findById(id).orElse(null);
    }

    @Override
    public User updateUser(User user, Long id){
        User newUser = userRepo.findById(id).orElse(null);

        newUser.setUsername(newUser.getUsername());
        newUser.setPassword(newUser.getPassword());
        newUser.setFirstname(user.getFirstname());
        newUser.setLastname(user.getLastname());
        newUser.setEmail(user.getEmail());
        newUser.setPhoto(user.getPhoto());

        return userRepo.save(newUser);
    }
}
