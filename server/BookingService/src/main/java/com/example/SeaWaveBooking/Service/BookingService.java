package com.example.SeaWaveBooking.Service;

import com.example.SeaWaveBooking.Client.InventoryServiceClient;
import com.example.SeaWaveBooking.Client.UserServiceClient;
import com.example.SeaWaveBooking.Events.BookingEvent;
import com.example.SeaWaveBooking.Request.BookingRequest;
import com.example.SeaWaveBooking.Response.BookingCustomerResponse;
import com.example.SeaWaveBooking.Response.BookingResponse;
import com.example.SeaWaveBooking.Response.InventoryResponse;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.common.errors.ResourceNotFoundException;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

@Service
@Slf4j
public class BookingService {
    private final InventoryServiceClient inventoryClient;
    private final UserServiceClient userClient;

    //we write the booking event into a topic
    private final KafkaTemplate<String, BookingEvent> kafkaTemplate;

    public BookingService(UserServiceClient userClient, InventoryServiceClient client, KafkaTemplate<String, BookingEvent> kafkaTemplate){
        this.inventoryClient = client;
        this.kafkaTemplate = kafkaTemplate;
        this.userClient = userClient;
    }

    public BookingResponse createBooking(BookingRequest request) {
        //Synchronously get customer details from UserService
        Optional<BookingCustomerResponse> optionalCustomer = userClient.getCustomerBookingDetails(request.getUserId());

        if (optionalCustomer.isEmpty()){
            throw new ResourceNotFoundException("Customer with id " + request.getUserId() + " not found");
        }

        //found customer
        BookingCustomerResponse customer = optionalCustomer.get();


        //check if capacity / tickets is available
        InventoryResponse inventoryResponse = inventoryClient.getInventory(request.getEventId());
        if (inventoryResponse.getCapacity() < request.getTicketQuantity()){
            throw new RuntimeException("Insufficient tickets present");
        }

        //this means all conditions have been met,and we can now book and return the booking response
        log.info("The Inventory Response is: {}", inventoryResponse);

        //making the booking event
        final BookingEvent event = createBookingEvent(customer, inventoryResponse, request);

        //pushing this event to the broker
        //(name of topic, value)
        kafkaTemplate.send("booking", event);
        log.info("Booking event has been place into topic {}", event);

        return BookingResponse.builder()
                .userId(customer.getId())
                .totalPrice(event.getTotalPrice())
                .eventId(event.getEventId())
                .ticketCount(request.getTicketQuantity())
                .build();
    }

    private BookingEvent createBookingEvent(BookingCustomerResponse customer, InventoryResponse response, BookingRequest request){
        return BookingEvent.builder()
                .userId(customer.getId())
                .userEmail(customer.getEmail())
                .userName(customer.getName())
                .eventId(response.getEventId())
                .eventName(response.getEvent())
                .venueId(response.getVenue().getId())
                .venueName(response.getVenue().getName())
                .ticketCount(request.getTicketQuantity())
                .totalPrice(BigDecimal.valueOf((long) request.getTicketQuantity() * request.getTicketQuantity()))
                .build();
    }
}
