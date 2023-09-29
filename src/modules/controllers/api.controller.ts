class API {
    url: any;
    constructor(url: any) {
        this.url = url;
    }

    async getData() {
        const options = {
            method: "GET",
            headers: {
                accept: 'application/json',
            },
            next: { revalidate: 3600 }
        };
        const url = `${this.url}`;
        const res = await fetch(url, options);
        if (!res.ok) {
            return ('Failed to fetch data')
        }   
        return res.json()
    }

    async postData(data: any) {
        const options = {
            method: "POST",
            headers: {
                accept: 'application/json',
            },
            next: { revalidate: 3600 },
            body: JSON.stringify(data)
        };
        const url = `${this.url}`;
        const res = await fetch(url, options);
        if (!res.ok) {
            console.log(res)
            return ('Failed to fetch data')
        }   
        return res.json()
    }
}

export default API;

  