// ========== Adaptive Theme ==========
function setSystemTheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.className = 'theme-night';
  } else {
    document.body.className = 'theme-green';
  }
}
setSystemTheme();

const surpriseBtn = document.createElement('button');
surpriseBtn.textContent = "🎲";
surpriseBtn.title = "Surprise Me!";
document.querySelector('nav#nav ul').appendChild(surpriseBtn);

const allThemes = ['theme-green', 'theme-vaporwave', 'theme-night'];
surpriseBtn.onclick = () => {
  const idx = Math.floor(Math.random() * allThemes.length);
  document.body.className = allThemes[idx];
};

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
    ctx.fillStyle = "#00ff00";
    ctx.shadowColor = '#00ff00';
    ctx.shadowBlur = 12;
    ctx.fillText(text, i*fontSize, drops[i]*fontSize);
    ctx.shadowBlur = 0;
    if(Math.random() > 0.96) drops[i]=0;
    drops[i]++;
  }
  requestAnimationFrame(drawMatrixRain);
}
drawMatrixRain();

// ========== Animated Avatar/Glitch Effect ==========
const avatar = document.getElementById('avatar');
const glitch = document.getElementById('avatar-glitch');
function doGlitch() {
  glitch.style.opacity = '1';
  setTimeout(() => { glitch.style.opacity = '0'; }, 160 + Math.random()*120);
  setTimeout(doGlitch, 1000 + Math.random()*1800);
}
doGlitch();

// ========== Parallax Effects ==========
document.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth) - 0.5;
  const y = (e.clientY / window.innerHeight) - 0.5;
  document.getElementById('header').style.transform = `translate(${x*22}px, ${y*16}px)`;
  document.querySelector('main').style.transform = `translate(${x*12}px, ${y*8}px)`;
});

// ========== Music Toggle & Visualizer ==========
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

// ========== Project Cards with Hover Effects & Achievements ==========
let hoveredProjects = new Set();
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    hoveredProjects.add(card);
    if (hoveredProjects.size === 3) {
      showBadge && showBadge("All Projects Explored");
      popupAchievement("You explored all projects!");
    }
  });
  card.addEventListener('click', () => card.classList.toggle('expanded'));
});

// ========== Animated Skill Bars ==========
setTimeout(() => {
  document.querySelectorAll('.progress-bar-fill').forEach(bar => {
    bar.style.width = bar.getAttribute('data-width');
  });
}, 800);

// ========== Real-time Stats ==========
let loc = 0, coffee = 0, contribs = 0;
function animateStats() {
  if (loc < 99999) { loc+=333; document.getElementById('loc').textContent = loc; }
  if (coffee < 378) { coffee+=2; document.getElementById('coffee').textContent = coffee; }
  if (contribs < 431) { contribs++; document.getElementById('github-contribs').textContent = contribs; }
  if (loc < 99999 || coffee < 378 || contribs < 431)
    setTimeout(animateStats, 24);
}
animateStats();

// ========== Typewriter Intro Animation ==========
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

// ========== Terminal/Console Implementation ==========
// Terminal state
let terminalHistory = [];
let historyIndex = -1;
let userHandle = 'guest';
let guessingGameActive = false;
let passcode = '';
let guessAttempts = 0;
let chatMode = false;

