package com.example.SeaWaveBooking.Request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingRequest {
    private String userId;
    private Long ticketId;
    private int ticketQuantity;
    private Long eventId;
}
