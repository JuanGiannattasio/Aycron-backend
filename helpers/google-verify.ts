import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client( process.env.GOOGLE_ID || '522246527978-l9g2m51un5mfd5ci47qo1ddpq7nei4dp.apps.googleusercontent.com' );


export const googleVerify = async( token: string ) => {

    const ticket = await  client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_ID || '522246527978-l9g2m51un5mfd5ci47qo1ddpq7nei4dp.apps.googleusercontent.com'
    });
    const payload = ticket.getPayload();

    // @ts-ignore
    const { name, email, picture } = payload

    return { name, email, picture }

}