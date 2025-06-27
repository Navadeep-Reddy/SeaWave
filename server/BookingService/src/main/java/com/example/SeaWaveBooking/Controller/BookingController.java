package com.example.SeaWaveBooking.Controller;

import com.example.SeaWaveBooking.Request.BookingRequest;
import com.example.SeaWaveBooking.Response.BookingResponse;
import com.example.SeaWaveBooking.Service.BookingService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService service){
        this.bookingService = service;
    }

    @PostMapping(consumes = "application/json", produces = "application/json",path = "/booking/event")
    public BookingResponse bookEvent(@RequestBody BookingRequest request){
        return bookingService.createBooking(request);
    }

}
