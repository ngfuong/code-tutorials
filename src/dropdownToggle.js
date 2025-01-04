const dropdownToggle = document.getElementById('dropdownToggle');
const dropdownMenu = document.getElementById('dropdownMenu');
const dropdownTitle = dropdownToggle.querySelector('.form-dropdown-title');

const dropdownTutorialToggle = document.getElementById('dropdownTutorialToggle');
const dropdownTutorialMenu = document.getElementById('dropdownTutorialMenu');
const dropdownTutorialTitle = dropdownTutorialToggle.querySelector('.form-dropdown-title');

// Function to toggle visibility of a dropdown
function toggleDropdown(dropdownToggle, dropdownMenu, otherToggle, otherMenu) {
  const isExpanded = dropdownToggle.getAttribute('aria-expanded') === 'true';
  dropdownToggle.setAttribute('aria-expanded', !isExpanded);
  dropdownMenu.classList.toggle('hidden');
  dropdownMenu.classList.toggle('visible');

  //TODO: FIX THIS
  // Ensure the dropdown button has a normal border when active
  if (!isExpanded) {
    dropdownToggle.style.borderBottom = '1px solid var(--border-color)';
    // dropdownToggle.style.borderBottomLeftRadius = '15px';
    // dropdownToggle.style.borderBottomRightRadius = '15px';
  }

  // Close the other dropdown if open
  if (otherToggle.getAttribute('aria-expanded') === 'true') {
    otherToggle.setAttribute('aria-expanded', 'false');
    otherMenu.classList.add('hidden');
    otherMenu.classList.remove('visible');
  }
}

// Handle link click in the dropdown menu
function handleLinkClick(event, dropdownTitle, dropdownMenu) {
  console.log("Link clicked")
  event.preventDefault(); // Prevent default anchor behavior

  const link = event.target;

  // Set the clicked link's text as the dropdown title
  dropdownTitle.textContent = link.textContent;

  // Close the dropdown menu
  dropdownMenu.classList.add('hidden');
  dropdownMenu.classList.remove('visible');

  // Optionally navigate to the href of the clicked link
  if (link.getAttribute('href')) {
    window.location.hash = link.getAttribute('href');
  }
}

// Close dropdown when clicking outside
function closeDropdownOnClickOutside() {
  document.addEventListener('click', (event) => {
    const isClickInsideTutorial = dropdownTutorialToggle.contains(event.target) || dropdownTutorialMenu.contains(event.target);
    const isClickInsideProject = dropdownToggle.contains(event.target) || dropdownMenu.contains(event.target);

    if (!isClickInsideTutorial) {
      dropdownTutorialToggle.setAttribute('aria-expanded', 'false');
      dropdownTutorialMenu.classList.add('hidden');
      dropdownTutorialMenu.classList.remove('visible');
    }

    if (!isClickInsideProject) {
      dropdownToggle.setAttribute('aria-expanded', 'false');
      dropdownMenu.classList.add('hidden');
      dropdownMenu.classList.remove('visible');
    }
  });
}

// Initialize dropdown menu functionality
function initializeDropdown() {
  dropdownToggle.addEventListener('click', () => toggleDropdown(dropdownToggle, dropdownMenu, dropdownTutorialToggle, dropdownTutorialMenu));
  dropdownTutorialToggle.addEventListener('click', () => toggleDropdown(dropdownTutorialToggle, dropdownTutorialMenu, dropdownToggle, dropdownMenu));

  const dropdownLinks = dropdownMenu.querySelectorAll('a');
  dropdownLinks.forEach(link => {
    link.addEventListener('click', (event) => handleLinkClick(event, dropdownTitle, dropdownMenu));
  });

  const dropdownTutorialLinks = dropdownTutorialMenu.querySelectorAll('a');
  dropdownTutorialLinks.forEach(link => {
    link.addEventListener('click', (event) => handleLinkClick(event, dropdownTutorialTitle, dropdownTutorialMenu));
  });

  closeDropdownOnClickOutside();
}

export { initializeDropdown };
