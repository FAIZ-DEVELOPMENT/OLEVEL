const questions = [
    {
        "question": "Arduino program to Blink a Light Emitting Diode (LED)",
        "answer": `void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
}`,
        "difficulty": "easy"
    },
    {
        "question": "Arduino program to fade the LED bulb using for loop",
        "answer": `int ledPin = 9;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  for (int fadeValue = 0; fadeValue <= 255; fadeValue += 5) {
    analogWrite(ledPin, fadeValue);
    delay(30);
  }
  for (int fadeValue = 255; fadeValue >= 0; fadeValue -= 5) {
    analogWrite(ledPin, fadeValue);
    delay(30);
  }
}`,
        "difficulty": "easy"
    },
    {
        "question": "Arduino program to connect a LED through push button",
        "answer": `const int buttonPin = 2;
const int ledPin = 13;

void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT_PULLUP);
}

void loop() {
  if (digitalRead(buttonPin) == LOW) {
    digitalWrite(ledPin, HIGH);
  } else {
    digitalWrite(ledPin, LOW);
  }
}`,
        "difficulty": "easy"
    },
    {
        "question": "Arduino program to interface LED buzzer with Arduino and turn ON LED for 2 second after every 3 second",
        "answer": `int ledPin = 13;
int buzzerPin = 8;

void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(buzzerPin, OUTPUT);
}

void loop() {
  digitalWrite(ledPin, HIGH);
  digitalWrite(buzzerPin, HIGH);
  delay(2000);
  digitalWrite(ledPin, LOW);
  digitalWrite(buzzerPin, LOW);
  delay(3000);
}`,
        "difficulty": "medium"
    },
    {
        "question": "Arduino program to interface buzzer with Arduino board to buzz on/off with the delay of 1sec",
        "answer": `int buzzerPin = 8;

void setup() {
  pinMode(buzzerPin, OUTPUT);
}

void loop() {
  digitalWrite(buzzerPin, HIGH);
  delay(1000);
  digitalWrite(buzzerPin, LOW);
  delay(1000);
}`,
        "difficulty": "easy"
    },
    {
        "question": "Arduino program to create automatic street light control by using LDR sensor",
        "answer": `int ldrPin = A0;
int ledPin = 13;

void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(ldrPin, INPUT);
}

void loop() {
  int ldrValue = analogRead(ldrPin);
  if (ldrValue < 500) {
    digitalWrite(ledPin, HIGH);
  } else {
    digitalWrite(ledPin, LOW);
  }
  delay(100);
}`,
        "difficulty": "medium"
    },
    {
        "question": "Design a counter using an ATmega microcontroller (like ATMEGA328P) using Arduino to display the number of entries per day in an office",
        "answer": `#include <LiquidCrystal.h>
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

int sensorPin = 7;
int count = 0;

void setup() {
  lcd.begin(16, 2);
  pinMode(sensorPin, INPUT);
  lcd.print("People Count:");
}

void loop() {
  if (digitalRead(sensorPin) == HIGH) {
    count++;
    lcd.setCursor(0, 1);
    lcd.print(count);
    delay(500);
  }
}`,
        "difficulty": "hard"
    },
    {
        "question": "Arduino program to connect RGB LED Bulb",
        "answer": `int redPin = 9;
int greenPin = 10;
int bluePin = 11;

void setup() {
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
}

void loop() {
  // Red
  analogWrite(redPin, 255);
  analogWrite(greenPin, 0);
  analogWrite(bluePin, 0);
  delay(1000);

  // Green
  analogWrite(redPin, 0);
  analogWrite(greenPin, 255);
  analogWrite(bluePin, 0);
  delay(1000);

  // Blue
  analogWrite(redPin, 0);
  analogWrite(greenPin, 0);
  analogWrite(bluePin, 255);
  delay(1000);
}`,
        "difficulty": "medium"
    },
    {
        "question": "Arduino program to turns on LED when the button is pressed once and remains on until the button is pressed again to turn it off",
        "answer": `const int buttonPin = 2;
const int ledPin = 13;

int buttonState = 0;
int lastButtonState = 0;
int ledState = LOW;

void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT_PULLUP);
}

void loop() {
  buttonState = digitalRead(buttonPin);

  if (buttonState != lastButtonState) {
    if (buttonState == LOW) {
      ledState = !ledState;
      digitalWrite(ledPin, ledState);
    }
    delay(50);
  }
  lastButtonState = buttonState;
}`,
        "difficulty": "medium"
    },
    {
        "question": "Arduino program to interface security password with Arduino board to show green light for correct password and red light for incorrect password",
        "answer": `const int redLed = 12;
const int greenLed = 11;
String password = "1234";
String inputPassword = "";

void setup() {
  pinMode(redLed, OUTPUT);
  pinMode(greenLed, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  if (Serial.available()) {
    char ch = Serial.read();
    if (ch == '\\n') {
      if (inputPassword == password) {
        digitalWrite(greenLed, HIGH);
        digitalWrite(redLed, LOW);
      } else {
        digitalWrite(redLed, HIGH);
        digitalWrite(greenLed, LOW);
      }
      inputPassword = "";
    } else {
      inputPassword += ch;
    }
  }
}`,
        "difficulty": "hard"
    }
];

