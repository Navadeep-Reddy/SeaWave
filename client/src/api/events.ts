import { EventInventoryResponse } from "@/types/eventTypes";

export async function getAllEvents(
    accessToken?: string
): Promise<EventInventoryResponse[] | null> {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_GATEWAY_URI}/api/v2/inventory/events`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...(accessToken && {
                        Authorization: `Bearer ${accessToken}`,
                    }),
                },
            }
        );

        if (!response.ok) {
            throw new Error("Failure in fetching all events");
        }
        const data = (await response.json()) as EventInventoryResponse[];

        return data;
    } catch (err) {
        console.error(err);
        return null;
    }
}

export async function getEventById(
    eventID: string,
    accessToken?: string
): Promise<EventInventoryResponse | null> {
    try {
        const response = await fetch(
            `${
                import.meta.env.VITE_GATEWAY_URI
            }/api/v2/inventory/event/${eventID}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...(accessToken && {
                        Authorization: `Bearer ${accessToken}`,
                    }),
                },
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch event with ID : ${eventID}`);
        }

        const data = (await response.json()) as EventInventoryResponse;
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}
