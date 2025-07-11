import { useEffect, useState } from "react";
import { EventInventoryResponse } from "@/types/eventTypes";
import { useParams } from "react-router-dom";
import { getEventById } from "@/api/events";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { bookEvent } from "@/api/book";
export default function BookingPage() {
    const [event, setEvent] = useState<EventInventoryResponse>();
    const [ticketQuantity, setTicketQuantity] = useState(1);
    const { eventId, userId } = useParams();

    const submitBooking = async () => {
        try {
            if (userId && event && ticketQuantity)
                await bookEvent(userId, event?.eventId, ticketQuantity);
        } catch {
            console.log("Failed to book");
        }
    };

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
        <div className="min-h-screen flex flex-col lg:flex-row lg:items-center items-start mt-24 lg:mt-0 w-5/6 mx-auto gap-8">
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:justify-center lg:h-screen lg:-mt-24">
                <h1 className="title text-textBlue font-bold text-4xl md:text-6xl text-center">
                    Review Your Booking
                </h1>
                <div className="mt-8 text-textBlue hidden lg:block">
                    <svg
                        className="w-16 h-16 md:w-24 md:h-24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col items-center lg:justify-start ">
                <div className="event-details bg-offBlue/80 mt-10 lg:mt-0 w-full h-40 p-4 rounded-t-2xl flex flex-col items-center">
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
                                <p className="font-semibold">
                                    {ticketQuantity}
                                </p>
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
                <Button
                    onClick={() => submitBooking()}
                    className="px-10 py-6 mt-8 h-10 w-40 rounded-2xl bg-textBlue font-semibold text-lg text-offBlue hover:bg-weirdBlue hover:text-textBlue active:bg-greenBlue duration-200"
                >
                    Confirm Booking
                </Button>
            </div>
        </div>
    );
}
