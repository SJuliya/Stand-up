import QRCode from 'qrcode';

const displayQr = (data) => {
    let error = false;
    const modal = document.querySelector('.modal');
    const canvas = document.getElementById('qrCanvas');
    const modalClose = document.querySelector('.modal__close');

    QRCode.toCanvas(canvas, data, (err) => {
        if (err) {
            error = true;
            console.error(err);
            return;
        }
        console.log("QR код создан");
    });

    if (error) {
        Notification.getInstance().show('Что-то пошло не так, попробуйте позже');
        return;
    }

    modal.classList.add('modal_show');

    window.addEventListener('click', ({target}) => {
        if (target === modalClose || target === modal) {
            modal.classList.remove('modal_show');
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        }
    })
}

export const showQrController = (bookingPerformance) => {
    bookingPerformance.addEventListener('click', ({target}) => {
        if (target.closest('.booking__hall')) {
            const bookingData = target.dataset.booking;
            displayQr(bookingData);
        }
    });
}