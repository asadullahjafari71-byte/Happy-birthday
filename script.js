let isMusicPlaying = false;
const bgMusic = document.getElementById('bgMusic');
const arezoSong = document.getElementById('arezoSong');
const paperSfx = document.getElementById('paperSfx');

const openedGifts = new Set();

function handleFirstUserInteraction() {
  if (!isMusicPlaying && bgMusic) {
    bgMusic.play().then(() => {
      isMusicPlaying = true;
      const musicBtn = document.getElementById('musicBtn');
      if (musicBtn) musicBtn.innerText = '⏸️ Pause Song';
    }).catch(() => {});
  }
  document.removeEventListener('click', handleFirstUserInteraction);
  document.removeEventListener('touchstart', handleFirstUserInteraction);
}

document.addEventListener('click', handleFirstUserInteraction);
document.addEventListener('touchstart', handleFirstUserInteraction);

function nextPage(pageNumber) {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });

  const wrapper = document.getElementById('innerContainerWrapper');
  
  if (pageNumber >= 3 && pageNumber <= 5) {
    if (wrapper) wrapper.style.display = 'flex';
  } else {
    if (wrapper) wrapper.style.display = 'none';
  }

  const nextPageEl = document.getElementById(`page${pageNumber}`);
  if (nextPageEl) {
    nextPageEl.classList.add('active');
  }

  if (pageNumber === 2) {
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }, 5000);
  }

  if (pageNumber === 5) {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 }
    });
  }
}

function toggleMusic() {
  const musicBtn = document.getElementById('musicBtn');
  if (!isMusicPlaying) {
    if (arezoSong && !arezoSong.paused) {
      arezoSong.pause();
    }
    bgMusic.play().then(() => {
      isMusicPlaying = true;
      musicBtn.innerText = '⏸️ Pause Song';
    }).catch(() => {});
  } else {
    bgMusic.pause();
    isMusicPlaying = false;
    musicBtn.innerText = '🎵 Play Song';
  }
}

/* ================= TYPEWRITER LETTER LOGIC ================= */
const letterParagraphs = [
  "Happy Birthday, Arezo! ✨",
  "We didn't really get to talk much when we were coworkers. I think part of that was because I always felt that work probably wasn't the best place to make things complicated.",
  "But even from those little moments, there were a few things I noticed about you.",
  "Your <strong>kind heart</strong>.<br>Your <strong>beautiful smile</strong>.<br>And those <strong>dark brown eyes</strong> that are surprisingly hard not to notice.",
  "Maybe we didn't get as many conversations as we could have, but I'm still glad our paths crossed.",
  "So today, I just wanted to wish you a genuinely happy birthday.",
  "I hope this next year brings you good people, good memories, new experiences, and plenty of reasons to smile.",
  "You deserve a really good year.",
  "<span class='letter-signature'>— Assadullah</span>"
];

let hasTypewriterStarted = false;

function openEnvelope() {
  const envelopeWrapper = document.getElementById('envelopeWrapper');
  const letterCard = document.getElementById('letterCard');

  if (envelopeWrapper) envelopeWrapper.classList.add('open');

  if (paperSfx) {
    paperSfx.volume = 0.5;
    paperSfx.currentTime = 0;
    paperSfx.play().catch(() => {});
    setTimeout(() => {
      paperSfx.pause();
      paperSfx.currentTime = 0;
    }, 300);
  }

  setTimeout(() => {
    if (envelopeWrapper) envelopeWrapper.style.display = 'none';
    if (letterCard) {
      letterCard.style.display = 'block';
      if (!hasTypewriterStarted) {
        hasTypewriterStarted = true;
        startTypewriter();
      }
    }
  }, 600);
}

function startTypewriter() {
  const container = document.getElementById('typewriterContainer');
  const celebrateBtn = document.getElementById('celebrateBtn');
  let pIndex = 0;

  function typeParagraph() {
    if (pIndex >= letterParagraphs.length) {
      if (celebrateBtn) {
        celebrateBtn.style.display = 'inline-block';
        celebrateBtn.style.animation = 'fadeIn 0.8s ease forwards';
      }
      return;
    }

    const p = document.createElement('p');
    p.className = 'typewriter-p';
    container.appendChild(p);

    const htmlContent = letterParagraphs[pIndex];
    let i = 0;
    
    function typeChar() {
      if (htmlContent[i] === '<') {
        const closingIndex = htmlContent.indexOf('>', i);
        if (closingIndex !== -1) {
          i = closingIndex + 1;
        }
      } else {
        i++;
      }

      p.innerHTML = htmlContent.slice(0, i) + '<span class="typewriter-cursor">|</span>';

      if (i < htmlContent.length) {
        setTimeout(typeChar, 30);
      } else {
        p.innerHTML = htmlContent;
        pIndex++;
        setTimeout(typeParagraph, 400);
      }
    }

    typeChar();
  }

  typeParagraph();
}

function checkAllGiftsOpened() {
  if (openedGifts.size === 3) {
    const finalBtn = document.getElementById('finalMsgBtn');
    if (finalBtn) {
      finalBtn.disabled = false;
      finalBtn.classList.remove('disabled-btn');
    }
  }
}

