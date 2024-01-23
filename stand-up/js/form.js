import JustValidate from "just-validate";
import Inputmask from "inputmask/lib/inputmask";
import {Notification} from "./Notification";
import {sentData} from "./api";

export const initForm = (
    bookingForm, bookingInputFullname, bookingInputPhone,
    bookingInputTicket, changeSection, bookingComediansList) => {
    const validate = new JustValidate(bookingForm, {
        errorFieldCssClass: 'booking__input_invalid',
        successFieldCssClass: 'booking__input_valid',
    });

    new Inputmask('+7(999)-999-99-99').mask(bookingInputPhone);
    new Inputmask('99999999').mask(bookingInputTicket);

    validate
        .addField(bookingInputFullname, [{
            rule: 'required',
            errorMessage: 'Заполните имя',
        }])
        .addField(bookingInputPhone, [{
            rule: 'required',
            errorMessage: 'Заполните телефон',
        }, {
            validator() {
                const phone = bookingInputPhone.inputmask.unmaskedvalue();
                return phone.length === 10 && !!Number(phone);
            },
            errorMessage: 'Некорректный телефон'
        }])
        .addField(bookingInputTicket, [{
            rule: 'required',
            errorMessage: 'Заполните номер билета'
        }, {
            validator() {
                const ticket = bookingInputTicket.inputmask.unmaskedvalue();
                return ticket.length === 8 && !!Number(ticket);
            },
            errorMessage: 'Неверный номер билета'
        }]).onFail((fields) => {
        let errorMessage = '';

        for (const key in fields) {
            if (!Object.hasOwnProperty.call(fields, key)) {
                continue;
            }

            const element = fields[key];
            if (!element.isValid) {
                errorMessage += `${element.errorMessage}, `;
            }
        }

        Notification.getInstance().show(errorMessage.slice(0, -2), false);
    });

    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validate.isValid) return;
        const data = {booking: []};
        const times = new Set();

        new FormData(bookingForm).forEach((value, field) => {
            if (field === 'booking') {
                const [comedian, time] = value.split(',');

                if (comedian && time) {
                    data.booking.push({comedian, time});
                    times.add(time);
                }
            } else {
                data[field] = value;
            }
        });
        if (times.size !== data.booking.length) {
            Notification.getInstance().show('Нельзя присутствовать на двух выступлениях одновременно', false);
        }

        if (!times.size) {
            Notification.getInstance().show('Не выбраны комик и/или время');
        }

        const method = bookingForm.getAttribute('method');

        let isSend = false;

        if (method === 'PATH') {
            isSend = await sentData(method, data, data.ticketNumber);
        } else {
            isSend = await sentData(method, data);
        }

        if (isSend) {
            Notification.getInstance.show('Бронь принята', true);
            changeSection();
            bookingForm.reset();
            bookingComediansList();
        }
    });
};

