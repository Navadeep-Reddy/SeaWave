package com.example.SeaWaveBooking.Response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InventoryResponse {
    private Long eventId;
    private int capacity;
    private String event;
    private VenueResponse venue;
    private BigDecimal ticketPrice;
}
