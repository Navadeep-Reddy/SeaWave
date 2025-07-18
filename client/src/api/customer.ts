import keycloak from "@/auth/keycloak";
import { customerType } from "@/types/customerType";

export default async function verifyCustomer(
    customer: customerType
): Promise<any> {
    try {
        const response = await fetch("http://localhost:8090/api/v2/customer", {
            method: "POST",
            body: JSON.stringify(customer),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${keycloak.token}`,
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
