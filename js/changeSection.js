import {createComedianBlock} from "./comedians";

export const initChangeSection = (
    bookingForm, event, booking, eventButtonEdit,
    eventButtonReserve, bookingTitle, comedians, bookingComediansList) => {

    eventButtonEdit.style.transition = 'opacity 0.5s, visibility 0.5s';
    eventButtonReserve.style.transition = 'opacity 0.5s, visibility 0.5s';

    eventButtonEdit.classList.remove('event__button_hidden');
    eventButtonReserve.classList.remove('event__button_hidden');

    const changeSection = () => {
        event.classList.toggle('event__hidden');
        booking.classList.toggle('booking__hidden');

        if (booking.classList.contains('booking__hidden')) {
            const comedianBlock = createComedianBlock(comedians, bookingComediansList);
            bookingComediansList.append(comedianBlock);
        }
    }

    eventButtonReserve.addEventListener('click', () => {
        changeSection();
        bookingTitle.textContent = 'Забронируйте место в зале';
        bookingForm.method = 'POST';
    })

    eventButtonEdit.addEventListener('click', () => {
        changeSection();
        bookingTitle.textContent = 'Редактирование брони';
        bookingForm.method = 'PATCH';
    })

    return changeSection;
};

