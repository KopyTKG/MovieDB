import * as jose from "jose";

class JWT {
  private key: any;
  private alg: any;

  private token: string;
  constructor() {
    this.token = "";
    this.key = process.env.NEXT_PUBLIC_JWT_KEY;
    this.alg = "RS512";
  }


  async getToken() {
    if (this.token) {
      return this.token;
    } else {
      const secret = await jose.importPKCS8(this.key, this.alg);
      const jwt = await new jose.SignJWT({ "urn:thekrew:claim": true })
        .setProtectedHeader({ alg: this.alg })
        .setIssuedAt()
        .setIssuer("urn:thekrew:issuer")
        .setAudience("urn:thekrew:audience")
        .sign(secret);

      this.token = jwt;
      return jwt;
    }
  }

  async getPublic() {
    const secret = await jose.importPKCS8(this.key, this.alg);
    return secret;
  }
}

export default JWT;
