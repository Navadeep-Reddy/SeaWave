import { VenueObject } from "./venueTypes";
export interface EventInventoryResponse {
  event: string;
  capacity: number;
  venue: VenueObject;
  ticketPrice: number;
}
