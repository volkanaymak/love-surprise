document.addEventListener('DOMContentLoaded', () => {
    const teddyBear = document.querySelector('.teddy-bear');
    const message = document.querySelector('.message');
    
    // Ayıcığa tıklandığında kalp efekti
    teddyBear.addEventListener('click', () => {
        createHeart(event);
        playHeartbeat();
    });
});

// Kalp efekti oluşturma
function createHeart(event) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'absolute';
    heart.style.left = `${event.clientX}px`;
    heart.style.top = `${event.clientY}px`;
    heart.style.fontSize = '2em';
    heart.style.pointerEvents = 'none';
    heart.style.animation = 'floatHeart 1s forwards';
    
    document.body.appendChild(heart);
    
    // Animasyon bitince elementi kaldır
    setTimeout(() => {
        heart.remove();
    }, 1000);
}

// Kalp atışı sesi efekti
function playHeartbeat() {
    const audio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU');
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Ses çalınamadı'));
}

// Kalp animasyonu için CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes floatHeart {
        0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(0, -100px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);