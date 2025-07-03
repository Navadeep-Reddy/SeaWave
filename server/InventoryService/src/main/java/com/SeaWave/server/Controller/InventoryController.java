package com.SeaWave.server.Controller;

import com.SeaWave.server.Entity.Event;
import com.SeaWave.server.Response.EventInventoryResponse;
import com.SeaWave.server.Response.VenueLocationResponse;
import com.SeaWave.server.Service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/inventory")
@CrossOrigin
public class InventoryController {

    private final InventoryService inventoryService;

    private InventoryController(InventoryService inventoryService){
        this.inventoryService = inventoryService;
    }

    @GetMapping("/events")
    public List<EventInventoryResponse> getAllEvents(){
        return inventoryService.getAllEvents();
    }

    @GetMapping("/venue/{venueId}")
    public VenueLocationResponse getVenueById(@PathVariable Long venueId){
        return inventoryService.getLocationById(venueId);
    }

    @GetMapping("/event/{eventID}")
    public EventInventoryResponse inventoryForEvent(@PathVariable Long eventID){
        return inventoryService.getEventInventory(eventID);
    }

    //update capacity of event after booking
    @PutMapping("/event/capacity/{eventID}/{capacity}")
    public ResponseEntity<Void> updateEventCapacity(@PathVariable Long eventID,@PathVariable int capacity){
        return inventoryService.updateCapacity(eventID, capacity);
    }
}
