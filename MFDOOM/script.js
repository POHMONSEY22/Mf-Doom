document.addEventListener("DOMContentLoaded", () => {
  // Custom cursor
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorOutline = document.querySelector(".cursor-outline");

  if (cursorDot && cursorOutline) {
    window.addEventListener("mousemove", (e) => {
      const posX = e.clientX;
      const posY = e.clientY;

      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;

      // Add delay to outline cursor with animation
      cursorOutline.animate(
        {
          left: `${posX}px`,
          top: `${posY}px`,
        },
        { duration: 500, fill: "forwards" }
      );
    });
  }

  // Check if device is touch screen and disable custom cursor
  function isTouchDevice() {
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }

  if (isTouchDevice()) {
    document.body.classList.add("touch-device");

    if (cursorDot) cursorDot.style.display = "none";
    if (cursorOutline) cursorOutline.style.display = "none";
  }

  // Menú móvil
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      navLinks.classList.toggle("active");
      document.body.classList.toggle("menu-open");
    });
  }

  // Cerrar menú al hacer clic en un enlace
  const navItems = document.querySelectorAll(".nav-links a");
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (menuToggle && menuToggle.classList.contains("active")) {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("active");
        document.body.classList.remove("menu-open");
      }
    });
  });

  // Header transparente con scroll
  const header = document.querySelector(".transparent-header");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    lastScroll = currentScroll;
  });

  // Scroll indicator functionality
  const scrollIndicator = document.querySelector(".hero-scroll-indicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      const nextSection = document.querySelector("section:not(#hero)");
      if (nextSection) {
        window.scrollTo({
          top: nextSection.offsetTop - 100,
          behavior: "smooth",
        });
      }
    });
  }

  // Biografia modular navigation
  const biografiaModules = document.querySelectorAll(".biografia-module");
  const biografiaIndicators = document.querySelectorAll(".biografia-indicator");
  const prevBiografiaBtn = document.querySelector(
    ".biografia-navigation .prev"
  );
  const nextBiografiaBtn = document.querySelector(
    ".biografia-navigation .next"
  );
  let currentBiografiaIndex = 0;

  function showBiografiaModule(index) {
    biografiaModules.forEach((module, i) => {
      if (i === index) {
        module.classList.add("active");
      } else {
        module.classList.remove("active");
      }
    });

    biografiaIndicators.forEach((indicator, i) => {
      if (i === index) {
        indicator.classList.add("active");
      } else {
        indicator.classList.remove("active");
      }
    });

    currentBiografiaIndex = index;
  }

  // Initialize first module as active
  if (biografiaModules.length > 0) {
    showBiografiaModule(0);
  }

  if (prevBiografiaBtn && nextBiografiaBtn) {
    prevBiografiaBtn.addEventListener("click", () => {
      let newIndex = currentBiografiaIndex - 1;
      if (newIndex < 0) newIndex = biografiaModules.length - 1;
      showBiografiaModule(newIndex);
    });

    nextBiografiaBtn.addEventListener("click", () => {
      let newIndex = currentBiografiaIndex + 1;
      if (newIndex >= biografiaModules.length) newIndex = 0;
      showBiografiaModule(newIndex);
    });
  }

  // Biography indicator click events
  biografiaIndicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      showBiografiaModule(index);
    });
  });

  // Frases carousel functionality
  const fraseSlides = document.querySelectorAll(".frase-slide");
  const fraseDots = document.querySelectorAll(".frase-dot");
  const prevFraseBtn = document.querySelector(".frases-arrows .prev");
  const nextFraseBtn = document.querySelector(".frases-arrows .next");
  let currentFraseIndex = 0;

  function showFraseSlide(index) {
    fraseSlides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });

    fraseDots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });

    currentFraseIndex = index;
  }

  if (fraseSlides.length > 0) {
    // Initialize first slide as active
    showFraseSlide(0);
  }

  if (prevFraseBtn && nextFraseBtn) {
    prevFraseBtn.addEventListener("click", () => {
      let newIndex = currentFraseIndex - 1;
      if (newIndex < 0) newIndex = fraseSlides.length - 1;
      showFraseSlide(newIndex);
    });

    nextFraseBtn.addEventListener("click", () => {
      let newIndex = currentFraseIndex + 1;
      if (newIndex >= fraseSlides.length) newIndex = 0;
      showFraseSlide(newIndex);
    });
  }

  // Frase dot click events
  fraseDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = Number.parseInt(dot.getAttribute("data-index"));
      showFraseSlide(index);
    });
  });

  // Auto-rotate frases
  if (fraseSlides.length > 0) {
    setInterval(() => {
      let newIndex = currentFraseIndex + 1;
      if (newIndex >= fraseSlides.length) newIndex = 0;
      showFraseSlide(newIndex);
    }, 8000);
  }

  // Timeline functionality
  const timelineMoments = document.querySelectorAll(".timeline-moment");
  const timelineIndicators = document.querySelectorAll(".timeline-indicator");
  const prevTimelineBtn = document.querySelector(".timeline-control.prev");
  const nextTimelineBtn = document.querySelector(".timeline-control.next");
  const timelineProgress = document.querySelector(".timeline-progress");
  let currentTimelineIndex = 0;

  function showTimelineMoment(index) {
    timelineMoments.forEach((moment, i) => {
      if (i === index) {
        moment.classList.add("active");
      } else {
        moment.classList.remove("active");
      }
    });

    timelineIndicators.forEach((indicator, i) => {
      if (i === index) {
        indicator.classList.add("active");
      } else {
        indicator.classList.remove("active");
      }
    });

    if (timelineProgress) {
      // Calculate progress as percentage of timeline completed
      const progressPercentage = (index / (timelineMoments.length - 1)) * 100;
      timelineProgress.style.width = `${progressPercentage}%`;
    }

    currentTimelineIndex = index;
  }

  // Initialize first moment as active
  if (timelineMoments.length > 0) {
    showTimelineMoment(0);
  }

  if (prevTimelineBtn && nextTimelineBtn) {
    prevTimelineBtn.addEventListener("click", () => {
      let newIndex = currentTimelineIndex - 1;
      if (newIndex < 0) newIndex = timelineMoments.length - 1;
      showTimelineMoment(newIndex);
    });

    nextTimelineBtn.addEventListener("click", () => {
      let newIndex = currentTimelineIndex + 1;
      if (newIndex >= timelineMoments.length) newIndex = 0;
      showTimelineMoment(newIndex);
    });
  }

  // Timeline indicator click events
  timelineIndicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      showTimelineMoment(index);
    });
  });

  // Frases aleatorias para la sección "Frase del día"
  const fraseElement = document.getElementById("frase-canserbero");
  const nuevaFraseBtn = document.getElementById("nueva-frase");
  const currentDateElement = document.getElementById("current-date");

  const frases = [
    '"Remember ALL CAPS when you spell the man name" - All Caps, Madvillain',
    '"Living off borrowed time, the clock tick faster" - Accordion, Madvillain',
    '"Got more soul than a sock with a hole" - Doomsday, Operation: Doomsday',
    "\"I wear a mask so when I face you face-to-face, you can't tell if I'm lying\" - Hey!, Operation: Doomsday",
    '"Villain get the money like curls, they just tryin\' to get a nut like squirrels in his mad world" - Curls, Madvillainy',
    "\"On Doomsday, ever since the womb 'til I'm back where my brother went\" - Doomsday, Operation: Doomsday",
    '"The rest is empty with no brain but the clever nerd" - Figaro, Madvillainy',
    '"The supervillain cooler than a million, I be chillin\'" - All Caps, Madvillainy',
    '"Last wish: I wish I had two more wishes" - Great Day, Madvillainy',
    '"The mask is like Jason, they told the place not to let the basket type case in" - Meat Grinder, Madvillainy',
    '"Tripping off the beat kinda, dripping off the meat grinder" - Meat Grinder, Madvillainy',
    '"Doritos, Cheetos or Fritos" - Hoe Cakes, MM.. FOOD',
    '"One for the money, two for the better green" - Money Folder, Madvillainy',
    '"When he wrote this rhyme he was stone cold sober" - Raid, Madvillainy',
    '"Rap critic and columnist are missing the boat" - Beef Rapp, MM.. FOOD',
  ];

  function mostrarFraseAleatoria() {
    if (fraseElement) {
      const indiceAleatorio = Math.floor(Math.random() * frases.length);
      fraseElement.textContent = frases[indiceAleatorio];
    }
  }

  // Display current date
  if (currentDateElement) {
    const now = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    currentDateElement.textContent = now.toLocaleDateString("es-ES", options);
  }

  // Mostrar una frase aleatoria al cargar la página
  if (fraseElement) {
    mostrarFraseAleatoria();
  }

  // Cambiar la frase al hacer clic en el botón
  if (nuevaFraseBtn) {
    nuevaFraseBtn.addEventListener("click", () => {
      mostrarFraseAleatoria();

      // Add rotation animation to button icon
      const btnIcon = nuevaFraseBtn.querySelector(".btn-icon");
      if (btnIcon) {
        btnIcon.classList.add("rotate");
        setTimeout(() => {
          btnIcon.classList.remove("rotate");
        }, 500);
      }
    });
  }

  // Gallery hover effect
  const galeriaItems = document.querySelectorAll(".galeria-item");

  galeriaItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      galeriaItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.add("dimmed");
        }
      });
    });

    item.addEventListener("mouseleave", () => {
      galeriaItems.forEach((otherItem) => {
        otherItem.classList.remove("dimmed");
      });
    });
  });

  // Parallax effect for hero section
  const heroContent = document.querySelector(".hero-content");

  if (heroContent) {
    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition < window.innerHeight) {
        const translateY = scrollPosition * 0.4;
        const opacity = 1 - scrollPosition / (window.innerHeight * 0.8);

        heroContent.style.transform = `translateY(${translateY}px)`;
        heroContent.style.opacity = Math.max(0, opacity);
      }
    });
  }

  // Animación de aparición al hacer scroll
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const sections = document.querySelectorAll("section:not(#hero)");
  sections.forEach((section) => {
    section.classList.add("fade-in");
    observer.observe(section);
  });

  // Añadir clase para animación de aparición
  document.head.insertAdjacentHTML(
    "beforeend",
    `
        <style>
          .fade-in {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
          }
          .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
          }
        </style>
      `
  );

  // Animación de conteo para las estadísticas
  const statNumbers = document.querySelectorAll(".stat-number");

  function animateStats() {
    statNumbers.forEach((stat) => {
      const target = stat.textContent.includes("M+")
        ? Number.parseInt(stat.textContent)
        : Number.parseInt(stat.textContent.replace(/\D/g, ""));

      const duration = 2000; // 2 segundos para la animación
      const startTime = Date.now();
      const suffix = stat.textContent.includes("M+") ? "M+" : "";

      const updateCount = () => {
        const currentTime = Date.now();
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const currentCount = Math.floor(progress * target);

        stat.textContent = stat.textContent.includes("M+")
          ? `${currentCount}M+`
          : `${currentCount}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          stat.textContent = stat.textContent.includes("M+")
            ? `${target}M+`
            : `${target}${suffix}`;
        }
      };

      stat.classList.add("animate");
      updateCount();
    });
  }

  // Usar Intersection Observer para activar la animación cuando las estadísticas son visibles
  const statsSection = document.querySelector(".biografia-stats");
  if (statsSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(statsSection);
  }

  // Efecto para los botones de navegación en el hero
  const heroNavButtons = document.querySelectorAll(".hero-nav-button");

  heroNavButtons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      const icon = button.querySelector(".btn-icon");
      if (icon) {
        icon.style.transform = "translateX(-3px)";
      }
    });

    button.addEventListener("mouseleave", () => {
      const icon = button.querySelector(".btn-icon");
      if (icon) {
        icon.style.transform = "translateX(0)";
      }
    });
  });

  // Asegurarse de que el atributo data-text del título hero-v2 esté configurado correctamente
  const heroTitle = document.querySelector(".hero-title-v2");
  if (heroTitle) {
    // Asegurarse de que el texto del data-attribute coincida con el contenido
    const titleText = heroTitle.textContent.trim();
    heroTitle.setAttribute("data-text", titleText);
  }

  // Funcionalidad específica para la sección Top Tracks - Hall of Fame
  const legendaryTracks = document.querySelectorAll(".legendary-track");
  if (legendaryTracks.length > 0) {
    // Añadir animación de entrada para los tracks
    legendaryTracks.forEach((track, index) => {
      track.style.opacity = "0";
      track.style.transform = "translateY(30px)";
      track.style.transition = "opacity 0.5s ease, transform 0.5s ease";

      setTimeout(() => {
        track.style.opacity = "1";
        track.style.transform = "translateY(0)";
      }, 300 + index * 150);
    });

    // Funcionalidad para las barras de forma de onda
    const waveformBars = document.querySelectorAll(".waveform-bar");
    waveformBars.forEach((bar) => {
      const randomDelay = Math.random() * 1.5;
      bar.style.animationDelay = `${randomDelay}s`;
    });
  }

  // Añadir código específico para la sección Top Tracks - Hall of Fame
  // Agregar este código al final del evento DOMContentLoaded

  // Funcionalidad específica para la sección Top Tracks - Hall of Fame
  const legendaryTracks2 = document.querySelectorAll(".legendary-track");
  if (legendaryTracks2.length > 0) {
    // Añadir animación de entrada para los tracks
    legendaryTracks2.forEach((track, index) => {
      track.style.opacity = "0";
      track.style.transform = "translateY(30px)";
      track.style.transition = "opacity 0.5s ease, transform 0.5s ease";

      setTimeout(() => {
        track.style.opacity = "1";
        track.style.transform = "translateY(0)";
      }, 300 + index * 150);
    });

    // Añadir efectos de hover para los iconos de plataforma
    const platformIcons = document.querySelectorAll(".platform-icon");
    platformIcons.forEach((icon) => {
      icon.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-3px) scale(1.1)";
      });

      icon.addEventListener("mouseleave", function () {
        this.style.transform = "";
      });
    });

    // Añadir efecto de pulsación al hacer clic en los iconos
    platformIcons.forEach((icon) => {
      icon.addEventListener("click", function () {
        // Crear efecto de pulsación
        this.style.transform = "scale(0.95)";
        setTimeout(() => {
          this.style.transform = "translateY(-3px) scale(1.1)";
        }, 100);

        // Registrar analítica (simulado)
        const platform = this.classList.contains("spotify")
          ? "Spotify"
          : this.classList.contains("youtube")
          ? "YouTube"
          : "Apple Music";
        const track =
          this.closest(".legendary-track").getAttribute("data-track");
        console.log(`Abriendo ${track} en ${platform}`);
      });
    });

    // Funcionalidad para reproducir/pausar tracks
    const playButtons = document.querySelectorAll(".play-btn");
    playButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const track = this.closest(".legendary-track");
        const isPlaying = track.classList.contains("playing");

        // Pausar todos los tracks primero
        document.querySelectorAll(".legendary-track").forEach((t) => {
          t.classList.remove("playing");
          const playIcon = t.querySelector(".play-btn i");
          if (playIcon) {
            playIcon.classList.remove("fa-pause");
            playIcon.classList.add("fa-play");
          }
        });

        // Si no estaba reproduciendo, iniciar reproducción
        if (!isPlaying) {
          track.classList.add("playing");
          const icon = this.querySelector("i");
          icon.classList.remove("fa-play");
          icon.classList.add("fa-pause");

          // Simular reproducción de audio (en un sitio real, aquí se reproduciría el audio)
          console.log(`Reproduciendo: ${track.getAttribute("data-track")}`);

          // Animar las barras de forma de onda
          const waveformBars = track.querySelectorAll(".waveform-bar");
          waveformBars.forEach((bar) => {
            // Asignar alturas aleatorias para simular la visualización de audio
            const randomHeight = Math.floor(Math.random() * 100) + 10;
            bar.style.height = `${randomHeight}%`;

            // Asignar delays aleatorios para la animación
            const randomDelay = Math.random() * 1.5;
            bar.style.animationDelay = `${randomDelay}s`;
          });
        }
      });
    });

    // Efecto hover para los tracks
    legendaryTracks2.forEach((track) => {
      track.addEventListener("mouseenter", () => {
        const waveformBars = track.querySelectorAll(".waveform-bar");
        waveformBars.forEach((bar) => {
          // Cambiar ligeramente las alturas al hacer hover
          const currentHeight = Number.parseInt(bar.style.height || "50%");
          const newHeight = Math.min(
            100,
            currentHeight + Math.floor(Math.random() * 20)
          );
          bar.style.height = `${newHeight}%`;
        });
      });
    });

    // Hacer que las barras de forma de onda sean interactivas
    const waveformContainers = document.querySelectorAll(".waveform-container");
    waveformContainers.forEach((container) => {
      container.addEventListener("click", function (e) {
        const track = this.closest(".legendary-track");
        const containerWidth = this.offsetWidth;
        const clickPosition = e.offsetX;
        const progressPercentage = (clickPosition / containerWidth) * 100;

        // Actualizar visualmente la "reproducción"
        const bars = this.querySelectorAll(".waveform-bar");
        bars.forEach((bar, index) => {
          const barPosition = (index / bars.length) * 100;
          if (barPosition < progressPercentage) {
            bar.style.backgroundColor = "rgba(255, 0, 0, 0.6)";
          } else {
            bar.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
          }
        });

        // Simular salto en la reproducción
        console.log(
          `Saltando a: ${Math.round(
            progressPercentage
          )}% en ${track.getAttribute("data-track")}`
        );
      });
    });
  }

  // Parallax effect for hero section
  if (heroContent) {
    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition < window.innerHeight) {
        const translateY = scrollPosition * 0.4;
        const opacity = 1 - scrollPosition / (window.innerHeight * 0.8);

        heroContent.style.transform = `translateY(${translateY}px)`;
        heroContent.style.opacity = Math.max(0, opacity);
      }
    });
  }

  // Animación para las tarjetas de curiosidades
  const curiosityCards = document.querySelectorAll(".curiosity-card");

  if (curiosityCards.length > 0) {
    const curiosityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("visible");
            }, index * 150);
            curiosityObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    curiosityCards.forEach((card) => {
      card.classList.add("fade-in");
      curiosityObserver.observe(card);
    });
  }

  // Animación para las tarjetas de colaboración
  const collabCards = document.querySelectorAll(".collab-card");

  if (collabCards.length > 0) {
    const collabObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("visible");
            }, index * 200);
            collabObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    collabCards.forEach((card) => {
      card.classList.add("fade-in");
      collabObserver.observe(card);
    });
  }

  // Funcionalidad para las tarjetas de legado
  const legadoCards = document.querySelectorAll(".legado-card");

  if (legadoCards.length > 0) {
    const legadoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("show");
            }, index * 200);
            legadoObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    legadoCards.forEach((card) => {
      legadoObserver.observe(card);
    });
  }

  // Funcionalidad para los tributos
  const tributoSlides = document.querySelectorAll(".tributo-slide");
  const prevTributoBtn = document.querySelector(".tributos-navigation .prev");
  const nextTributoBtn = document.querySelector(".tributos-navigation .next");
  let currentTributoIndex = 0;

  function showTributoSlide(index) {
    tributoSlides.forEach((slide, i) => {
      slide.style.display = i === index ? "flex" : "none";
    });
    currentTributoIndex = index;
  }

  if (tributoSlides.length > 0) {
    // Inicializar el primer slide
    showTributoSlide(0);

    if (prevTributoBtn && nextTributoBtn) {
      prevTributoBtn.addEventListener("click", () => {
        let newIndex = currentTributoIndex - 1;
        if (newIndex < 0) newIndex = tributoSlides.length - 1;
        showTributoSlide(newIndex);
      });

      nextTributoBtn.addEventListener("click", () => {
        let newIndex = currentTributoIndex + 1;
        if (newIndex >= tributoSlides.length) newIndex = 0;
        showTributoSlide(newIndex);
      });
    }
  }

  // Animación para las tarjetas de artistas influenciados
  const artistaCards = document.querySelectorAll(".artista-card");

  if (artistaCards.length > 0) {
    const artistaObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("visible");
            }, index * 200);
            artistaObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    artistaCards.forEach((card) => {
      card.classList.add("fade-in");
      artistaObserver.observe(card);
    });
  }

  // Animación para las tarjetas de legado cultural
  const legadoCulturalItems = document.querySelectorAll(
    ".legado-cultural-item"
  );

  if (legadoCulturalItems.length > 0) {
    const legadoCulturalObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("visible");
            }, index * 150);
            legadoCulturalObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    legadoCulturalItems.forEach((item) => {
      item.classList.add("fade-in");
      legadoCulturalObserver.observe(item);
    });
  }

  // Animación para los álbumes
  const albums = document.querySelectorAll(".album");

  if (albums.length > 0) {
    const albumObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("visible");
            }, index * 150);
            albumObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    albums.forEach((album) => {
      album.classList.add("fade-in");
      albumObserver.observe(album);
    });
  }

  // Efecto hover para las tarjetas de sobre-canserbero
  const sobreCards = document.querySelectorAll(".sobre-card");

  if (sobreCards.length > 0) {
    sobreCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.querySelector(".sobre-card-inner").style.transform =
          "rotateY(180deg)";
      });

      card.addEventListener("mouseleave", function () {
        this.querySelector(".sobre-card-inner").style.transform =
          "rotateY(0deg)";
      });
    });
  }

  // Funcionalidad para los álbumes más escuchados
  const topAlbumCards = document.querySelectorAll(".top-album-card");
  const topAlbumPlays = document.querySelectorAll(".top-album-play");

  if (topAlbumCards.length > 0) {
    // Animación de entrada para las tarjetas
    const topAlbumObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("visible");
            }, index * 200);
            topAlbumObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    topAlbumCards.forEach((card) => {
      card.classList.add("fade-in");
      topAlbumObserver.observe(card);
    });

    // Efecto de reproducción al hacer clic en el botón de play
    topAlbumPlays.forEach((playBtn) => {
      playBtn.addEventListener("click", function () {
        const albumCard = this.closest(".top-album-card");
        const albumTitle = albumCard.querySelector("h3").textContent;

        // Simular reproducción (en un sitio real, aquí se reproduciría el álbum)
        console.log(`Reproduciendo álbum: ${albumTitle}`);

        // Efecto visual de pulsación
        this.style.transform = "scale(0.9)";
        setTimeout(() => {
          this.style.transform = "scale(1)";
        }, 150);
      });
    });
  }

  // Animación para las estadísticas de crecimiento
  const growthStats = document.querySelectorAll(".growth-number");

  if (growthStats.length > 0) {
    const growthObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Obtener el valor final (sin el signo + o %)
            const finalValue = Number.parseInt(
              entry.target.textContent.replace(/[^0-9]/g, "")
            );

            // Configurar la animación
            const startValue = 0;
            const duration = 2000; // 2 segundos
            const startTime = Date.now();
            const prefix = entry.target.textContent.includes("+") ? "+" : "";
            const suffix = entry.target.textContent.includes("%") ? "%" : "";

            // Función de animación
            const updateCounter = () => {
              const currentTime = Date.now();
              const progress = Math.min(
                (currentTime - startTime) / duration,
                1
              );
              const currentValue = Math.floor(progress * finalValue);

              entry.target.textContent = `${prefix}${currentValue}${suffix}`;

              if (progress < 1) {
                requestAnimationFrame(updateCounter);
              } else {
                entry.target.textContent = `${prefix}${finalValue}${suffix}`;
              }
            };

            updateCounter();
            growthObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    growthStats.forEach((stat) => {
      growthObserver.observe(stat);
    });
  }

  // Funcionalidad para la rotación de la máscara
  const mask3d = document.querySelector(".mask-3d");
  const rotateLeft = document.querySelector(".rotate-left");
  const rotateRight = document.querySelector(".rotate-right");
  let isAnimating = false;

  function handleRotation(direction) {
    if (isAnimating) return;

    isAnimating = true;
    const className =
      direction === "left" ? "rotate-left-anim" : "rotate-right-anim";

    mask3d.classList.add(className);

    // Efecto de partículas durante la rotación
    createParticles(direction);

    setTimeout(() => {
      mask3d.classList.remove(className);
      isAnimating = false;
    }, 1000);
  }

  function createParticles(direction) {
    const particlesContainer = document.createElement("div");
    particlesContainer.className = "mask-particles";
    mask3d.appendChild(particlesContainer);

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";

      const randomX = Math.random() * 400 - 200;
      const randomY = Math.random() * 400 - 200;
      const randomDelay = Math.random() * 0.5;

      particle.style.cssText = `
                position: absolute;
                width: 5px;
                height: 5px;
                background: var(--secondary-color);
                border-radius: 50%;
                pointer-events: none;
                opacity: 0;
                transform: translate(${randomX}px, ${randomY}px);
                animation: particleAnimation 1s ${randomDelay}s ease-out forwards;
            `;

      particlesContainer.appendChild(particle);
    }

    setTimeout(() => {
      particlesContainer.remove();
    }, 2000);
  }

  // Agregar estilos para la animación de partículas
  const style = document.createElement("style");
  style.textContent = `
        @keyframes particleAnimation {
            0% {
                opacity: 1;
                transform: translate(0, 0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translate(var(--x), var(--y)) scale(0);
            }
        }
    `;
  document.head.appendChild(style);

  rotateLeft.addEventListener("click", () => handleRotation("left"));
  rotateRight.addEventListener("click", () => handleRotation("right"));

  // Efecto de hover 3D
  mask3d.addEventListener("mousemove", (e) => {
    if (isAnimating) return;

    const rect = mask3d.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    mask3d.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  mask3d.addEventListener("mouseleave", () => {
    if (!isAnimating) {
      mask3d.style.transform = "none";
    }
  });

  // Funcionalidad para la sección de máscaras
  const maskItems = document.querySelectorAll(".mask-item");
  const prevBtn = document.querySelector(".prev-mask");
  const nextBtn = document.querySelector(".next-mask");
  let currentIndex = 0;

  function updateMaskVisibility() {
    maskItems.forEach((item, index) => {
      if (index === currentIndex) {
        item.style.opacity = "1";
        item.style.transform = "translateX(0)";
        item.style.pointerEvents = "auto";
      } else {
        item.style.opacity = "0";
        item.style.transform = `translateX(${
          index < currentIndex ? "-100%" : "100%"
        })`;
        item.style.pointerEvents = "none";
      }
    });
  }

  function goToNextMask() {
    currentIndex = (currentIndex + 1) % maskItems.length;
    updateMaskVisibility();
  }

  function goToPrevMask() {
    currentIndex = (currentIndex - 1 + maskItems.length) % maskItems.length;
    updateMaskVisibility();
  }

  // Inicializar visibilidad
  updateMaskVisibility();

  // Event listeners para los botones de navegación
  nextBtn.addEventListener("click", goToNextMask);
  prevBtn.addEventListener("click", goToPrevMask);

  // Efecto parallax en hover para las máscaras
  maskItems.forEach((item) => {
    const card = item.querySelector(".mask-card");

    item.addEventListener("mousemove", (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * 10;
      const rotateY = ((centerX - x) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    item.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
    });
  });

  // Animación de entrada inicial
  maskItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(50px)";
    setTimeout(() => {
      item.style.transition = "all 0.8s ease";
      item.style.opacity = index === 0 ? "1" : "0";
      item.style.transform = index === 0 ? "translateY(0)" : "translateX(100%)";
    }, 100);
  });

  // Función para manejar la línea de tiempo curva
  function initCurvedTimeline() {
    const timelinePoints = document.querySelectorAll(".timeline-point");
    const timelineCards = document.querySelectorAll(".timeline-card");

    timelinePoints.forEach((point, index) => {
      point.addEventListener("click", () => {
        // Remove active class from all points
        timelinePoints.forEach((p) => p.classList.remove("active"));
        timelineCards.forEach((c) => c.classList.remove("active"));

        // Add active class to clicked point
        point.classList.add("active");
        timelineCards[index].classList.add("active");
      });
    });
  }

  // Funciones de inicialización
  function initTimeline() {
    const timelineMarkers = document.querySelectorAll(".timeline-marker");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    timelineMarkers.forEach((marker) => observer.observe(marker));
  }

  function initImpactStats() {
    const impactStats = document.querySelectorAll(".impact-stat");

    impactStats.forEach((stat) => {
      stat.addEventListener("mousemove", (e) => {
        const rect = stat.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        stat.style.setProperty("--x", `${x}%`);
        stat.style.setProperty("--y", `${y}%`);
      });
    });
  }

  // Inicializar cuando el DOM esté cargado
  document.addEventListener("DOMContentLoaded", () => {
    initTimeline();
    initImpactStats();
  });
});
