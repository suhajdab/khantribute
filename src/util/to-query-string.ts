export function toQueryString(obj: Object) {
    return "?" + Object.keys(obj).filter(key => obj.hasOwnProperty(key)).map(key => `${key}=${obj[key]}`).join("&");
}