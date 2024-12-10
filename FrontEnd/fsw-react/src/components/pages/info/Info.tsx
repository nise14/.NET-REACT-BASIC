import Authentication from "../../authentication/Authentication";

export default function Info() {
    return (
        <Authentication
            authenticated={
                <div>
                    Info
                </div>
            }
            noAuthenticated={
                <div>
                    No tiene permisos. Por favor, Identifiquese o Registrese
                </div>
            }
        />
    );
}