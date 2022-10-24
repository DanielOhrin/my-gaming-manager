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