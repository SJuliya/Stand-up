import './style.css';
import {initForm} from "./js/form";
import {getComedians} from "./js/api";
import {createComedianBlock} from "./js/comedians";

const init = async () => {
    const bookingComediansList = document.querySelector('.booking__comedians-list');
    const bookingForm = document.querySelector('.booking__form');
    const countComedians = document.querySelector('.event__info-item_comedians .event__info-number');
    const bookingInputFullname = document.querySelector('.booking__input_fullname');
    const bookingInputPhone = document.querySelector('.booking__input_phone');
    const bookingInputTicket = document.querySelector('.booking__input_ticket');

    const comedians = await getComedians();

    initForm(bookingForm, bookingInputFullname, bookingInputPhone, bookingInputTicket);

    if (comedians) {
        countComedians.textContent = comedians.length;
        const comedianBlock = createComedianBlock(comedians, bookingComediansList);
        bookingComediansList.append(comedianBlock);
    }
};

init();