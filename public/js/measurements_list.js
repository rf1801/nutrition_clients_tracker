function getClientIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('client_id');
}

function loadMeasurements() {
  const clientId = getClientIdFromUrl();

  fetch(`/get-measurements?client_id=${clientId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const tableBody = document.querySelector('#measurementsTable tbody');
      tableBody.innerHTML = '';  // Clear any previous data


      data.forEach(measurement => {
        const row = `
          <tr>
            <td>${formatDate(measurement.date)}</td>
            <td>${measurement.height_cm}</td>
            <td>${measurement.weight_kg}</td>
            <td>${measurement.neck_cm}</td>
            <td>${measurement.chest_cm}</td>
            <td>${measurement.arm_right_cm}</td>
            <td>${measurement.arm_left_cm}</td>
            <td>${measurement.waist_cm}</td>
            <td>${measurement.hip_cm}</td>
            <td>${measurement.thigh_right_cm}</td>
            <td>${measurement.thigh_left_cm}</td>

            </td>
          </tr>
        `;
        tableBody.innerHTML += row;
      });
    })
    .catch(error => console.error('Error loading measurements:', error));
}

function formatDate(isoDate) {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


function addMeasurement() {
  // Redirect to the measurements list page with clientId as a query parameter
  window.location.href = `measurements_form.html?client_id=${getClientIdFromUrl()}`;
}


window.onload = function() {
  loadMeasurements();
};
