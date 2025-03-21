document.addEventListener('DOMContentLoaded', () => {
    const mapPoints = document.querySelectorAll('.map-point');
    const pointInfo = {
        'northAmerica': {
            title: 'Norteamérica',
            description: 'Influencia significativa en el hip-hop underground y la escena del rap alternativo.'
        },
        'europe': {
            title: 'Europa',
            description: 'Colaboraciones con artistas europeos y fuerte presencia en la escena del hip-hop experimental.'
        },
        'asia': {
            title: 'Asia',
            description: 'Inspiración en la cultura asiática y samples de música oriental en sus producciones.'
        },
        'southAmerica': {
            title: 'Sudamérica',
            description: 'Gran base de fans y reconocimiento en la comunidad hip-hop latinoamericana.'
        },
        'oceania': {
            title: 'Oceanía',
            description: 'Influencia en la escena underground y colaboraciones con productores locales.'
        }
    };

    // Añadir información a los puntos del mapa
    mapPoints.forEach(point => {
        const region = point.getAttribute('data-region');
        const info = pointInfo[region];
        
        if (info) {
            const infoBox = document.createElement('div');
            infoBox.className = 'point-info';
            infoBox.innerHTML = `
                <h4>${info.title}</h4>
                <p>${info.description}</p>
            `;
            point.appendChild(infoBox);
        }

        // Efecto de hover suave en móviles
        point.addEventListener('touchstart', function(e) {
            e.preventDefault();
            const currentActive = document.querySelector('.map-point.active');
            if (currentActive && currentActive !== this) {
                currentActive.classList.remove('active');
            }
            this.classList.toggle('active');
        });
    });

    // Cerrar info boxes al hacer click fuera
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.map-point')) {
            const activePoint = document.querySelector('.map-point.active');
            if (activePoint) {
                activePoint.classList.remove('active');
            }
        }
    });

    // Animación de entrada para los puntos
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translate(-50%, -50%) scale(1)';
            }
        });
    }, {
        threshold: 0.5
    });

    mapPoints.forEach(point => {
        point.style.opacity = '0';
        point.style.transform = 'translate(-50%, -50%) scale(0.5)';
        point.style.transition = 'all 0.5s ease-out';
        observer.observe(point);
    });
}); 