package com.example.demo.Service;

import com.example.demo.Entity.Order;
import com.example.demo.Repository.OrderRepository;
import example.navadeep.bookingservice.event.BookingEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class OrderService {

    private OrderRepository orderRepository;

    public OrderService(OrderRepository repo){
        this.orderRepository = repo;
    }

    @KafkaListener(topics = "booking", groupId = "order-service")
    public void orderEvent(BookingEvent bookingEvent){
        log.info("Received order: {}", bookingEvent);

        //save to table
        Order order = createOrder(bookingEvent);
        orderRepository.saveAndFlush(order);

        //Update Inventory

        //create InventoryClient

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
