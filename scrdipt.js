let coins = 0;


let numButtonClicks = 0;
function buttonClicked() {
    numButtonClicks = numButtonClicks + 1;
    document.getElementById("Welcome to the Button Clicker 1.1!!! Press Click me to Click the button!").textContent =
        "Button Clicked times: " + numButtonClicks;
}
function resetCount() {
  count = 0;
  document.getElementById("count").innerText = count;
}




const countEl = document.getElementById("count");
countEl.classList.remove("flash");
void countEl.offsetWidth; // reset animation
countEl.classList.add("flash");









function increaseCount() {
  count++;
  document.getElementById("count").innerText = count;

  if (count > highScore) {
    highScore = count;
    document.getElementById("highScore").innerText = highScore;
    localStorage.setItem("highScore", highScore);
  }
}



let count = 0;
let highScore = 0;

function increaseCount() {
  count++;
  document.getElementById("count").innerText = count;

  if (count > highScore) {
    highScore = count;
    document.getElementById("highScore").innerText = highScore;
  }
}

function resetCount() {
  count = 0;
  document.getElementById("count").innerText = count;
}
function decreaseCount() {
  if (count > 0) {
    count--;
    document.getElementById("count").innerText = count;
  }
}





function animateCount() {
  const countEl = document.getElementById("count");
  countEl.classList.add("bounce");
  setTimeout(() => countEl.classList.remove("bounce"), 200);
}



const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function shootConfetti() {
  const confettis = Array.from({ length: 100 }).map(() => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 6 + 4,
    c: `hsl(${Math.random() * 360}, 100%, 50%)`,
    v: Math.random() * 3 + 2
  }));

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettis.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y += p.v, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.c;
      ctx.fill();
    });
    frame++;
    if (frame < 80) requestAnimationFrame(draw);
  }
  draw();
}


function buyUpgrade() {
  if (coins >= 10) {
    coins -= 10;
    gainPerClick += 1;
    document.getElementById("coins").innerText = `Coins: ${coins}`;
    logAction("🛒 Bought upgrade: +" + gainPerClick + " per click");
    alert("Upgrade purchased! Now each click gives +" + gainPerClick);
  } else {
    alert("Not enough coins!");
  }
}




function increaseCount() {
  count += gainPerClick;
  coins += 1; // <--- Add this line to increase coins
  document.getElementById("count").innerText = count;
  document.getElementById("coins").innerText = "Coins: " + coins; // Update the display
}


<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDnKwtHj19x0LSd0IRMyLtdoCBehIdfnTE",
    authDomain: "v-ommunity-s8zcng.firebaseapp.com",
    projectId: "v-ommunity-s8zcng",
    storageBucket: "v-ommunity-s8zcng.appspot.com",
    messagingSenderId: "636616355821",
    appId: "1:636616355821:web:8e9c84b8dc25f5e47381e4"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
</script> 







import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

window.signUp = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      alert("Account created!");
    })
    .catch(error => {
      alert("Error: " + error.message);
    });
};




import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

onAuthStateChanged(auth, user => {
  if (user) {
    document.body.innerHTML += `<p>Welcome, ${user.email}</p>`;
  }
});



import { signOut } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

window.signOutUser = function () {
  signOut(auth).then(() => {
    alert("Signed out.");
  });
};

\

\






import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
const db = getFirestore(app);
window.saveScore = async function(score) {
  const user = auth.currentUser;
  if (!user) return alert("You're not signed in!");

  const userRef = doc(db, "scores", user.uid);
  await setDoc(userRef, { score: score });

  alert("Score saved!");
};
saveScore(currentScore);
async function loadScore() {
  const user = auth.currentUser;
  if (!user) return;

  const userRef = doc(db, "scores", user.uid);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    const savedScore = docSnap.data().score;
    currentScore = savedScore;
    updateCounterDisplay(); // <- your function to show the score
  }
}
