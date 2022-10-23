export const fetchUsers = (params, obj) => {
    return fetch(`http://localhost:8088/users${params ? params : "/"}`, {...obj})
}