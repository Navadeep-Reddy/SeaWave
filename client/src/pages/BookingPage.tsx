import { useEffect, useState } from "react";
import { EventInventoryResponse } from "@/types/eventTypes";
import { useParams } from "react-router-dom";
import { getEventById } from "@/api/events";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
export default function BookingPage() {
    const [event, setEvent] = useState<EventInventoryResponse>();
    const [ticketQuantity, setTicketQuantity] = useState(1);
    const { eventId } = useParams();

    useEffect(() => {
        const fetchEvent = async () => {
            if (!eventId) return null;

            const data: EventInventoryResponse = (await getEventById(
                eventId
            )) as EventInventoryResponse;

            setEvent(data);
            console.log(data);
        };

        fetchEvent();
    }, []);

    const estimatedPrice = event ? ticketQuantity * event.ticketPrice : 0;

    return (
        <div className="h-screen flex flex-col items-center mt-24   w-5/6 mx-auto ">
            <h1 className="title text-textBlue font-bold text-3xl md:text-6xl">
                Confirm Your Booking
            </h1>
            <div className="event-details bg-offBlue/80 mt-10 w-full h-40 p-4 rounded-t-2xl flex flex-col items-center">
                <h1 className="text-textBlue/90 font-bold text-2xl">
                    {event?.event}
                </h1>
                <h2 className="text-xl font-semibold text-black/70">
                    {event?.venue.name}
                </h2>
                <div className="my-4 flex flex-col items-center">
                    <div className="price flex gap-x-1 text-black/80">
                        <h1 className="">Ticket Price : $</h1>
                        <p>{event?.ticketPrice}</p>
                    </div>
                    <div className="capacity flex gap-x-1 text-black/80">
                        <h1 className="">Seats Remaining :</h1>
                        <p>{event?.capacity}</p>
                    </div>
                </div>
            </div>
            <div className="ticket-details bg-offBlue/80 mt-5 w-full h-40 p-4 rounded-b-2xl flex flex-col items-center">
                <h1 className="text-textBlue/90 font-bold text-2xl">
                    Select Tickets
                </h1>
                <div className="my-4 flex flex-col items-center w-full">
                    <div className="quantity flex flex-col items-center gap-y-2 w-3/4">
                        <div className="flex gap-x-1 text-black/80">
                            <h1 className="">Quantity:</h1>
                            <p className="font-semibold">{ticketQuantity}</p>
                        </div>
                        <Slider
                            value={[ticketQuantity]}
                            onValueChange={(value: number[]) =>
                                setTicketQuantity(value[0])
                            }
                            max={Math.min(event?.capacity || 10, 10)}
                            min={1}
                            step={1}
                            className="w-full"
                        />
                    </div>
                    <div className="estimated-price flex gap-x-1 text-black/80 mt-2">
                        <h1 className="">Estimated Price: $</h1>
                        <p className="font-semibold">
                            {estimatedPrice.toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>
            <Button className="px-6 mt-8 h-12 w-30 rounded-2xl bg-textBlue font-semibold text-xl text-offBlue hover:bg-greenBlue">
                Book
            </Button>
        </div>
    );
}
