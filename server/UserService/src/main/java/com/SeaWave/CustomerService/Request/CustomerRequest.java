package com.SeaWave.CustomerService.Request;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CustomerRequest {
    private String id;
    private String email;
    private String name;

}
