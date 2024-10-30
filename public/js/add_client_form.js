function saveClient() {
  const formData = {
    first_name: document.getElementById('first_name').value,
    last_name: document.getElementById('last_name').value,
    date_of_birth: document.getElementById('date_of_birth').value,
    address: document.getElementById('address').value,
    profession: document.getElementById('profession').value,
    family_status: document.getElementById('family_status').value,
    phone: document.getElementById('phone').value,
    gender: document.getElementById('gender').value,
  };

  fetch('/save-client', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then(response => response.text())
    .then(data => {
      resetForm();  // Reset the form after saving
      alert(data);  // Show a success message


    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function resetForm() {
  // Clear all input fields
  document.querySelectorAll('input').forEach(input => input.value = '');

  // Reset all select elements to the first option
  document.querySelectorAll('select').forEach(select => select.selectedIndex = 0);
}


function resetFormOld() {
  const currentStep = document.querySelector('.form-step.active');
  const firstStep = document.getElementById('step-1');

  currentStep.classList.remove('active');
  firstStep.classList.add('active');

  // Clear all input fields
  document.querySelectorAll('input').forEach(input => input.value = '');
  document.querySelectorAll('select').forEach(select => select.selectedIndex = 0);
}
