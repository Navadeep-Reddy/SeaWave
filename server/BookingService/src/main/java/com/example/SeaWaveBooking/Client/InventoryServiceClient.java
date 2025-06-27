package com.example.SeaWaveBooking.Client;

import com.example.SeaWaveBooking.Response.InventoryResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class InventoryServiceClient {
    @Value("${inventory.service.url}")
    private String inventoryServiceUrl;

    public InventoryResponse getInventory(Long eventId){
        final RestTemplate restTemplate = new RestTemplate();

        InventoryResponse response = restTemplate.getForObject(inventoryServiceUrl + "/event/" + eventId, InventoryResponse.class);
        return response;
    }
}
