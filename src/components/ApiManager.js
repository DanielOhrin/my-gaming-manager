import { proxy } from "./proxy"

// Personal API (json-server) Fetches
const baseURL = `http://localhost:8088`

export const fetchUsers = (params, obj) => {
    return fetch(`${baseURL}/users${params ? params : "/"}`, { ...obj })
}

export const fetchLists = (params, obj) => {
    return fetch(`${baseURL}/lists${params ? params : "/"}`, { ...obj })
}

export const fetchTags = (params, obj) => {
    return fetch(`${baseURL}/tags${params ? params : "/"}`, { ...obj })
}

export const fetchListTags = (params, obj) => {
    return fetch(`${baseURL}/listTags${params ? params : "/"}`, { ...obj })
}

export const fetchPlatforms = () => {
    return fetch(`${baseURL}/platforms`)
}

export const fetchListGames = (params, obj) => {
    return fetch(`${baseURL}/listGames${params ? params : "/"}`, { ...obj })
}

// Public API (IGDB) Fetches
export const fetchGames = (rules) => {
    return fetch(`${proxy}/games`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: rules
    })
}