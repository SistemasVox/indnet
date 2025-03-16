// Função para determinar quantos itens mostrar por slide
function getItemsPerSlide() {
    const width = window.innerWidth;
    if (width >= 1200) return 4; // 4 itens para telas muito grandes
    if (width >= 992) return 3;  // 3 itens para telas grandes
    if (width >= 768) return 2;  // 2 itens para telas médias
    return 1;                     // 1 item para telas pequenas
}

// Função para gerar os itens do carrossel
function gerarItensCarrossel(planos) {
    const carouselInner = document.getElementById('carouselItems');
    if (!carouselInner) {
        return;
    }

    const itemsPerSlide = getItemsPerSlide();
    let carouselContent = '';
    let rowContent = '';
    
    planos.forEach((plano, index) => {
        if (index % itemsPerSlide === 0 && index !== 0) {
            carouselContent += `<div class="carousel-item"><div class="d-flex">${rowContent}</div></div>`;
            rowContent = '';
        }
        rowContent += `
            <div class="flex-shrink-0 col-${12 / itemsPerSlide}">
                <div class="card h-100 plan-item">
                    <img class="card-img-top" src="${plano.img}" alt="${plano.title}">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <div>
                            <h5 class="card-title">${plano.title}</h5>
                            <p class="card-text">${plano.description}</p>
                        </div>
                        <div>
                            <button class="btn btn-compare" data-plano-id="${plano.id}">
                                <i class="fas fa-exchange-alt"></i> Comparar
                            </button>
                            <button class="btn btn-contratar">
                                <i class="fas fa-shopping-cart"></i> Contratar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    // Adicionar a última linha se houver planos restantes
    if (rowContent) {
        carouselContent += `<div class="carousel-item ${planos.length <= itemsPerSlide ? 'active' : ''}"><div class="d-flex">${rowContent}</div></div>`;
    }

    carouselInner.innerHTML = carouselContent;
    
    // Adicionar a classe active ao primeiro item do carrossel
    const firstItem = carouselInner.querySelector('.carousel-item');
    if (firstItem) {
        firstItem.classList.add('active');
    }
    
    // Ativar comparação ao clicar no botão
    document.querySelectorAll('.btn-compare').forEach(button => {
        button.addEventListener('click', function() {
            const planoId = parseInt(this.getAttribute('data-plano-id'));
            adicionarAComparacao(planoId);
            exibirComparacao();
        });
    });
}

// Planos para o carrossel
const planos = [
    { 
        id: 1, 
        title: 'Plano 50Mbps', 
        description: 'Internet rápida e estável para o seu dia a dia.', 
        img: 'https://abrir.link/OpDES',
        pessoasFullHD: 2,
        tempoCarregamento: '5 segundos',
        velocidadeDownload: '50Mbps',
        velocidadeUpload: '25Mbps'
    },
    { 
        id: 2, 
        title: 'Plano 100Mbps', 
        description: 'Ideal para streaming e jogos online.', 
        img: 'https://abrir.link/OpDES',
        pessoasFullHD: 4,
        tempoCarregamento: '3 segundos',
        velocidadeDownload: '100Mbps',
        velocidadeUpload: '50Mbps'
    },
    { 
        id: 3, 
        title: 'Plano 200Mbps', 
        description: 'A melhor conexão para grandes famílias e empresas.', 
        img: 'https://abrir.link/OpDES',
        pessoasFullHD: 6,
        tempoCarregamento: '2 segundos',
        velocidadeDownload: '200Mbps',
        velocidadeUpload: '100Mbps'
    },
    { 
        id: 4, 
        title: 'Plano 300Mbps', 
        description: 'Velocidade máxima para todas as suas necessidades.', 
        img: 'https://abrir.link/OpDES',
        pessoasFullHD: 8,
        tempoCarregamento: '1.5 segundos',
        velocidadeDownload: '300Mbps',
        velocidadeUpload: '150Mbps'
    },
    { 
        id: 5, 
        title: 'Plano 500Mbps', 
        description: 'Para quem precisa do máximo desempenho.', 
        img: 'https://abrir.link/OpDES',
        pessoasFullHD: 10,
        tempoCarregamento: '1 segundo',
        velocidadeDownload: '500Mbps',
        velocidadeUpload: '250Mbps'
    },
    { 
        id: 6, 
        title: 'Plano 1Gbps', 
        description: 'O futuro da internet na sua casa.', 
        img: 'https://abrir.link/OpDES',
        pessoasFullHD: 15,
        tempoCarregamento: '0.5 segundos',
        velocidadeDownload: '1Gbps',
        velocidadeUpload: '500Mbps'
    }
];

// Gerar os itens do carrossel
gerarItensCarrossel(planos);

// Regerar os itens do carrossel ao redimensionar a janela
window.addEventListener('resize', () => gerarItensCarrossel(planos));

// Funções de comparação
let planosSelecionados = [];

function adicionarAComparacao(idPlano) {
    if (planosSelecionados.length < 2) {
        if (!planosSelecionados.includes(idPlano)) {
            planosSelecionados.push(idPlano);
        }
    } else {
        // Reiniciar a seleção se o usuário clicar em comparar novamente após comparar dois planos
        planosSelecionados = [idPlano];
        document.getElementById('comparacaoContainer').innerHTML = ''; // Limpa a tabela anterior
    }
}

function exibirComparacao() {
    if (planosSelecionados.length === 2) {
        const plano1 = planos.find(plano => plano.id === planosSelecionados[0]);
        const plano2 = planos.find(plano => plano.id === planosSelecionados[1]);

        const propriedades = [
            { label: 'Pessoas Assistindo Full HD', key: 'pessoasFullHD' },
            { label: 'Tempo de Carregamento', key: 'tempoCarregamento' },
            { label: 'Velocidade de Download', key: 'velocidadeDownload' },
            { label: 'Velocidade de Upload', key: 'velocidadeUpload' }
        ];

        let comparacaoHTML = `
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th></th>
                        <th>${plano1.title}</th>
                        <th>${plano2.title}</th>
                    </tr>
                </thead>
                <tbody>
        `;

        propriedades.forEach(prop => {
            comparacaoHTML += `
                <tr>
                    <td>${prop.label}</td>
                    <td>${plano1[prop.key]}</td>
                    <td>${plano2[prop.key]}</td>
                </tr>
            `;
        });

        comparacaoHTML += `
                </tbody>
            </table>
        `;

        document.getElementById('comparacaoContainer').innerHTML = comparacaoHTML;
    } else {
        const alertHTML = `
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Atenção!</strong> Selecione o próximo plano para comparar.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        document.getElementById('comparacaoContainer').innerHTML = alertHTML;
    }
}
