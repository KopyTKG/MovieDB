import prisma from '../../../../prisma/client';
import JWT from '@/modules/controllers/jwt.controller';
import * as jose from 'jose';

export const dynamic = 'force-dynamic';

export async function POST(
	req: Request,
){
	try{
		const headers = req.headers;
		const token = String(headers.get('authorization')?.split(' ')[1]);
		const settings = await req.json();

		// JWT stuff
		const jwt = new JWT();
		const secret = await jwt.getPublic();

		try {
            
			const { payload } = await jose.jwtVerify(token , secret, {
				issuer: 'urn:thekrew:issuer',
				audience: 'urn:thekrew:audience',
			});
            
			if(payload) {
				const data = await prisma.movie.findMany({
					skip: settings.page * settings.limit,
					take: settings.limit,
					orderBy: {
						title: 'asc'
					},
				});
				return Response.json(data);                
			}
		} catch(e) {
			return Response.json(JSON.stringify('Invalid Token'));
		}
	} catch (e) {
		return Response.json('Internal Server Error');
	}
}


export async function GET(
	req: Request,
){
	try{
		const headers = req.headers;
		const token = String(headers.get('authorization')?.split(' ')[1]);
		// JWT stuff
		const jwt = new JWT();
		const secret = await jwt.getPublic();

		try {
            
			const { payload } = await jose.jwtVerify(token , secret, {
				issuer: 'urn:thekrew:issuer',
				audience: 'urn:thekrew:audience',
			});
            
			if(payload) {
				const data = await prisma.movie.count();
				return Response.json(data);    
			}
		} catch(e) {
			return Response.json(JSON.stringify('Invalid Token'));
		}
	} catch (e) {
		return Response.json('Internal Server Error');
	}
}