import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: "http://localhost:8091/",
    realm: "ticket-server",
    clientId: "react-app",
});

export default keycloak;
