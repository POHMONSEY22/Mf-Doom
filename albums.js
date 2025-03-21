document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar elementos
    const albumCards = document.querySelectorAll('.album-card');
    const gridViewBtn = document.querySelector('.view-toggle button[data-view="grid"]');
    const listViewBtn = document.querySelector('.view-toggle button[data-view="list"]');
    const albumsGrid = document.querySelector('.albums-grid');
    const yearFilterBtns = document.querySelectorAll('.year-filter-btn');
    
    // Hacer todos los álbumes visibles por defecto
    albumCards.forEach(card => {
        card.classList.add('visible');
    });

    // Marcar el botón "Todos" como activo por defecto
    const todosBtn = document.querySelector('.year-filter-btn[data-year="todos"]');
    if (todosBtn) {
        todosBtn.classList.add('active');
    }

    // Filtrado por año
    yearFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover clase activa de todos los botones
            yearFilterBtns.forEach(b => b.classList.remove('active'));
            
            // Agregar clase activa al botón clickeado
            btn.classList.add('active');
            
            const year = btn.getAttribute('data-year');
            
            albumCards.forEach(card => {
                if (year === 'todos') {
                    card.classList.add('visible');
                } else {
                    const albumYear = card.getAttribute('data-year');
                    if (albumYear === year) {
                        card.classList.add('visible');
                    } else {
                        card.classList.remove('visible');
                    }
                }
            });
        });
    });

    // Cambio de vista (grid/list)
    gridViewBtn?.addEventListener('click', () => {
        gridViewBtn.classList.add('active');
        listViewBtn?.classList.remove('active');
        albumsGrid?.classList.remove('list-view');
    });

    listViewBtn?.addEventListener('click', () => {
        listViewBtn.classList.add('active');
        gridViewBtn?.classList.remove('active');
        albumsGrid?.classList.add('list-view');
    });

    // Efecto de volteo de tarjeta
    albumCards.forEach(card => {
        card.addEventListener('click', () => {
            const inner = card.querySelector('.album-inner');
            if (inner) {
                inner.style.transform = inner.style.transform === 'rotateY(180deg)' 
                    ? 'rotateY(0)' 
                    : 'rotateY(180deg)';
            }
        });
    });

    // Observador de intersección para animaciones de entrada
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    albumCards.forEach(card => observer.observe(card));

    // Efecto de parallax en las tarjetas
    albumCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // Reproductor de audio (preview)
    const tracks = document.querySelectorAll('.track');
    let currentlyPlaying = null;

    tracks.forEach(track => {
        track.addEventListener('click', () => {
            if (currentlyPlaying) {
                currentlyPlaying.classList.remove('playing');
            }
            track.classList.add('playing');
            currentlyPlaying = track;
        });
    });
}); 