package com.example.demoday3;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
@EqualsAndHashCode(of="id")
@AllArgsConstructor @NoArgsConstructor
@Builder

public class Todo {

    @Id @GeneratedValue //자동생성 + id면 pk
    private long id;

    private String note;
    @JsonIgnore
    private LocalDateTime createdTime;
    private LocalDateTime dueDateTime;

    @JsonIgnore
    @Enumerated(EnumType.STRING)    //enum순서에 따른 index값 들어가지 않고 이넘 자체를 스트링으로 저장하도록 설정해야 함
    private ToDoStatus status = ToDoStatus.DRAFT;
}
