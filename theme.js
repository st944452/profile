// Separate theme toggle file to avoid conflicts
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('theme-toggle');
  
  // Fix for 'count is not defined' error in React code examples
  window.count = 0;
  window.useState = function(initialValue) {
    return [initialValue, function() {}];
  };
  window.useContext = function() {
    return null;
  };
  window.useReducer = function(reducer, initialState) {
    return [initialState, function() {}];
  };
  
  if (themeToggle) {
    // Check if user has previously set a theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-theme');
      
      if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      } else {
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      }
    });
  }
});