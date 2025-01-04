const dropdownToggle = document.getElementById('dropdownTutorialToggle');
const dropdownMenu = document.getElementById('dropdownTutorialMenu');
const dropdownTitle = dropdownToggle.querySelector('.form-dropdown-title');

// Toggle dropdown visibility
function toggleDropdown() {
  const isExpanded = dropdownToggle.getAttribute('aria-expanded') === 'true';
  dropdownToggle.setAttribute('aria-expanded', !isExpanded);
  dropdownMenu.classList.toggle('hidden');
  dropdownMenu.classList.toggle('visible');
}

// Handle link click in the dropdown menu
function handleLinkClick(event) {
  event.preventDefault(); // Prevent default anchor behavior

  const link = event.target;

  // Set the clicked link's text as the dropdown title
  dropdownTitle.textContent = link.textContent;

  // Close the dropdown menu
  dropdownMenu.classList.add('hidden');
  dropdownMenu.classList.remove('visible');

  // Navigate to the href of the clicked link
  window.location.hash = link.getAttribute('href');
}

// Initialize dropdown menu functionality
function initializeTutorialDropdown() {
  dropdownToggle.addEventListener('click', toggleDropdown);

  const dropdownLinks = dropdownMenu.querySelectorAll('a');
  dropdownLinks.forEach(link => {
    link.addEventListener('click', handleLinkClick);
  });
}
export { initializeTutorialDropdown };
