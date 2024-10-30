function getClientIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('client_id');
}

function hideMeasurementForm() {
  window.location.href = `measurements_list.html?client_id=${getClientIdFromUrl()}`;
}


document.addEventListener("DOMContentLoaded", function() {
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  document.getElementById("date").value = today; // Set the value of the date input
});


function saveMeasurement() {


  const formData = {
    //client_id: document.getElementById('client_id').value,
    client_id : getClientIdFromUrl(),
    date: document.getElementById('date').value,
    height_cm: document.getElementById('height_cm').value,
    weight_kg: document.getElementById('weight_kg').value,
    neck_cm: document.getElementById('neck_cm').value,
    chest_cm: document.getElementById('chest_cm').value,
    arm_right_cm: document.getElementById('arm_right_cm').value,
    arm_left_cm: document.getElementById('arm_left_cm').value,
    waist_cm: document.getElementById('waist_cm').value,
    hip_cm: document.getElementById('hip_cm').value,
    thigh_right_cm: document.getElementById('thigh_right_cm').value,
    thigh_left_cm: document.getElementById('thigh_left_cm').value
  };



  const formDataTest = {
    client_id : getClientIdFromUrl(),                 // Random client ID
    date: '2024-09-23',                  // Current date
    height_cm: 111,                      // Height in cm
    weight_kg: 70.5,                     // Weight in kg
    neck_cm: 40,                         // Neck circumference in cm
    chest_cm: 95,                        // Chest circumference in cm
    arm_right_cm: 35,                    // Right arm circumference in cm
    arm_left_cm: 34,                     // Left arm circumference in cm
    waist_cm: 80,                        // Waist circumference in cm
    hip_cm: 90,                          // Hip circumference in cm
    thigh_right_cm: 55,                  // Right thigh circumference in cm
    thigh_left_cm: 54                    // Left thigh circumference in cm
  };




  // Send data to the backend
  fetch('/save-measurements', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formDataTest)
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {

        alert('Measurements saved successfully!');
        hideMeasurementForm();  // Hide form after success
      } else {
        alert('Error saving measurements: ' + data.error);
      }
    })
    .catch(error => console.error('Error:', error));
};

