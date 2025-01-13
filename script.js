// Dummy doctor data
let doctors = [];
let patients = [];

// Populate doctor dropdown
function populateDoctorSelect() {
    const doctorSelect = document.getElementById('doctorSelect');
    doctorSelect.innerHTML = '<option value="">Select Doctor</option>';
    doctors.forEach((doc, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = doc.name;
        doctorSelect.appendChild(option);
    });
}

// Add Doctor
document.getElementById('addDoctorForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('doctorName').value;
    const specialty = document.getElementById('specialty').value;
    const phone = document.getElementById('phone').value;

    doctors.push({ name, specialty, phone });
    populateDoctorSelect();
    e.target.reset();
});

// Add Patient
document.getElementById('addPatientForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('patientName').value;
    const age = document.getElementById('age').value;
    const illness = document.getElementById('illness').value;
    const doctorIndex = document.getElementById('doctorSelect').value;

    if (doctorIndex === '') {
        alert('Please select a doctor.');
        return;
    }

    const doctor = doctors[doctorIndex];
    patients.push({ name, age, illness, doctor });
    displayPatients();
    e.target.reset();
});

// Display Patients
function displayPatients() {
    const tbody = document.querySelector('#patientTable tbody');
    tbody.innerHTML = '';
    patients.forEach((patient) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${patient.name}</td>
            <td>${patient.age}</td>
            <td>${patient.illness}</td>
            <td>${patient.doctor.name}</td>
        `;
        tbody.appendChild(row);
    });
}
