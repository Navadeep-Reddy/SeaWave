import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import BookingPage from "./pages/BookingPage";
import OrdersPage from "./pages/OrdersPage";
import AuthProviderWrapper from "./auth/AuthProvider";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./auth/Login";

function AppContent() {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-offBlue">
                <div className="text-2xl text-textBlue font-semibold">
                    Loading...
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-offBlue flex flex-col items-center justify-center relative overflow-hidden">
                <svg
                    className="absolute top-0 left-0 w-[450px] h-[450px] md:w-[700px] md:h-[700px] opacity-30"
                    style={{ transform: "translate(-35%, -35%) rotate(25deg)" }}
                    viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill="#F7FDFF"
                        d="M33.6,-67.5C39.9,-54.6,39,-38.2,48,-26.4C57.1,-14.6,76.3,-7.3,76.5,0.1C76.7,7.6,58,15.1,50.3,29.4C42.6,43.6,46,64.5,39.4,71.4C32.9,78.3,16.4,71.2,1.5,68.6C-13.4,66,-26.9,67.9,-41,65.4C-55.1,62.8,-69.8,55.8,-74.8,44.2C-79.9,32.5,-75.2,16.3,-71.2,2.3C-67.2,-11.6,-63.8,-23.2,-55.7,-29.7C-47.7,-36.2,-35.1,-37.6,-25.1,-48.4C-15,-59.1,-7.5,-79.3,3.1,-84.6C13.6,-89.9,27.3,-80.4,33.6,-67.5Z"
                        transform="translate(100 100)"
                    />
                </svg>

                <svg
                    className="absolute bottom-0 right-0 w-[550px] h-[550px] md:w-[950px] md:h-[950px] opacity-40"
                    style={{ transform: "translate(30%, 30%) rotate(-35deg)" }}
                    viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill="#F7FDFF"
                        d="M16.8,-28.1C23.8,-25,32.8,-24.6,47,-20.4C61.2,-16.1,80.4,-8.1,87.3,4C94.1,16,88.6,32,74.6,36.6C60.7,41.2,38.4,34.5,24.5,35.4C10.7,36.3,5.4,44.8,-2.5,49.1C-10.3,53.4,-20.6,53.4,-27.6,48.6C-34.6,43.8,-38.4,34.1,-49,25.1C-59.7,16.2,-77.2,8.1,-77.7,-0.3C-78.3,-8.7,-61.8,-17.5,-49.6,-23.6C-37.3,-29.7,-29.3,-33.2,-21.7,-36C-14.1,-38.8,-7.1,-40.8,-1.1,-38.9C4.9,-37,9.8,-31.2,16.8,-28.1Z"
                        transform="translate(100 100)"
                    />
                </svg>

                <div className="text-center relative z-10 px-6">
                    <h1 className="text-6xl md:text-8xl font-bold text-textBlue font-lobster mb-4">
                        SeaWave
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-md mx-auto">
                        Navigate a world of live events with our intuitive and
                        powerful booking platform.
                    </p>
                    <div className="mb-6">
                        <LoginButton />
                    </div>
                    <p className="text-sm text-gray-500">
                        Sign in to discover and book amazing live events
                    </p>
                </div>
            </div>
        );
    }

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/booking/:userId/:eventId"
                    element={<BookingPage />}
                />
                <Route path="/tickets/:userID" element={<OrdersPage />} />
            </Routes>
        </BrowserRouter>
    );
}

function App() {
    return (
        <AuthProviderWrapper>
            <AppContent />
        </AuthProviderWrapper>
    );
}
export default App;
