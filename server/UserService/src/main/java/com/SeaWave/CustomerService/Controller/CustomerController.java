package com.SeaWave.CustomerService.Controller;

import com.SeaWave.CustomerService.Request.CustomerRequest;
import com.SeaWave.CustomerService.Response.BookingCustomerResponse;
import com.SeaWave.CustomerService.Response.CustomerResponse;
import com.SeaWave.CustomerService.Service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/v1/customer")
public class CustomerController {


    private final CustomerService customerService;

    public CustomerController(CustomerService service){
        customerService = service;
    }

    @GetMapping(path = "/all")
    private ResponseEntity<List<CustomerResponse>> getAllCustomer(){
        List<CustomerResponse> customerList = customerService.getAll();

        return ResponseEntity.ok(customerList);
    }

    @PostMapping(consumes = "application/json", produces = "application/json", path="/check")
    private ResponseEntity<CustomerResponse> checkCreateCustomer(@RequestBody CustomerRequest request){
        return customerService.checkOrCreateCustomer(request);
    }

    @GetMapping(path = "/order/{id}")
    private ResponseEntity<BookingCustomerResponse> getCustomerOrderDetails(@PathVariable String id){
        Optional<BookingCustomerResponse> optionalResponse =  customerService.getOrderDetails(id);

        return optionalResponse.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
