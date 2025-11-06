document.addEventListener('DOMContentLoaded', () => {
    // Sayfaya tıklandığında sadece çokça gül yağısı oluştur
    document.addEventListener('click', (e) => {
        // Eğer kullanıcı zaten bir .rose elementine tıklıyorsa tetikleme
        // (rose'lar pointer-events:none olduğu için burada genelde gerek yok)
        createRoses(30);
    });
});

// (Not: kalp ve ses efektleri kaldırıldı - tıklamada yalnızca güller yağacak)

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
