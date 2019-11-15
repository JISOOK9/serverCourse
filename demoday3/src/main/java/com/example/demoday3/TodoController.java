package com.example.demoday3;


import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import javax.annotation.PostConstruct;
import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api/v1/todo", produces = MediaType.APPLICATION_JSON_VALUE)
public class TodoController {

    /*@Autowired
    ToDoRepository repo;*/

    private final ToDoRepository repo;

    @InitBinder
    private void initBinder(WebDataBinder binder) {
        binder.addValidators(new TodoValidator());
    }

    @PostMapping
    public ResponseEntity createNewTodo(@RequestBody @Valid ToDoDto newTodo, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest()
                    .body(result);
        }

        Todo savedTodo = repo.save(new ModelMapper().map(newTodo, Todo.class));    //이렇게 하면 원치 않는 값까지 다 받아옴. 내가 받고자 하는?데이터만 받기 위해 dto 사용
        UriComponents createdUrl =
                UriComponentsBuilder.fromPath("/api/v1/todo")
                        .path("/{id}")
                        .buildAndExpand(savedTodo.getId());

        return ResponseEntity.created(createdUrl.toUri()).body(savedTodo);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateTodo(@PathVariable Long id,
                                     @Valid @RequestBody ToDoDto dto,
                                     BindingResult result){
        if(result.hasErrors()) {
            return ResponseEntity.badRequest().body(result);
        }

        Optional<Todo> existingTodo = repo.findById(id);
        if(!existingTodo.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Todo todo = existingTodo.get();
        //todo.setNote(dto.getNote());
        new ModelMapper().map(dto, todo);
        Todo updatedTodo = repo.save(todo);

        return ResponseEntity.ok(updatedTodo);
    }

    @GetMapping
    public ResponseEntity findTodoList(Pageable pageable) {
        return ResponseEntity.ok(repo.findAll(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity findTodo(@PathVariable Long id) {
        Optional<Todo> byId = repo.findById(id);
        if(byId.isPresent()) {
            return ResponseEntity.ok(byId.get());
        }
        return ResponseEntity.notFound().build();

    }

    @GetMapping("/find/{keyword}")
    public ResponseEntity findByKeyword(@PathVariable String keyword, Pageable pageable) {
        return ResponseEntity.ok(repo.findByNoteContains(keyword, pageable));
    }

    @PostConstruct  //bean생성 이후 바로 콜됨
    public void postConstruct() {
        for(int i = 0;i<2000;i++) {
            String note="spring" + i;

            if(i%500 == 0) {
                note = "다른거" + i;
            }
            Todo todo = Todo.builder()
                    .createdTime(LocalDateTime.now())
                    .note(note)
                    .dueDateTime(LocalDateTime.now().plusDays(3L))
                    .status(ToDoStatus.DRAFT)
                    .build();
            repo.save(todo);
        }
    }
}