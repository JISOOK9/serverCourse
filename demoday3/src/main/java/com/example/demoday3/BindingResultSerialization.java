package com.example.demoday3;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.springframework.boot.jackson.JsonComponent;
import org.springframework.validation.BindingResult;

import java.io.IOException;

@JsonComponent
public class BindingResultSerialization extends JsonSerializer<BindingResult> {
    @Override
    public void serialize(BindingResult bindingResult, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartArray();
        bindingResult.getAllErrors().forEach(e->{
            try{
                jsonGenerator.writeStartObject();
                jsonGenerator.writeStringField("message", e.getDefaultMessage());
                jsonGenerator.writeEndObject();
            } catch (IOException ex) {
                throw new RuntimeException(ex);
            }
        });
        jsonGenerator.writeEndArray();
    }
}
