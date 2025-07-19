package com.SeaWave.server.Request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
public class BookingInventoryRequest {
    private Long eventID;
    private int bookingCapacity;

}
