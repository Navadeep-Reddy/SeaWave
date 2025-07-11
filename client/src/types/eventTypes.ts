import { VenueObject } from "./venueTypes";
export interface EventInventoryResponse {
    eventId: string;
    event: string;
    capacity: number;
    venue: VenueObject;
    ticketPrice: number;
}
