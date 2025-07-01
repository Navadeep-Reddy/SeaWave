package com.example.SeaWaveBooking.Service;

import com.example.SeaWaveBooking.Client.InventoryServiceClient;
import com.example.SeaWaveBooking.Entity.Customer;
import com.example.SeaWaveBooking.Events.BookingEvent;
import com.example.SeaWaveBooking.Repository.CustomerRepository;
import com.example.SeaWaveBooking.Request.BookingRequest;
import com.example.SeaWaveBooking.Response.BookingResponse;
import com.example.SeaWaveBooking.Response.InventoryResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@Slf4j
public class BookingService {
    private final CustomerRepository customerRepository;
    private final InventoryServiceClient inventoryClient;

    //we write the booking event into a topic
    private KafkaTemplate<String, BookingEvent> kafkaTemplate;

    public BookingService(CustomerRepository repo, InventoryServiceClient client, KafkaTemplate<String, BookingEvent> kafkaTemplate){
        this.customerRepository = repo;
        this.inventoryClient = client;
        this.kafkaTemplate = kafkaTemplate;
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

        //this means all conditions have been met,and we can now book and return the booking response
        String logData = "The Inventory Response is:" + inventoryResponse;
        log.info(logData);

        //making the booking event
        final BookingEvent event = createBookingEvent(customer, inventoryResponse, request);

        //pushing this event to the broker
        //(name of topic, value)
        kafkaTemplate.send("booking", event);

        return BookingResponse.builder().build();
    }

    private BookingEvent createBookingEvent(Customer customer, InventoryResponse response, BookingRequest request){
        return BookingEvent.builder()
                .eventId(response.getEventId())
                .ticketCount(request.getTicketQuantity())
                .totalPrice(BigDecimal.valueOf((long) request.getTicketQuantity() * request.getTicketQuantity()))
                .build();
    }
}
