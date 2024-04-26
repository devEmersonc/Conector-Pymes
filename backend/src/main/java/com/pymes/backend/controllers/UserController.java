package com.pymes.backend.controllers;

import com.pymes.backend.entities.User;
import com.pymes.backend.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/list-users")
    public List<User> findAllUsers(){
        return userService.findAllUsers();
    }

    @GetMapping("/user/{id}")
    public User getUser(@PathVariable Long id){
        return userService.getUser(id);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody User user, BindingResult result){
        User newUser = null;
        Map<String, Object> response = new HashMap<>();

        if(result.hasErrors()){
            List<String> errors = new ArrayList<>();
            for(FieldError err: result.getFieldErrors()){
                errors.add(err.getDefaultMessage());
            }

            response.put("errors", errors);
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
        }

        try{
            newUser = userService.registerUser(user);
        }catch (Exception e){
            response.put("message", "Error al guardar al usuario.");
            response.put("error", e.getMessage());
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("message", "Se ha registrado al usuario con éxito.");
        response.put("user", newUser);
        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUser(@Valid @RequestBody User user, BindingResult result, @PathVariable Long id){
        User currentUser = userService.getUser(id);
        User updatedUser = null;
        Map<String, Object> response = new HashMap<>();

        if(result.hasErrors()){
            List<String> errors = new ArrayList<>();
            for(FieldError err: result.getFieldErrors()){
                errors.add(err.getDefaultMessage());
            }

            response.put("errors", errors);
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
        }

        if(currentUser == null){
            response.put("message", "El usuario no existe.");
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
        }

        try{
            updatedUser = userService.updateUser(user, id);
        }catch (Exception e){
            response.put("message", "Error al actualizar al usuario.");
            response.put("error", e.getMessage());
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("message", "Usuario actualizado.");
        response.put("user", updatedUser);
        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
    }

    @PostMapping("/upload/image")
    public ResponseEntity<?> uploadImage(@RequestParam("image")MultipartFile image, @RequestParam("id") Long id){
            Map<String, Object> response = new HashMap<>();
            User user = userService.getUser(id);

            if(!image.isEmpty()){
                String imageName = UUID.randomUUID().toString() + "_" + image.getOriginalFilename().replace(" ", "");
                Path imagePath = Paths.get("uploads").resolve(imageName).toAbsolutePath();

                try{
                    Files.copy(image.getInputStream(), imagePath);
                }catch (IOException e){
                    response.put("message", "Error al subir la imagen.");
                    response.put("error", e.getMessage());
                    return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
                }

                //Validar si el usuario ya tiene una foto o no, si ya existe eliminamos foto anterior y actualizamos por la nueva
                String namePreviousImage = user.getPhoto();

                if(namePreviousImage != null && namePreviousImage.length() > 0){
                    Path previousImageRoute = Paths.get("uploads").resolve(namePreviousImage).toAbsolutePath();
                    File previousImageFile = previousImageRoute.toFile();

                    if(previousImageFile.exists() && previousImageFile.canRead()){
                        previousImageFile.delete();
                    }
                }

                user.setPhoto(imageName);
                userService.updateUser(user, id);

                response.put("message", "Se ha actualizado la imagen de perfil.");
                response.put("user", user);
            }
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
    }

    @GetMapping("/view/image/{imageName:.+}")
    public ResponseEntity<Resource> viewImage(@PathVariable String imageName){
        Path filePath = Paths.get("uploads").resolve(imageName).toAbsolutePath();
        Resource recurso = null;

        try{
            recurso = new UrlResource((filePath.toUri()));
        }catch (MalformedURLException e){
            e.printStackTrace();
        }

        if(!recurso.exists() && recurso.isReadable()){
            filePath = Paths.get("src/main/resources/static/images").resolve("user_icon.png").toAbsolutePath();

            try{
                recurso = new UrlResource(filePath.toUri());
            }catch (MalformedURLException e){
                e.printStackTrace();
            }
        }

        HttpHeaders header = new HttpHeaders();
        header.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + recurso.getFilename() + "\"");

        return new ResponseEntity<Resource>(recurso, header, HttpStatus.OK);
    }
}
