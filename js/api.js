import {Notification} from './Notification';

const API_URL = 'https://sleet-future-church.glitch.me/';

export const getComedians = async () => {
    try {
        const response = await fetch(`${API_URL}comedians`);
        if (!response.ok) {
            throw new Error(`Сервер вернул ошибку: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.log(`Возникла проблема с fetch запросом: ${error.message}`);

        Notification.getInstance().show('Возникла ошибка, попробуйте позже');
    }
}

export const getClient = async (ticket) => {
    try {
        const response = await fetch(`${API_URL}clients/${ticket}`);
        if (!response.ok) {
            throw new Error(`Сервер вернул ошибку: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.log(`Возникла проблема с fetch запросом: ${error.message}`);

        Notification.getInstance().show('Возникла ошибка, попробуйте позже');
    }
}


export const sentData = async (method, data, id) => {
    try {
        const response = await fetch(`${API_URL}clients${id ? `/${id}` : ''}`, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`Сервер вернул ошибку: ${response.status}`);
        }

        return true;
    } catch (error) {
        console.log(`Возникла проблема с fetch запросом: ${error.message}`);

        Notification.getInstance().show('Возникла ошибка, попробуйте позже');

        return false;
    }
}