package com.pymes.backend.services;

import com.pymes.backend.entities.Pyme;
import com.pymes.backend.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PymeService {

    List<Pyme> getAllPymes();

    Page<Pyme> findALl(Pageable pageable);
    Pyme createPyme(Pyme pyme, User user);

    Pyme getPymeById(Long id);

    Pyme updatePyme(Pyme pyme, Long id);
}
