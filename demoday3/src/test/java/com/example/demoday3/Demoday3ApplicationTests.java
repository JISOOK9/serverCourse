package com.example.demoday3;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.bytebuddy.dynamic.TypeResolutionStrategy;
import org.hamcrest.Matchers;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class Demoday3ApplicationTests {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ToDoRepository repository;

    @Autowired
    ObjectMapper mapper;

/*    @Test
    public void createNewMemo() throws Exception {
        ToDoDto newTodo = ToDoDto.builder()
                .note("방정리")
                .dueDateTime(LocalDateTime.now().plusDays(3))
                .build();

        //test repository
        *//*Todo savedTodo = repository.save(newTodo);
        assertNotNull(savedTodo.getId());

        List<Todo> all = repository.findAll();
        assertEquals(all.size(), 1);*//*


        mockMvc.perform(post("/api/v1/todo")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(newTodo)))
                .andDo(print())
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(header().exists(HttpHeaders.LOCATION))
                .andExpect(jsonPath("$.id").value(Matchers.not(107L)))
                .andExpect(jsonPath("$.status").value(ToDoStatus.DRAFT.name()))
        ;
    }*/


    @Test
    public void createNewMemoFail() throws Exception {
        Todo newTodo = Todo.builder()
                .note("방정리")
                .dueDateTime(LocalDateTime.now().plusDays(3))
                .createdTime(LocalDateTime.now())
                .id(108L)
                .build();

        mockMvc.perform(post("/api/v1/todo")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(newTodo)))
                .andDo(print())
                .andExpect(status().isBadRequest())
        ;
    }

    @Test
    public void createTodo_BR() throws Exception {
        ToDoDto tododto = ToDoDto.builder()
                .note("테스트내용")
                .dueDateTime(LocalDateTime.of(2018, 12, 23, 12, 00))
                .build();

        mockMvc.perform(post("/api/v1/todo")
        .contentType(MediaType.APPLICATION_JSON)
        .content(mapper.writeValueAsString(tododto)))
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$[0].message").exists())
        ;

    }

}
