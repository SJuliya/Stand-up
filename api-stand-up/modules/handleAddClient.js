import {sendData, sendError} from "./send.js";
import fs from 'node:fs/promises';
import {CLIENTS} from "../index.js";

export const handleAddClient = (req, res) => {
    let body = '';
    try {
        req.on('data', chunk => {
            body += chunk;
        });
    } catch (error) {
        console.log(`Ошибка при чтении запроса`);
        sendError(res, 500, 'Ошибка сервера при чтении запроса');
    }

    req.on('end', async () => {
        try {
            const newClient = JSON.parse(body);

            if (!newClient.fullName || !newClient.phone || !newClient.ticketNumber) {
                sendError(res, 400, "Неверные данные клиента");
                return;
            }

            if (newClient.booking &&
               (!Array.isArray(newClient.booking) ||
                !newClient.booking.every((item) => item.comedian && item.time))
            ) {
                sendError(res, 400, "Неверно заполнены поля бронирования");
                return;
            }

            const clientData = await fs.readFile(CLIENTS, 'utf-8');
            sendData(res, newClient);
        } catch (error) {

        }
    });
};