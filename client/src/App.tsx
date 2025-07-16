import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import BookingPage from "./pages/BookingPage";
import { useEffect } from "react";
import keycloak from "./auth/keycloak";
import { ReactKeycloakProvider, useKeycloak } from "@react-keycloak/web";

function App() {
    return (
        <ReactKeycloakProvider authClient={keycloak}>
            <SecuredContent />
        </ReactKeycloakProvider>
    );
}
const SecuredContent = () => {
    const { keycloak } = useKeycloak();

    const isLoggedIn = keycloak?.authenticated;
    useEffect(() => {


        if (isLoggedIn === false) keycloak?.login();
        //else loadProfile();
    }, [isLoggedIn, keycloak]);

    if (!isLoggedIn) return <div>Not logged in</div>;

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/booking/:userId/:eventId"
                    element={<BookingPage />}
                />
            </Routes>
        </BrowserRouter>
    );
};
export default App;
