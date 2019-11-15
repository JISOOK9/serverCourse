package com.example.demoday3;

import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
@Builder
public class ToDoDto {
    @NotEmpty
    private String note;

    private LocalDateTime dueDateTime;

}
