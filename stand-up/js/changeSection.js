export const initChangeSection = (bookingForm, event, booking, eventButtonEdit, eventButtonReserve, bookingTitle) => {
    eventButtonEdit.style.transition = 'opacity 0.5s, visibility 0.5s';
    eventButtonReserve.style.transition = 'opacity 0.5s, visibility 0.5s';

    eventButtonEdit.classList.remove('event__button_hidden');
    eventButtonReserve.classList.remove('event__button_hidden');

    const changeSection = () => {
        event.classList.toggle('event__hidden')
        booking.classList.toggle('booking__hidden')
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

