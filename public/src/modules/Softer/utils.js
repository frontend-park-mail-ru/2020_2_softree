export const id = () => {
    return Math.round(Math.random() * Date.now());
};

export const overallBy = (path, nextPath) => {
    const minLen = Math.min(path.length, nextPath.length);
    for (let i = 0; i < minLen; i++) {
            if (path[i] !== nextPath[i]) {
                return i;
            }
    }
    return minLen;
}

export const overallPath = (path, nextPath) => {
    const overallIdx = overallBy(path, nextPath);
    let result = path.slice(0, overallIdx);
    if (result[result.length - 1] === '/') {
        result = result.slice(result.length - 1, 1);
    }
    return result;
}
