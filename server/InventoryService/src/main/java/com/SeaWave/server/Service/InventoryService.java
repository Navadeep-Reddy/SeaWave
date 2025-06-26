package com.SeaWave.server.Service;

import com.SeaWave.server.Entity.Event;
import com.SeaWave.server.Entity.Venue;
import com.SeaWave.server.Repository.EventRepository;
import com.SeaWave.server.Repository.VenueRepository;
import com.SeaWave.server.Response.EventInventoryResponse;
import com.SeaWave.server.Response.VenueLocationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InventoryService {

    private EventRepository eventRepository;
    private VenueRepository venueRepository;

    @Autowired
    public void setEventRepository(EventRepository repo){
        this.eventRepository = repo;
    }

    @Autowired
    public void setVenueRepository(VenueRepository repo){
        this.venueRepository = repo;
    }

    public List<EventInventoryResponse> getAllEvents() {
        final List<Event> events = eventRepository.findAll();

        return events.stream()
                .map(event -> EventInventoryResponse
                        .builder().event(event.getName())
                .capacity(event.getTotalCapacity())
                .venue(event.getVenue()).build())
                .collect(Collectors.toList());
    }

    public VenueLocationResponse getLocationById(Long venueId) {
        final Venue venue = venueRepository.findById(venueId).orElse(null);

        if (venue == null){
            return null;
        }
        return VenueLocationResponse.builder()
                .venueId(venue.getId())
                .venueName(venue.getName())
                .venueCapacity(venue.getTotalCapacity())
                .build();
    }
}
