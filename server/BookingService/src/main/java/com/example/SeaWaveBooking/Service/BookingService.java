package com.example.SeaWaveBooking.Service;

import com.example.SeaWaveBooking.Client.InventoryServiceClient;
import com.example.SeaWaveBooking.Entity.Customer;
import com.example.SeaWaveBooking.Repository.CustomerRepository;
import com.example.SeaWaveBooking.Request.BookingRequest;
import com.example.SeaWaveBooking.Response.BookingResponse;
import com.example.SeaWaveBooking.Response.InventoryResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class BookingService {
    private final CustomerRepository customerRepository;
    private final InventoryServiceClient inventoryClient;
    public BookingService(CustomerRepository repo, InventoryServiceClient client){
        this.customerRepository = repo;
        this.inventoryClient = client;
    }

    public BookingResponse createBooking(BookingRequest request) {
        //check if user exists
        Customer customer = customerRepository.findById(request.getUserId()).orElse(null);

        if (customer == null){
            throw new RuntimeException("Customer not found");
        }

        //check if capacity / tickets is available
        InventoryResponse inventoryResponse = inventoryClient.getInventory(request.getEventId());
        if (inventoryResponse.getCapacity() < request.getTicketId()){
            throw new RuntimeException("Insufficient tickets present");
        }

        String logData = "The Inventory Response is:" + inventoryResponse;
        log.info(logData);

        //get event details to then get venue details


        return BookingResponse.builder().build();
    }
}
