export default {
    getItem(key) {
        if (localStorage) {
            return localStorage.getItem(key);
        }
        return null;
    },
    setItem(key, value) {
        if (localStorage) {
            localStorage.setItem(key, value);
        }
    }
}