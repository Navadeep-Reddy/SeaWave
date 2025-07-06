package com.example.APIGateway.Route;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class InventoryServiceRoutes {

    @Bean
    public RouteLocator inventoryServiceRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("get-all-events", r -> r
                        .path("/api/v2/inventory/events")
                        .filters(f -> f.rewritePath("/api/v2/inventory/events", "/api/v1/inventory/events"))
                        .uri("http://localhost:8080"))
                .route("get-venue-id", r -> r
                        .path("/api/v2/venue/{venueId}")
                        .filters(f -> f.rewritePath("/api/v2/venue/(?<venueId>.*)", "/api/v1/inventory/venue/${venueId}"))
                        .uri("http://localhost:8080"))
                .route("get-event-id", r -> r
                        .path("/api/v2/inventory/event/{eventId}")
                        .filters(f -> f.rewritePath("/api/v2/inventory/event/(?<eventId>.*)", "/api/v1/inventory/event/${eventId}"))
                        .uri("http://localhost:8080"))
                .build();
    }
}
