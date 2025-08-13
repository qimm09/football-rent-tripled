// court.js

// Search courts by name
function searchCourts() {
    let input = document.getElementById('search').value.toLowerCase();
    let courts = document.querySelectorAll('.court');
    courts.forEach(court => {
        let name = court.getAttribute('data-name').toLowerCase();
        court.style.display = name.includes(input) ? 'block' : 'none';
    });
}

// Voting system (just alert for now)
function vote(courtId, value) {
    alert(`Vote untuk court ${courtId} dihantar! (Backend PHP akan proses)`);
    // TODO: Send vote to backend (e.g., via fetch to vote.php)
}

// Submit comment for court
function submitComment(courtId) {
    let comment = document.getElementById('comment' + courtId).value;
    if(comment.trim() === "") {
        alert("Sila tulis komen terlebih dahulu.");
        return;
    }
    alert(`Komen dihantar untuk court ${courtId}: ${comment}`);
    // TODO: Send comment to backend (e.g., via fetch to comment.php)
}

// Booking form logic
const bookingForm = document.getElementById('bookingForm');
const overlay = document.getElementById('overlay');
const courtNameSpan = document.getElementById('courtName');
const formBooking = document.getElementById('formBooking');
const cancelBtn = document.getElementById('cancelBtn');

let currentCourtId = null;

function openBookingForm(courtId, courtName) {
    currentCourtId = courtId;
    courtNameSpan.textContent = courtName;
    bookingForm.style.display = 'block';
    overlay.style.display = 'block';
}

// Close booking form
function closeBookingForm() {
    bookingForm.style.display = 'none';
    overlay.style.display = 'none';
    formBooking.reset();
}

// Cancel button closes form
cancelBtn.addEventListener('click', closeBookingForm);

// Clicking outside form closes form
overlay.addEventListener('click', closeBookingForm);

// Handle form submission with AJAX to save_booking.php
formBooking.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!currentCourtId) {
        alert("Court ID missing!");
        return;
    }

    const date = document.getElementById('bookingDate').value;
    const time = document.getElementById('bookingTime').value;
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    const formData = new FormData();
    formData.append('court_id', currentCourtId);
    formData.append('booking_date', date);
    formData.append('booking_time', time);
    formData.append('customer_name', name);
    formData.append('phone', phone);

    fetch('save_booking.php', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if(data.status === 'success'){
            alert('Booking Confirmed! Thank you.');
            closeBookingForm();
        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch(err => {
        alert('Request failed: ' + err.message);
    });
});
