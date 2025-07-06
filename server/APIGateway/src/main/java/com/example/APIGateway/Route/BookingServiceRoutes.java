package com.example.APIGateway.Route;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BookingServiceRoutes {

    @Bean
    public RouteLocator bookingServiceRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
            .route("booking-service", r -> r
                .path("/api/v2/booking")
                .filters(f -> f.rewritePath("/api/v2/booking", "/api/v1/booking/event"))
                .uri("http://localhost:8081"))
            .build();
    }
} 