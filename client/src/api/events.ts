import { EventInventoryResponse } from "@/types/eventTypes";

export async function getAllEvents(): Promise<EventInventoryResponse[] | null> {
  try {
    const response = await fetch(
      "http://localhost:8080/api/v1/inventory/events"
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
