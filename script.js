// Sidebar and Theming
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('open');
}
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  if (currentTheme === "light") {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'dark');
    document.getElementById("themeToggleBtn").innerHTML = "🌙 Toggle Theme";
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    document.getElementById("themeToggleBtn").innerHTML = "☀️ Toggle Theme";
  }
}
// Persist theme on reload
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('theme') === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    document.getElementById("themeToggleBtn").innerHTML = "☀️ Toggle Theme";
  }
});

/* Chatbot */
const jokes = [
  "Why don't scientists trust atoms? Because they make up everything!",
  "Why did the computer go to the doctor? It had a virus!",
  "Why do programmers prefer dark mode? Because light attracts bugs!",
  "Why did the programmer quit his job? Because he didn't get arrays!",
  "Why do Java developers wear glasses? Because they don't see sharp!",
  "How do you comfort a JavaScript bug? You console it!",
  "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings.",
  "Why did the developer go broke? Because he used up all his cache!",
  "What is a programmer's favorite hangout place? Foo Bar!",
  "Why do programmers hate nature? It has too many bugs!",
  "How many programmers does it take to change a light bulb? None, that's a hardware problem!",
  "Why do Python programmers prefer the command line? Because they can't stand indentation errors!",
];
const funFacts = [
  "Did you know that honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old!",
  "A day on Venus is longer than a year on Venus!",
  "Bananas are berries, but strawberries aren't!",
];
function toggleChat() {
  const chatContainer = document.getElementById("chat-container");
  chatContainer.style.display = (chatContainer.style.display === "none" || chatContainer.style.display === "") ? "flex" : "none";
}
document.getElementById("userInput").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});
function sendMessage() {
  const userInput = document.getElementById("userInput");
  const userMessage = userInput.value.trim();
  if (userMessage === "") return;
  displayMessage(userMessage, "user-message");
  userInput.value = "";
  const botResponse = getBotResponse(userMessage);
  displayAutoWritingMessage(botResponse, "bot-message");
}
function displayMessage(message, className) {
  const chatbox = document.getElementById("chatbox");
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${className}`;
  messageDiv.textContent = message;
  chatbox.appendChild(messageDiv);
  chatbox.scrollTop = chatbox.scrollHeight;
}
function displayAutoWritingMessage(message, className) {
  const chatbox = document.getElementById("chatbox");
  const messageDiv = document.createElement("div");
  const typingIndicator = document.getElementById("typing-indicator");
  messageDiv.className = `message ${className}`;
  chatbox.appendChild(messageDiv);
  typingIndicator.style.display = "block";
  setTimeout(() => {
    typingIndicator.style.display = "none";
    let i = 0;
    function typeWriter() {
      if (i < message.length) {
        messageDiv.textContent += message.charAt(i);
        i++;
        setTimeout(typeWriter, 42);
      }
    }
    typeWriter();
    chatbox.scrollTop = chatbox.scrollHeight;
  }, 650);
}
function getBotResponse(input) {
  const lowerInput = input.toLowerCase();
  const currentHour = new Date().getHours();
  let greeting;
  if (currentHour < 12) {
    greeting = "Good morning!";
  } else if (currentHour < 18) {
    greeting = "Good afternoon!";
  } else {
    greeting = "Good evening!";
  }
  if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
    return `${greeting} How can I assist you?`;
  } else if (lowerInput.includes("bye")) {
    return "Goodbye! Take care, and see you soon!";
  } else if (lowerInput.includes("how are you")) {
    return "I'm just a bunch of code, but I'm functioning smoothly. Thanks for asking!";
  } else if (lowerInput.includes("tell me a joke")) {
    return jokes[Math.floor(Math.random() * jokes.length)];
  } else if (lowerInput.includes("fun fact")) {
    return funFacts[Math.floor(Math.random() * funFacts.length)];
  } else if (lowerInput.includes("help")) {
    return "You can ask me for a joke, fun fact, or just say hello! Want to know something about coding?";
  }
  return "I'm sorry, I didn't understand that. Can you ask something else?";
}
function sendQuickReply(message) {
  displayMessage(message, "user-message");
  const botResponse = getBotResponse(message);
  displayAutoWritingMessage(botResponse, "bot-message");
}

/* Contact/About show/hide - mobile friendly animation */
const ContactLink = document.getElementById('ContactLink');
const ContactDiv = document.getElementById('ContactDiv');
ContactLink.addEventListener('click', function(event) {
  event.preventDefault();
  ContactDiv.classList.toggle('visible');
  ContactDiv.classList.toggle('hidden');
  // hide sidebar on mobile
  document.getElementById('sidebar').classList.remove('open');
});
// About section show/hide
const aboutLink = document.getElementById('aboutLink');
const aboutDiv = document.getElementById('aboutDiv');
aboutLink.addEventListener('click', function(event) {
  event.preventDefault();
  aboutDiv.classList.toggle('visible');
  aboutDiv.classList.toggle('hidden');
  document.getElementById('sidebar').classList.remove('open');
});

/* Magic Door, Gateman & Book Animation */
let userName = "";
let doorsOpened = false;
const questions = [
  { question: "तुम कौन हो? तुम यहाँ क्यों आये हो??", answer: "" },
  { question: "{name}, तुम यहाँ क्यों आये हो?", answer: "FOR READING THE BOOK" },
  { question: " ठीक है,{name}, लेकिन तुमको किताब पढ़ने के लिए एक पहेली सुलझानी होगी", answer: "OK" },
  { question: "{name}, एक ऐसी किताब है जिसे खोल कर पढ़ो तो आपको सब कुछ समझ आ जाता है, पर जब बंद करते हो तो सब भूल जाते हो। वो क्या है?", answer: "Dreams" }
];
let currentQuestionIndex = 0;
const questionElement = document.getElementById("question");
function displayQuestion() {
  let questionText = questions[currentQuestionIndex].question.replace("{name}", userName);
  let i = 0;
  questionElement.textContent = "";
  function typeWriter() {
    if (i < questionText.length) {
      questionElement.textContent += questionText.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  }
  typeWriter();
}
function openDoors() {
  const doorContainer = document.querySelector('.door-container');
  const leftDoor = document.querySelector('.left-door');
  const rightDoor = document.querySelector('.right-door');
  leftDoor.classList.add('open-left');
  rightDoor.classList.add('open-right');
  doorContainer.classList.add('opened');
  doorsOpened = true;
}
function checkAnswer() {
  const userAnswer = document.getElementById("answer").value.trim();
  const messageElement = document.getElementById("message");
  if (currentQuestionIndex === 0) {
    userName = userAnswer;
    currentQuestionIndex++;
    document.getElementById("answer").value = "";
    displayQuestion();
    return;
  }
  if (currentQuestionIndex === questions.length - 1) {
    if (userAnswer.toLowerCase() === questions[currentQuestionIndex].answer.toLowerCase()) {
      messageElement.style.color = "green";
      messageElement.textContent = "Correct answer. Access Granted!";
      setTimeout(() => {
        openDoors();
        document.querySelector('.login-container').style.display = 'none';
      }, 500);
    } else {
      messageElement.style.color = "red";
      messageElement.textContent = "Incorrect answer. Access Denied!";
    }
  } else {
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      currentQuestionIndex++;
      document.getElementById("answer").value = "";
      displayQuestion();
      messageElement.textContent = "";
    } else {
      messageElement.style.color = "red";
      messageElement.textContent = "Incorrect answer. Try again!";
    }
  }
}
document.getElementById("gateman").addEventListener("click", () => {
  if (!doorsOpened) {
    document.getElementById("loginForm").style.display = 'block';
    displayQuestion();
  }
});
document.getElementById("doorContent").addEventListener("click", () => {
  if (doorsOpened) {
    const flashEffect = document.getElementById("flashEffect");
    const hiddenContent = document.getElementById("hiddenContent");
    flashEffect.style.opacity = "1";
    setTimeout(() => {
      flashEffect.style.opacity = "0";
      document.querySelector('.door-container').style.display = 'none';
      hiddenContent.classList.add("expanded");
    }, 500);
  }
});
const coverleft1 = document.getElementById('coverleft1');
const Img = document.getElementById('Img');
coverleft1.addEventListener('click', function(event) {
  event.preventDefault();
  if (!Img.classList.contains('visible')) {
    Img.classList.remove('hidden');
    setTimeout(() => Img.classList.add('visible'), 10);
  }
});

/* Flipbook Animation */
document.addEventListener("DOMContentLoaded", function() {
  new FlipBook(document.getElementById("flipbook"));
});
class FlipBook {
  constructor(bookElem) {
    this.elems = {
      book: bookElem,
      leaves: bookElem.querySelectorAll(".leaf")
    };
    this.currentPagePosition = 0;
    this.setupEvents();
    this.turnPage(0);
  }
  setPagePosition(page, position, index) {
    let transform = `translate3d(0,0,${(position < 0 ? 1 : -1) * Math.abs(index)}px)`;
    if (position < 0) {
      transform += " rotate3d(0, 1, 0, -180deg)";
      page.classList.add("turned");
    } else {
      page.classList.remove("turned");
    }
    page.style.transform = transform;
  }
  turnPage(delta) {
    this.currentPagePosition += delta;
    if (this.currentPagePosition < 0) {
      this.currentPagePosition = 0;
      return;
    }
    if (this.currentPagePosition > this.elems.leaves.length) {
      this.currentPagePosition = this.elems.leaves.length;
      return;
    }
    this.elems.leaves.forEach((page, index) => {
      const pageNumber = index;
      this.setPagePosition(page, pageNumber - this.currentPagePosition, index);
    });
  }
  setupEvents() {
    this.elems.leaves.forEach((leaf, index) => {
      leaf.addEventListener("click", () => {
        if (index >= this.currentPagePosition) {
          this.turnPage(1);
        } else {
          this.turnPage(-1);
        }
      });
      // Touch support for mobile
      let startX = 0;
      leaf.addEventListener('touchstart', e => {
        startX = e.changedTouches[0].clientX;
      });
      leaf.addEventListener('touchend', e => {
        let deltaX = e.changedTouches[0].clientX - startX;
        if (Math.abs(deltaX) > 40) {
          if (deltaX < 0 && index >= this.currentPagePosition) {
            this.turnPage(1);
          } else if (deltaX > 0 && index < this.currentPagePosition) {
            this.turnPage(-1);
          }
        }
      });
    });
  }
}