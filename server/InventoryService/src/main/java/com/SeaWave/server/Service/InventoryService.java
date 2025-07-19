package com.SeaWave.server.Service;

import com.SeaWave.server.Entity.Event;
import com.SeaWave.server.Entity.Venue;
import com.SeaWave.server.Repository.EventRepository;
import com.SeaWave.server.Repository.VenueRepository;
import com.SeaWave.server.Request.BookingInventoryRequest;
import com.SeaWave.server.Response.BookingInventoryResponse;
import com.SeaWave.server.Response.EventInventoryResponse;
import com.SeaWave.server.Response.VenueLocationResponse;
import com.SeaWave.server.Response.VenueResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
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
                .capacity(event.getLeftCapacity()).eventId(event.getId())
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

    public Optional<BookingInventoryResponse> bookEventCapacity(BookingInventoryRequest request) {
        Optional<Event> optionalEvent = eventRepository.findById(request.getEventID());

        if (optionalEvent.isEmpty()){
            return Optional.empty();
        }

        Event event = optionalEvent.get();
        if (event.getLeftCapacity() >= request.getBookingCapacity()){
            event.setLeftCapacity(event.getLeftCapacity() - request.getBookingCapacity());
            eventRepository.save(event);
            return Optional.ofNullable(convertToBookingDTO(event));
        }

        return Optional.empty();

    }
    private VenueResponse convertVenueVenueResponse(Venue venue){
        return VenueResponse.builder()
                .id(venue.getId())
                .name(venue.getName())
                .address(venue.getAddress())
                .totalCapacity(venue.getTotalCapacity())
                .build();
    }

    private BookingInventoryResponse convertToBookingDTO(Event event){
        return BookingInventoryResponse.builder()
                .eventId(event.getId())
                .capacity(event.getLeftCapacity())
                .event(event.getName())
                .venue(convertVenueVenueResponse(event.getVenue()))
                .ticketPrice(event.getTicketPrice())
                .build();

    }
}
