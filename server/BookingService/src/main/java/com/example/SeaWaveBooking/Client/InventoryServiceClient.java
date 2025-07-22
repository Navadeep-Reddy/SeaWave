package com.example.SeaWaveBooking.Client;

import com.example.SeaWaveBooking.Request.BookingInventoryRequest;
import com.example.SeaWaveBooking.Response.BookingInventoryResponse;
import org.apache.kafka.common.errors.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Service
public class InventoryServiceClient {
    @Value("${inventory.service.url}")
    private String inventoryServiceUrl;
    final RestTemplate restTemplate = new RestTemplate();



    public BookingInventoryResponse bookInventoryCapacity(BookingInventoryRequest request){
        try{
            return restTemplate.postForObject(inventoryServiceUrl + "/book", request,BookingInventoryResponse.class);
        }
        catch (RestClientException e){
            throw new ResourceNotFoundException("Unable to book ticket with capacity" + request.getBookingCapacity());
        }
    }
}
