package com.SeaWave.server.Response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class VenueResponse {
    private Long id;
    private String name;
    private String address;
    private int totalCapacity;
}
