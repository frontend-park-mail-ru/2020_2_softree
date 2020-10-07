// const hostname = 'https://api.softree.group';
const hostname = 'http://api.self.ru';

const isJSONAnswer = response => {
    return response.headers.get('Content-Type');
};

export const jfetch = (path, options) => {
    return fetch(`${hostname}${path}`, {
        mode: 'cors',
        credentials: 'include',
        ...options
    })
        .then(response => {
            return new Promise((resolve, reject) => {
                if (response.ok) {
                    if (isJSONAnswer(response)) {
                        response.json().then(data => resolve({ status: response.status, data }));
                    } else {
                        resolve({ status: response.status, data: {} });
                    }
                } else {
                    if (isJSONAnswer(response)) {
                        response.json().then(data => reject({ status: response.status, data }));
                    } else {
                        reject({ status: response.status, data: {} });
                    }
                }
            });
        });
};

export const jpost = (path, data, options = {}) => {
    return jfetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        ...options
    });
};

export const jput = (path, data, options = {}) => {
    return jpost(path, data, { method: 'PUT', ...options });
};

export const jdelete = (path, data, options = {}) => {
    return jpost(path, data, { method: 'DELETE', ...options });
};

export const jpatch = (path, data, options = {}) => {
    return jpost(path, data, { method: 'PATCH', ...options });
};

export const jget = (path, params, options = {}) => {
    return jfetch(path, {
        method: 'GET',
        data: new URLSearchParams(params),
        ...options
    });
};
