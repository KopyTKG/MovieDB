'use server' 
import { cookies } from 'next/headers'
 
export async function setToken(token: string) {
    try{
        if(cookies().has('jwt')) {
            return "Token already set"
        } else {
            cookies().set('jwt', token)
            return "Token set"
        }

    } catch (e) {
        throw e;
    }
}


export async function getToken() {
    try {
        if(cookies().has('jwt')) {
            return cookies().get('jwt')
        } else {
            throw new Error("Token not set");
        }
    } catch (e) {
        throw e;
    }
}