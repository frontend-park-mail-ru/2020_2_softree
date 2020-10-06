// const hostname = "http://localhost:8000";
const hostname = "http://self.ru";

export const jfetch = (path, options) => {
    return fetch(`${hostname}${path}`, {
        mode: "cors",
        credentials: 'include',
        ...options
    })
}

export const jpost = (path, data, options = {}) => {
    return jfetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        ...options
    })
}

export const jput = (path, data, options = {}) => {
    return jpost(path, data, {method: 'PUT', ...options});
}

export const jdelete = (path, data, options = {}) => {
    return jpost(path, data, {method: 'DELETE', ...options});
}

export const jpatch = (path, data, options = {}) => {
    return jpost(path, data, {method: 'PATCH', ...options});
}

export const jget = (path, params, options = {}) => {
    return jfetch(path, {
        method: 'GET',
        data: new URLSearchParams(params),
        ...options
    })
}
