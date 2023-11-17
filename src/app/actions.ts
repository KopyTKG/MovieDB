'use server'; 
import { cookies } from 'next/headers';
 
export async function setToken(token: string) {
	if(cookies().has('jwt')) {
		return 'Token already set';
	} else {
		cookies().set('jwt', token);
		return 'Token set';
	}

}


export async function getToken() {
	if(cookies().has('jwt')) {
		return cookies().get('jwt');
	} else {
		throw new Error('Token not set');
	}

}