/* ================= GIFT BOX 1: SONG ================= */
function openGift1(element) {
  if (openedGifts.has(1)) return;
  openedGifts.add(1);

  if (bgMusic) {
    bgMusic.pause();
    isMusicPlaying = false;
    const musicBtn = document.getElementById('musicBtn');
    if (musicBtn) musicBtn.innerText = '🎵 Play Song';
  }

  if (arezoSong) {
    arezoSong.currentTime = 0;
    arezoSong.play().catch(() => {});
  }

  element.innerHTML = `
    <div class="gift-icon">🎵</div>
    <strong style="color: var(--primary); font-size: 0.9rem;">Arezo's Song</strong>
    <p style="font-size: 0.75rem; color: #555; margin-top: 5px;">Playing a special track just for you!</p>
  `;
  element.style.borderColor = 'var(--primary)';
  element.style.background = '#fff0f3';

  confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
  checkAllGiftsOpened();
}

/* ================= GIFT BOX 2: QUIZ WITH FORMSPREE ================= */
const quizQuestions = [
  {
    question: "1. Where would you like to celebrate your birthday?",
    options: [
      "🌳 Outdoor restaurant",
      "👥 Anywhere with friends",
      "🏠 At home with family"
    ]
  },
  {
    question: "2. What is your ideal birthday activity?",
    options: [
      "😴 Doing nothing, just sleep",
      "🧺 Go somewhere for picnic",
      "🎉 Hang out with friends"
    ]
  },
  {
    question: "3. What type of birthday cake is your favorite?",
    options: [
      "🍫 Chocolate cake",
      "🍦 Vanilla cake",
      "🍓 Strawberry cake"
    ]
  }
];

let currentQuizIndex = 0;
const userAnswers = [];

function openGift2(element) {
  if (!openedGifts.has(2)) {
    openedGifts.add(2);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    checkAllGiftsOpened();
  }
  renderQuiz(element);
}

function renderQuiz(container) {
  if (currentQuizIndex < quizQuestions.length) {
    const q = quizQuestions[currentQuizIndex];
    let optionsHTML = q.options.map(opt => {
      const escapedOpt = opt.replace(/'/g, "\\'");
      return `<button class="quiz-opt-btn" onclick="answerQuiz(event, '${escapedOpt}')">${opt}</button>`;
    }).join('');

    const customInputHTML = `
      <div style="margin-top: 8px; display: flex; gap: 4px;" onclick="event.stopPropagation();">
        <input type="text" id="customQuizInput" placeholder="✍️ Write your own option..." 
          onclick="event.stopPropagation();" 
          ontouchstart="event.stopPropagation();" 
          style="flex: 1; padding: 6px 8px; font-size: 0.8rem; border: 1px solid var(--accent); border-radius: 8px; outline: none; background: #ffffff; color: #000000;">
        <button class="quiz-opt-btn" style="text-align: center; font-weight: 600;" onclick="submitCustomAnswer(event)">Submit</button>
      </div>
    `;

    container.innerHTML = `
      <div class="quiz-container">
        <p class="quiz-question">${q.question}</p>
        <div class="quiz-options">${optionsHTML}</div>
        ${customInputHTML}
      </div>
    `;
    container.style.borderColor = 'var(--primary)';
    container.style.background = '#fff0f3';
  } else {
    submitQuizAnswers();

    container.innerHTML = `
      <div class="gift-icon">✨</div>
      <strong style="color: var(--primary); font-size: 0.9rem;">Quiz Completed!</strong>
      <p style="font-size: 0.75rem; color: #555; margin-top: 5px;">Hope all your birthday wishes come true!</p>
    `;
  }
}

function answerQuiz(event, selectedOption) {
  event.stopPropagation();

  userAnswers.push({
    question: quizQuestions[currentQuizIndex].question,
    answer: selectedOption
  });

  currentQuizIndex++;
  const gift2Card = document.getElementById('gift2');
  renderQuiz(gift2Card);
}

function submitCustomAnswer(event) {
  event.stopPropagation();
  
  const inputEl = document.getElementById('customQuizInput');
  if (!inputEl) return;

  const customVal = inputEl.value.trim();
  if (!customVal) return;

  userAnswers.push({
    question: quizQuestions[currentQuizIndex].question,
    answer: customVal
  });

  currentQuizIndex++;
  const gift2Card = document.getElementById('gift2');
  renderQuiz(gift2Card);
}

function submitQuizAnswers() {
  const formspreeEndpoint = "https://formspree.io/f/xoeqoejb";

  fetch(formspreeEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      quiz_answers: userAnswers
    })
  })
  .then(response => {
    if (response.ok) {
      console.log("Answers delivered!");
    }
  })
  .catch(error => {
    console.error("Error sending answers:", error);
  });
}

/* ================= GIFT BOX 3: FLOATING FLIP CARD ================= */
function openGift3(element) {
  if (openedGifts.has(3)) return;
  openedGifts.add(3);

  element.innerHTML = `
    <div class="flip-card-container" onclick="flipCard(event)">
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <p>some people make ordinary days a little nicer without even trying.</p>
          <span class="tap-hint">👆 Click / Tap to Flip</span>
        </div>
        <div class="flip-card-back">
          <p>you're one of those people</p>
          <span class="tap-hint">✨</span>
        </div>
      </div>
    </div>
  `;
  element.style.borderColor = 'var(--primary)';
  element.style.background = '#fff0f3';

  confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
  checkAllGiftsOpened();
}

function flipCard(event) {
  event.stopPropagation();
  const cardInner = event.currentTarget.querySelector('.flip-card-inner');
  if (cardInner) {
    cardInner.classList.toggle('is-flipped');
  }
}