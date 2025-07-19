import Hero from "@/components/Hero";
import Events from "@/components/Events";
import { useEffect } from "react";
import { useKeycloak } from "@react-keycloak/web";
import verifyCustomer from "@/api/customer";
import { customerType } from "@/types/customerType";

export default function HomePage() {
    const { keycloak } = useKeycloak();
    useEffect(() => {
        const loadProfile = async () => {
            try {
                await keycloak.loadUserProfile();
                console.log(keycloak.profile);
            } catch (error) {
                console.log(error);
            }
        };

        const checkProfile = async () => {
            if (
                !keycloak.profile?.id ||
                !keycloak.profile?.email ||
                !keycloak.profile?.username
            )
                return;
            let customer: customerType = {
                id: keycloak?.profile?.id,
                name: keycloak.profile?.username,
                email: keycloak.profile?.email,
            };
            try {
                const data = await verifyCustomer(customer);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        };

        const initializeProfile = async () => {
            await loadProfile();
            await checkProfile();
        };

        initializeProfile();
    }, []);

    return (
        <div>
            <Hero />
            <Events />
        </div>
    );
}
