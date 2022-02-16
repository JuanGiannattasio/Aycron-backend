import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client( process.env.GOOGLE_ID );


export const googleVerify = async( token: string ) => {

    const ticket = await  client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_ID
    });
    const payload = ticket.getPayload();

    // @ts-ignore
    const { name, email, picture } = payload

    return { name, email, picture }

}