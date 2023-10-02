'use server'
import API from "@/modules/controllers/api.controller"

export async function fetchPoster() {
    let movieFetcher = new API(`${process.env.BASE_URL}/api/rngPoster`)
    let rawData : any = await movieFetcher.getData(0)
    return rawData
}

export async function fetchMovies() {
    const fetcher = new API(`${process.env.BASE_URL}/api/movies`)
    const dataRaw = await fetcher.getData()
    return dataRaw
}

export async function fetchMovie(id: string) {
    const fetcher = new API(`${process.env.BASE_URL}/api/movie`)
    const dataRaw = await fetcher.postData(id, 60)
    return dataRaw
}