package com.SeaWave.server.Response;

import com.SeaWave.server.Entity.Venue;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class EventInventoryResponse {
    private int capacity;
    private String event;
    private Venue venue;
}
