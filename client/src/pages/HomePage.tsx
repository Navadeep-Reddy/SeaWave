import Hero from "@/components/Hero";
import Events from "@/components/Events";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import verifyCustomer from "@/api/customer";

export default function HomePage() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    console.log(user?.email);
    console.log(user?.nickname);
    console.log(user?.sub); // This is the unique user ID string from Auth0

    useEffect(() => {
        if (isAuthenticated && user?.sub && user?.email && user?.nickname) {
            const customer = {
                id: user.sub,
                email: user.email,
                name: user.nickname,
            };

            verifyCustomer(customer)
                .then((data) => {
                    console.log("Customer verification result:", data);
                })
                .catch((error) => {
                    console.error("Error verifying customer:", error);
                });
        }
    }, [isAuthenticated, user]);

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
