package com.medicare.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.*;

@Service
public class GeminiAiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    private static final String SYSTEM_PROMPT =
        "You are MediCare AI, an expert medical assistant. You provide:\n" +
        "- Medicine information, dosage, side effects, and precautions\n" +
        "- Symptom-based medicine suggestions\n" +
        "- General health advice and guidance\n" +
        "IMPORTANT: Always remind users to consult a licensed physician. Never diagnose.\n" +
        "Format responses clearly using ## for section headers and - for bullet points.\n" +
        "Use **bold** for important terms. Keep responses professional and empathetic.";

    @SuppressWarnings("unchecked")
    public String generateResponse(String userMessage, List<Map<String, Object>> history) {
        String url = apiUrl + "?key=" + apiKey;

        List<Map<String, Object>> contents = new ArrayList<>();

        if (history != null) {
            for (Map<String, Object> h : history) {
                Map<String, Object> msg = new HashMap<>();
                msg.put("role", h.get("role"));
                msg.put("parts", List.of(Map.of("text", h.getOrDefault("text", ""))));
                contents.add(msg);
            }
        }

        contents.add(Map.of(
            "role", "user",
            "parts", List.of(Map.of("text", userMessage))
        ));

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("contents", contents);
        requestBody.put("systemInstruction", Map.of(
            "parts", List.of(Map.of("text", SYSTEM_PROMPT))
        ));
        requestBody.put("generationConfig", Map.of(
            "temperature", 0.7,
            "maxOutputTokens", 900,
            "topP", 0.9
        ));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);
            Map<?, ?> body = response.getBody();
            if (body != null && body.containsKey("candidates")) {
                List<?> candidates = (List<?>) body.get("candidates");
                if (!candidates.isEmpty()) {
                    Map<?, ?> candidate = (Map<?, ?>) candidates.get(0);
                    Map<?, ?> content = (Map<?, ?>) candidate.get("content");
                    List<?> parts = (List<?>) content.get("parts");
                    Map<?, ?> part = (Map<?, ?>) parts.get(0);
                    return (String) part.get("text");
                }
            }
            throw new RuntimeException("Empty response from Gemini API");
        } catch (Exception e) {
            throw new RuntimeException("Gemini API error: " + e.getMessage(), e);
        }
    }
}
