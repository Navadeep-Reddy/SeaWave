import { BookedTicket } from "@/types/orderTypes";

export default async function getUserOrders(
    userID: string,
    accessToken: string
): Promise<BookedTicket[]> {
    try {
        userID = encodeURIComponent(userID);
        const response = await fetch(
            `http://localhost:8090/api/v2/order/${userID}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch user's orders");
        }

        const data = (await response.json()) as BookedTicket[];

        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
