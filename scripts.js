// ========== 1. Live Terminal/Console ==========
const terminal = document.getElementById('terminal');
const terminalInput = document.getElementById('terminal-input');
const terminalCommands = {
  help: "Available commands: about, projects, contact, resume, clear",
  about: "About: I am a passionate full-stack developer...",
  projects: "Projects: Portfolio Website, Chat App, Task Manager",
  contact: "Contact: johndoe@example.com",
  resume: "Resume: Type 'unlock resume' to access the encrypted resume.",
  clear: "",
  'unlock resume': "To unlock the resume, go to the Resume section below."
};
function terminalPrint(text) {
  terminal.innerHTML += text + '\n';
  terminal.scrollTop = terminal.scrollHeight;
}
terminalInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const cmd = terminalInput.value.trim().toLowerCase();
    terminalPrint('> ' + cmd);
    if (cmd === "clear") { terminal.innerHTML = ""; }
    else if (terminalCommands[cmd]) terminalPrint(terminalCommands[cmd]);
    else terminalPrint("Unknown command. Type 'help'.");
    terminalInput.value = '';
  }
});
terminalPrint("Welcome to the hacker terminal! Type 'help' to start.");

// ========== 2. Theme Toggle ==========
const themeBtn = document.getElementById('theme-toggle');
const themes = ['theme-green','theme-vaporwave','theme-night'];
let themeIdx = 0;
themeBtn.addEventListener('click', () => {
  themeIdx = (themeIdx + 1) % themes.length;
  document.body.className = themes[themeIdx] + (document.body.classList.contains('konami-active') ? ' konami-active' : '');
});

// ========== 3. Animated Avatar/Glitch Effect ==========
const avatar = document.getElementById('avatar');
const glitch = document.getElementById('avatar-glitch');
let glitchTimer = null;
function doGlitch() {
  glitch.style.opacity = '1';
  setTimeout(() => { glitch.style.opacity = '0'; }, 160 + Math.random()*120);
  glitchTimer = setTimeout(doGlitch, 1000 + Math.random()*1800);
}
doGlitch();

// ========== 4. 3D Parallax Effects ==========
document.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth) - 0.5;
  const y = (e.clientY / window.innerHeight) - 0.5;
  document.getElementById('header').style.transform = `translate(${x*22}px, ${y*16}px)`;
  document.querySelector('main').style.transform = `translate(${x*12}px, ${y*8}px)`;
});

// ========== 5. Project Cards with Hover Effects ==========
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => card.classList.toggle('expanded'));
});

// ========== 6. Real-time Stats ==========
let loc = 0, coffee = 0, contribs = 0;
function animateStats() {
  if (loc < 99999) { loc+=333; document.getElementById('loc').textContent = loc; }
  if (coffee < 378) { coffee+=2; document.getElementById('coffee').textContent = coffee; }
  if (contribs < 431) { contribs++; document.getElementById('github-contribs').textContent = contribs; }
  if (loc < 99999 || coffee < 378 || contribs < 431)
    setTimeout(animateStats, 24);
}
animateStats();

// ========== 7. Typewriter Intro Animation ==========
const typewriterEl = document.getElementById('typewriter');
const introText = "Hi, I'm John Doe - Creative Web Developer crafting interactive experiences";
let twIdx = 0;
function typeTypewriter() {
  if (twIdx <= introText.length) {
    typewriterEl.textContent = introText.slice(0, twIdx);
    document.querySelector('.cursor').style.display = '';
    document.getElementById('beep-sound').currentTime = 0;
    document.getElementById('beep-sound').play();
    twIdx++;
    setTimeout(typeTypewriter, 48 + Math.random()*40);
  } else {
    document.querySelector('.cursor').style.display = 'none';
  }
}
typeTypewriter();

// ========== 8. Hack-style Animations ==========
function randomPopup() {
  if (Math.random() < 0.02) {
    const msg = Math.random() > 0.5 ? "ACCESS GRANTED" : "ACCESS DENIED";
    const popup = document.createElement('div');
    popup.textContent = msg;
    popup.style.position = 'fixed';
    popup.style.left = (Math.random()*80+10) + 'vw';
    popup.style.top = (Math.random()*70+10) + 'vh';
    popup.style.background = '#222';
    popup.style.color = msg === "ACCESS GRANTED" ? '#00ff00' : '#ff0066';
    popup.style.fontSize = '1.4rem';
    popup.style.border = '2px solid #fff';
    popup.style.boxShadow = '0 0 32px #0f0';
    popup.style.padding = '8px 22px';
    popup.style.zIndex = 5000;
    popup.style.borderRadius = '14px';
    popup.style.opacity = '0.9';
    document.body.appendChild(popup);
    setTimeout(()=>popup.remove(), 1300);
  }
  setTimeout(randomPopup, 4000 + Math.random()*6000);
}
randomPopup();

// ========== 9. Downloadable Resume as Encrypted ZIP ==========
const resumeBtn = document.getElementById('download-resume');
const resumeUnlock = document.getElementById('resume-unlock');
resumeBtn.addEventListener('click', () => {
  resumeUnlock.style.display = 'block';
});
document.getElementById('resume-unlock-btn').addEventListener('click', () => {
  const code = document.getElementById('resume-code-input').value;
  const feedback = document.getElementById('resume-feedback');
  if (code.trim() === 'letmein') {
    feedback.textContent = "Unlocked! Downloading...";
    // Change the path to your actual encrypted ZIP file
    window.location.href = "assets/resume-encrypted.zip";
    setTimeout(()=>{ resumeUnlock.style.display='none'; feedback.textContent=''; }, 1600);
  } else {
    feedback.textContent = "Incorrect code.";
  }
});

