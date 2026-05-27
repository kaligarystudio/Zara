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

  const scriptURL = "https://script.google.com/macros/s/AKfycbxDuccQveH7nrSZYFA63l-HdBqY9-0Xz5hJaLBSTw7Mp0N8BVi6cy5fxzE7H4zT6HyA/exec";

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
// ==========================
// Mariposas
// ==========================

const container = document.querySelector(".butterflies");

const isMobile = window.innerWidth <= 768;

// cantidad dinámica
const butterflyCount = isMobile ? 14 : 8;

const animations = ["fly1", "fly2", "fly3", "fly4", "fly5"];

for (let i = 0; i < butterflyCount; i++) {
  const b = document.createElement("div");
  b.className = "butterfly";
  b.textContent = "🦋";

  // posición inicial random
  const startLeft = Math.random() * 100;
  const startTop = 80 + Math.random() * 30;

  // estilos dinámicos
  b.style.left = startLeft + "%";
  b.style.top = startTop + "%";

  b.style.fontSize = (1 + Math.random() * 1.2) + "rem";
  b.style.opacity = 0.5 + Math.random() * 0.4;

  const anim = animations[Math.floor(Math.random() * animations.length)];
  const duration = 18 + Math.random() * 12;

  b.style.animation = `${anim} ${duration}s linear infinite`;

  container.appendChild(b);
}

// ==========================
// SUBIR FOTOS / VIDEOS
// ==========================

const uploadForm =
document.getElementById("uploadForm");

uploadForm.addEventListener(
"submit",
async function(e){

  e.preventDefault();

  const guestName =
  document.getElementById("guestName").value;

  const files =
  document.getElementById("mediaFiles").files;

  const filesData = [];

  try{

    // CONVERTIR ARCHIVOS

    for(const file of files){

      const base64 =
      await toBase64(file);

      filesData.push({

        fileName:file.name,

        mimeType:file.type,

        data:base64.split(",")[1]

      });

    }

    const payload = {

      nombre:guestName,

      files:filesData

    };

    // ENVIAR

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzfCDxDh95i0DvzW9bPF3Ns2ewV7Ffc62WXcpPVJc0it45TMmey4ec0QFv4PqfS-Wfg/exec",
      {

        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify(payload)

      }
    );

    // RESPUESTA

    const result =
    await response.json();

    console.log(result);

    if(result.success){

      alert(
        "Tus recuerdos fueron subidos ❤️"
      );

      uploadForm.reset();

    }else{

      alert(
        "Error: " + result.error
      );

      console.error(result.error);

    }

  }catch(error){

    console.error(error);

    alert(
      "ERROR GENERAL:\n" + error
    );
  }

});

// ==========================
// BASE64
// ==========================

function toBase64(file){

  return new Promise((resolve,reject)=>{

    const reader =
    new FileReader();

    reader.readAsDataURL(file);

    reader.onload =
    ()=>resolve(reader.result);

    reader.onerror =
    error=>reject(error);

  });

}