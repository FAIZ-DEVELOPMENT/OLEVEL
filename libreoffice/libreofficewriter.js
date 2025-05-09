document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    const closeButton = document.getElementById('close-button');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Toggle mobile menu
    mobileMenu.addEventListener('click', function() {
        navLinks.classList.add('active');
        closeButton.style.display = 'block';
        mobileMenu.style.display = 'none';
    });

    // Close mobile menu
    closeButton.addEventListener('click', function() {
        navLinks.classList.remove('active');
        closeButton.style.display = 'none';
        mobileMenu.style.display = 'flex';
        
        // Close all dropdowns when closing the menu
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    });

    // Toggle dropdowns on mobile
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
                
                // Close other dropdowns when opening one
                if (dropdown.classList.contains('active')) {
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                }
            }
        });
    });

    // Close menu when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
            if (!navLinks.contains(e.target) && 
                !mobileMenu.contains(e.target) && 
                !closeButton.contains(e.target)) {
                navLinks.classList.remove('active');
                closeButton.style.display = 'none';
                mobileMenu.style.display = 'flex';
                
                // Close all dropdowns
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        }
    });
});

document.querySelectorAll('.dropdown > a').forEach(link => {
link.addEventListener('click', e => {
e.preventDefault(); // Prevent default link behavior
const parent = link.parentElement;
parent.classList.toggle('open');
});
});


// Add event listener for the close button
closeButton.addEventListener('click', () => {
    navLinks.classList.remove('active'); // Remove active class from nav links
    closeButton.style.display = 'none'; // Hide close button
    mobileMenu.style.display = 'block'; // Show mobile menu toggle button
});

const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');
const closeButton = document.getElementById('close-button');

// Add event listener for the mobile menu toggle
mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Check if the nav links are active
    if (navLinks.classList.contains('active')) {
        closeButton.style.display = 'block'; // Show close button
        mobileMenu.style.display = 'none'; // Hide mobile menu toggle button
    } else {
        closeButton.style.display = 'none'; // Hide close button
        mobileMenu.style.display = 'block'; // Show mobile menu toggle button
    }
});

// Add event listener for the close button
closeButton.addEventListener('click', () => {
    navLinks.classList.remove('active'); // Remove active class from nav links
    closeButton.style.display = 'none'; // Hide close button
    mobileMenu.style.display = 'block'; // Show mobile menu toggle button
});
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const tables = document.querySelectorAll('.shortcut-table');
    const categories = document.querySelectorAll('.category');

    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        tables.forEach(table => {
            const rows = table.querySelectorAll('tbody tr');
            let hasVisibleRows = false;

            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                const tableCategory = table.getAttribute('data-category');
                
                const matchesSearch = text.includes(searchTerm);
                const matchesCategory = selectedCategory === 'all' || tableCategory === selectedCategory;
                
                if (matchesSearch && matchesCategory) {
                    row.style.display = '';
                    hasVisibleRows = true;
                } else {
                    row.style.display = 'none';
                }
            });

            // Show/hide entire table based on visibility
            const parentSection = table.closest('h2').nextElementSibling;
            if (hasVisibleRows && (selectedCategory === 'all' || table.getAttribute('data-category') === selectedCategory)) {
                table.style.display = '';
                table.previousElementSibling.style.display = '';
            } else {
                table.style.display = 'none';
                table.previousElementSibling.style.display = 'none';
            }
        });
    });

    // Category filter functionality
    categoryFilter.addEventListener('change', function() {
        const selectedCategory = this.value;
        const searchTerm = searchInput.value.toLowerCase();

        tables.forEach(table => {
            const tableCategory = table.getAttribute('data-category');
            const shouldShow = selectedCategory === 'all' || tableCategory === selectedCategory;
            
            if (shouldShow) {
                table.style.display = '';
                table.previousElementSibling.style.display = '';
                
                // Apply search filter within visible category
                const rows = table.querySelectorAll('tbody tr');
                let hasVisibleRows = false;
                
                rows.forEach(row => {
                    const text = row.textContent.toLowerCase();
                    if (text.includes(searchTerm)) {
                        row.style.display = '';
                        hasVisibleRows = true;
                    } else {
                        row.style.display = 'none';
                    }
                });
                
                if (!hasVisibleRows && searchTerm !== '') {
                    table.style.display = 'none';
                    table.previousElementSibling.style.display = 'none';
                }
            } else {
                table.style.display = 'none';
                table.previousElementSibling.style.display = 'none';
            }
        });
    });
});
