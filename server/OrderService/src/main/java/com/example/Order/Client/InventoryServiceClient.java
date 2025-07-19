package com.example.Order.Client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class InventoryServiceClient {

    @Value("${inventory.service.url}")
    private String inventoryServiceUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public void updateCapacity(int eventId, int ticketCount) {
        String url = inventoryServiceUrl + "/event/capacity/" + eventId + "/" + ticketCount;
        restTemplate.put(url, null);
    }
}
