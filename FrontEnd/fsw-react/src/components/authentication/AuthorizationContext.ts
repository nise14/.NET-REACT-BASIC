import React from "react";

const AuthorizationContext = React.createContext<{
    userInformations: UserInformation[];
    updateUserInformations(userInformation: UserInformation[]): void;
}>({
    userInformations: [],
    updateUserInformations: () => { }
});

export default AuthorizationContext;

export interface UserInformation {
    name: string;
    value: string;
}