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

    // Controle de áudio do vídeo de fundo
    const video = document.querySelector('.bg-video');
    if (video) {
        video.muted = false; // Permitir áudio na primeira reprodução

        video.addEventListener('timeupdate', function() {
            if (video.currentTime > video.duration - 0.5) { // Quase no final da reprodução
                video.muted = true; // Muta o vídeo
            }
        });
    }

    // Recarrega a página ao clicar no logotipo
    const logo = document.getElementById('logo');
    if (logo) {
        logo.addEventListener('click', function() {
            window.location.reload();
        });
    }
});
