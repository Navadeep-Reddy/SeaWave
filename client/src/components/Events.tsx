import { useEffect, useState } from "react";
import EventBox from "./EventBox";
import { EventInventoryResponse } from "@/types/eventTypes";
import { getAllEvents } from "@/api/events";
import { useAuth0 } from "@auth0/auth0-react";

export default function events() {
    const [events, setEvents] = useState<EventInventoryResponse[]>();
    const [filterEvents, setFilterEvents] =
        useState<EventInventoryResponse[]>();
    const [search, setSearch] = useState<string | undefined>();
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                let accessToken;
                if (isAuthenticated) {
                    accessToken = await getAccessTokenSilently();
                }

                const data = await getAllEvents(accessToken);
                if (data) {
                    setEvents(data);
                    setFilterEvents(data);
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, [isAuthenticated, getAccessTokenSilently]);

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
                            venue={event.venue?.name}
                            id={event.eventId}
                            key={key}
                        />
                    );
                })}
            </div>
        </div>
    );
}
