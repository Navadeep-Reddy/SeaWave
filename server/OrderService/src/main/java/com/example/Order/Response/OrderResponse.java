package com.example.Order.Response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class OrderResponse {
    private String userName;
    private String userEmail;
    private BigDecimal totalPrice;
    private int ticketCount;
    private String eventName;
    private String venueName;
}
