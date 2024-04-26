package com.pymes.backend.controllers;

import com.pymes.backend.entities.Pyme;
import com.pymes.backend.entities.User;
import com.pymes.backend.services.PymeService;
import com.pymes.backend.services.UserService;
import jakarta.validation.Valid;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
@RequestMapping("/api/pyme")
@CrossOrigin(origins = "http://localhost:4200")
public class PymeController {

    @Autowired
    private PymeService pymeService;

    @Autowired
    private UserService userService;

    @GetMapping("/list-pymes")
    public List<Pyme> getAllPymes(){
        return pymeService.getAllPymes();
    }

    @GetMapping("/pymes/page/{page}")
    public Page<Pyme> getPymes(@PathVariable Integer page){
        return pymeService.findALl(PageRequest.of(page, 6));
    }

    @GetMapping("/{id}")
    public Pyme getPyme(@PathVariable Long id){
        return pymeService.getPymeById(id);
    }

    @PostMapping("/create/pyme/{user_id}")
    public ResponseEntity<?> createPyme(@Valid @RequestBody Pyme pyme, BindingResult result, @PathVariable Long user_id){
        User user = userService.getUser(user_id);
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
            pymeService.createPyme(pyme, user);
        }catch(Exception e){
            response.put("message", "Error al crear Pyme en BD");
            response.put("error", e.getMessage());
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("message", "La pyme se ha creado con éxito.");
        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
    }

    @PostMapping("/update/pyme/{id}")
    public ResponseEntity<?> updatePyme(@Valid @RequestBody Pyme pyme, BindingResult result, @PathVariable Long id){
        Pyme currentPyme = pymeService.getPymeById(id);
        Pyme newPyme = null;
        Map<String, Object> response = new HashMap<>();

        if(result.hasErrors()){
            List<String> errors = new ArrayList<>();
            for(FieldError err: result.getFieldErrors()){
                errors.add(err.getDefaultMessage());
            }

            response.put("errors", errors);
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
        }

        if(currentPyme == null){
            response.put("message", "La pyme ingresada no existe.");
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
        }

        try{
            newPyme = pymeService.updatePyme(pyme, id);
        }catch (Exception e){
            response.put("message", "Error al actualizar la pyme.");
            response.put("error", e.getMessage());
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("message", "La pyme se actualizó con éxito.");
        response.put("pyme", newPyme);
        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
    }

    @PostMapping("/upload/image")
    public ResponseEntity<?> uploadImage(@RequestParam("image")MultipartFile image, @RequestParam("id") Long id){
        Map<String, Object> response = new HashMap<>();
        Pyme pyme = pymeService.getPymeById(id);

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

            //validar si existe foto o no, si existe se reemplaza por nueva foto
            String namePreviousImage = pyme.getPhoto();

            if(namePreviousImage != null && namePreviousImage.length() > 0){
                Path previousImageRoute = Paths.get("uploads").resolve(namePreviousImage).toAbsolutePath();
                File previousImageFile = previousImageRoute.toFile();

                if(previousImageFile.exists() && previousImageFile.canRead()){
                    previousImageFile.delete();
                }
            }

            pyme.setPhoto(imageName);
            pymeService.updatePyme(pyme, id);

            response.put("message", "Se ha actualizado la imagen.");
            response.put("pyme", pyme);
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
