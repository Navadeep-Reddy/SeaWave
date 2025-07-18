package com.SeaWave.CustomerService.Service;

import com.SeaWave.CustomerService.Entity.Customer;
import com.SeaWave.CustomerService.Repository.CustomerRepository;
import com.SeaWave.CustomerService.Request.CustomerRequest;
import com.SeaWave.CustomerService.Response.CustomerResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

    CustomerRepository customerRepository;

    public CustomerService(CustomerRepository repo){
        this.customerRepository = repo;
    }


    public ResponseEntity<CustomerResponse> checkOrCreateCustomer(CustomerRequest request) {

        Customer customer = customerRepository.findById(request.getId()).orElse(null);

        if (customer == null){
            Customer newCustomer = Customer.builder()
                    .id(request.getId())
                    .name(request.getName())
                    .email(request.getEmail())
                    .build();

            newCustomer = customerRepository.save(newCustomer);

            return ResponseEntity.ok(CustomerResponse.builder()
                    .id(newCustomer.getId())
                    .createdAt(newCustomer.getCreatedAt())
                    .build()
            );
        }

        return ResponseEntity.ok(CustomerResponse.builder()
                .id(customer.getId())
                .createdAt(customer.getCreatedAt())
                .build());




    }
}