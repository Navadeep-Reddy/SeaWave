import { customerType } from "@/types/customerType";

export default async function verifyCustomer(
    customer: customerType,
    accessToken?: string
): Promise<any> {
    try {
        const headers: HeadersInit = {
            "Content-Type": "application/json",
        };

        if (accessToken) {
            headers.Authorization = `Bearer ${accessToken}`;
        }

        const response = await fetch(
            `${import.meta.env.VITE_GATEWAY_URI}/api/v2/customer/check`,
            {
                method: "POST",
                body: JSON.stringify(customer),
                headers,
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to verify user ${customer}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
