package com.pymes.backend.services.servicesImp;

import com.pymes.backend.entities.Pyme;
import com.pymes.backend.entities.User;
import com.pymes.backend.repositories.PymeRepository;
import com.pymes.backend.services.PymeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PymeServiceImp implements PymeService {

    @Autowired
    private PymeRepository pymeRepository;

    @Override
    public List<Pyme> getAllPymes(){
        return pymeRepository.findAll();
    }

    @Override
    public Page<Pyme> findALl(Pageable pageable) {
        return pymeRepository.findAll(pageable);
    }

    @Override
    public Pyme getPymeById(Long id){
        return pymeRepository.findById(id).orElse(null);
    }

    @Override
    public Pyme createPyme(Pyme pyme, User user){
        Pyme newPyme = new Pyme();

        newPyme.setName(pyme.getName());
        newPyme.setPhone(pyme.getPhone());
        newPyme.setDescription(pyme.getDescription());
        newPyme.setUser(user);

        return pymeRepository.save(newPyme);
    }

    @Override
    public Pyme updatePyme(Pyme pyme, Long id){
        Pyme newPyme = pymeRepository.findById(id).orElse(null);

        newPyme.setName(pyme.getName());
        newPyme.setDescription(pyme.getDescription());
        newPyme.setPhone(pyme.getPhone());

        return pymeRepository.save(newPyme);
    }
}
