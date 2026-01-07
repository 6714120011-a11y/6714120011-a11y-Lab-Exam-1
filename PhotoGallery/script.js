const apiKey = '_B1YbO4sxVnt3rJMTuZn483TTjtohcODz3fkAXGBbYA';

const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const gallery = document.getElementById('gallery');

async function fetchImages() {
    const query = searchInput.value;
    if (!query) return;

    gallery.innerHTML = '<p>กำลังโหลด....</p>';

    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=6&client_id=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.results.length === 0) {
            gallery.innerHTML = '<p>ฟ้าใสไม่เข้าใจคำถามค่ะ</p>';
            return;
        }

        gallery.innerHTML = '';

        data.results.forEach(photo => {
            const photoCard = document.createElement('div');
            photoCard.classList.add('photo-card');

            photoCard.innerHTML = `
                <a href="${photo.links.html}" target="_blank">
                    <img src="${photo.urls.small}" alt="${photo.alt_description}">
                </a>
                <p class="photographer">ถ่ายโดย: ${photo.user.name}</p>
            `;

            gallery.appendChild(photoCard);
        });

    } catch (error) {
        console.error('เกิดข้อผิดพลาด:', error);
        gallery.innerHTML = '<p style="color:red;">เกิดข้อผิดพลาดในการดึงข้อมูล</p>';
    }
}

searchBtn.addEventListener('click', fetchImages);

searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        fetchImages();
    }
});