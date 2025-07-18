package com.learn.event;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

//It will have all the attributes to make a booking in the orders table
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookingEvent {
    private String userId;
    private String userName;
    private String userEmail;
    private BigDecimal totalPrice;
    private int ticketCount;
    private Long eventId;
    private String eventName;
    private Long venueId;
    private String venueName;
}
