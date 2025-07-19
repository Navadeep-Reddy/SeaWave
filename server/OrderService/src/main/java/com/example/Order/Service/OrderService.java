package com.example.Order.Service;

import com.example.Order.Entity.Order;
import com.example.Order.Repository.OrderRepository;
import com.example.Order.Response.OrderResponse;
import com.learn.event.BookingEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository repo){
        this.orderRepository = repo;
    }

    @KafkaListener(topics = "booking", groupId = "order-service")
    public void orderEvent(BookingEvent bookingEvent){
        log.info("Received order: {}", bookingEvent);

        //save to table
        Order order = createOrder(bookingEvent);
        orderRepository.saveAndFlush(order);

    }

    private Order createOrder(BookingEvent bookingEvent){
        return Order.builder()
                .userId(bookingEvent.getUserId())
                .userName(bookingEvent.getUserName())
                .userEmail(bookingEvent.getUserEmail())
                .totalPrice(bookingEvent.getTotalPrice())
                .ticketCount(bookingEvent.getTicketCount())
                .eventId(bookingEvent.getEventId())
                .eventName(bookingEvent.getEventName())
                .venueId(bookingEvent.getVenueId())
                .venueName(bookingEvent.getVenueName())
                .build();
    }

    public List<Order> getAll() {
        return orderRepository.findAll();
    }

    public List<OrderResponse> getWithUserID(String id) {
        List<Order> orderList = orderRepository.findOrderByUserId(id);

        return orderList.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private OrderResponse convertToDTO(Order order){
        return OrderResponse.builder()
                .userName(order.getUserName())
                .userEmail(order.getUserEmail())
                .totalPrice(order.getTotalPrice())
                .ticketCount(order.getTicketCount())
                .eventName(order.getEventName())
                .venueName(order.getVenueName())
                .build();

    }
}
