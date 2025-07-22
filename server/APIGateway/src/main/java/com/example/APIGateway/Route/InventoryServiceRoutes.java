package com.example.APIGateway.Route;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class InventoryServiceRoutes {
    @Value("${inventory.service.uri}")
    private String uri;
    @Bean
    public RouteLocator inventoryServiceRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("get-all-events", r -> r
                        .path("/api/v2/inventory/events")
                        .filters(f -> f.rewritePath("/api/v2/inventory/events", "/api/v1/inventory/events"))
                        .uri(uri))
                .route("get-venue-id", r -> r
                        .path("/api/v2/venue/{venueId}")
                        .filters(f -> f.rewritePath("/api/v2/venue/(?<venueId>.*)", "/api/v1/inventory/venue/${venueId}"))
                        .uri(uri))
                .route("get-event-id", r -> r
                        .path("/api/v2/inventory/event/{eventId}")
                        .filters(f -> f.rewritePath("/api/v2/inventory/event/(?<eventId>.*)", "/api/v1/inventory/event/${eventId}"))
                        .uri(uri))
                .route("update-capacity", r -> r
                        .path("/api/v2/capacity/{eventId}/{capacity}")
                        .filters(f -> f.rewritePath("/api/v2/capacity/(?<eventId>.*)/(?<capacity>.*)", "/api/v1/inventory/event/capacity/${eventId}/${capacity}"))
                        .uri(uri)
                )
                .build();       
    }
}