// Terminal commands
const terminal = document.getElementById('terminal');
const terminalInput = document.getElementById('terminal-input');
const terminalCommands = {
  help: function() {
    return "Available commands: about, projects, contact, resume, clear, guess, setname [name], chat, weather, source";
  },
  about: function() { return "About: I am a passionate full-stack developer..."; },
  projects: function() { return "Projects: Portfolio Website, Chat App, Task Manager"; },
  contact: function() { return "Contact: johndoe@example.com"; },
  resume: function() { return "Resume: Type 'unlock resume' to access the encrypted resume."; },
  clear: function() { terminal.innerHTML = ""; return ""; },
  // Mini-game
  guess: function() {
    if (guessingGameActive) return "Game already in progress!";
    passcode = (Math.floor(1000 + Math.random() * 9000)).toString();
    guessAttempts = 0;
    guessingGameActive = true;
    return "Mini-game started! Guess the 4-digit passcode. Type your guess.";
  },
  // Custom prompt
  setname: function(args) {
    if (!args) return "Usage: setname [yourname]";
    userHandle = args;
    return `Handle set to ${userHandle}`;
  },
  // AI Chatbot
  chat: function(args) {
    if (!args) {
      chatMode = true;
      return "Chatbot activated. Ask a question (e.g., 'chat What is your experience?'). Type 'exit' to leave chat mode.";
    }
    const faqs = {
      "what is your experience": "I have 3+ years of web development experience with a focus on full-stack JavaScript.",
      "skills": "HTML, CSS, JavaScript, Node.js, React, and more.",
      "education": "B.Tech in Computer Science from ABC University.",
      "projects": "Portfolio Website, Chat App, Task Manager.",
      "contact": "You can email me at johndoe@example.com."
    };
    if (args.trim().toLowerCase() === 'exit') {
      chatMode = false;
      return "Chatbot session ended.";
    }
    let response = faqs[args.trim().toLowerCase()];
    return response || "Sorry, I don't understand that question. Try: 'skills', 'projects', 'education', 'contact'.";
  },
  // Weather (async)
  weather: async function() {
    terminalPrint("Getting your location...");
    try {
      const locResp = await fetch('https://ipapi.co/json/');
      const locData = await locResp.json();
      const city = locData.city || "your city";
      const weatherResp = await fetch(`https://wttr.in/${city}?format=3`);
      const weatherText = await weatherResp.text();
      terminalPrint(`Location: ${city}, ${locData.region}, ${locData.country_name}`);
      terminalPrint(`Weather: ${weatherText}`);
    } catch (e) {
      terminalPrint("Could not fetch weather info.");
    }
    return "";
  },
  // Downloadable Source
  source: function() {
    return "Download my portfolio source: https://github.com/Divyanshu5520/hacker-portfolio";
  }
};
function getPrompt() {
  return `${userHandle}@portfolio:~$ `;
}
function terminalPrint(text) {
  if (text !== "") terminal.innerHTML += text + '\n';
  terminal.scrollTop = terminal.scrollHeight;
}

// Terminal input, history, autocomplete, mini-games, chat, async
terminalInput.addEventListener('keydown', async function(e) {
  if (e.key === 'ArrowUp') {
    if (terminalHistory.length && historyIndex > 0) {
      historyIndex--;
      terminalInput.value = terminalHistory[historyIndex];
    }
    e.preventDefault();
  } else if (e.key === 'ArrowDown') {
    if (terminalHistory.length && historyIndex < terminalHistory.length - 1) {
      historyIndex++;
      terminalInput.value = terminalHistory[historyIndex];
    } else {
      terminalInput.value = '';
    }
    e.preventDefault();
  } else if (e.key === 'Tab') {
    // Autocomplete
    const current = terminalInput.value.trim();
    const matches = Object.keys(terminalCommands).filter(cmd => cmd.startsWith(current));
    if (matches.length === 1) {
      terminalInput.value = matches[0];
    } else if (matches.length > 1) {
      terminalPrint('Possible commands: ' + matches.join(', '));
    }
    e.preventDefault();
  } else if (e.key === 'Enter') {
    const value = terminalInput.value.trim();
    if (value) {
      terminalHistory.push(value);
      historyIndex = terminalHistory.length;
      terminalPrint(getPrompt() + value);

      // Guess mini-game
      if (guessingGameActive) {
        guessAttempts++;
        if (value === passcode) {
          guessingGameActive = false;
          showBadge && showBadge("Passcode Cracker");
          terminalPrint(`Correct! Passcode was ${passcode}. Attempts: ${guessAttempts}`);
        } else if (value.match(/^\d{4}$/)) {
          terminalPrint(value < passcode ? "Too low." : "Too high.");
        } else {
          terminalPrint("Enter a 4-digit number.");
        }
        terminalInput.value = '';
        return;
      }

      // Chat mode
      if (chatMode || value.startsWith('chat')) {
        let question = value.startsWith('chat') ? value.slice(4).trim() : value;
        let answer = terminalCommands['chat'](question);
        if (answer.includes('ended')) chatMode = false;
        else chatMode = true;
        terminalPrint(answer);
        terminalInput.value = '';
        return;
      }

      // Async weather
      if (value === "weather") {
        await terminalCommands["weather"]();
        terminalInput.value = '';
        return;
      }
      
      // Handle setname with argument
      if (value.startsWith('setname')) {
        const args = value.split(' ').slice(1).join(' ');
        terminalPrint(terminalCommands['setname'](args));
        terminalInput.value = '';
        return;
      }

      // Other commands
      const cmdFn = terminalCommands[value];
      if (typeof cmdFn === "function") {
        terminalPrint(cmdFn());
      } else {
        terminalPrint("Unknown command. Type 'help'.");
      }
    }
    terminalInput.value = '';
  }
});
terminalPrint("Welcome to the hacker terminal! Type 'help' to start.");

