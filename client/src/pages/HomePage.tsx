import Hero from "@/components/Hero";
import Events from "@/components/Events";
import { useEffect } from "react";
import { useKeycloak } from "@react-keycloak/web";

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

        loadProfile();
    }, []);

    console.log(keycloak.profile);
    return (
        <div>
            <Hero />
            <Events />
        </div>
    );
}
