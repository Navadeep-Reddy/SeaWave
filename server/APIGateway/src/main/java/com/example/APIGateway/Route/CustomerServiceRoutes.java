package com.example.APIGateway.Route;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CustomerServiceRoutes {

    @Bean
    public RouteLocator customerServiceRouter(RouteLocatorBuilder builder){
        return builder.routes()
                .route("customer-check", r -> r
                        .path("/api/v2/customer")
                        .filters(f -> f.rewritePath("/api/v2/customer", "/api/v1/customer"))
                        .uri("http://localhost:8081"))
                .build();
    }
}
