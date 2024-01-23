import './style.css';
import {initForm} from "./js/form";
import {getComedians} from "./js/api";
import {createComedianBlock} from "./js/comedians";
import {initChangeSection} from "./js/changeSection";

const init = async () => {
    const bookingComediansList = document.querySelector('.booking__comedians-list');
    const bookingForm = document.querySelector('.booking__form');
    const countComedians = document.querySelector('.event__info-item_comedians .event__info-number');
    const bookingInputFullname = document.querySelector('.booking__input_fullname');
    const bookingInputPhone = document.querySelector('.booking__input_phone');
    const bookingInputTicket = document.querySelector('.booking__input_ticket');

    const event = document.querySelector('.event');
    const booking = document.querySelector('.booking');
    const eventButtonEdit = document.querySelector('.event__button_edit');
    const eventButtonReserve = document.querySelector('.event__button_reserve');
    const bookingTitle = document.querySelector('.booking__title');

    const comedians = await getComedians();

    if (comedians) {
        countComedians.textContent = comedians.length;
        const comedianBlock = createComedianBlock(comedians, bookingComediansList);
        bookingComediansList.append(comedianBlock);

        const changeSection =  initChangeSection(
            bookingForm, event, booking, eventButtonEdit,
            eventButtonReserve, bookingTitle, comedians, bookingComediansList);

        initForm(
            bookingForm, bookingInputFullname, bookingInputPhone,
            bookingInputTicket, changeSection, bookingComediansList);
    }
};

init();