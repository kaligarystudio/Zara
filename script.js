// ==========================
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;

}, 1000);


// ==========================
// FORMULARIO RSVP
// ==========================

const form = document.getElementById("rsvpForm");

form.addEventListener("submit", async function(e){

  e.preventDefault();

  const data = {
    nombre: document.getElementById("nombre").value,
    acompanantes: document.getElementById("acompanantes").value,
    asistencia: document.getElementById("asistencia").value
  };

  // =============================
  // PEGA AQUÍ TU URL DE APPS SCRIPT
  // =============================

  const scriptURL = "TU_URL_DE_GOOGLE_APPS_SCRIPT";

  try {

    await fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });

    alert("¡Gracias por confirmar tu asistencia!");

    form.reset();

  } catch(error){

    alert("Error al enviar confirmación");
    console.error(error);

  }

});
