import { useEffect, useState } from "react";
import EventBox from "./EventBox";
import { EventInventoryResponse } from "@/types/eventTypes";
import { getAllEvents } from "@/api/events";

export default function events() {
    const [events, setEvents] = useState<EventInventoryResponse[]>();
    useEffect(() => {
        const fetchEvents = async () => {
            const data = await getAllEvents();
            if (data) setEvents(data);
            console.log(data);
        };

        fetchEvents();
    }, []);
    return (
        <div className="events-display w-5/6 mx-auto " id="events">
            <h1 className="title text-textBlue font-bold text-3xl md:text-6xl">
                Live events
            </h1>

            <input
                placeholder="Search Event"
                className="h-12 w-72 border-2 border-black/70 focus:outline-1 focus:outline-textBlue rounded-md p-4 my-6 md:mt-20 "
            />
            <div className="events-box overflow-y-auto h-[600px]">
                {events?.map((event, key) => {
                    return (
                        <EventBox
                            name={event.event}
                            capacity={event.capacity}
                            venue={event.venue.name}
                            key={key}
                        />
                    );
                })}
            </div>
        </div>
    );
}
