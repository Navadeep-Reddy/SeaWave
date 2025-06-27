package com.example.SeaWaveBooking.Response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VenueResponse {
    private Long venueId;
    private String venueName;
    private int venueCapacity;
}
