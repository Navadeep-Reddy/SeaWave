import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return <button className="border-2 border-black/70 active:bg-textBlue/60 hover:bg-darkOffBlue text-2xl py-2 px-10 lg:py-4 lg:px-20 rounded-lg hover:text-black/80 text-white bg-textBlue duration-200" onClick={() => loginWithRedirect()}>LOG IN</button>;
};

export default LoginButton;
