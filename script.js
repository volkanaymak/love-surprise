document.addEventListener('DOMContentLoaded', () => {
    // Sayfaya tıklanınca az gül, çok kalp yağsın
    document.addEventListener('click', () => {
        createHearts(40);
        createRoses(8);
    });

    // Çoktan seçmeli quiz başlatma
    initQuiz();
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

// Quiz verisi (3 şık, doğru cevap kullanıcı tercihine göre)
const QUIZ_QUESTIONS = [
    { q: 'En sevdiğim renk hangisi?', options: ['siyah','mor','beyaz'], correctIndex: 0 },
    { q: 'En sevdiğim meyve hangisi?', options: ['çilek','erik','karpuz'], correctIndex: 1 },
    { q: 'En sevdiğim hayvan hangisi?', options: ['kedi','köpek','kuş'], correctIndex: 1 },
    { q: 'En sevdiğim araba hangisi?', options: ['mazda','bmw','mercedes'], correctIndex: 0 },
    { q: 'En sevdiğim içecek hangisi?', options: ['ayran','kahve','soğuk çay'], correctIndex: 0 },
    { q: 'En sevdiğim dizi hangisi?', options: ['breaking bad','ezel','prison break'], correctIndex: 1 },
    // Ek örnek sorular
    { q: 'En sevdiğim tatlı hangisi?', options: ['baklava','trileçe','sütlaç'], correctIndex: 1 },
    { q: 'En sevdiğim mevsim hangisi?', options: ['ilkbahar','yaz','kış'], correctIndex: 1 },
    { q: 'En sevdiğim müzik türü?', options: ['pop','rap','arabesk'], correctIndex: 1 },
    { q: 'Hafta sonu en sevdiğim aktivite?', options: ['yatış','eğlenmek','alışveriş'], correctIndex: 0 }
];

function initQuiz(){
    const startEl = document.getElementById('quiz-start');
    const nextEl = document.getElementById('quiz-next');
    const qEl = document.getElementById('quiz-question');
    const optEl = document.getElementById('quiz-options');
    const progressEl = document.getElementById('quiz-progress');
    const resultEl = document.getElementById('quiz-result');
    if (!startEl || !nextEl || !qEl || !optEl || !progressEl || !resultEl) return;

    let order = [];
    let index = 0;
    let score = 0;
    let answered = false;

    function shuffle(arr){ return arr.sort(() => Math.random() - 0.5); }

    function start(){
        order = shuffle([...QUIZ_QUESTIONS]).slice(0, 10);
        index = 0;
        score = 0;
        answered = false;
        resultEl.style.display = 'none';
        startEl.style.display = 'none';
        nextEl.style.display = 'none';
        render();
    }

    function render(){
        const item = order[index];
        qEl.textContent = item.q;
        progressEl.textContent = `${index+1}/${order.length}`;
        optEl.innerHTML = '';
        const options = shuffle(item.options.map((t,i)=>({t,i})));
        options.forEach(({t,i}) => {
            const btn = document.createElement('button');
            btn.className = 'option';
            btn.textContent = t;
            btn.addEventListener('click', () => select(i, btn));
            optEl.appendChild(btn);
        });
    }

    function select(chosenIdx, chosenBtn){
        if (answered) return;
        answered = true;
        const item = order[index];
        const btns = Array.from(optEl.querySelectorAll('button'));
        btns.forEach((b, idx) => {
            b.disabled = true;
            const originalIdx = item.options.indexOf(b.textContent);
            if (originalIdx === item.correctIndex) b.classList.add('correct');
        });
        const originalChosen = item.options.indexOf(chosenBtn.textContent);
        if (originalChosen === item.correctIndex){
            score++;
        } else {
            chosenBtn.classList.add('wrong');
        }
        nextEl.style.display = 'inline-block';
        if (index === order.length - 1) nextEl.textContent = 'Bitir';
    }

    function next(){
        if (!answered) return;
        if (index < order.length - 1){
            index++;
            answered = false;
            nextEl.style.display = 'none';
            render();
        } else {
            finish();
        }
    }

    function finish(){
        const percent = Math.round((score / order.length) * 100);
        let text = `Sonuç: Beni %${percent} seviyorsun 💞 (${score}/${order.length})`;
        if (percent === 100) {
            text += ' — bende seni seviyoğğmm 💖';
        } else {
            text += ' — beni sevmiyoğğğn üzdüğnn';
        }
        resultEl.textContent = text;
        resultEl.style.display = 'block';
        startEl.textContent = 'Baştan Yap';
        startEl.style.display = 'inline-block';
        nextEl.style.display = 'none';
        // küçük konfeti etkisi yerine kalp/gül yağmuru
        createHearts(20);
        createRoses(4);
    }

    startEl.addEventListener('click', start);
    nextEl.addEventListener('click', next);
}