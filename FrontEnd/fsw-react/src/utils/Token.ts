import { UserInformation } from "../components/authentication/AuthorizationContext";

export function saveToken(token: string) {
    localStorage.setItem("fwsToken", token);
}

export function readToken(value: string): string {
    const token = localStorage.getItem("fwsToken");
    if (!token) {
        return "";
    }

    const dataToken = JSON.parse(atob(token.split('.')[1]));
    return dataToken[value];
}

export function logout() {
    localStorage.removeItem("fwsToken");
    window.location.href = "/identificate";
}

export function getUserInformation(): UserInformation[] {
    const token = localStorage.getItem("fwsToken");
    if (!token) {
        return [];
    }

    const dataToken = JSON.parse(atob(token.split('.')[1]));
    const answer: UserInformation[] = [];

    for (const property in dataToken) {
        answer.push({ name: property, value: dataToken[property] });
    }

    return answer;
}