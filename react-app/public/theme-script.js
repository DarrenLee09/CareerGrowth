// Ensure light theme on page load
document.addEventListener('DOMContentLoaded', function () {
    document.documentElement.setAttribute('data-theme', 'light');
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    localStorage.setItem('theme', 'light');
}); 