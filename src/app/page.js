"use client";
import Image from "next/image";
import confetti from "canvas-confetti";
import styles from "./page.module.css";

import { useEffect } from "react";
export default function Home() {
  function handleConfetti(event) {
    const x = event.clientX / window.innerWidth;
    const y = event.clientY / window.innerHeight;
    confetti({
      origin: { x, y },
    });
  }

  useEffect(() => {
    document.addEventListener("click", handleConfetti);
    confetti();
    return () => {
      document.removeEventListener("click", handleConfetti);
    };
  }, []);

  function DibujarPetalo(x, y, RadioX, scala, Rotacion, color, pasos) {
    const canvas = document.getElementById("Flor");
    const ctx = canvas.getContext("2d");
    const Numero = scala;

    const AnguloIncrement = (Math.PI / pasos) * 2;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Rotacion);
    ctx.scale(1, Numero);
    ctx.beginPath();
    for (let i = 0; i <= pasos; i++) {
      const AnguloActual = i * AnguloIncrement;
      const currentRadius = Math.sin(AnguloActual) * RadioX;
      const PuntoY = Math.sin(AnguloActual) * currentRadius;
      const PuntoX = Math.cos(AnguloActual) * currentRadius;
      if (i === 0) {
        ctx.moveTo(PuntoX, PuntoY);
      } else {
        ctx.lineTo(PuntoX, PuntoY);
      }
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.fill();
      ctx.stroke();
    }

    ctx.restore();
  }

  function DibujarFlor(
    x,
    y,
    NumeroPetalos,
    RadioXPetalo,
    RadioYPetalo,
    AltoTrazo
  ) {
    // Tallo
    const canvas = document.getElementById("Flor");
    const ctx = canvas.getContext("2d");
    const PasosTallo = 50;
    const AltoTallo = AltoTrazo / PasosTallo;
    let NuevaY = y;

    const DibujarTallo = () => {
      if (NuevaY < y + AltoTrazo) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, NuevaY);
        ctx.lineWidth = 3;
        ctx.strokeStyle = "black";
        ctx.stroke();
        NuevaY += AltoTallo;
        setTimeout(DibujarTallo, 100);
      } else {
        // Dibuja los petalos en el tallo
        const Pasos = 50;
        let CuantosPasos = 0;
        function DibujarPetalosTallo() {
          if (CuantosPasos <= Pasos) {
            const PetaloY = y + 250 - RadioYPetalo;
            const PetaloY2 = y + 200 - RadioYPetalo;
            DibujarPetalo(500, PetaloY, 15, 2, 300, "green", CuantosPasos);
            DibujarPetalo(470, PetaloY2, 15, 2, 300, "green", CuantosPasos);
            CuantosPasos++;
            setTimeout(DibujarPetalosTallo, 100);
          }
        }
        DibujarPetalosTallo();
      }
    };
    DibujarTallo();

    const AnguloIncrement = (Math.PI * 2) / NumeroPetalos;

    let contadorPetalos = 0;
    function dibujarSiguientePetalo() {
      const canvas = document.getElementById("Flor");
      const ctx = canvas.getContext("2d");
      if (contadorPetalos <= NumeroPetalos) {
        const Angulo = contadorPetalos * AnguloIncrement;
        DibujarPetalo(x, y, RadioXPetalo, 2, Angulo, "yellow", 100);
        contadorPetalos++;
        setTimeout(dibujarSiguientePetalo, 1000);
      }
      // Dibuja el centro de la flor
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
    }
    dibujarSiguientePetalo();
  }

  function DibujarFlorSinTallo(
    x,
    y,
    NumeroPetalos,
    RadioXPetalo,
    RadioYPetalo,
    AltoTrazo
  ) {
    // Dibuja el tallo
    const canvas = document.getElementById("Flor");
    const ctx = canvas.getContext("2d");
    const PasosTallo = 50;
    const AltoTallo = AltoTrazo / PasosTallo;
    let NuevaY = y;

    const DibujarTallo = () => {
      if (NuevaY < y + AltoTrazo) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, NuevaY);
        ctx.lineWidth = 3;
        ctx.strokeStyle = "black";
        ctx.stroke();
        NuevaY += AltoTallo;
        setTimeout(DibujarTallo, 100);
      }
    };
    DibujarTallo();

    const AnguloIncrement = (Math.PI * 2) / NumeroPetalos;

    // Dibuja los pétalos
    let contadorPetalos = 0;
    function dibujarSiguientePetalo() {
      if (contadorPetalos <= NumeroPetalos) {
        const Angulo = contadorPetalos * AnguloIncrement;
        DibujarPetalo(x, y, RadioXPetalo, 2, Angulo, "yellow", 100);
        contadorPetalos++;
        setTimeout(dibujarSiguientePetalo, 1000);
      }
      // Dibuja el centro de la flor
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
    }
    dibujarSiguientePetalo();
  }

  function CrearVarias() {
    const canvas = document.getElementById("Flor");
    const ctx = canvas.getContext("2d");
    const numFlores = 12;

    // Espaciamiento y tamaño de cada flor
    const espacioX = canvas.width / 4;
    const espacioY = canvas.height / 3;
    const TamañoFlor = 130;

    for (let i = 0; i <= numFlores; i++) {
      const fila = Math.floor(i / 4);
      const columna = i % 4;
      const x = espacioX * columna + espacioX / 2;
      const y = espacioY * fila + espacioY / 2;

      DibujarFlorSinTallo(x, y, 8, 30, 80, TamañoFlor);
    }
  }

  return (
    <div className={styles.main}>
      <div className={styles.flares}>
        <Image
          src="/images/flare-top.png"
          loading="lazy"
          sizes="(max-width: 1920px) 100vw, 1920px"
          height={834}
          width={1920}
          alt=""
          className={styles.flaresTop}
        />
        <Image
          src="/images/flare-right.png"
          loading="lazy"
          sizes="(max-width: 1622px) 100vw, 1622px"
          height={1109}
          width={1622}
          alt=""
          className={[styles.flaresRight, styles.hideMobile]}
        />
        <Image
          src="/images/flare-left.png"
          loading="lazy"
          sizes="(max-width: 1518px) 100vw, 1518px"
          height={1112}
          width={1518}
          alt=""
          className={styles.hideMobile}
        />
      </div>

      <div className={styles.container}>
        <div class="Con-Emergente">
          <div id="resultado" class="cua">
            <p id="res">
              Hola, antes de iniciar, solo quiero recordarte que eres muy
              especial para mí y gracias por todo. &lt;3
            </p>
          </div>
        </div>

        <div class="Con-2">
          <h1 id="Titulo"> Elije una Opcion </h1>
          <div class="Con">
            <button
              class="Button"
              id="B1"
              onClick={() => DibujarFlor(500, 100, 6, 30, 100, 200)}
            >
              {" "}
              1 Flor{" "}
            </button>
            <button class="Button" id="B12" onClick={() => CrearVarias()}>
              {" "}
              12 Flores :){" "}
            </button>
          </div>
        </div>

        <main class="Contenedor">
          <canvas id="Flor" class="Flor" width="800" height="600"></canvas>

          <div class="Texto">
            <h2 id="Text">Para la niña mas Linda del Mundo.</h2>
          </div>
        </main>
      </div>
    </div>
  );
}
