import * as jose from 'jose'

class JWT {
    private key: any;
    private alg: any;
    constructor() {
        this.key = String(process.env.NEXT_PUBLIC_JWT_KEY);
        this.alg = 'RS512'
    }

    async getToken() {
        const secret = await jose.importPKCS8(this.key, this.alg);

        const jwt = await new jose.SignJWT({'urn:thekrew:claim': true})
        .setProtectedHeader({
            alg: this.alg
        })
        .setIssuedAt()
        .setIssuer("urn:thekrew:issuer")
        .setAudience("urn:thekrew:audience")
        .sign(secret);

        return jwt;
    }

    async getPublic() {
        const secret = await jose.importPKCS8(this.key, this.alg);
        return secret
    }
}

export default JWT;