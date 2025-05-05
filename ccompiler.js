const questions = [
    {
        "question": "Arduino program to Blink a Light Emitting Diode (LED)",
        "answer": "void setup() {\n  pinMode(LED_BUILTIN, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(LED_BUILTIN, HIGH);\n  delay(1000);\n  digitalWrite(LED_BUILTIN, LOW);\n  delay(1000);\n}",
        "difficulty": "easy"
    },
    {
        "question": "Arduino program to fade the LED bulb using for loop",
        "answer": "int ledPin = 9;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n}\n\nvoid loop() {\n  for (int fadeValue = 0; fadeValue <= 255; fadeValue += 5) {\n    analogWrite(ledPin, fadeValue);\n    delay(30);\n  }\n  for (int fadeValue = 255; fadeValue >= 0; fadeValue -= 5) {\n    analogWrite(ledPin, fadeValue);\n    delay(30);\n  }\n}",
        "difficulty": "easy"
    },
    {
        "question": "Arduino program to connect a LED through push button",
        "answer": "const int buttonPin = 2;\nconst int ledPin = 13;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n  pinMode(buttonPin, INPUT_PULLUP);\n}\n\nvoid loop() {\n  if (digitalRead(buttonPin) == LOW) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n}",
        "difficulty": "easy"
    },
    {
        "question": "Arduino program to interface LED buzzer with Arduino and turn ON LED for 2 second after every 3 second",
        "answer": "int ledPin = 13;\nint buzzerPin = 8;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n  pinMode(buzzerPin, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(ledPin, HIGH);\n  digitalWrite(buzzerPin, HIGH);\n  delay(2000);\n  digitalWrite(ledPin, LOW);\n  digitalWrite(buzzerPin, LOW);\n  delay(3000);\n}",
        "difficulty": "medium"
    },
    {
        "question": "Arduino program to interface buzzer with Arduino board to buzz on/off with the delay of 1sec",
        "answer": "int buzzerPin = 8;\n\nvoid setup() {\n  pinMode(buzzerPin, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(buzzerPin, HIGH);\n  delay(1000);\n  digitalWrite(buzzerPin, LOW);\n  delay(1000);\n}",
        "difficulty": "easy"
    },
    {
        "question": "Arduino program to create automatic street light control by using LDR sensor",
        "answer": "int ldrPin = A0;\nint ledPin = 13;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n  pinMode(ldrPin, INPUT);\n}\n\nvoid loop() {\n  int ldrValue = analogRead(ldrPin);\n  if (ldrValue < 500) {\n    digitalWrite(ledPin, HIGH);\n  } else {\n    digitalWrite(ledPin, LOW);\n  }\n  delay(100);\n}",
        "difficulty": "medium"
    },
    {
        "question": "Design a counter using an ATmega microcontroller (like ATMEGA328P) using Arduino to display the number of entries per day in an office",
        "answer": "#include <LiquidCrystal.h>\nLiquidCrystal lcd(12, 11, 5, 4, 3, 2);\n\nint sensorPin = 7;\nint count = 0;\n\nvoid setup() {\n  lcd.begin(16, 2);\n  pinMode(sensorPin, INPUT);\n  lcd.print(\"People Count:\");\n}\n\nvoid loop() {\n  if (digitalRead(sensorPin) == HIGH) {\n    count++;\n    lcd.setCursor(0, 1);\n    lcd.print(count);\n    delay(500);\n  }\n}",
        "difficulty": "hard"
    },
    {
        "question": "Arduino program to connect RGB LED Bulb",
        "answer": "int redPin = 9;\nint greenPin = 10;\nint bluePin = 11;\n\nvoid setup() {\n  pinMode(redPin, OUTPUT);\n  pinMode(greenPin, OUTPUT);\n  pinMode(bluePin, OUTPUT);\n}\n\nvoid loop() {\n  // Red\n  analogWrite(redPin, 255);\n  analogWrite(greenPin, 0);\n  analogWrite(bluePin, 0);\n  delay(1000);\n  \n  // Green\n  analogWrite(redPin, 0);\n  analogWrite(greenPin, 255);\n  analogWrite(bluePin, 0);\n  delay(1000);\n  \n  // Blue\n  analogWrite(redPin, 0);\n  analogWrite(greenPin, 0);\n  analogWrite(bluePin, 255);\n  delay(1000);\n}",
        "difficulty": "medium"
    },
    {
        "question": "Arduino program to turns on LED when the button is pressed once and remains on until the button is pressed again to turn it off",
        "answer": "const int buttonPin = 2;\nconst int ledPin = 13;\n\nint buttonState = 0;\nint lastButtonState = 0;\nint ledState = LOW;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n  pinMode(buttonPin, INPUT_PULLUP);\n}\n\nvoid loop() {\n  buttonState = digitalRead(buttonPin);\n  \n  if (buttonState != lastButtonState) {\n    if (buttonState == LOW) {\n      ledState = !ledState;\n      digitalWrite(ledPin, ledState);\n    }\n    delay(50);\n  }\n  lastButtonState = buttonState;\n}",
        "difficulty": "medium"
    },
    {
        "question": "Arduino program to interface security password with Arduino board to show green light for correct password and red light for incorrect password",
        "answer": "const int redLed = 12;\nconst int greenLed = 11;\nString password = \"1234\";\nString inputPassword = \"\";\n\nvoid setup() {\n  pinMode(redLed, OUTPUT);\n  pinMode(greenLed, OUTPUT);\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  if (Serial.available()) {\n    char ch = Serial.read();\n    if (ch == '\\n') {\n      if (inputPassword == password) {\n        digitalWrite(greenLed, HIGH);\n        digitalWrite(redLed, LOW);\n      } else {\n        digitalWrite(redLed, HIGH);\n        digitalWrite(greenLed, LOW);\n      }\n      inputPassword = \"\";\n    } else {\n      inputPassword += ch;\n    }\n  }\n}",
        "difficulty": "hard"
    }
];

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let completedQuestions = [];
let score = 0;
let totalQuestions = questions.length;
let answerVisible = false;

