import keycloak from "@/auth/keycloak";
import { EventInventoryResponse } from "@/types/eventTypes";

export async function getAllEvents(
    keycloak: any
): Promise<EventInventoryResponse[] | null> {
    try {
        const response = await fetch(
            "http://localhost:8090/api/v2/inventory/events",
            {
                headers: {
                    ["Authorization"]: `Bearer ${keycloak.token}`,
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
    keycloak: any
): Promise<EventInventoryResponse | null> {
    try {
        const response = await fetch(
            `http://localhost:8090/api/v2/inventory/event/${eventID}`,
            {
                headers: {
                    ["Authorization"]: `Bearer ${keycloak.token}`,
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
