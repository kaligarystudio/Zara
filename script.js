document.body.classList.add("intro-active");

// ==========================
// INTRO FULLSCREEN
// ==========================

const intro = document.getElementById("intro");

const seal = document.getElementById("seal");

const mainContent = document.getElementById("mainContent");

const music = document.getElementById("bgMusic");

seal.addEventListener("click", () => {

  intro.classList.add("open");

  // Música
  music.play();

  // Mostrar contenido
  setTimeout(() => {

    intro.style.display = "none";

    mainContent.classList.remove("hidden");

    mainContent.classList.add("show");
    document.body.classList.remove("intro-active");
  }, 2200);

});

// ==========================
// CUENTA REGRESIVA
// ==========================

const targetDate = new Date("2026-07-31T18:00:00").getTime();

function updateCountdown() {

  const now = new Date().getTime();

  const distance = targetDate - now;

  // Si ya pasó la fecha
  if (distance < 0) {

    document.getElementById("days").innerHTML = "0";
    document.getElementById("hours").innerHTML = "0";
    document.getElementById("minutes").innerHTML = "0";
    document.getElementById("seconds").innerHTML = "0";

    return;
  }

  // Cálculos
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));

  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) /
    (1000 * 60 * 60)
  );

  const minutes = Math.floor(
    (distance % (1000 * 60 * 60)) /
    (1000 * 60)
  );

  const seconds = Math.floor(
    (distance % (1000 * 60)) /
    1000
  );

  // Pintar en HTML
  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;
}

// Ejecutar inmediatamente
updateCountdown();

// Ejecutar cada segundo
setInterval(updateCountdown, 1000);



// ==========================
// FORMULARIO RSVP
// ==========================
const form = document.getElementById("rsvpForm");

form.addEventListener("submit", async function(e){

  e.preventDefault();

  const data = {

    nombre: document.getElementById("nombre").value,

    acompanantes: document.getElementById("acompanantes").value,

    telefono: document.getElementById("telefono").value
  };

  const scriptURL = "https://script.google.com/macros/s/AKfycbwBKv_Cogy4Zi3D5BXgavjGYkJmvkvdSoMT-rn8Zf0NXKAQL9aRHX_Mo2WMg6Rq3kr0/exec";

  try {

    await fetch(scriptURL, {

      method: "POST",

      mode: "no-cors",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(data)

    });

    alert("¡Gracias por confirmar tu asistencia!");

    form.reset();

  } catch(error){

    console.error(error);

    alert("Error al enviar confirmación");

  }

});