function shuffleQuestions() {
    shuffledQuestions = [...questions];
    // Fisher-Yates shuffle algorithm
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
    const questionBox = document.getElementById("question-box");
    const answerBox = document.getElementById("answer-box");
    const difficultyBox = document.querySelector(".difficulty");

    // Update question and answer text
    questionBox.textContent = question.question;
    answerBox.textContent = question.answer;

    // Update difficulty styling
    difficultyBox.className = `difficulty difficulty-${question.difficulty}`;
    difficultyBox.textContent = question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1);

    // Update question counter
    document.getElementById("question-counter").textContent = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;

    // Reset editor if needed
    resetEditor();

    // Hide completion message if showing
    document.getElementById("completion-message").classList.remove("show");
}

function toggleAnswer() {
    const answerBox = document.getElementById("answer-box");
    answerVisible = !answerVisible;

    if (answerVisible) {
        answerBox.style.display = "block";
        document.querySelector('.btn-accent i').className = "fas fa-eye-slash";
        document.querySelector('.btn-accent').innerHTML = `<i class="fas fa-eye-slash"></i> Hide Answer`;
    } else {
        answerBox.style.display = "none";
        document.querySelector('.btn-accent i').className = "fas fa-lightbulb";
        document.querySelector('.btn-accent').innerHTML = `<i class="fas fa-lightbulb"></i> Show Answer`;
    }
}

function runCode() {
    showToast("Code executed successfully!", "success");

    // Mark question as completed if not already
    if (!completedQuestions.includes(currentQuestionIndex)) {
        completedQuestions.push(currentQuestionIndex);
        score = Math.floor((completedQuestions.length / totalQuestions) * 100);
        updateProgress();
    }
}

function resetEditor() {
    // Reset editor logic, avoiding unnecessary reloads
    const iframe = document.getElementById("editor-container").querySelector('iframe');
    if (iframe && !iframe.src.includes("about:blank")) {
        iframe.src = iframe.src;  // Reload only if the iframe is not in a blank state
        showToast("Editor reset", "warning");
    }
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
    void toast.offsetWidth; // Trigger reflow
    toast.className = `toast show ${type}`;
    toastMessage.textContent = message;

    setTimeout(() => {
        toast.className = "toast";
    }, 3000);
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    const closeButton = document.getElementById('close-button');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Toggle mobile menu
    mobileMenu.addEventListener('click', function() {
        navLinks.classList.add('active');
        closeButton.style.display = 'block';
        mobileMenu.style.display = 'none';
    });

    // Close mobile menu
    closeButton.addEventListener('click', function() {
        navLinks.classList.remove('active');
        closeButton.style.display = 'none';
        mobileMenu.style.display = 'flex';

        // Close all dropdowns when closing the menu
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    });

    // Toggle dropdowns on mobile
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');

                // Close other dropdowns when opening one
                if (dropdown.classList.contains('active')) {
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                }
            }
        });
    });

    // Close menu when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
            if (!navLinks.contains(e.target) && 
                !mobileMenu.contains(e.target) && 
                !closeButton.contains(e.target)) {
                navLinks.classList.remove('active');
                closeButton.style.display = 'none';
                mobileMenu.style.display = 'flex';

                // Close all dropdowns
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        }
    });
});

// Initialize
window.onload = function() {
    shuffleQuestions();
    loadCurrentQuestion();
    document.getElementById("total-questions").textContent = totalQuestions;
    
    // Add animation to panels
    const panels = document.querySelectorAll('.panel');
    panels.forEach((panel, index) => {
        panel.style.animationDelay = `${index * 0.1}s`;
    });
};
