const totalTests = 32;
const currentPage = window.location.pathname.split("/").pop(); // e.g., it-5.html
const sidebar = document.querySelector('.sidebar');

for (let i = 1; i <= totalTests; i++) {
    const fileName = `web-${i}.html`;
    if (fileName !== currentPage) {
        const a = document.createElement("a");
        a.href = fileName;
        a.className = "mock-link";
        a.textContent = `Mock Test ${i}`;
        sidebar.appendChild(a);

        const hr = document.createElement("hr");
        sidebar.appendChild(hr);
    }
}