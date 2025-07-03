package com.SeaWave.server.Service;

import com.SeaWave.server.Entity.Event;
import com.SeaWave.server.Entity.Venue;
import com.SeaWave.server.Repository.EventRepository;
import com.SeaWave.server.Repository.VenueRepository;
import com.SeaWave.server.Response.EventInventoryResponse;
import com.SeaWave.server.Response.VenueLocationResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
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
                .capacity(event.getLeftCapacity())
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

    public EventInventoryResponse getEventInventory(Long eventID) {
        Event event = eventRepository.findById(eventID).orElse(null);

        if (event == null){
            throw new RuntimeException("Event does not exist");
        }

        log.info(event.getVenue().getName());
        return EventInventoryResponse.builder()
                .eventId(event.getId())
                .capacity(event.getLeftCapacity())
                .event(event.getName())
                .venue(event.getVenue())
                .ticketPrice(event.getTicketPrice())
                .build();
    }

    public ResponseEntity<Void> updateCapacity(Long eventID, int ticketsBooked) {
        Event event = eventRepository.findById(eventID).orElse(null);
        assert event != null;
        event.setLeftCapacity(event.getTotalCapacity() - ticketsBooked);
        log.info("The updated event is {}", event);

        eventRepository.save(event);
        return ResponseEntity.ok().build();
    }
}
