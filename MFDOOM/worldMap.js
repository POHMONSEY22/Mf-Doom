// Configuración del mapa mundial interactivo
document.addEventListener('DOMContentLoaded', () => {
    // Configuración de los continentes con sus coordenadas SVG
    const continents = {
        northAmerica: `M 50,50 L 160,50 L 200,60 L 220,70 L 230,90 L 225,110 L 215,120 
                       L 190,130 L 170,140 L 140,140 L 120,130 L 100,120 L 80,100 
                       L 60,80 L 50,70 Z`,
        southAmerica: `M 130,160 L 150,170 L 160,190 L 165,210 L 160,230 L 150,250 
                       L 140,260 L 120,265 L 110,250 L 105,230 L 110,210 L 120,190 
                       L 125,175 Z`,
        europe: `M 240,60 L 260,65 L 280,70 L 290,80 L 285,90 L 270,100 L 250,105 
                 L 235,100 L 230,90 L 235,75 Z`,
        africa: `M 235,110 L 255,115 L 270,125 L 280,140 L 275,160 L 265,180 
                 L 250,190 L 235,185 L 220,175 L 215,155 L 220,135 L 230,120 Z`,
        asia: `M 290,50 L 320,55 L 350,65 L 380,80 L 400,100 L 410,120 L 405,140 
               L 390,160 L 370,170 L 350,165 L 330,155 L 310,140 L 300,120 L 295,100 
               L 300,80 L 295,65 Z`,
        oceania: `M 380,180 L 400,185 L 410,195 L 405,210 L 390,215 L 375,210 
                  L 370,200 L 375,190 Z`
    };

    // Crear el SVG del mapa
    const createWorldMap = () => {
        const mapContainer = document.querySelector('.world-map');
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 500 300');
        svg.style.width = '100%';
        svg.style.height = '100%';

        // Crear cada continente
        Object.entries(continents).forEach(([continent, path]) => {
            const continentPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            continentPath.setAttribute('d', path);
            continentPath.classList.add('continent', continent);
            
            // Agregar efectos de hover y click
            continentPath.addEventListener('mouseenter', () => highlightContinent(continent));
            continentPath.addEventListener('mouseleave', () => removeHighlight(continent));
            continentPath.addEventListener('click', () => showTestimonial(continent));
            
            svg.appendChild(continentPath);
        });

        mapContainer.appendChild(svg);
    };

    // Resaltar continente al pasar el mouse
    const highlightContinent = (continent) => {
        const path = document.querySelector(`.${continent}`);
        path.style.fill = 'rgba(190, 124, 255, 0.5)';
        path.style.filter = 'drop-shadow(0 0 15px rgba(190, 124, 255, 0.6))';
        path.style.transform = 'scale(1.05)';
    };

    // Remover resaltado
    const removeHighlight = (continent) => {
        const path = document.querySelector(`.${continent}`);
        path.style.fill = 'rgba(190, 124, 255, 0.25)';
        path.style.filter = 'drop-shadow(0 0 10px rgba(190, 124, 255, 0.3))';
        path.style.transform = 'scale(1)';
    };

    // Mostrar testimonial correspondiente
    const showTestimonial = (continent) => {
        // Ocultar todos los testimoniales
        document.querySelectorAll('.testimonial-card').forEach(card => {
            card.classList.remove('active');
        });
        
        // Mostrar el testimonial correspondiente
        const testimonial = document.querySelector(`[data-region="${continent}"]`);
        if (testimonial) {
            testimonial.classList.add('active');
        }
    };

    // Inicializar el mapa
    createWorldMap();

    // Agregar animación de pulso a los puntos de impacto
    const addPulseAnimation = () => {
        const points = document.querySelectorAll('.map-point');
        points.forEach(point => {
            const pulse = document.createElement('div');
            pulse.classList.add('point-pulse');
            point.appendChild(pulse);
        });
    };

    // Inicializar animaciones
    addPulseAnimation();
});

// Estilos CSS necesarios para el SVG
const style = document.createElement('style');
style.textContent = `
    .continent {
        fill: rgba(190, 124, 255, 0.25);
        stroke: rgba(190, 124, 255, 0.5);
        stroke-width: 1;
        transition: all 0.3s ease;
        cursor: pointer;
    }

    .continent:hover {
        fill: rgba(190, 124, 255, 0.5);
        filter: drop-shadow(0 0 15px rgba(190, 124, 255, 0.6));
    }

    @keyframes pulse {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style); 