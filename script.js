// שמירה על הפגישות שנבחרו
let appointments = [];

// פונקציה לשלוח הודעה לוואטסאפ
function sendToWhatsApp(date, time) {
    const message = `הוזמנה פגישה לתאריך ${date} בשעה ${time}`;
    const phoneNumber = '+972527711208'; // הכנס את מספר הטלפון שלך בוואטסאפ
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // פותח את הקישור לוואטסאפ
    window.open(whatsappURL, '_blank');
}

// פונקציה לעדכון התצוגה של הפגישות
function updateAppointmentsList() {
    const appointmentsList = document.getElementById('appointments');
    appointmentsList.innerHTML = '';

    // הצגת כל הפגישות שנבחרו
    appointments.forEach((appointment) => {
        const li = document.createElement('li');
        li.textContent = `${appointment.date} - ${appointment.time}`;
        appointmentsList.appendChild(li);
    });
}

// פונקציה לעדכון רשימת השעות הפנויות
function updateAvailableTimes(date) {
    const timeSelect = document.getElementById('appointment-time');
    
    // עובר על כל האפשרויות ובודק אם הפגישה נתפסת
    Array.from(timeSelect.options).forEach((option) => {
        const isBooked = appointments.some((appt) => appt.date === date && appt.time === option.value);
        
        if (isBooked) {
            option.disabled = true;  // Disable the option if it's already booked
        } else {
            option.disabled = false; // Enable the option if it's available
        }
    });
}

// פונקציה שתתבצע כשמשתמש שולח טופס קביעת פגישה
document.getElementById('appointment-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const date = document.getElementById('appointment-date').value;
    const time = document.getElementById('appointment-time').value;

    // בודק אם הפגישה כבר קיימת
    const existingAppointment = appointments.find((appt) => appt.date === date && appt.time === time);
    if (existingAppointment) {
        alert('הפגישה כבר נתפסת');
        return;
    }

    // מוסיף את הפגישה לרשימה
    appointments.push({ date, time });

    // שולח את ההודעה לוואטסאפ
    sendToWhatsApp(date, time);

    // עדכון התצוגה
    updateAppointmentsList();

    // עדכון השעות הפנויות
    updateAvailableTimes(date);

    // הצגת הודעה למשתמש
    const messageElement = document.getElementById('message');
    messageElement.textContent = `הפגישה לתאריך ${date} בשעה ${time} הוזמנה בהצלחה!`;

    // ניקוי הטופס
    document.getElementById('appointment-form').reset();
});

// שמירה על הפגישות לאחר טעינת הדף
document.getElementById('appointment-date').addEventListener('change', function() {
    const selectedDate = this.value;
    updateAvailableTimes(selectedDate);
});
