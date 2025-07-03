package com.example.demo.Service;

import com.example.demo.Client.InventoryServiceClient;
import com.example.demo.Entity.Order;
import com.example.demo.Repository.OrderRepository;
import com.learn.event.BookingEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class OrderService {

    private final OrderRepository orderRepository;
    private final InventoryServiceClient inventoryServiceClient;

    public OrderService(OrderRepository repo, InventoryServiceClient inventoryServiceClient){
        this.orderRepository = repo;
        this.inventoryServiceClient = inventoryServiceClient;
    }

    @KafkaListener(topics = "booking", groupId = "order-service")
    public void orderEvent(BookingEvent bookingEvent){
        log.info("Received order: {}", bookingEvent);

        //save to table
        Order order = createOrder(bookingEvent);
        orderRepository.saveAndFlush(order);

        //Update Inventory of event in InventoryService
        inventoryServiceClient.updateCapacity(Math.toIntExact(order.getEventId()), Math.toIntExact(order.getTicketCount()));
        log.info("Inventory has been updated with capacity {}", order.getTicketCount());

    }

    private Order createOrder(BookingEvent bookingEvent){
        return Order.builder()
                .customerId(bookingEvent.getUserId())
                .eventId(bookingEvent.getEventId())
                .totalPrice(bookingEvent.getTotalPrice())
                .ticketCount((long) bookingEvent.getTicketCount())
                .build();
    }
}
