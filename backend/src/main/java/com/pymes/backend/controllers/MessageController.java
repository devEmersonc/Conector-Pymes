package com.pymes.backend.controllers;

import com.pymes.backend.entities.Message;
import com.pymes.backend.entities.Pyme;
import com.pymes.backend.entities.User;
import com.pymes.backend.services.MessageService;
import com.pymes.backend.services.PymeService;
import com.pymes.backend.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "http://localhost:4200")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @Autowired
    private UserService userService;

    @Autowired
    private PymeService pymeService;

    @GetMapping("/message/{id}")
    public Message getMessage(@PathVariable Long id){
        return messageService.getMessage(id);
    }

    @PostMapping("/create/message/{user_id}/{pyme_id}")
    public ResponseEntity<?> createMessage(@Valid @RequestBody Message message, BindingResult result, @PathVariable Long user_id, @PathVariable Long pyme_id){
        Map<String, Object> response = new HashMap<>();
        Message newMessage = null;
        User user = userService.getUser(user_id);
        Pyme pyme = pymeService.getPymeById(pyme_id);

        if(result.hasErrors()){
            List<String> errors = new ArrayList<>();
            for(FieldError err: result.getFieldErrors()){
                errors.add(err.getDefaultMessage());
            }

            response.put("errors", errors);
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
        }

        try{
            newMessage = messageService.createMessage(message, user, pyme);
        }catch (Exception e){
            response.put("message", "Error al guardar el mensaje en BD");
            response.put("error", e.getMessage());
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("message", "Mensaje guardado con éxito.");
        response.put("message", newMessage);
        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteMessage(@PathVariable Long id){
        Map<String, Object> response = new HashMap<>();
        Message message = messageService.getMessage(id);

        try{
            messageService.deleteMessage(id);
        }catch (Exception e){
            response.put("message", "Error al eliminar el mensaje.");
            response.put("error", e.getMessage());
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if(message == null){
            response.put("message", "El mensaje ingresado no existe.");
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
        }

        response.put("message", "Mensaje eliminado con éxito.");
        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
    }
}
