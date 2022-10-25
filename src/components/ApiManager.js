import authHeaders from "./auth/.Auth"

// Personal API (json-server) Fetches
const baseURL = `http://localhost:8088`

export const fetchUsers = (params, obj) => {
    return fetch(`${baseURL}/users${params ? params : "/"}`, { ...obj })
}

export const fetchLists = (params, obj) => {
    return fetch(`${baseURL}/lists${params ? params : "/"}`, { ...obj })
}

export const fetchTags = () => {
    return fetch(`${baseURL}/tags`)
}

export const fetchListTags = (params, obj) => {
    return fetch(`${baseURL}/listTags${params ? params : "/"}`, {...obj})
}

export const fetchPlatforms = () => {
    return fetch(`${baseURL}/platforms`)
}

// Public API (IGDB) Fetches
const igdb = `https://api.igdb.com/v4`

export const fetchGames = (obj) => {
    return fetch(`${igdb}/games`, obj)
}

fetch(`${igdb}/games`, {
    method: "POST",
    headers: {
        "Accept": "*/*",
        ...authHeaders
    },
    data: "where release_dates.y=2020; fields name,genres.name,cover.url,platforms.name,release_dates.human,summary,themes.slug,total_rating;"
})
    .then(res => console.log(res))