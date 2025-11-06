document.addEventListener('DOMContentLoaded', () => {
    // Sayfaya tıklanınca az gül, çok kalp yağsın
    document.addEventListener('click', () => {
        createHearts(40);
        createRoses(8);
    });
});

// Üstten güller yağdırma fonksiyonu
function createRoses(count) {
    for (let i = 0; i < count; i++) {
        const rose = document.createElement('div');
        rose.className = 'rose';
        rose.textContent = '🌹';

        // Rastgele konum ve zamanlama
        const left = Math.random() * 100; // yüzde olarak
        const delay = Math.random() * 0.8; // saniye
        const dur = 1.6 + Math.random() * 1.8; // saniye

        rose.style.left = `${left}%`;
        rose.style.animationDelay = `${delay}s`;
        rose.style.animationDuration = `${dur}s`;

        document.body.appendChild(rose);

        rose.addEventListener('animationend', () => rose.remove());
    }
}

// Üstten kalpler yağdırma fonksiyonu
function createHearts(count) {
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = '❤️';

        const left = Math.random() * 100;
        const delay = Math.random() * 0.8;
        const dur = 1.6 + Math.random() * 1.8;

        heart.style.left = `${left}%`;
        heart.style.animationDelay = `${delay}s`;
        heart.style.animationDuration = `${dur}s`;

        document.body.appendChild(heart);

        heart.addEventListener('animationend', () => heart.remove());
    }
}