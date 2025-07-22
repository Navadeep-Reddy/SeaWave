import { ReactNode } from "react";
import { Auth0Provider } from "@auth0/auth0-react";

interface AuthProviderWrapperProps {
    children: ReactNode;
}

const AuthProviderWrapper = ({ children }: AuthProviderWrapperProps) => {
    return (
        <Auth0Provider
            domain="dev-hhhixfqwct2ckaov.us.auth0.com"
            clientId="DdbhQiwGydxuTEWsBx6zQzKTEqy5UoUs"
            authorizationParams={{
                redirect_uri: window.location.origin,
                audience: "https://seawave-backend/",
            }}
        >
            {children}
        </Auth0Provider>
    );
};

export default AuthProviderWrapper;
