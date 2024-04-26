package com.pymes.backend.controllers;

import com.pymes.backend.entities.Comment;
import com.pymes.backend.entities.Pyme;
import com.pymes.backend.entities.User;
import com.pymes.backend.services.CommentService;
import com.pymes.backend.services.PymeService;
import com.pymes.backend.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "http://localhost:4200")
public class CommentsController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private UserService userService;

    @Autowired
    private PymeService pymeService;

    @PostMapping("/comment/{user_id}/{pyme_id}")
    public ResponseEntity<?> createComment(@RequestBody Comment comment, @PathVariable Long user_id, @PathVariable Long pyme_id){
        Comment newComment = null;
        User user = userService.getUser(user_id);
        Pyme pyme = pymeService.getPymeById(pyme_id);
        Map<String, Object> response = new HashMap<>();

        try{
            newComment = commentService.createComment(comment, user, pyme);
        }catch (Exception e){
            response.put("message", "Error al registrar el nuevo comentario.");
            response.put("error", e.getMessage());
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("message", "El comentario se a publicado con éxito.");
        response.put("message", newComment);
        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
    }
}
