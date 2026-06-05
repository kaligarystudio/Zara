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

  const scriptURL = "https://script.google.com/macros/s/AKfycbwP2UVELIrhZWBevZMDem3WzR5KyDHOBh3hGEq74e6x2x9qbrfwKNr_Rzhb00JTqIB3/exec";

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

if(uploadForm){

  uploadForm.addEventListener(
    "submit",
    async function(e){

      e.preventDefault();

      console.log("Formulario enviado");

      try{

        const guestName =
        document.getElementById("guestName").value.trim();

        const files =
        document.getElementById("mediaFiles").files;

        console.log("Invitado:", guestName);
        console.log("Archivos:", files.length);

        if(!guestName){

          alert("Ingresa tu nombre");

          return;
        }

        if(files.length === 0){

          alert("Selecciona al menos un archivo");

          return;
        }

        const filesData = [];

        // ==========================
        // CONVERTIR ARCHIVOS A BASE64
        // ==========================

        for(const file of files){

          console.log(
            "Procesando:",
            file.name,
            file.size,
            file.type
          );

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

        console.log("Payload listo");
        console.log(payload);

        // ==========================
        // ENVIAR A APPS SCRIPT
        // ==========================

        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbyfwRaZUC_i-jEo9mIlyIzUNpCwok1R7D27t5sKG8ZJkBc9_FxC-sb8iVnPk_57kF0b/exec",
          {

            method:"POST",

            headers:{
              "Content-Type":"application/json"
            },

            body:JSON.stringify(payload)

          }
        );

        console.log("Status:", response.status);
        console.log("OK:", response.ok);

        // ==========================
        // LEER RESPUESTA
        // ==========================

        const text =
        await response.text();

        console.log("Respuesta Apps Script:");
        console.log(text);

        let result;

        try{

          result =
          JSON.parse(text);

        }catch(parseError){

          console.error(
            "No se pudo parsear JSON",
            parseError
          );

          alert(
            "El servidor respondió algo inesperado. Revisa la consola."
          );

          return;
        }

        // ==========================
        // RESULTADO
        // ==========================

        if(result.success){

          alert(
            "Tus recuerdos fueron subidos ❤️"
          );

          uploadForm.reset();

        }else{

          alert(
            "Error:\n" +
            result.error
          );

          console.error(result.error);

        }

      }catch(error){

        console.error(
          "ERROR GENERAL:",
          error
        );

        alert(
          "ERROR GENERAL:\n\n" +
          error.message
        );

      }

    }
  );

}

// ==========================
// BASE64
// ==========================

function toBase64(file){

  return new Promise((resolve,reject)=>{

    const reader =
    new FileReader();

    reader.readAsDataURL(file);

    reader.onload =
    () => resolve(reader.result);

    reader.onerror =
    error => reject(error);

  });

}
