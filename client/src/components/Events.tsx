import { useEffect, useState } from "react";
import EventBox from "./EventBox";
import { EventInventoryResponse } from "@/types/eventTypes";
import { getAllEvents } from "@/api/events";
import { useKeycloak } from "@react-keycloak/web";

export default function events() {
    const [events, setEvents] = useState<EventInventoryResponse[]>();
    const [filterEvents, setFilterEvents] =
        useState<EventInventoryResponse[]>();
    const [search, setSearch] = useState<string | undefined>();
    const { keycloak } = useKeycloak();

    useEffect(() => {
        const fetchEvents = async () => {
            const data = await getAllEvents(keycloak);
            if (data) {
                setEvents(data);
                setFilterEvents(data);
            }
        };

        fetchEvents();
    }, []);

    function filterItems(keyword: string) {
        const filteredArray = events?.filter((event) =>
            event.event.toLowerCase().includes(keyword.toLowerCase())
        );

        setFilterEvents(filteredArray);
    }

    return (
        <div className="events-display w-5/6 mx-auto " id="events">
            <h1 className="title text-textBlue font-bold text-3xl md:text-6xl">
                Live events
            </h1>

            <input
                placeholder="Search Event"
                className="h-12 w-72 border-2 border-black/70 focus:outline-1 focus:outline-textBlue rounded-md p-4 my-6 md:mt-20"
                value={search}
                onChange={(event) => {
                    filterItems(event.target.value);
                    setSearch(event.target.value);
                }}
            />
            <div className="events-box overflow-y-auto h-[600px]">
                {filterEvents?.map((event, key) => {
                    return (
                        <EventBox
                            name={event.event}
                            capacity={event.capacity}
                            venue={event.venue.name}
                            id={event.eventId}
                            key={key}
                        />
                    );
                })}
            </div>
        </div>
    );
}
