export async function bookEvent(
    userId: string,
    eventId: string,
    ticketQty: number,
    keycloak: any
) {
    const postObject = {
        userId: userId,
        ticketId: eventId,
        ticketQuantity: ticketQty,
        eventId: "1",
    };

    try {
        const response = await fetch("http://localhost:8090/api/v2/booking", {
            method: "POST",
            body: JSON.stringify(postObject),
            headers: {
                "Content-Type": "application/json",
                ["Authorization"]: `Bearer ${keycloak.token}`,
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
