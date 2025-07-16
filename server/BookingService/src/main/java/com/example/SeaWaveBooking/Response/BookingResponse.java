package com.example.SeaWaveBooking.Response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class BookingResponse {
    private String userId;
    private Long eventId;
    private int ticketCount;
    private BigDecimal totalPrice;
}
