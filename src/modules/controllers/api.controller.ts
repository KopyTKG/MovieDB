

class API {
    url: any;
    token: any;
    constructor(url: any, token: any) {
        this.url = url;
        this.token = token;
    }

    async getData(path: string) {
        const options = {
            method: "GET",
            headers: {
                accept: 'application/json',
                Authorization: `${this.token}`
            },
            next: { revalidate: 3600 }
        };
        const url = `${this.url}${path}`;
        const res = await fetch(url, options);
        if (!res.ok) {
            return ('Failed to fetch data')
        }   
        return res.json()
    }

    async postData(path: string, data: any) {
        const options = {
            method: "POST",
            headers: {
                accept: 'application/json',
                Authorization: `${this.token}`
            },
            next: { revalidate: 3600 },
            body: JSON.stringify(data)
        };
        const url = `${this.url}${path}`;
        const res = await fetch(url, options);
        if (!res.ok) {
            return ('Failed to fetch data')
        }   
        return res.json()
    }
}

export default API;

  