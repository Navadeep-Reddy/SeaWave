package com.SeaWave.server.Response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class VenueLocationResponse {
    private Long venueId;
    private String venueName;
    private int venueCapacity;
}
