// Get references to the radio buttons
const lightMode = document.getElementById('light-mode');
const darkMode = document.getElementById('dark-mode');
const autoMode = document.getElementById('auto-mode');

// Function to apply the selected color scheme
function applyColorScheme(scheme) {
  document.body.classList.remove('dark-mode', 'light-mode');
  if (scheme === 'dark') {
    document.body.classList.add('dark-mode');
  } else if (scheme === 'light') {
    document.body.classList.add('light-mode');
  }
}

// Initialize the default scheme based on user preference
function initializeColorScheme() {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (autoMode.checked) {
    applyColorScheme(isDarkMode ? 'dark' : 'light');
  } else if (lightMode.checked) {
    applyColorScheme('light');
  } else if (darkMode.checked) {
    applyColorScheme('dark');
  }
}

// Add event listeners to the radio buttons
function setupColorSchemeListeners() {
  lightMode.addEventListener('change', () => applyColorScheme('light'));
  darkMode.addEventListener('change', () => applyColorScheme('dark'));
  autoMode.addEventListener('change', () => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyColorScheme(isDarkMode ? 'dark' : 'light');
  });
}

// Initialize everything
function initializeThemeToggle() {
  initializeColorScheme();
  setupColorSchemeListeners();
}

// Export the initializer function for modular use
export { initializeThemeToggle };
