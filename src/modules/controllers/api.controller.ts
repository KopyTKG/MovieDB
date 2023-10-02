class API {
    url: any;
    constructor(url: any) {
        this.url = url;
    }

    async getData(revalidate: number = 3600) {
        const options = {
            method: "GET",
            headers: {
                accept: 'application/json',
            },
            next: { revalidate: revalidate }
        };
        const url = `${this.url}`;
        const res = await fetch(url, options);
        if (res.status == 501) {
            return res
        }
        if (!res.ok) {
            console.log(res)
            throw new Error("Faild to fetch data")
        }   
        return res.json()
    }

    async postData(data: any, revalidate: number = 3600) {
        const options = {
            method: "POST",
            headers: {
                accept: 'application/json',
            },
            next: { revalidate: revalidate },
            body: JSON.stringify(data)
        };
        const url = `${this.url}`;
        const res = await fetch(url, options);
        if (res.status == 501) {
            return res
        }
        if (!res.ok) {
            return ('Failed to fetch data')
        }   
        return res.json()
    }
}

export default API;

  