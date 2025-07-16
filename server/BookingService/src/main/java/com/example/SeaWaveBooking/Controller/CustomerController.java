package com.example.SeaWaveBooking.Controller;

import com.example.SeaWaveBooking.Request.CustomerRequest;
import com.example.SeaWaveBooking.Response.CustomerResponse;
import com.example.SeaWaveBooking.Service.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class CustomerController {

    private CustomerService customerService;

    public CustomerController(CustomerService service){
        this.customerService = service;
    }

    @PostMapping(consumes = "application/json", produces = "application/json", path="/user")
    private ResponseEntity<CustomerResponse> checkCreateCustomer(@RequestBody CustomerRequest request){
        return customerService.checkOrCreateCustomer(request);
    }
}
