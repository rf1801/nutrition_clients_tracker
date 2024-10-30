function loadClients() {
  fetch('/get-clients')
    .then(response => response.json())
    .then(clients => {
      const tableBody = document.querySelector('#clientTable tbody');
      tableBody.innerHTML = '';  // Clear any previous rows

      clients.forEach(client => {
        const row = `
            <tr>
              <td>${client.first_name}</td>
              <td>${client.last_name}</td>
              <td>${client.phone}</td>
              <td>${client.address}</td>
              <td>${client.profession}</td>
              <td>${client.date_of_birth}</td>
              <td>${formatDate(client.created_at)}</td>
              <td>
              <button class="btn btn-secondary" onclick="viewMeasurements(${client.client_id})">Details</button>
            </td>
            </tr>
          `;
        tableBody.innerHTML += row;
      });
    })
    .catch(error => console.error('Error loading clients:', error));
}

function formatDate(isoDate) {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


function viewMeasurements(clientId) {
  // Redirect to the measurements list page with clientId as a query parameter
  window.location.href = `measurements_list.html?client_id=${clientId}`;
}

window.onload = loadClients;
