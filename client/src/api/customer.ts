import { customerType } from "@/types/customerType";

export default async function verifyCustomer(
    customer: customerType
): Promise<any> {
    try {
        const response = await fetch("http://localhost:8081/api/v1/customer", {
            method: "POST",
            body: JSON.stringify(customer),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to verify user ${customer}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
