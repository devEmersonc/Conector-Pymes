package com.pymes.backend.repositories;

import com.pymes.backend.entities.Pyme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PymeRepository extends JpaRepository<Pyme, Long> {
}
