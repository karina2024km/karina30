document.getElementById("playButton").addEventListener("click", () => {
    const audio1 = document.getElementById("audio1");
    const audio2 = document.getElementById("audio2");
    const button = document.getElementById("playButton");
    const lyrics = document.getElementById("lyrics");
    const lyricsContent = document.getElementById("lyricsContent");
    const gifImage = document.getElementById("gifImage");

    // Reproducir primer audio y ajustar visibilidad de elementos
    audio1.play();
    button.style.display = "none"; // Ocultar el botón
    lyrics.style.display = "block"; // Mostrar las letras

    // Definir las letras y sus tiempos
    const lyricsText = [
        { line: "Chavo.", time: 1500 },
        { line: "Guapo poderoso", time: 2000 },
        { line: "Asombroso muy hermoso", time: 2004 },
        { line: "Soy precioso armonioso", time: 1000 },
        { line: "Un buen socio misterioso", time: 1000 },
        { line: "Buena gente", time: 1000 },
        { line: "DETERGENTE ...", time: 1000 },
        { line: "Te quiere don Ramón", time: 1000 }, // Última línea de la primera canción
    ];

    let index = 0;
    const charDuration = 60; // Duración de cada letra en milisegundos (0.1 segundos)

    // Función para mostrar cada letra progresivamente
    const displayLineLetterByLetter = (line, totalTime, callback) => {
        lyricsContent.innerHTML = ""; // Vaciar contenido
        let charIndex = 0;

        const typeEffect = () => {
            if (charIndex < line.length) {
                lyricsContent.textContent += line[charIndex];
                charIndex++;
                setTimeout(typeEffect, charDuration); // Tiempo fijo entre letras
            } else {
                // Esperar el tiempo restante para sincronizar la línea completa
                const remainingTime = totalTime - charIndex * charDuration;
                setTimeout(callback, remainingTime > 0 ? remainingTime : 0);
            }
        };

        typeEffect();
    };

    // Función para mostrar las letras línea por línea
    const displayNextLine = () => {
        if (index >= lyricsText.length) return;

        const currentLine = lyricsText[index];
        if (currentLine.line) {
            displayLineLetterByLetter(currentLine.line, currentLine.time, () => {
                index++;
                displayNextLine();
            });
        }
    };

    // Iniciar animación de letras
    displayNextLine();

    // Función para generar corazones aleatorios
    const generateHeart = () => {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.textContent = "❤️";

        // Posición aleatoria
        const randomX = Math.random() * window.innerWidth;
        const randomY = Math.random() * window.innerHeight;
        heart.style.left = `${randomX}px`;
        heart.style.top = `${randomY}px`;

        document.getElementById("hearts-container").appendChild(heart);

        // Eliminar el corazón después de 2 segundos
        setTimeout(() => heart.remove(), 2000);
    };

    // Generar corazones a intervalos regulares
    const heartInterval = setInterval(generateHeart, 300);

    // Detener corazones al finalizar la canción
    audio1.addEventListener("ended", () => {
        // Reproducir el segundo audio cuando termine el primero
        audio2.play();
        clearInterval(heartInterval); // Detener generación de corazones

        // Desvanecer la última línea de la primera canción ("Te quiere don Ramón")
        lyricsContent.innerHTML = ""; // Limpiar las letras
    });

    // Mostrar el GIF cuando comience la segunda canción
    audio2.addEventListener("play", () => {
        gifImage.style.display = "block";  // Mostrar el GIF
    });

    // Ocultar el GIF cuando la segunda canción termine
    audio2.addEventListener("ended", () => {
        gifImage.style.display = "none";  // Ocultar el GIF
    });
});