// ========== Animated Loading “Logs” ==========
window.addEventListener('DOMContentLoaded', () => {
  const logs = [
    "Injecting backdoor...",
    "Bypassing 2FA...",
    "Spoofing MAC address...",
    "Decrypting credentials...",
    "Access granted. Loading system...",
  ];
  let idx = 0;
  function showLog() {
    if (idx < logs.length) {
      terminalPrint(logs[idx]);
      idx++;
      setTimeout(showLog, 500);
    }
  }
  showLog();
});

// ========== Downloadable Resume as Encrypted ZIP ==========
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
    window.location.href = "assets/resume-encrypted.zip";
    setTimeout(()=>{ resumeUnlock.style.display='none'; feedback.textContent=''; }, 1600);
  } else {
    feedback.textContent = "Incorrect code.";
  }
});

// ========== Achievements/Badges Section ==========
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

// ========== API Integration: GitHub ==========
async function fetchGitHubContribs() {
  // Change 'your-github-username' to your actual username
  const username = 'Divyanshu5520';
  try {
    let resp = await fetch(`https://api.github.com/users/${username}`);
    if (resp.ok) {
      let data = await resp.json();
      document.getElementById('github-contribs').textContent = data.public_repos;
    }
  } catch(e) {}
}
fetchGitHubContribs();

// ========== Contact Form with Encryption Animation ==========
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

// ========== Konami Code Easter Egg ==========
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

// ========== Achievement Popups ==========
function popupAchievement(text) {
  const el = document.createElement('div');
  el.textContent = text;
  el.style.position = 'fixed';
  el.style.bottom = '40px';
  el.style.left = '50%';
  el.style.transform = 'translateX(-50%)';
  el.style.background = '#00ff99';
  el.style.color = '#222';
  el.style.fontWeight = 'bold';
  el.style.borderRadius = '12px';
  el.style.padding = '14px 30px';
  el.style.boxShadow = '0 0 40px #00ff99';
  el.style.zIndex = 9999;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2200);
}

// ========== QR Code Generation with Glitch ==========
const qr = new QRious({
  element: document.getElementById('qr-canvas'),
  value: 'mailto:johndoe@example.com',
  size: 120,
  background: '#101010',
  foreground: '#00ff99'
});

// ========== Interactive Graph/Charts (Skill Chart) ==========
function drawSkillChart() {
  const container = document.getElementById("skill-chart");
  const canvas = document.createElement("canvas");
  canvas.width = 360; canvas.height = 120;
  container.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  const skills = [
    {name: "HTML", value: 90, color: "#00ff99"},
    {name: "CSS", value: 85, color: "#00c3ff"},
    {name: "JS", value: 80, color: "#ffe066"}
  ];
  skills.forEach((s, i) => {
    ctx.fillStyle = s.color;
    ctx.fillRect(40 + i*100, 110-s.value, 40, s.value);
    ctx.font = "15px Share Tech Mono";
    ctx.fillStyle = "#fff";
    ctx.fillText(s.name, 40 + i*100, 115);
    ctx.fillText(s.value + "%", 40 + i*100, 110-s.value-5);
  });
}
drawSkillChart();

// ========== User Progress Save ==========
function saveProgress() {
  localStorage.setItem('achievements', JSON.stringify(badges));
}
function loadProgress() {
  const loaded = JSON.parse(localStorage.getItem('achievements') || '[]');
  loaded.forEach(b => showBadge(b));
}
window.addEventListener('beforeunload', saveProgress);
window.addEventListener('DOMContentLoaded', loadProgress);

// ========== Accessibility Enhancements ==========
document.querySelectorAll('nav a, nav button, .project-card, #download-resume, #resume-unlock-btn, #contact-form button').forEach(el => {
  el.setAttribute('tabindex', '0');
});
document.getElementById('terminal-input').setAttribute('aria-label', 'Terminal input, type commands here');
document.querySelectorAll('section').forEach(section => {
  section.setAttribute('role', 'region');
});

// ========== Glitch/Scramble Text Animations for Section Headers ==========
document.querySelectorAll('.glitch-title').forEach(el => {
  el.addEventListener('mouseenter', () => {
    el.style.animation = "none";
    // Scramble text effect
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*";
    let orig = el.textContent;
    let scramble = [];
    for (let i = 0; i < orig.length; i++) {
      scramble.push(chars[Math.floor(Math.random()*chars.length)]);
    }
    let steps = 0;
    function scrambleStep() {
      el.textContent = scramble.join('');
      steps++;
      if (steps < 8) {
        for (let i = 0; i < orig.length; i++) {
          if (Math.random() > 0.5) scramble[i] = orig[i];
        }
        setTimeout(scrambleStep, 30);
      } else {
        el.textContent = orig;
        el.style.animation = "";
      }
    }
    scrambleStep();
  });
});