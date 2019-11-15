package com.example.demoday3;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ToDoRepository extends JpaRepository<Todo, Long> {

    List<Object> findByNoteContains(String keyword, Pageable pageable);
}
