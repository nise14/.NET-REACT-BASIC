import { ReactElement, useContext } from "react"
import AuthorizationContext from "./AuthorizationContext"

export default function Authentication(props: AuthenticationProps) {
    const { userInformations } = useContext(AuthorizationContext);
    return (
        <>
            {(userInformations && userInformations.length > 0) ? props.authenticated : props.noAuthenticated}
        </>
    )
};

interface AuthenticationProps {
    authenticated: ReactElement;
    noAuthenticated: ReactElement
}