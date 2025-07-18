package com.SeaWave.CustomerService.Response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookingCustomerResponse {
    private String id;
    private String email;
    private String name;

}
