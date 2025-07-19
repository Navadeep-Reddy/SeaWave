package com.SeaWave.server.Response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class BookingInventoryResponse {
    private Long eventId;
    private int capacity;
    private String event;
    private VenueResponse venue;
    private BigDecimal ticketPrice;
}
