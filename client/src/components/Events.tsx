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
    <div className="events-display w-5/6 mx-auto ">
      <h1 className="title text-textBlue font-bold text-3xl md:text-6xl">
        Live events
      </h1>
      <div className="events-box  my-6 md:my-20">
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
