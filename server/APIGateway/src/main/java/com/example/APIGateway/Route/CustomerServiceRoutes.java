package com.example.APIGateway.Route;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CustomerServiceRoutes {
    @Value("${user.service.uri}")
    private String uri;

    @Bean
    public RouteLocator customerServiceRouter(RouteLocatorBuilder builder){
        return builder.routes()
                .route("customer-check", r -> r
                        .path("/api/v2/customer")
                        .filters(f -> f.rewritePath("/api/v2/customer/check", "/api/v1/customer/check"))
                        .uri(uri))
                .build();
    }
}
