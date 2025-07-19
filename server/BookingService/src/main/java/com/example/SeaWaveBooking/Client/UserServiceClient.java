package com.example.SeaWaveBooking.Client;

import com.example.SeaWaveBooking.Response.BookingCustomerResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@Slf4j
@Service
public class UserServiceClient {

    @Value("${customer.service.url}")
    private String userServiceURL;

    public Optional<BookingCustomerResponse> getCustomerBookingDetails(String customerID){
        final RestTemplate restTemplate = new RestTemplate();

        try{
            BookingCustomerResponse customerResponse = restTemplate.getForObject(userServiceURL + "/order/" + customerID, BookingCustomerResponse.class);
            return Optional.ofNullable(customerResponse);
        } catch (Exception e) {
            log.warn("Customer with id: {} not found", customerID);
            return Optional.empty();
        }

    }
}
