import Header from "@Components/app/header";
import Hero from "@Components/auth/hero";
import AuthenticateButton from "@Components/auth/authenticate-button";


export const Auth = () => {
    return (
        <div className="flex flex-col">
            <Header/>
            <Hero>
            </Hero>
            <AuthenticateButton/>
        </div>
    )
}