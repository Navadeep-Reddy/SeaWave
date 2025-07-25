package com.SeaWave.CustomerService.Repository;

import com.SeaWave.CustomerService.Entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, String> {

}