// ========== 10. Easter Eggs: Konami Code ==========
const konami = [38,38,40,40,37,39,37,39,66,65];
let konamiIdx = 0;
document.addEventListener('keydown', e => {
  if (e.keyCode === konami[konamiIdx]) {
    konamiIdx++;
    if (konamiIdx === konami.length) {
      document.body.classList.add('konami-active');
      showBadge("Konami Finder");
      setTimeout(()=>{ document.body.classList.remove('konami-active'); },4000);
      konamiIdx = 0;
    }
  } else {
    konamiIdx = 0;
  }
});

// ========== 11. Achievements/Badges Section ==========
const badges = [];
function showBadge(name) {
  if (badges.includes(name)) return;
  badges.push(name);
  const badge = document.createElement('div');
  badge.className = 'badge';
  badge.textContent = name;
  document.getElementById('badges').appendChild(badge);
}
setTimeout(()=>showBadge('Portfolio Explorer'), 2000);

// ========== 12. API Integration: GitHub ==========
async function fetchGitHubContribs() {
  // Change 'your-github-username' to your actual username
  const username = 'your-github-username';
  try {
    let resp = await fetch(`https://api.github.com/users/${username}`);
    if (resp.ok) {
      let data = await resp.json();
      document.getElementById('github-contribs').textContent = data.public_repos;
    }
  } catch(e) {}
}
fetchGitHubContribs();

// ========== 13. Contact Form with Encryption Animation ==========
document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  const anim = document.getElementById('encryption-animation');
  let dots = '';
  anim.textContent = 'Encrypting your message';
  let interval = setInterval(() => {
    dots += '.';
    anim.textContent = 'Encrypting your message' + dots;
    if (dots.length > 5) dots = '';
  }, 200);
  setTimeout(() => {
    clearInterval(interval);
    anim.textContent = "Message encrypted and sent!";
    showBadge("Contacted!");
    setTimeout(()=>anim.textContent='', 2000);
  }, 2200);
});

// ========== 14. Neon Animated Navigation Menu (Already handled in CSS) ==========

// ========== 15. Hacker Music Toggle & Visualizer ==========
const music = document.getElementById('access-music');
const musicToggle = document.getElementById('music-toggle');
musicToggle.addEventListener('click', () => {
  if (music.paused) { music.play(); musicToggle.textContent = '🔊'; }
  else { music.pause(); musicToggle.textContent = '🔈'; }
});
musicToggle.textContent = music.paused ? '🔈' : '🔊';

const vis = document.getElementById('music-visualizer');
const visCtx = vis.getContext('2d');
let audioCtx, analyser, source, dataArray;
function setupVisualizer() {
  vis.width = 400; vis.height = 40;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  analyser = audioCtx.createAnalyser();
  source = audioCtx.createMediaElementSource(music);
  source.connect(analyser);
  analyser.connect(audioCtx.destination);
  dataArray = new Uint8Array(analyser.frequencyBinCount);
  drawVisualizer();
}
function drawVisualizer() {
  visCtx.clearRect(0,0,vis.width,vis.height);
  analyser.getByteFrequencyData(dataArray);
  for(let i=0;i<60;i++) {
    const bar = dataArray[i]/2;
    visCtx.fillStyle = `hsl(${i*6},100%,60%)`;
    visCtx.fillRect(i*6, vis.height-bar, 5, bar);
  }
  requestAnimationFrame(drawVisualizer);
}
music.addEventListener('play', () => {
  if (!audioCtx) setupVisualizer();
  audioCtx.resume();
});
music.addEventListener('pause', () => {
  if (audioCtx) audioCtx.suspend();
});

// ========== Matrix Rain Background ==========
const canvas = document.getElementById('rain-canvas');
const ctx = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;
let fontSize = 18;
let columns = Math.floor(width / fontSize);
let drops = [];
function resizeCanvas() {
  width = window.innerWidth; height = window.innerHeight;
  canvas.width = width; canvas.height = height;
  columns = Math.floor(width / fontSize);
  drops = [];
  for(let i=0; i<columns; i++) drops[i] = Math.random() * height / fontSize | 0;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
function drawMatrixRain() {
  ctx.fillStyle = "rgba(0,0,0,0.13)";
  ctx.fillRect(0,0, width, height);
  ctx.font = fontSize + "px 'Share Tech Mono', monospace";
  for(let i=0; i<columns; i++) {
    let text = String.fromCharCode(0x30A0 + Math.random()*96);
    ctx.fillStyle = "var(--main-fg)";
    ctx.shadowColor = 'var(--main-fg)';
    ctx.shadowBlur = 12;
    ctx.fillText(text, i*fontSize, drops[i]*fontSize);
    ctx.shadowBlur = 0;
    if(Math.random() > 0.96) drops[i]=0;
    drops[i]++;
  }
  requestAnimationFrame(drawMatrixRain);
}
drawMatrixRain();