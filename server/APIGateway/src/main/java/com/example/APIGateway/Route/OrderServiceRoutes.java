package com.example.APIGateway.Route;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OrderServiceRoutes {

    @Bean
    public RouteLocator ordersServiceRoutes(RouteLocatorBuilder builder){
        return builder.routes()
                .route("order-service", r -> r
                        .path("/api/v2/order/{userID}")
                        .filters(f -> f.rewritePath("/api/v2/order/(?<userID>.*)", "/api/v1/order/${userID}"))
                        .uri("http://localhost:8082")).build();
    }
}
