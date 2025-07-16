package com.example.SeaWaveBooking.Events;

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
    private BigDecimal totalPrice;
    private int ticketCount;
    private Long eventId;
}
