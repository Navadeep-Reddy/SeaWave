import Hero from "@/components/Hero";
import Events from "@/components/Events";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import verifyCustomer from "@/api/customer";

export default function HomePage() {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
        useAuth0();
    console.log(user?.email);
    console.log(user?.nickname);
    console.log(user?.sub);

    useEffect(() => {
        const verifyUser = async () => {
            if (isAuthenticated && user?.sub && user?.email && user?.nickname) {
                try {
                    const accessToken = await getAccessTokenSilently();

                    const customer = {
                        id: user.sub,
                        email: user.email,
                        name: user.nickname,
                    };

                    const data = await verifyCustomer(customer, accessToken);
                    console.log("Customer verification result:", data);
                } catch (error) {
                    console.error("Error verifying customer:", error);
                }
            }
        };

        verifyUser();
    }, [isAuthenticated, user, getAccessTokenSilently]);

    if (isLoading) {
        return <div>Loading ...</div>;
    }
    return (
        <div>
            <Hero />
            <Events />
        </div>
    );
}
