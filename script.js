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
  document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.mask-gallery');
    const prevBtn = document.querySelector('.prev-mask');
    const nextBtn = document.querySelector('.next-mask');
    
    prevBtn.addEventListener('click', () => {
        gallery.scrollBy({
            left: -300,
            behavior: 'smooth'
        });
    });
    
    nextBtn.addEventListener('click', () => {
        gallery.scrollBy({
            left: 300,
            behavior: 'smooth'
        });
    });
  });
  
});

// Script para la sección Universo Sonoro
document.addEventListener("DOMContentLoaded", () => {
  // Funcionalidad para el vinilo
  const vinylRecord = document.querySelector(".vinyl-record")
  const playSampleButtons = document.querySelectorAll(".play-sample")
  const viewSampleButtons = document.querySelectorAll(".view-sample")

  // Función para reproducir/pausar el vinilo
  function toggleVinylPlay() {
    vinylRecord.classList.toggle("playing")
  }

  // Añadir evento de clic al vinilo
  if (vinylRecord) {
    vinylRecord.addEventListener("click", toggleVinylPlay)
  }

  // Añadir eventos a los botones de reproducción
  playSampleButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Activar animación del vinilo
      vinylRecord.classList.add("playing")

      // Cambiar el ícono del botón
      const icon = this.querySelector("i")
      if (icon.classList.contains("fa-play")) {
        // Restablecer todos los botones primero
        playSampleButtons.forEach((btn) => {
          btn.querySelector("i").classList.remove("fa-pause")
          btn.querySelector("i").classList.add("fa-play")
          btn.textContent = " Escuchar Sample"
        })

        // Configurar este botón como reproduciendo
        icon.classList.remove("fa-play")
        icon.classList.add("fa-pause")
        this.innerHTML = '<i class="fas fa-pause"></i> Pausar'
      } else {
        // Pausar reproducción
        icon.classList.remove("fa-pause")
        icon.classList.add("fa-play")
        this.innerHTML = '<i class="fas fa-play"></i> Escuchar Sample'
        vinylRecord.classList.remove("playing")
      }

      // Aquí se podría añadir código para reproducir el audio real
      console.log("Reproduciendo/Pausando sample")
    })
  })

  // Añadir eventos a los botones de ver detalles
  viewSampleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Aquí se podría mostrar un modal con detalles del sample
      alert("Detalles del sample: Esta funcionalidad se implementará próximamente.")
    })
  })

  // Efecto de parallax para el vinilo
  window.addEventListener("mousemove", (e) => {
    if (!vinylRecord) return

    const mouseX = e.clientX / window.innerWidth
    const mouseY = e.clientY / window.innerHeight

    const moveX = (mouseX - 0.5) * 20
    const moveY = (mouseY - 0.5) * 20

    vinylRecord.style.transform = `translate(${moveX}px, ${moveY}px) ${vinylRecord.classList.contains("playing") ? "rotate(0deg)" : ""}`
  })

  // Animación de entrada para el vinilo
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 },
  )

  if (vinylRecord) {
    vinylRecord.style.opacity = "0"
    vinylRecord.style.transform = "translateY(50px)"
    vinylRecord.style.transition = "opacity 1s ease, transform 1s ease"
    observer.observe(vinylRecord)
  }

  // Animación para las tarjetas de samples
  const sampleCards = document.querySelectorAll(".sample-card")
  sampleCards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(50px)"
    card.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`
    observer.observe(card)
  })
})

// Script para la sección Técnica Lírica Moderna
document.addEventListener("DOMContentLoaded", () => {
  // Inicializar elementos
  initVinylPlayer()
  initTechniqueCards()
  initStatCounters()
  initVerseExplorer()

  // Añadir gradiente SVG para los círculos de progreso
  const svgGradient = `
        <svg width="0" height="0">
            <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#ffd700" />
                    <stop offset="100%" stop-color="#ff9500" />
                </linearGradient>
            </defs>
        </svg>
    `
  document.body.insertAdjacentHTML("beforeend", svgGradient)
})

// Funcionalidad para el reproductor de vinilo
function initVinylPlayer() {
  const playBtn = document.querySelector(".tl-play-btn")
  const vinyl = document.querySelector(".tl-vinyl")
  const audioWave = document.querySelector(".tl-audio-wave")

  if (!playBtn || !vinyl || !audioWave) return

  playBtn.addEventListener("click", function () {
    const isPlaying = vinyl.classList.contains("playing")

    if (isPlaying) {
      vinyl.classList.remove("playing")
      audioWave.classList.remove("playing")
      this.innerHTML = '<i class="fas fa-play"></i><span>Reproducir Verso</span>'
    } else {
      vinyl.classList.add("playing")
      audioWave.classList.add("playing")
      this.innerHTML = '<i class="fas fa-pause"></i><span>Pausar</span>'

      // Simular reproducción de audio (aquí se podría implementar un reproductor real)
      console.log("Reproduciendo audio...")
    }
  })

  // Efecto hover para las partículas de letras
  const lyricParticles = document.querySelectorAll(".tl-lyric-particle")
  lyricParticles.forEach((particle) => {
    particle.addEventListener("click", function () {
      // Resaltar la partícula seleccionada
      lyricParticles.forEach((p) => p.classList.remove("active"))
      this.classList.add("active")

      // Reproducir el fragmento de audio correspondiente (simulado)
      console.log(`Reproduciendo fragmento: ${this.textContent.trim()}`)
    })
  })
}

// Funcionalidad para las tarjetas de técnicas
function initTechniqueCards() {
  const listenButtons = document.querySelectorAll(".tl-listen-btn")

  listenButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.stopPropagation() // Evitar que el clic voltee la tarjeta

      // Cambiar el estado del botón
      const icon = this.querySelector("i")
      const text = this.querySelector("span")

      if (icon.classList.contains("fa-volume-up")) {
        icon.classList.remove("fa-volume-up")
        icon.classList.add("fa-volume-mute")
        text.textContent = "Detener"

        // Simular reproducción de audio
        console.log(`Reproduciendo ejemplo de ${this.closest(".tl-card-back").querySelector("h4").textContent}`)
      } else {
        icon.classList.remove("fa-volume-mute")
        icon.classList.add("fa-volume-up")
        text.textContent = "Escuchar"

        // Detener reproducción
        console.log("Deteniendo reproducción")
      }
    })
  })
}

// Funcionalidad para los contadores de estadísticas
function initStatCounters() {
  const statItems = document.querySelectorAll(".tl-stat-item")

  // Configurar el observador de intersección
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const statItem = entry.target
          const targetValue = Number.parseFloat(statItem.getAttribute("data-value"))
          const counter = statItem.querySelector(".tl-stat-counter")
          const progressCircle = statItem.querySelector(".tl-progress-fill")

          // Animar el contador
          animateCounter(counter, targetValue)

          // Animar el círculo de progreso
          if (progressCircle) {
            const circumference = 2 * Math.PI * 45 // 2πr donde r=45
            progressCircle.style.strokeDasharray = circumference

            // Calcular el porcentaje para el círculo (máximo 100%)
            let percentage
            if (targetValue > 1000) {
              percentage = targetValue / 10000 // Para valores grandes como 8000
            } else if (targetValue > 100) {
              percentage = targetValue / 1500 // Para valores medianos como 1200
            } else {
              percentage = targetValue / 10 // Para valores pequeños como 5.4
            }

            percentage = Math.min(percentage, 1) // Asegurar que no exceda el 100%

            const dashoffset = circumference * (1 - percentage)

            // Animar el trazo
            setTimeout(() => {
              progressCircle.style.strokeDashoffset = dashoffset
            }, 100)
          }

          // Dejar de observar después de animar
          observer.unobserve(statItem)
        }
      })
    },
    { threshold: 0.2 },
  )

  // Observar cada elemento de estadística
  statItems.forEach((item) => {
    observer.observe(item)
  })
}

// Función para animar contadores
function animateCounter(element, targetValue) {
  const duration = 2000 // 2 segundos
  const startTime = Date.now()
  const isDecimal = targetValue % 1 !== 0

  function updateCounter() {
    const currentTime = Date.now()
    const elapsedTime = currentTime - startTime
    const progress = Math.min(elapsedTime / duration, 1)

    // Usar una función de easing para hacer la animación más natural
    const easedProgress = easeOutQuart(progress)
    const currentValue = easedProgress * targetValue

    if (isDecimal) {
      element.textContent = currentValue.toFixed(1)
    } else {
      element.textContent = Math.floor(currentValue) + "+"
    }

    if (progress < 1) {
      requestAnimationFrame(updateCounter)
    } else {
      // Asegurar que el valor final sea exacto
      if (isDecimal) {
        element.textContent = targetValue.toFixed(1)
      } else {
        element.textContent = Math.floor(targetValue) + "+"
      }
    }
  }

  updateCounter()
}

// Función de easing para animaciones más suaves
function easeOutQuart(x) {
  return 1 - Math.pow(1 - x, 4)
}

// Funcionalidad para el explorador de versos
function initVerseExplorer() {
  const tabs = document.querySelectorAll(".tl-tab")
  const tabContents = document.querySelectorAll(".tl-tab-content")
  const analyzeButtons = document.querySelectorAll(".tl-analyze-btn")
  const verseAnalysis = document.querySelector(".tl-verse-analysis")
  const closeAnalysisBtn = document.querySelector(".tl-close-analysis")

  // Cambio de pestañas
  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab")

      // Actualizar pestañas activas
      tabs.forEach((t) => t.classList.remove("active"))
      this.classList.add("active")

      // Mostrar contenido correspondiente
      tabContents.forEach((content) => {
        content.classList.remove("active")
        if (content.id === `${tabId}-content`) {
          content.classList.add("active")
        }
      })

      // Cerrar el panel de análisis si está abierto
      if (verseAnalysis && verseAnalysis.classList.contains("active")) {
        verseAnalysis.classList.remove("active")
      }
    })
  })

  // Botones de análisis
  if (analyzeButtons.length && verseAnalysis) {
    analyzeButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const verseLine = this.closest(".tl-verse-line")
        const verseText = verseLine.querySelector("p").textContent

        // Mostrar panel de análisis
        verseAnalysis.classList.add("active")

        // Actualizar contenido del análisis (simulado)
        console.log(`Analizando verso: ${verseText}`)

        // Aquí se podría implementar un análisis real del verso
        // y actualizar el contenido del panel con los resultados
      })
    })
  }

  // Cerrar análisis
  if (closeAnalysisBtn && verseAnalysis) {
    closeAnalysisBtn.addEventListener("click", () => {
      verseAnalysis.classList.remove("active")
    })
  }

  // Funcionalidad de búsqueda
  const searchInput = document.querySelector(".tl-explorer-search input")
  const searchButton = document.querySelector(".tl-explorer-search button")

  if (searchInput && searchButton) {
    const handleSearch = () => {
      const searchTerm = searchInput.value.toLowerCase().trim()
      if (!searchTerm) return

      // Buscar en todas las líneas de verso
      const verseLines = document.querySelectorAll(".tl-verse-line p")
      let found = false

      verseLines.forEach((line) => {
        const text = line.textContent.toLowerCase()
        const verseLine = line.closest(".tl-verse-line")

        if (text.includes(searchTerm)) {
          // Resaltar resultados
          verseLine.style.background = "rgba(255, 215, 0, 0.1)"
          verseLine.scrollIntoView({ behavior: "smooth", block: "center" })
          found = true
        } else {
          verseLine.style.background = ""
        }
      })

      if (!found) {
        alert("No se encontraron coincidencias")
      }
    }

    searchButton.addEventListener("click", handleSearch)
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        handleSearch()
      }
    })
  }
}

// Script para la sección Music Dashboard
document.addEventListener("DOMContentLoaded", () => {
  // Inicializar elementos
  initStatCounters()
  initMiniCharts()
  initAlbumCarousel()
  initTrackPlayers()
  initGrowthChart()
  initWorldMap()

  // Inicializar selectores de plataforma
  const platformButtons = document.querySelectorAll(".md-platform-btn")
  platformButtons.forEach((button) => {
    button.addEventListener("click", function () {
      platformButtons.forEach((btn) => btn.classList.remove("active"))
      this.classList.add("active")

      const platform = this.getAttribute("data-platform")
      console.log(`Filtrando por plataforma: ${platform}`)
      // Aquí se implementaría la lógica para filtrar los datos por plataforma
    })
  })
})

// Función para inicializar los contadores de estadísticas
function initStatCounters() {
  const statValues = document.querySelectorAll(".md-stat-value[data-value], .md-growth-value[data-value]")

  // Configurar el observador de intersección
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target
          const targetValue = Number.parseFloat(element.getAttribute("data-value"))
          const isPercentage = element.textContent.includes("%")
          const isPlus = element.textContent.includes("+")

          // Animar el contador
          animateCounter(element, targetValue, isPercentage, isPlus)

          // Dejar de observar después de animar
          observer.unobserve(element)
        }
      })
    },
    { threshold: 0.2 },
  )

  // Observar cada elemento de estadística
  statValues.forEach((item) => {
    observer.observe(item)
  })

  // Animar las barras de estadísticas
  const statBars = document.querySelectorAll(".md-stat-bar-fill")
  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Activar la animación de la barra
          entry.target.style.width = entry.target.style.width

          // Dejar de observar después de animar
          barObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.2 },
  )

  statBars.forEach((bar) => {
    barObserver.observe(bar)
  })
}

// Función para animar contadores
function animateCounter(element, targetValue, isPercentage, isPlus) {
  const duration = 2000 // 2 segundos
  const startTime = Date.now()

  function updateCounter() {
    const currentTime = Date.now()
    const elapsedTime = currentTime - startTime
    const progress = Math.min(elapsedTime / duration, 1)

    // Usar una función de easing para hacer la animación más natural
    const easedProgress = easeOutQuart(progress)
    const currentValue = easedProgress * targetValue

    if (isPercentage) {
      element.textContent = `+${Math.floor(currentValue)}%`
    } else if (isPlus) {
      element.textContent = `${Math.floor(currentValue)}+`
    } else {
      element.textContent = `${Math.floor(currentValue)}M+`
    }

    if (progress < 1) {
      requestAnimationFrame(updateCounter)
    } else {
      // Asegurar que el valor final sea exacto
      if (isPercentage) {
        element.textContent = `+${Math.floor(targetValue)}%`
      } else if (isPlus) {
        element.textContent = `${Math.floor(targetValue)}+`
      } else {
        element.textContent = `${Math.floor(targetValue)}M+`
      }
    }
  }

  updateCounter()
}

// Función de easing para animaciones más suaves
function easeOutQuart(x) {
  return 1 - Math.pow(1 - x, 4)
}

// Función para inicializar los mini gráficos
function initMiniCharts() {
  const miniCharts = document.querySelectorAll(".md-mini-chart")

  miniCharts.forEach((canvas, index) => {
    const ctx = canvas.getContext("2d")

    // Generar datos aleatorios para la demostración
    const data = generateRandomData(12)

    // Dibujar el mini gráfico
    drawMiniChart(ctx, data, index)
  })
}

// Función para generar datos aleatorios
function generateRandomData(count) {
  const data = []
  for (let i = 0; i < count; i++) {
    data.push(Math.random() * 50 + 50) // Valores entre 50 y 100
  }
  return data
}

// Función para dibujar mini gráficos
function drawMiniChart(ctx, data, index) {
  const width = ctx.canvas.width
  const height = ctx.canvas.height

  // Limpiar el canvas
  ctx.clearRect(0, 0, width, height)

  // Configurar el estilo
  ctx.strokeStyle = index === 0 ? "#ff3d00" : index === 1 ? "#ff9e80" : "#ff6e40"
  ctx.lineWidth = 2
  ctx.lineCap = "round"
  ctx.lineJoin = "round"

  // Comenzar el trazado
  ctx.beginPath()

  // Calcular el paso horizontal
  const step = width / (data.length - 1)

  // Dibujar la línea
  data.forEach((value, i) => {
    const x = i * step
    const y = height - (value / 100) * height

    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  })

  // Trazar la línea
  ctx.stroke()

  // Añadir un gradiente de relleno
  const gradient = ctx.createLinearGradient(0, 0, 0, height)
  gradient.addColorStop(0, "rgba(183, 0, 255, 0.2)")
  gradient.addColorStop(1, "rgba(89, 0, 255, 0)")

  ctx.lineTo(width, height)
  ctx.lineTo(0, height)
  ctx.closePath()

  ctx.fillStyle = gradient
  ctx.fill()
}

// Función para inicializar el carrusel de álbumes
function initAlbumCarousel() {
  const albumItems = document.querySelectorAll(".md-album-item")
  const prevBtn = document.querySelector(".md-prev-btn")
  const nextBtn = document.querySelector(".md-next-btn")
  const currentAlbumElement = document.querySelector(".md-current-album")
  let currentIndex = 0

  function showAlbum(index) {
    albumItems.forEach((item, i) => {
      item.classList.remove("active")
      if (i === index) {
        item.classList.add("active")
      }
    })

    currentIndex = index
    currentAlbumElement.textContent = (currentIndex + 1).toString().padStart(2, "0")
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      let newIndex = currentIndex - 1
      if (newIndex < 0) newIndex = albumItems.length - 1
      showAlbum(newIndex)
    })

    nextBtn.addEventListener("click", () => {
      let newIndex = currentIndex + 1
      if (newIndex >= albumItems.length) newIndex = 0
      showAlbum(newIndex)
    })
  }

  // Inicializar con el primer álbum
  showAlbum(0)
}

// Función para inicializar los reproductores de pistas
function initTrackPlayers() {
  const playButtons = document.querySelectorAll(".md-play-btn")
  const trackItems = document.querySelectorAll(".md-track-item")

  // Botones de reproducción de álbum
  playButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const albumId = this.getAttribute("data-album")
      const albumItem = document.querySelector(`.md-album-item[data-album="${albumId}"]`)

      if (albumItem) {
        const isPlaying = albumItem.classList.contains("playing")

        // Detener todos los álbumes primero
        document.querySelectorAll(".md-album-item").forEach((item) => {
          item.classList.remove("playing")
        })

        // Detener todas las pistas
        trackItems.forEach((track) => {
          track.classList.remove("playing")
        })

        // Si no estaba reproduciendo, iniciar reproducción
        if (!isPlaying) {
          albumItem.classList.add("playing")

          // Cambiar el ícono del botón
          this.innerHTML = '<i class="fas fa-pause"></i>'

          // Simular reproducción de audio
          console.log(`Reproduciendo álbum: ${albumId}`)
        } else {
          // Restaurar el ícono del botón
          this.innerHTML = '<i class="fas fa-play"></i>'
        }
      }
    })
  })

  // Reproducción de pistas individuales
  trackItems.forEach((track) => {
    const playBtn = track.querySelector(".md-track-play")

    if (playBtn) {
      playBtn.addEventListener("click", function (e) {
        e.stopPropagation() // Evitar que el clic se propague al track-item

        const isPlaying = track.classList.contains("playing")

        // Detener todas las pistas primero
        trackItems.forEach((t) => {
          t.classList.remove("playing")
        })

        // Si no estaba reproduciendo, iniciar reproducción
        if (!isPlaying) {
          track.classList.add("playing")

          // Cambiar el ícono del botón
          this.innerHTML = '<i class="fas fa-pause"></i>'

          // Simular reproducción de audio
          const trackName = track.querySelector(".md-track-name").textContent
          console.log(`Reproduciendo pista: ${trackName}`)
        } else {
          // Restaurar el ícono del botón
          this.innerHTML = '<i class="fas fa-play"></i>'
        }
      })
    }
  })
}

// Función para inicializar el gráfico de crecimiento
function initGrowthChart() {
  const canvas = document.getElementById("growthChart")

  if (!canvas) return

  const ctx = canvas.getContext("2d")

  // Datos para el gráfico (simulados)
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
  const data2020 = [10, 12, 15, 18, 20, 22, 25, 28, 30, 32, 35, 38]
  const data2021 = [40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95]
  const data2022 = [100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210]

  // Dibujar el gráfico
  drawGrowthChart(ctx, months, data2020, data2021, data2022)
}

// Función para dibujar el gráfico de crecimiento
function drawGrowthChart(ctx, labels, data2020, data2021, data2022) {
  const width = ctx.canvas.width
  const height = ctx.canvas.height

  // Limpiar el canvas
  ctx.clearRect(0, 0, width, height)

  // Configurar el estilo
  ctx.font = "12px Arial"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"

  // Dibujar el fondo
  ctx.fillStyle = "rgba(255, 255, 255, 0.05)"
  ctx.fillRect(0, 0, width, height)

  // Dibujar las líneas de la cuadrícula
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
  ctx.lineWidth = 1

  // Líneas horizontales
  for (let i = 0; i <= 5; i++) {
    const y = height - (i / 5) * (height - 60) - 30

    ctx.beginPath()
    ctx.moveTo(50, y)
    ctx.lineTo(width - 20, y)
    ctx.stroke()

    // Etiquetas del eje Y
    const value = Math.round(i * 50)
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
    ctx.fillText(value + "M", 25, y)
  }

  // Líneas verticales
  const step = (width - 70) / (labels.length - 1)
  for (let i = 0; i < labels.length; i++) {
    const x = i * step + 50

    ctx.beginPath()
    ctx.moveTo(x, 30)
    ctx.lineTo(x, height - 30)
    ctx.stroke()

    // Etiquetas del eje X
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
    ctx.fillText(labels[i], x, height - 15)
  }

  // Dibujar las líneas de datos
  function drawDataLine(data, color, label, yOffset) {
    ctx.strokeStyle = color
    ctx.lineWidth = 3
    ctx.beginPath()

    for (let i = 0; i < data.length; i++) {
      const x = i * step + 50
      const y = height - (data[i] / 250) * (height - 60) - 30

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }

    ctx.stroke()

    // Añadir etiqueta de la línea
    ctx.fillStyle = color
    ctx.fillText(label, width - 100, 20 + yOffset)

    // Añadir puntos en los datos
    for (let i = 0; i < data.length; i++) {
      const x = i * step + 50
      const y = height - (data[i] / 250) * (height - 60) - 30

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fillStyle = color
      ctx.fill()

      // Añadir valor sobre el punto para el último mes
      if (i === data.length - 1) {
        ctx.fillStyle = color
        ctx.fillText(data[i] + "M", x, y - 15)
      }
    }
  }

  // Dibujar las tres líneas de datos
  drawDataLine(data2020, "rgba(47, 0, 255, 0.7)", "2020", 0)
  drawDataLine(data2021, "rgba(20, 2, 53, 0.7)", "2021", 20)
  drawDataLine(data2022, "rgba(248, 232, 0, 0.7)", "2022", 40)
}

// Función para inicializar el mapa mundial
function initWorldMap() {
  const hotspots = document.querySelectorAll(".md-map-hotspot")
  const countryName = document.querySelector(".md-country-name")
  const countryListeners = document.querySelector(".md-country-listeners span")

  hotspots.forEach((hotspot) => {
    hotspot.addEventListener("mouseenter", function () {
      const country = this.getAttribute("data-country")
      const listeners = this.getAttribute("data-listeners")

      countryName.textContent = country
      countryListeners.textContent = listeners
    })

    hotspot.addEventListener("mouseleave", () => {
      countryName.textContent = "Selecciona un país"
      countryListeners.textContent = "-"
    })
  })
}

// JavaScript para la sección de Trayectoria Musical
document.addEventListener("DOMContentLoaded", () => {
  // Elementos de la línea de tiempo
  const timelineMarkers = document.querySelectorAll('.timeline-marker');
  const eraContents = document.querySelectorAll('.timeline-era-content');
  const progressFill = document.querySelector('.timeline-progress-fill');
  const eraText = document.querySelector('.timeline-era-text');
  const yearsText = document.querySelector('.timeline-years');
  const prevBtn = document.querySelector('.timeline-prev');
  const nextBtn = document.querySelector('.timeline-next');
  
  // Datos de las eras
  const eras = [
      { id: 'kmd', name: 'Era KMD', years: '1988-1993', progress: '16.66%' },
      { id: 'hiatus', name: 'Hiatus', years: '1993-1997', progress: '33.33%' },
      { id: 'emergence', name: 'Emergencia', years: '1997-2003', progress: '50%' },
      { id: 'golden', name: 'Era Dorada', years: '2003-2009', progress: '66.66%' },
      { id: 'later', name: 'Últimos Años', years: '2009-2020', progress: '83.33%' },
      { id: 'legacy', name: 'Legado', years: '2020-∞', progress: '100%' }
  ];
  
  let currentEraIndex = 0;
  
  // Función para cambiar la era activa
  function changeEra(index) {
      // Actualizar marcadores
      timelineMarkers.forEach(marker => marker.classList.remove('active'));
      timelineMarkers[index].classList.add('active');
      
      // Actualizar contenido
      eraContents.forEach(content => content.classList.remove('active'));
      const targetContent = document.getElementById(`era-${eras[index].id}`);
      if (targetContent) targetContent.classList.add('active');
      
      // Actualizar barra de progreso
      progressFill.style.width = eras[index].progress;
      
      // Actualizar textos
      eraText.textContent = eras[index].name;
      yearsText.textContent = eras[index].years;
      
      // Actualizar índice actual
      currentEraIndex = index;
      
      // Actualizar estado de los botones
      prevBtn.disabled = currentEraIndex === 0;
      nextBtn.disabled = currentEraIndex === eras.length - 1;
  }
  
  // Eventos para los marcadores
  timelineMarkers.forEach((marker, index) => {
      marker.addEventListener('click', () => {
          changeEra(index);
      });
  });
  
  // Eventos para los botones de navegación
  if (prevBtn) {
      prevBtn.addEventListener('click', () => {
          if (currentEraIndex > 0) {
              changeEra(currentEraIndex - 1);
          }
      });
  }
  
  if (nextBtn) {
      nextBtn.addEventListener('click', () => {
          if (currentEraIndex < eras.length - 1) {
              changeEra(currentEraIndex + 1);
          }
      });
  }
  
  // Animación para las tarjetas de eventos
  const eventCards = document.querySelectorAll('.event-card');
  
  const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
              setTimeout(() => {
                  entry.target.classList.add('visible');
              }, index * 150);
              observer.unobserve(entry.target);
          }
      });
  }, { threshold: 0.1 });
  
  eventCards.forEach((card) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(card);
  });
  
  // Añadir clase para animación de aparición
  document.head.insertAdjacentHTML(
      'beforeend',
      `
      <style>
          .event-card.visible {
              opacity: 1 !important;
              transform: translateY(0) !important;
          }
      </style>
      `
  );
  
  // Inicializar con la primera era
  changeEra(0);
  
  // Efecto de parallax para los álbumes
  const albumCovers = document.querySelectorAll('.album-cover');
  const albumVinyls = document.querySelectorAll('.album-vinyl');
  
  window.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX / window.innerWidth - 0.5;
      const mouseY = e.clientY / window.innerHeight - 0.5;
      
      albumCovers.forEach(cover => {
          const moveX = mouseX * 20;
          const moveY = mouseY * 20;
          cover.style.transform = `rotateY(${25 + moveX}deg) rotateX(${moveY}deg)`;
      });
      
      albumVinyls.forEach(vinyl => {
          const moveX = mouseX * 30;
          const moveY = mouseY * 30;
          vinyl.style.transform = `translateZ(-30px) translateX(${50 + moveX}px) rotateY(${25 + moveY}deg)`;
      });
  });
});

// Código JavaScript mejorado para la gráfica interactiva
document.addEventListener("DOMContentLoaded", function() {
  // Datos para la gráfica
  const chartData = {
      months: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
      data2020: [10, 15, 20, 25, 30, 35, 38, 40, 42, 45, 48, 50],
      data2021: [55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110],
      data2022: [120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230]
  };

  // Inicializar la gráfica
  initInteractiveChart(chartData);
});

function initInteractiveChart(data) {
  const chartElement = document.getElementById('interactiveChart');
  const tooltip = document.getElementById('chartTooltip');
  
  if (!chartElement || !tooltip) return;
  
  // Limpiar el contenedor
  chartElement.innerHTML = '';
  
  // Añadir líneas de cuadrícula
  const gridLinesCount = 6; // 0M, 50M, 100M, 150M, 200M, 250M
  for (let i = 0; i < gridLinesCount; i++) {
      const position = 100 - (i * (100 / (gridLinesCount - 1)));
      const gridLine = document.createElement('div');
      gridLine.className = 'grid-line';
      gridLine.style.top = `${position}%`;
      chartElement.appendChild(gridLine);
  }
  
  // Encontrar el valor máximo para escalar correctamente
  const maxValue = Math.max(
      ...data.data2020,
      ...data.data2021,
      ...data.data2022
  );
  
  // Crear líneas SVG que conectan los puntos
  const svgContainer = document.createElement('svg');
  svgContainer.setAttribute('width', '100%');
  svgContainer.setAttribute('height', '100%');
  svgContainer.style.position = 'absolute';
  svgContainer.style.top = '0';
  svgContainer.style.left = '0';
  svgContainer.style.zIndex = '1';
  chartElement.appendChild(svgContainer);
  
  // Crear líneas de datos con SVG
  createSVGLine(svgContainer, data.months, data.data2020, maxValue, '#9900ff');
  createSVGLine(svgContainer, data.months, data.data2021, maxValue, '#ff00c8');
  createSVGLine(svgContainer, data.months, data.data2022, maxValue, '#ffcc00');
  
  // Crear puntos de datos
  createDataPoints(chartElement, data.months, data.data2020, maxValue, '#9900ff', '2020');
  createDataPoints(chartElement, data.months, data.data2021, maxValue, '#ff00c8', '2021');
  createDataPoints(chartElement, data.months, data.data2022, maxValue, '#ffcc00', '2022');
  
  // Manejar eventos de tooltip
  const dataPoints = chartElement.querySelectorAll('.data-point');
  dataPoints.forEach(point => {
      point.addEventListener('mouseenter', function(e) {
          const month = this.getAttribute('data-month');
          const value = this.getAttribute('data-value');
          const year = this.getAttribute('data-year');
          const color = this.style.backgroundColor;
          
          // Actualizar contenido del tooltip
          tooltip.innerHTML = `
              <div class="tooltip-date">${month} ${year}</div>
              <div class="tooltip-value">${value}M</div>
          `;
          
          // Posicionar tooltip
          const rect = this.getBoundingClientRect();
          const chartRect = chartElement.getBoundingClientRect();
          
          tooltip.style.left = `${rect.left - chartRect.left + window.scrollX}px`;
          tooltip.style.top = `${rect.top - chartRect.top - 70 + window.scrollY}px`;
          
          // Mostrar tooltip
          tooltip.classList.add('visible');
      });
      
      point.addEventListener('mouseleave', function() {
          tooltip.classList.remove('visible');
      });
  });
}

function createSVGLine(svgContainer, months, dataPoints, maxValue, color) {
  // Crear el elemento path para la línea
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  
  // Construir el string del path
  let pathData = '';
  
  dataPoints.forEach((value, index) => {
      // Calcular posiciones
      const xPos = (index / (months.length - 1)) * 100;
      const yPos = 100 - (value / maxValue) * 100;
      
      // Añadir al path
      if (index === 0) {
          pathData += `M${xPos},${yPos} `;
      } else {
          pathData += `L${xPos},${yPos} `;
      }
  });
  
  // Establecer atributos del path
  path.setAttribute('d', pathData);
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', color);
  path.setAttribute('stroke-width', '3');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');
  
  // Añadir efecto de brillo
  path.setAttribute('filter', 'drop-shadow(0 0 3px ' + color + ')');
  
  // Añadir animación de trazado
  path.style.strokeDasharray = path.getTotalLength();
  path.style.strokeDashoffset = path.getTotalLength();
  path.style.animation = 'drawLine 1.5s ease-in-out forwards';
  
  // Añadir el path al SVG
  svgContainer.appendChild(path);
  
  // Añadir estilo para la animación
  const style = document.createElement('style');
  style.textContent = `
      @keyframes drawLine {
          to {
              stroke-dashoffset: 0;
          }
      }
  `;
  document.head.appendChild(style);
}

function createDataPoints(chartElement, months, dataPoints, maxValue, color, year) {
  // Crear puntos de datos
  dataPoints.forEach((value, index) => {
      const point = document.createElement('div');
      point.className = 'data-point';
      point.style.backgroundColor = color;
      point.style.boxShadow = `0 0 10px ${color}`;
      
      // Posicionar el punto
      const xPos = (index / (months.length - 1)) * 100;
      const yPos = 100 - (value / maxValue) * 100;
      
      point.style.left = `${xPos}%`;
      point.style.top = `${yPos}%`;
      
      // Añadir datos para el tooltip
      point.setAttribute('data-month', months[index]);
      point.setAttribute('data-value', value);
      point.setAttribute('data-year', year);
      
      chartElement.appendChild(point);
  });
}