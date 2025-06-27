package com.SeaWave.server.Response;

import com.SeaWave.server.Entity.Venue;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Builder
@Data
public class EventInventoryResponse {
    private Long eventId;
    private int capacity;
    private String event;
    private Venue venue;
    private BigDecimal ticketPrice;
}
