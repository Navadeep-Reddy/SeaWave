export async function bookEvent(
    userId: string,
    eventId: string,
    ticketQty: number,
    accessToken?: string
) {
    const postObject = {
        userId: userId,
        ticketId: "1",
        ticketQuantity: ticketQty,
        eventId: eventId,
    };

    try {
        const response = await fetch(
            `${import.meta.env.VITE_GATEWAY_URI}/api/v2/booking`,
            {
                method: "POST",
                body: JSON.stringify(postObject),
                headers: {
                    "Content-Type": "application/json",
                    ...(accessToken && {
                        Authorization: `Bearer ${accessToken}`,
                    }),
                },
            }
        );

        if (!response.ok) {
            throw new Error(`Failed while Booking with ${postObject}`);
        }
        return await response.json();
    } catch (err) {
        console.error(err);
        throw err;
    }
}
