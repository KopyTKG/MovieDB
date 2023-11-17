import * as jose from 'jose';

class JWT {
	private key: string;
	private alg: any;

	private token: string;
	constructor() {
		this.token = '';
		this.key = process.env.NEXT_PUBLIC_JWT_KEY ? process.env.NEXT_PUBLIC_JWT_KEY : '';
		this.alg = 'RS512';
	}

	private async getKey() {
		if (this.key) {
			return await jose.importPKCS8(this.key, this.alg);
		} else {
			throw new Error('Key not found');
		}
	} 

	async getToken() {
		if (this.token) {
			return this.token;
		} else {
			const secret = await this.getKey();
			const jwt = await new jose.SignJWT({ 'urn:thekrew:claim': true })
				.setProtectedHeader({ alg: this.alg })
				.setIssuedAt()
				.setIssuer('urn:thekrew:issuer')
				.setAudience('urn:thekrew:audience')
				.sign(secret);

			this.token = jwt;
			return jwt;
		}
	}

	async getPublic() {
		return await this.getKey();
	}
}

export default JWT;
