package com.example.Order.Controller;

import com.example.Order.Entity.Order;
import com.example.Order.Response.OrderResponse;
import com.example.Order.Service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/order")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    //only used for verification purposes
    @GetMapping(path ="/all")
    private ResponseEntity<List<Order>> getAllOrders(){
        return ResponseEntity.ok(orderService.getAll());
    }

    @GetMapping(path = "/{id}")
    private ResponseEntity<List<OrderResponse>> getOrderByUserID(@PathVariable String id){
        return ResponseEntity.ok(orderService.getWithUserID(id));
    }


}
