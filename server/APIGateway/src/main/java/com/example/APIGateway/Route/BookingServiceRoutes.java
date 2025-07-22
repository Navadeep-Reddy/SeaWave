package com.example.APIGateway.Route;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BookingServiceRoutes {

    @Value("${booking.service.uri}")
    private String uri;

    @Bean
    public RouteLocator bookingServiceRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
            .route("booking-service", r -> r
                .path("/api/v2/booking")
                .filters(f -> f.rewritePath("/api/v2/booking", "/api/v1/booking/event"))
                .uri(uri))
            .build();
    }
} 