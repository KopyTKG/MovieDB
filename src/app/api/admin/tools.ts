import * as jose from 'jose';

async function GetAuth(headers: any) {
    const auth = String(headers.get('authorization')?.split(" ")[1])
    try {
        const JWKS = jose.createRemoteJWKSet(
            new URL(`https://dev-nd8v81ft.us.auth0.com/.well-known/jwks.json`),
        );
        const {payload} = await jose.jwtVerify(auth, JWKS, {
            issuer: `https://dev-nd8v81ft.us.auth0.com/`,
        });

        return payload
    } catch (e) {
        return false
    }
}

export {
    GetAuth
}