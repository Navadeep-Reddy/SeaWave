package com.example.SeaWaveBooking.Controller;

import com.example.SeaWaveBooking.Request.CustomerRequest;
import com.example.SeaWaveBooking.Response.CustomerResponse;
import com.example.SeaWaveBooking.Service.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService service){
        this.customerService = service;
    }

    @PostMapping(consumes = "application/json", produces = "application/json", path="/customer")
    private ResponseEntity<CustomerResponse> checkCreateCustomer(@RequestBody CustomerRequest request){
        return customerService.checkOrCreateCustomer(request);
    }
}