// The rest of the logic remains unchanged from the optimized version

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let completedQuestions = [];
let score = 0;
let totalQuestions = questions.length;
let answerVisible = false;

function shuffleQuestions() {
    shuffledQuestions = [...questions];
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
    }
}

function loadNextQuestion() {
    if (currentQuestionIndex >= shuffledQuestions.length - 1) {
        showCompletionMessage();
        return;
    }
    currentQuestionIndex++;
    answerVisible = false;
    document.getElementById("answer-box").style.display = "none";
    loadCurrentQuestion();
}

function loadCurrentQuestion() {
    if (currentQuestionIndex >= shuffledQuestions.length) {
        showCompletionMessage();
        return;
    }

    const question = shuffledQuestions[currentQuestionIndex];
    document.getElementById("question-box").textContent = question.question;
    document.getElementById("answer-box").textContent = question.answer;
    const difficultyEl = document.querySelector(".difficulty");
    difficultyEl.className = `difficulty difficulty-${question.difficulty}`;
    difficultyEl.textContent = question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1);
    document.getElementById("question-counter").textContent = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;
    document.getElementById("completion-message").classList.remove("show");
}

function toggleAnswer() {
    const answerBox = document.getElementById("answer-box");
    answerVisible = !answerVisible;

    if (answerVisible) {
        answerBox.style.display = "block";
        document.querySelector('.btn-accent').innerHTML = `<i class="fas fa-eye-slash"></i> Hide Answer`;
    } else {
        answerBox.style.display = "none";
        document.querySelector('.btn-accent').innerHTML = `<i class="fas fa-lightbulb"></i> Show Answer`;
    }
}

function runCode() {
    showToast("Code executed successfully!", "success");
    if (!completedQuestions.includes(currentQuestionIndex)) {
        completedQuestions.push(currentQuestionIndex);
        score = Math.floor((completedQuestions.length / totalQuestions) * 100);
        updateProgress();
    }
}

function resetEditor() {
    const iframe = document.getElementById("editor-container").querySelector('iframe');
    iframe.src = iframe.src;
    showToast("Editor reset", "warning");
}

function updateProgress() {
    const progress = (completedQuestions.length / totalQuestions) * 100;
    document.getElementById("progress-bar").style.width = `${progress}%`;
    document.getElementById("completed-count").textContent = completedQuestions.length;
    document.getElementById("score").textContent = score;
    document.getElementById("total-questions").textContent = totalQuestions;
}

function showCompletionMessage() {
    document.getElementById("completion-message").classList.add("show");
    document.getElementById("final-score").textContent = score;
}

function resetPractice() {
    shuffleQuestions();
    currentQuestionIndex = 0;
    completedQuestions = [];
    score = 0;
    answerVisible = false;
    document.getElementById("answer-box").style.display = "none";
    updateProgress();
    loadCurrentQuestion();
}

function showToast(message, type = "success") {
    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toast-message");
    toast.className = "toast";
    void toast.offsetWidth;
    toast.className = `toast show ${type}`;
    toastMessage.textContent = message;

    setTimeout(() => {
        toast.className = "toast";
    }, 3000);
}

document.addEventListener("DOMContentLoaded", function () {
    shuffleQuestions();
    loadCurrentQuestion();
    document.getElementById("total-questions").textContent = totalQuestions;

    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    const closeButton = document.getElementById('close-button');
    const dropdowns = document.querySelectorAll('.dropdown');

    mobileMenu.addEventListener('click', function () {
        navLinks.classList.add('active');
        closeButton.style.display = 'block';
        mobileMenu.style.display = 'none';
    });

    closeButton.addEventListener('click', function () {
        navLinks.classList.remove('active');
        closeButton.style.display = 'none';
        mobileMenu.style.display = 'flex';
        dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
    });

    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        link.addEventListener('click', function (e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
                if (dropdown.classList.contains('active')) {
                    dropdowns.forEach(other => {
                        if (other !== dropdown) other.classList.remove('active');
                    });
                }
            }
        });
    });

    document.addEventListener('click', function (e) {
        if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
            if (!navLinks.contains(e.target) && !mobileMenu.contains(e.target) && !closeButton.contains(e.target)) {
                navLinks.classList.remove('active');
                closeButton.style.display = 'none';
                mobileMenu.style.display = 'flex';
                dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
            }
        }
    });

    document.querySelectorAll('.dropdown > a').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            link.parentElement.classList.toggle('open');
        });
    });

    const panels = document.querySelectorAll('.panel');
    panels.forEach((panel, index) => {
        panel.style.animationDelay = `${index * 0.1}s`;
    });
});
