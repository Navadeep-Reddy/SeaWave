package com.example.SeaWaveBooking.Response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BookingResponse {
    private Long bookingId;
    private Long userId;
    private Long eventId;
    private Long ticketCount;
    private String ticketPrice;
}
