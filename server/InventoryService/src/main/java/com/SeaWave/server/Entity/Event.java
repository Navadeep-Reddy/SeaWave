package com.SeaWave.server.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "event")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Event {
    @Id
    private Long id;

    @Column(name = "total_capacity")
    private int totalCapacity;

    @Column(name = "left_capacity")
    private int leftCapacity;

    private String name;


    @ManyToOne
    @JoinColumn(name = "venue_id")
    private Venue venue;

    @Column(name = "ticket_price")
    private BigDecimal ticketPrice;
}
