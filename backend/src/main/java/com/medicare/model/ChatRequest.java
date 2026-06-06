package com.medicare.model;

import lombok.Data;
import java.util.List;

@Data
public class ChatRequest {
    private String message;
    private List<ChatHistory> history;

    @Data
    public static class ChatHistory {
        private String role;
        private String text;
    }
}
