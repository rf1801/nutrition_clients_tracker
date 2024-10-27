function nextStep(step) {
  const currentStep = document.querySelector('.form-step.active');
  const nextStep = document.getElementById('step-' + step);

  currentStep.classList.remove('active');
  nextStep.classList.add('active');
}

function prevStep(step) {
  const currentStep = document.querySelector('.form-step.active');
  const prevStep = document.getElementById('step-' + step);

  currentStep.classList.remove('active');
  prevStep.classList.add('active');
}



function formatDate(isoDate) {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

















function hideMeasurementForm() {
  document.getElementById('measurementForm').style.display = 'none';
}











// JavaScript to handle form submission





function resetForm() {
  document.getElementById('measurementsForm').reset();  // Reset all form fields
}
