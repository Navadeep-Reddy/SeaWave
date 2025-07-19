package com.example.SeaWaveBooking.Request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BookingInventoryRequest {
    private Long eventID;
    private int bookingCapacity;

}
