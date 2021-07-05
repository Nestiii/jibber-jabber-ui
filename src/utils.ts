export const url = 'https://jibberjabber-dev.zapto.org/api/'

export const getConfig = () => ({headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}})

export const getUsername = () => {
    const base64Url = localStorage.getItem('token')?.split('.')[1];
    const base64 = base64Url?.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64 || '').split('').map((c) =>
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
    );
    return JSON.parse(jsonPayload).sub;
};
