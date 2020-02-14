export function getHash(length) {
    let key = '';
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < length; i++) {
        key += characters.substr(Math.floor((Math.random() * characters.length) + 1), 1);
    }
    return key;
}