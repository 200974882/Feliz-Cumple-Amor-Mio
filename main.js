/* js/main.js */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Control de Música
    const music = document.getElementById("bg-music");
    const video = document.querySelector("video");

    // Intentar reproducir música automáticamente (navegadores modernos pueden bloquearlo)
    if(music) {
        music.volume = 0.4; // Volumen suave
        
        // Si hay un botón de inicio explícito (Página 1)
        const startBtn = document.getElementById("start-btn");
        if(startBtn) {
            startBtn.addEventListener("click", () => {
                music.play().catch(e => console.log("Interacción requerida"));
            });
        } else {
            // Otras páginas: intentar autoplay
            music.play().catch(() => {
                // Si falla, mostrar un botón flotante pequeño para activar sonido
                console.log("Autoplay bloqueado - esperando interacción");
                document.body.addEventListener('click', () => music.play(), {once:true});
            });
        }
    }

    // 2. Pausar música si hay video reproduciéndose
    if (video && music) {
        video.addEventListener("play", () => {
            music.pause();
        });
        video.addEventListener("pause", () => {
            music.play();
        });
        video.addEventListener("ended", () => {
            music.play();
        });
    }

    // 3. Efecto Máquina de Escribir (Página Carta)
    const textElement = document.getElementById("typewriter");
    if (textElement) {
        const text = textElement.getAttribute("data-text");
        textElement.innerHTML = "";
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                textElement.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50); // Velocidad de escritura
            }
        }
        // Retraso inicial
        setTimeout(typeWriter, 1000);
    }

    // 4. Lluvia de Corazones (Página Sorpresa)
    if (document.querySelector(".hearts-container")) {
        setInterval(createHeart, 300);
    }
});

function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("floating-heart");
    heart.innerHTML = "❤";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 2 + 3 + "s"; // Entre 3 y 5s
    heart.style.fontSize = Math.random() * 20 + 10 + "px";
    
    document.querySelector(".hearts-container").appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 5000);

// Forzar audio al hacer clic en cualquier parte
document.addEventListener('click', () => {
    const audio = document.getElementById('bg-music');
    if (audio) audio.play();
}, { once: true });
// Efecto de brillo al mover el mouse
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.9) { // Solo crea uno de vez en cuando para no saturar
        createSparkle(e.pageX, e.pageY);
    }
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'absolute';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.fontSize = '15px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9999';
    sparkle.style.transition = 'all 1s linear';
    
    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.style.transform = `translateY(${(Math.random() - 0.5) * 50}px) scale(0)`;
        sparkle.style.opacity = '0';
    }, 50);

    setTimeout(() => sparkle.remove(), 1000);
}

// Persistencia de música (para que no se corte al cambiar de página)
window.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('bg-music');
    if (audio) {
        audio.volume = 0.5;
        // Si el navegador bloquea el autoplay, intentamos reproducir al primer clic
        document.body.addEventListener('click', () => {
            audio.play().catch(() => {});
        }, { once: true });
    }
});

// --- LÓGICA DE LA BARRA DE PROGRESO ---
// --- LÓGICA DE LA BARRA DE PROGRESO CORREGIDA ---
window.addEventListener('load', () => {
    const paginas = [
        'index.html',
        'recuerdos.html',
        'razones.html',
        'regalos.html',
        'videos.html',
        'quiz.html',
        'carta.html',
        'deseo.html',
        'sorpresa.html'
    ];

    // Esta línea es la clave: limpia la ruta para obtener solo el nombre del archivo
    const path = window.location.pathname;
    let paginaActual = path.split("/").pop();

    // Si entras a la raíz (sin nombre de archivo), asumimos que es index.html
    if (paginaActual === "" || paginaActual === "/") {
        paginaActual = 'index.html';
    }
    
    // Buscamos la posición (ignorando mayúsculas/minúsculas por si acaso)
    const indiceActual = paginas.findIndex(p => p.toLowerCase() === paginaActual.toLowerCase());
    
    if (indiceActual !== -1) {
        const porcentaje = ((indiceActual + 1) / paginas.length) * 100;
        
        const bar = document.getElementById('progress-bar');
        const heart = document.getElementById('heart-pointer');
        
        if (bar && heart) {
            // Un pequeño delay para que se vea la animación al cargar
            setTimeout(() => {
                bar.style.width = `${porcentaje}%`;
                heart.style.left = `calc(${porcentaje}% - 15px)`;
            }, 200);
        }
    }
});

    // Obtenemos el nombre del archivo actual
    const rutaActual = window.location.pathname.split("/").pop() || 'index.html';
    
    // Calculamos el porcentaje
    const indiceActual = paginas.indexOf(rutaActual);
    if (indiceActual !== -1) {
        const porcentaje = ((indiceActual + 1) / paginas.length) * 100;
        
        // Aplicamos el ancho a la barra y al corazón
        const bar = document.getElementById('progress-bar');
        const heart = document.getElementById('heart-pointer');
        
        if (bar && heart) {
            bar.style.width = `${porcentaje}%`;
            heart.style.left = `calc(${porcentaje}% - 10px)`;
        }
    }

let candlesOut = 0;
function blow(element) {
    const flame = element.querySelector('.flame');
    const smoke = element.querySelector('.smoke');
    
    if(!flame.classList.contains('hidden')) {
        flame.style.opacity = '0'; // Desvanecemos la llama
        setTimeout(() => flame.classList.add('hidden'), 300);
        
        // Activamos el humo
        smoke.classList.add('smoke-anim');
        
        // Opcional: Si quieres que el pastel "tiemble" un poquito al soplar
        document.getElementById('cake-box').style.transform = "scale(0.95)";
        setTimeout(() => {
            document.getElementById('cake-box').style.transform = "scale(1)";
        }, 100);

        candlesOut++;
        if(candlesOut === 3) {
            setTimeout(finish, 1000);
        }
    }
}

};




