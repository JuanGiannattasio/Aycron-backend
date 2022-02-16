import jwt from 'jsonwebtoken'


export const generateJWT = ( uid: string ) => {

    return new Promise(( resolve, reject ) => {

        const payload = {
            uid
        }

        jwt.sign( payload, process.env.JWT!, {
            expiresIn: '4h',
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT')
            } else {
                resolve( token )
            }

        })

    })

}