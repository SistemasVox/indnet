document.addEventListener('DOMContentLoaded', function() {

    // Verificar se a tela é grande o suficiente para mostrar o modal
    if (window.innerWidth >= 768) { // 768px é geralmente o tamanho mínimo para tablets
        // Inicializar o modal de boas-vindas
        const welcomeModal = new bootstrap.Modal(document.getElementById('welcomeModal'));
        welcomeModal.show();
    }

    // Inicializar o carrossel com intervalo de 5 segundos
    const planCarousel = new bootstrap.Carousel('#planCarousel', {
        interval: 5000,
        ride: 'carousel'
    });

    // Alternar o modo de alto contraste
    const contrastButton = document.getElementById('toggle-contrast');
    contrastButton.addEventListener('click', function() {
        document.body.classList.toggle('high-contrast');
    });

    // Adicionar efeito sonoro ao passar o mouse dentro do campo do item do carrossel
    const hoverSound = new Audio('hover-sound.mp3');
    hoverSound.preload = 'auto'; // Precarregar o áudio

    const carouselItems = document.querySelectorAll('.plan-item');

    // Ativar som após o usuário aceitar os cookies
    document.getElementById('acceptCookies').addEventListener('click', () => {
        carouselItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                hoverSound.currentTime = 0; // Reinicia o áudio
                hoverSound.play();
            });
        });
    });

    // Função para criar uma moto de luz com posição vertical e cor aleatórias
    function createLightBike() {
        const lightBike = document.createElement('div');
        lightBike.classList.add('light-bike');

        // Posição vertical aleatória
        const startPos = Math.random() * 90; // entre 0% e 90% da altura
        const delay = Math.random() * 2; // Atraso aleatório na animação
        const duration = 3 + Math.random() * 2; // Duração aleatória entre 3 e 5 segundos

        // Cor aleatória (verde ou azul)
        const color = Math.random() > 0.5 ? 'green' : 'blue';
        lightBike.style.background = color === 'green' 
            ? 'linear-gradient(90deg, rgba(0, 255, 0, 0) 0%, rgba(0, 255, 0, 1) 50%, rgba(0, 255, 0, 0) 100%)'
            : 'linear-gradient(90deg, rgba(0, 0, 255, 0) 0%, rgba(0, 0, 255, 1) 50%, rgba(0, 0, 255, 0) 100%)';

        lightBike.style.top = `${startPos}%`;
        lightBike.style.animation = `moveBikeHorizontal ${duration}s ${delay}s infinite linear`;

        document.getElementById('tron-container').appendChild(lightBike);
    }

    // Criar várias motos de luz
    for (let i = 0; i < 10; i++) {
        createLightBike();
    }

    // Recarrega a página ao clicar no logotipo
    const logo = document.getElementById('logo');
    if (logo) {
        logo.addEventListener('click', function() {
            window.location.reload();
        });
    }
});
