export async function bookEvent(
    userId: string,
    eventId: string,
    ticketQty: number
) {
    const postObject = {
        userId: userId,
        ticketId: "1",
        ticketQuantity: ticketQty,
        eventId: eventId,
    };

    try {
        const response = await fetch("http://localhost:8090/api/v2/booking", {
            method: "POST",
            body: JSON.stringify(postObject),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Failed while Booking with ${postObject}`);
        }
        return await response.json();
    } catch (err) {
        console.error(err);
        throw err;
    }
}
