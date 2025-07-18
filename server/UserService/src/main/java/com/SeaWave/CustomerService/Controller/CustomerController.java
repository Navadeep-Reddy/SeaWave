package com.SeaWave.CustomerService.Controller;

import com.SeaWave.CustomerService.Request.CustomerRequest;
import com.SeaWave.CustomerService.Response.CustomerResponse;
import com.SeaWave.CustomerService.Service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/v1")
public class CustomerController {


    private final CustomerService customerService;

    public CustomerController(CustomerService service){
        customerService = service;
    }


    @PostMapping(consumes = "application/json", produces = "application/json", path="/customer")
    private ResponseEntity<CustomerResponse> checkCreateCustomer(@RequestBody CustomerRequest request){
        return customerService.checkOrCreateCustomer(request);
    }
}
