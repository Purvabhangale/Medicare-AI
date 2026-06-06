package com.medicare.controller;

import com.medicare.model.ChatRequest;
import com.medicare.model.ChatResponse;
import com.medicare.service.GeminiAiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private GeminiAiService geminiAiService;

    @PostMapping
    public ResponseEntity<ChatResponse> chat(@RequestBody ChatRequest request) {
        if (request.getMessage() == null || request.getMessage().isBlank()) {
            return ResponseEntity.badRequest().body(new ChatResponse(null, false, "Message cannot be empty"));
        }
        try {
            List<Map<String, Object>> history = new ArrayList<>();
            if (request.getHistory() != null) {
                for (ChatRequest.ChatHistory h : request.getHistory()) {
                    history.add(Map.of("role", h.getRole(), "text", h.getText()));
                }
            }
            String reply = geminiAiService.generateResponse(request.getMessage(), history);
            return ResponseEntity.ok(new ChatResponse(reply, true, null));
        } catch (Exception e) {
            return ResponseEntity.ok(new ChatResponse(null, false, e.getMessage()));
        }
    }
}
