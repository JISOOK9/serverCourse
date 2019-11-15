package com.example.demoday3;


import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.time.LocalDateTime;

public class TodoValidator implements Validator {

    @Override
    public boolean supports(Class<?> clazz) {
        return ToDoDto.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        ToDoDto tododto = (ToDoDto) target;
        if(tododto.getDueDateTime().isBefore(LocalDateTime.now())) {
            errors.rejectValue("dueDateTime",
                    "wrong datetime",
                    "wrong due date time");
        }
    }
}
