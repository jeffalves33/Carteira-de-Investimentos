let mainChart, distributionChart;
let currentChartType = 'patrimonio';
let currentTimeframe = 'mes';

// Nova estrutura de dados mais clara
const dadosBrutos = [
    {
        mes: "Maio",
        investimentoMensal: 0,
        transacoes: [], // Vazio - não houve transações
        posicoes: [] // Vazio - não tinha posições
    },
    {
        mes: "Junho",
        investimentoMensal: 440.28,
        transacoes: [
            // Todas as compras do mês
            { tipo: "COMPRA", nome: "BBAS3F", sigla: "Ação", plataforma: "Rico", preco: 21.80, quantidade: 1, data: "2025-06-15" },
            { tipo: "COMPRA", nome: "BTHF11", sigla: "FIIS", plataforma: "Rico", preco: 8.57, quantidade: 3, data: "2025-06-15" },
            { tipo: "COMPRA", nome: "BTC", sigla: "CRIPT", plataforma: "Binance", preco: 50, quantidade: 1, data: "2025-06-15" },
            { tipo: "COMPRA", nome: "CDBINTER", sigla: "RFIXA", plataforma: "Inter", preco: 102.11, quantidade: 1, data: "2025-06-15" },
            { tipo: "COMPRA", nome: "HFOF11", sigla: "FIIS", plataforma: "Rico", preco: 6.02, quantidade: 2, data: "2025-06-15" },
            { tipo: "COMPRA", nome: "IPCA40+6,99", sigla: "RFIXA", plataforma: "Tesouro Direto", preco: 48.85, quantidade: 1, data: "2025-06-15" },
            { tipo: "COMPRA", nome: "IPCA50+6,98", sigla: "RFIXA", plataforma: "Tesouro Direto", preco: 57.91, quantidade: 1, data: "2025-06-15" },
            { tipo: "COMPRA", nome: "SAPR4F", sigla: "Ação", plataforma: "Rico", preco: 6.60, quantidade: 3, data: "2025-06-15" },
            { tipo: "COMPRA", nome: "XPML11", sigla: "FIIS", plataforma: "Rico", preco: 101.86, quantidade: 1, data: "2025-06-15" }
        ],
        posicoes: [
            // Posições no final do mês com preços atualizados
            { nome: "BBAS3F", sigla: "Ação", plataforma: "Rico", precoMedio: 21.80, precoAtual: 22.09, quantidade: 1, dividendo: 0 },
            { nome: "BTHF11", sigla: "FIIS", plataforma: "Rico", precoMedio: 8.57, precoAtual: 8.78, quantidade: 3, dividendo: 0 },
            { nome: "BTC", sigla: "CRIPT", plataforma: "Binance", precoMedio: 50, precoAtual: 47.27, quantidade: 1, dividendo: 0 },
            { nome: "CDBINTER", sigla: "RFIXA", plataforma: "Inter", precoMedio: 102.11, precoAtual: 102.30, quantidade: 1, dividendo: 0 },
            { nome: "HFOF11", sigla: "FIIS", plataforma: "Rico", precoMedio: 6.02, precoAtual: 5.95, quantidade: 2, dividendo: 0 },
            { nome: "IPCA40+6,99", sigla: "RFIXA", plataforma: "Tesouro Direto", precoMedio: 48.85, precoAtual: 48.88, quantidade: 1, dividendo: 0 },
            { nome: "IPCA50+6,98", sigla: "RFIXA", plataforma: "Tesouro Direto", precoMedio: 57.91, precoAtual: 59.80, quantidade: 1, dividendo: 0 },
            { nome: "SAPR4F", sigla: "Ação", plataforma: "Rico", precoMedio: 6.60, precoAtual: 7.55, quantidade: 3, dividendo: 0 },
            { nome: "XPML11", sigla: "FIIS", plataforma: "Rico", precoMedio: 101.86, precoAtual: 104.15, quantidade: 1, dividendo: 0 }
        ]
    },
    {
        mes: "Julho",
        investimentoMensal: 300,
        transacoes: [
            // Só nova compra
            { tipo: "COMPRA", nome: "IVV", sigla: "Exterior", plataforma: "Nomade", preco: 150, quantidade: 1, data: "2025-07-08" },
            { tipo: "COMPRA", nome: "VCLT", sigla: "Exterior", plataforma: "Nomade", preco: 150, quantidade: 1, data: "2025-07-08" },
        ],
        posicoes: [
            // Todas as posições no final de julho (com preços atualizados)
            { nome: "BBAS3F", sigla: "Ação", plataforma: "Rico", precoMedio: 21.80, precoAtual: 21.14, quantidade: 1, dividendo: 0 },
            { nome: "BTHF11", sigla: "FIIS", plataforma: "Rico", precoMedio: 8.57, precoAtual: 8.60, quantidade: 3, dividendo: 0 },
            { nome: "BTC", sigla: "CRIPT", plataforma: "Binance", precoMedio: 50, precoAtual: 52.89, quantidade: 1, dividendo: 0 },
            { nome: "CDBINTER", sigla: "RFIXA", plataforma: "Inter", precoMedio: 102.11, precoAtual: 102.66, quantidade: 1, dividendo: 0 },
            { nome: "HFOF11", sigla: "FIIS", plataforma: "Rico", precoMedio: 6.02, precoAtual: 5.85, quantidade: 2, dividendo: 0 },
            { nome: "IPCA40+6,99", sigla: "RFIXA", plataforma: "Tesouro Direto", precoMedio: 48.85, precoAtual: 48.11, quantidade: 1, dividendo: 0 },
            { nome: "IPCA50+6,98", sigla: "RFIXA", plataforma: "Tesouro Direto", precoMedio: 57.91, precoAtual: 59.33, quantidade: 1, dividendo: 0 },
            { nome: "IVV", sigla: "Exterior", plataforma: "Nomade", precoMedio: 150, precoAtual: 150.23, quantidade: 1, dividendo: 0 },
            { nome: "SAPR4F", sigla: "Ação", plataforma: "Rico", precoMedio: 6.60, precoAtual: 7.24, quantidade: 3, dividendo: 0 },
            { nome: "VCLT", sigla: "Exterior", plataforma: "Nomade", precoMedio: 150, precoAtual: 149.62, quantidade: 1, dividendo: 0 },
            { nome: "XPML11", sigla: "FIIS", plataforma: "Rico", precoMedio: 101.86, precoAtual: 104.00, quantidade: 1, dividendo: 0 }
        ]
    }
    
];

// Funções para calcular valores baseados nas posições
function calcularValorInvestido(posicao) {
    return posicao.precoMedio * posicao.quantidade;
}

function calcularValorAtual(posicao) {
    return posicao.precoAtual * posicao.quantidade;
}

function calcularRetorno(posicao) {
    const investido = calcularValorInvestido(posicao);
    const atual = calcularValorAtual(posicao);
    return ((atual - investido) / investido) * 100;
}

// Função para calcular patrimônio total acumulado até determinado mês
function calcularPatrimonioTotal(indice = null) {
    if (indice === null) {
        indice = dadosBrutos.length - 1;
    }

    const dadosMes = dadosBrutos[indice];
    if (!dadosMes || !dadosMes.posicoes) return 0;

    return dadosMes.posicoes.reduce((total, posicao) => {
        return total + calcularValorAtual(posicao);
    }, 0);
}

// Função para calcular rendimento do mês (diferença entre valor atual e investido)
function calcularRendimentoTotal(dadosMes) {
    if (!dadosMes || !dadosMes.posicoes) return 0;

    return dadosMes.posicoes.reduce((total, posicao) => {
        const investido = calcularValorInvestido(posicao);
        const atual = calcularValorAtual(posicao);
        return total + (atual - investido);
    }, 0);
}

// Função para calcular rendimento mensal (comparação com mês anterior)
function calcularRendimentoMensal(indice) {
    if (indice <= 0) return 0;

    const patrimonioAtual = calcularPatrimonioTotal(indice);
    const patrimonioAnterior = calcularPatrimonioTotal(indice - 1);
    const investimentoMensal = dadosBrutos[indice].investimentoMensal;

    // Rendimento = Patrimônio atual - Patrimônio anterior - Investimento mensal
    return patrimonioAtual - patrimonioAnterior - investimentoMensal;
}

// Função para calcular total investido até determinado mês
function calcularInvestimentoAcumulado(indice = null) {
    if (indice === null) {
        indice = dadosBrutos.length - 1;
    }

    return dadosBrutos.slice(0, indice + 1).reduce((total, mes) => {
        return total + mes.investimentoMensal;
    }, 0);
}

// Função para obter dados dos gráficos
function obterDadosGrafico() {
    const labels = dadosBrutos.map(item => item.mes.substring(0, 3));

    if (currentTimeframe === 'semana') {
        // Para semanas, usar apenas os últimos 4 pontos de dados
        const ultimosDados = dadosBrutos.slice(-4);
        const labelsSemanais = ultimosDados.map((_, i) => `Sem ${i + 1}`);

        if (currentChartType === 'patrimonio') {
            const patrimonioData = ultimosDados.map((_, i) => calcularPatrimonioTotal(dadosBrutos.length - 4 + i));
            return {
                labels: labelsSemanais,
                data: patrimonioData,
                label: 'Patrimônio (R$)'
            };
        } else {
            const rendimentoData = ultimosDados.map((_, i) => calcularRendimentoMensal(dadosBrutos.length - 4 + i));
            return {
                labels: labelsSemanais,
                data: rendimentoData,
                label: 'Rendimento Mensal (R$)'
            };
        }
    } else {
        // Para meses, usar todos os dados
        if (currentChartType === 'patrimonio') {
            const patrimonioData = dadosBrutos.map((_, i) => calcularPatrimonioTotal(i));
            return {
                labels: labels,
                data: patrimonioData,
                label: 'Patrimônio (R$)'
            };
        } else {
            const rendimentoData = dadosBrutos.map((_, i) => calcularRendimentoMensal(i));
            return {
                labels: labels,
                data: rendimentoData,
                label: 'Rendimento Mensal (R$)'
            };
        }
    }
}

// Função para obter ativos atuais (último mês)
function obterAtivosAtuais() {
    const ultimoMes = dadosBrutos[dadosBrutos.length - 1];

    if (!ultimoMes || !ultimoMes.posicoes) return [];

    return ultimoMes.posicoes.map(posicao => ({
        nome: posicao.nome,
        sigla: posicao.sigla,
        plataforma: posicao.plataforma,
        valorInvestido: calcularValorInvestido(posicao),
        valorAtual: calcularValorAtual(posicao),
        retorno: calcularRetorno(posicao),
        quantidade: posicao.quantidade
    }));
}

// Função para obter distribuição do portfólio
function obterDistribuicaoPortfolio() {
    const ultimoMes = dadosBrutos[dadosBrutos.length - 1];

    if (!ultimoMes || !ultimoMes.posicoes) {
        return { labels: [], data: [] };
    }

    const distribuicao = {
        'Ação': 0,
        'FIIS': 0,
        'RFIXA': 0,
        'CRIPT': 0,
        'Exterior': 0
    };

    ultimoMes.posicoes.forEach(posicao => {
        const valor = calcularValorAtual(posicao);
        distribuicao[posicao.sigla] += valor;
    });

    const total = Object.values(distribuicao).reduce((sum, val) => sum + val, 0);

    if (total === 0) return { labels: [], data: [] };

    return {
        labels: ['Ações', 'FIIs', 'Renda Fixa', 'Crypto', 'Exterior'],
        data: [
            Math.round((distribuicao['Ação'] / total) * 100),
            Math.round((distribuicao['FIIS'] / total) * 100),
            Math.round((distribuicao['RFIXA'] / total) * 100),
            Math.round((distribuicao['CRIPT'] / total) * 100),
            Math.round((distribuicao['Exterior'] / total) * 100)
        ]
    };
}

// Função para atualizar cards de resumo
function atualizarResumoCards() {
    const ultimoIndice = dadosBrutos.length - 1;
    const penultimoIndice = ultimoIndice - 1;

    if (ultimoIndice < 0) return;

    const patrimonioTotal = calcularPatrimonioTotal(ultimoIndice);
    const patrimonioAnterior = penultimoIndice >= 0 ? calcularPatrimonioTotal(penultimoIndice) : 0;
    const rendimentoMensal = calcularRendimentoMensal(ultimoIndice);
    const rendimentoAnterior = penultimoIndice >= 0 ? calcularRendimentoMensal(penultimoIndice) : 0;

    const ultimoMes = dadosBrutos[ultimoIndice];
    const penultimoMes = penultimoIndice >= 0 ? dadosBrutos[penultimoIndice] : null;

    const totalAtivos = ultimoMes.posicoes ? ultimoMes.posicoes.length : 0;
    const totalAtivosAnterior = penultimoMes && penultimoMes.posicoes ? penultimoMes.posicoes.length : 0;

    const variacaoPatrimonio = patrimonioAnterior > 0 ? ((patrimonioTotal - patrimonioAnterior) / patrimonioAnterior) * 100 : 0;
    const variacaoRendimento = rendimentoMensal - rendimentoAnterior;
    const variacaoAtivos = totalAtivos - totalAtivosAnterior;

    // Atualizar patrimônio
    document.getElementById('patrimonioTotal').textContent =
        `R$ ${patrimonioTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

    const patrimonioChangeEl = document.getElementById('patrimonioChange');
    patrimonioChangeEl.innerHTML = `
        <i class="bi bi-arrow-${variacaoPatrimonio >= 0 ? 'up' : 'down'}"></i>
        ${variacaoPatrimonio >= 0 ? '+' : ''}${variacaoPatrimonio.toFixed(1)}% este mês
    `;
    patrimonioChangeEl.className = `summary-change ${variacaoPatrimonio >= 0 ? 'positive' : 'negative'}`;

    // Atualizar rendimento
    const rendimentoEl = document.getElementById('rendimentoTotal');
    rendimentoEl.textContent = `R$ ${rendimentoMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    rendimentoEl.className = `summary-value ${rendimentoMensal >= 0 ? 'profit' : 'loss'}`;

    const rendimentoChangeEl = document.getElementById('rendimentoChange');
    rendimentoChangeEl.innerHTML = `
        <i class="bi bi-arrow-${variacaoRendimento >= 0 ? 'up' : 'down'}"></i>
        ${variacaoRendimento >= 0 ? '+' : ''}R$ ${Math.abs(variacaoRendimento).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} este mês
    `;
    rendimentoChangeEl.className = `summary-change ${variacaoRendimento >= 0 ? 'positive' : 'negative'}`;

    // Atualizar ativos
    document.getElementById('totalAtivos').textContent = totalAtivos;

    const ativosChangeEl = document.getElementById('ativosChange');
    ativosChangeEl.innerHTML = `
        <i class="bi bi-${variacaoAtivos >= 0 ? 'plus' : 'dash'}"></i>
        ${variacaoAtivos >= 0 ? '+' : ''}${variacaoAtivos} este mês
    `;
    ativosChangeEl.className = `summary-change ${variacaoAtivos >= 0 ? 'positive' : 'negative'}`;
}

// Função para atualizar lista de ativos
function atualizarListaAtivos() {
    const ativos = obterAtivosAtuais();
    const container = document.getElementById('assetsContainer');

    // Atualizar contador
    document.getElementById('ativosCount').textContent = ativos.length;

    container.innerHTML = '';

    ativos.forEach(ativo => {
        const isPositive = ativo.retorno >= 0;
        const iconClass = getIconForAsset(ativo.sigla);
        const bgColor = getColorForAsset(ativo.sigla);

        const assetItem = document.createElement('div');
        assetItem.className = 'asset-item';
        assetItem.innerHTML = `
            <div class="asset-info">
                <div class="asset-icon" style="background: ${bgColor};">
                    <i class="${iconClass}"></i>
                </div>
                <div class="asset-details">
                    <h6>${ativo.nome}</h6>
                    <div class="asset-type">${getSiglaName(ativo.sigla)}</div>
                    <div class="asset-platform">${ativo.plataforma} • Qtd: ${ativo.quantidade}</div>
                </div>
            </div>
            <div class="asset-values">
                <div class="asset-value">R$ ${ativo.valorAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                <div class="asset-invested">Investido: R$ ${ativo.valorInvestido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                <div class="asset-return ${isPositive ? 'profit' : 'loss'}">
                    <i class="bi bi-arrow-${isPositive ? 'up' : 'down'}"></i>
                    ${isPositive ? '+' : ''}${ativo.retorno.toFixed(1)}%
                </div>
            </div>
        `;
        container.appendChild(assetItem);
    });
}

// Funções auxiliares para ícones e cores
function getIconForAsset(sigla) {
    const icons = {
        'Ação': 'bi bi-graph-up',
        'FIIS': 'bi bi-building',
        'RFIXA': 'bi bi-shield-check',
        'CRIPT': 'bi bi-currency-bitcoin',
        'Exterior': 'bi bi-globe'
    };
    return icons[sigla] || 'bi bi-circle';
}

function getColorForAsset(sigla) {
    const colors = {
        'Ação': 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        'FIIS': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        'RFIXA': 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
        'CRIPT': 'linear-gradient(135deg, #f7931a 0%, #ff6b35 100%)',
        'Exterior': 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
    };
    return colors[sigla] || '#6b7280';
}

function getSiglaName(sigla) {
    const names = {
        'Ação': 'Ações',
        'FIIS': 'FIIs',
        'RFIXA': 'Renda Fixa',
        'CRIPT': 'Crypto',
        'Exterior': 'Exterior'
    };
    return names[sigla] || sigla;
}

// Função para inicializar gráfico principal
function initMainChart() {
    const ctx = document.getElementById('mainChart').getContext('2d');
    const data = obterDadosGrafico();

    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    if (currentChartType === 'patrimonio') {
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0.05)');
    } else {
        gradient.addColorStop(0, 'rgba(16, 185, 129, 0.3)');
        gradient.addColorStop(1, 'rgba(16, 185, 129, 0.05)');
    }

    mainChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: data.label,
                data: data.data,
                borderColor: currentChartType === 'patrimonio' ? '#3b82f6' : '#10b981',
                backgroundColor: gradient,
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: currentChartType === 'patrimonio' ? '#3b82f6' : '#10b981',
                pointBorderColor: '#fff',
                pointBorderWidth: 3,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: currentChartType === 'patrimonio' ? '#3b82f6' : '#10b981',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: false,
                    callbacks: {
                        label: function (context) {
                            return `R$ ${context.parsed.y.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: currentChartType === 'rendimentos',
                    ticks: {
                        callback: function (value) {
                            return 'R$ ' + value.toLocaleString('pt-BR');
                        },
                        color: '#6b7280',
                        font: {
                            size: 12,
                            weight: '500'
                        }
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.05)',
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: '#6b7280',
                        font: {
                            size: 12,
                            weight: '500'
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

// Função para inicializar gráfico de distribuição
function initDistributionChart() {
    const ctx = document.getElementById('distributionChart').getContext('2d');
    const data = obterDistribuicaoPortfolio();

    distributionChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: data.labels,
            datasets: [{
                data: data.data,
                backgroundColor: [
                    '#3b82f6',
                    '#10b981',
                    '#6b7280',
                    '#f59e0b',
                    '#8b5cf6'
                ],
                borderWidth: 0,
                hoverOffset: 15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            size: 13,
                            weight: '500'
                        },
                        color: '#374151'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    cornerRadius: 8,
                    callbacks: {
                        label: function (context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            },
            cutout: '65%'
        }
    });
}

// Funções para alternar tipo de gráfico e período
function toggleChartType(type) {
    currentChartType = type;

    document.getElementById('patrimonioBtn').classList.toggle('active', type === 'patrimonio');
    document.getElementById('rendimentosBtn').classList.toggle('active', type === 'rendimentos');

    updateChart();
}

function toggleTimeframe(timeframe) {
    currentTimeframe = timeframe;

    document.getElementById('mesBtn').classList.toggle('active', timeframe === 'mes');

    updateChart();
}

// Função para atualizar gráfico
function updateChart() {
    const data = obterDadosGrafico();

    const ctx = document.getElementById('mainChart').getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    if (currentChartType === 'patrimonio') {
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0.05)');
    } else {
        gradient.addColorStop(0, 'rgba(16, 185, 129, 0.3)');
        gradient.addColorStop(1, 'rgba(16, 185, 129, 0.05)');
    }

    mainChart.data.labels = data.labels;
    mainChart.data.datasets[0].data = data.data;
    mainChart.data.datasets[0].label = data.label;

    const color = currentChartType === 'patrimonio' ? '#3b82f6' : '#10b981';

    mainChart.data.datasets[0].borderColor = color;
    mainChart.data.datasets[0].backgroundColor = gradient;
    mainChart.data.datasets[0].pointBackgroundColor = color;
    mainChart.options.plugins.tooltip.borderColor = color;

    mainChart.options.scales.y.beginAtZero = currentChartType === 'rendimentos';

    mainChart.update('active');
}

// Função para atualizar dropdown de meses
function atualizarDropdownMeses() {
    const select = document.getElementById('monthSelect');
    if (!select) return;

    select.innerHTML = '';

    dadosBrutos.slice().reverse().forEach(item => {
        const option = document.createElement('option');
        option.value = item.mes.toLowerCase();
        option.textContent = `${item.mes} de 2024`;
        select.appendChild(option);
    });
}

// Função para atualizar dados mensais
function updateMonthlyData() {
    const select = document.getElementById('monthSelect');
    if (!select) return;

    const selectedMonth = select.value;
    const indiceMes = dadosBrutos.findIndex(item => item.mes.toLowerCase() === selectedMonth);

    if (indiceMes === -1) return;

    const dadosMes = dadosBrutos[indiceMes];
    const totalInvestido = dadosBrutos[indiceMes].investimentoMensal; //calcularInvestimentoAcumulado(indiceMes);
    const rendimentoMensal = calcularRendimentoMensal(indiceMes);

    // Encontrar melhor ativo do mês
    let melhorAcao = null;
    let melhorRetorno = -Infinity;

    if (dadosMes.posicoes && dadosMes.posicoes.length > 0) {
        dadosMes.posicoes.forEach(posicao => {
            const retorno = calcularRetorno(posicao);
            if (retorno > melhorRetorno) {
                melhorRetorno = retorno;
                melhorAcao = posicao;
            }
        });
    }

    // Atualizar elementos na interface
    const totalInvestidoEl = document.getElementById('totalInvestido');
    if (totalInvestidoEl) {
        totalInvestidoEl.textContent = `R$ ${totalInvestido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    }

    const ganhouPerdeuEl = document.getElementById('ganhouPerdeu');
    if (ganhouPerdeuEl) {
        ganhouPerdeuEl.textContent = `${rendimentoMensal >= 0 ? '+' : ''}R$ ${Math.abs(rendimentoMensal).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
        ganhouPerdeuEl.className = `monthly-value ${rendimentoMensal >= 0 ? 'profit' : 'loss'}`;
    }

    // Atualizar ícone de ganho/perda
    const iconElement = document.querySelector('#ganhouPerdeuIcon i');
    if (iconElement) {
        iconElement.className = rendimentoMensal >= 0 ? 'bi-graph-up' : 'bi-graph-down';
    }
    const iconDiv = document.getElementById('ganhouPerdeuIcon');
    if (iconDiv) {
        iconDiv.style.background = rendimentoMensal >= 0 ? 'var(--gradient-success)' : 'var(--gradient-danger)';
    }

    // Atualizar melhor desempenho
    const melhorDesempenhoEl = document.getElementById('melhorDesempenho');
    const melhorPercentualEl = document.getElementById('melhorPercentual');

    if (melhorAcao && melhorDesempenhoEl && melhorPercentualEl) {
        melhorDesempenhoEl.textContent = melhorAcao.nome;
        melhorPercentualEl.textContent = `${melhorRetorno >= 0 ? '+' : ''}${melhorRetorno.toFixed(1)}%`;
    }

    // Atualizar número de transações
    const transacoesEl = document.getElementById('transacoes');
    if (transacoesEl) {
        const numTransacoes = dadosMes.transacoes ? dadosMes.transacoes.length : 0;
        transacoesEl.textContent = numTransacoes.toString();
    }
}

// Função para adicionar novas operações (mantida para compatibilidade)
function adicionarOperacao(mes, tipo, nome, sigla, plataforma, preco, quantidade) {
    const mesData = dadosBrutos.find(m => m.mes === mes);
    if (!mesData) return;

    // Adicionar à lista de transações
    const novaTransacao = {
        tipo: tipo,
        nome: nome,
        sigla: sigla,
        plataforma: plataforma,
        preco: preco,
        quantidade: quantidade,
        data: new Date().toISOString().split('T')[0]
    };

    if (!mesData.transacoes) {
        mesData.transacoes = [];
    }
    mesData.transacoes.push(novaTransacao);

    // Atualizar investimento mensal se for compra
    if (tipo === "COMPRA") {
        mesData.investimentoMensal += preco * quantidade;
    }

    // Atualizar ou adicionar posição
    if (!mesData.posicoes) {
        mesData.posicoes = [];
    }

    const posicaoExistente = mesData.posicoes.find(p => p.nome === nome);

    if (posicaoExistente) {
        // Recalcular preço médio
        const valorAnterior = posicaoExistente.precoMedio * posicaoExistente.quantidade;
        const novoValor = preco * quantidade;
        const novaQuantidade = posicaoExistente.quantidade + quantidade;

        posicaoExistente.precoMedio = (valorAnterior + novoValor) / novaQuantidade;
        posicaoExistente.quantidade = novaQuantidade;
    } else {
        // Adicionar nova posição
        mesData.posicoes.push({
            nome: nome,
            sigla: sigla,
            plataforma: plataforma,
            precoMedio: preco,
            precoAtual: preco, // Inicialmente igual ao preço médio
            quantidade: quantidade
        });
    }

    // Atualizar interface
    atualizarResumoCards();
    atualizarListaAtivos();
    updateChart();
    updateMonthlyData();
}

// Função para atualizar preços atuais
function atualizarPrecos(novosPrecos) {
    // novosPrecos deve ser um objeto: { "BBAS3F": 22.50, "BTHF11": 8.90, ... }

    // Atualizar preços em todos os meses
    dadosBrutos.forEach(mesData => {
        if (mesData.posicoes) {
            mesData.posicoes.forEach(posicao => {
                if (novosPrecos[posicao.nome]) {
                    posicao.precoAtual = novosPrecos[posicao.nome];
                }
            });
        }
    });

    // Atualizar interface após mudança nos preços
    atualizarResumoCards();
    atualizarListaAtivos();
    updateChart();
    updateMonthlyData();
}

// Função para adicionar um novo mês
function adicionarNovoMes(nomeDoMes, investimentoMensal = 0) {
    const novoMes = {
        mes: nomeDoMes,
        investimentoMensal: investimentoMensal,
        transacoes: [],
        posicoes: []
    };

    // Copiar posições do mês anterior (se existir)
    if (dadosBrutos.length > 0) {
        const mesAnterior = dadosBrutos[dadosBrutos.length - 1];
        if (mesAnterior.posicoes) {
            novoMes.posicoes = mesAnterior.posicoes.map(posicao => ({
                ...posicao,
                // Manter preço atual como preço atual (não resetar)
            }));
        }
    }

    dadosBrutos.push(novoMes);

    // Atualizar dropdown e interface
    atualizarDropdownMeses();
    atualizarResumoCards();
    atualizarListaAtivos();
    updateChart();
    updateMonthlyData();
}

// Event listeners e inicialização
document.addEventListener('DOMContentLoaded', function () {
    // Inicializar dropdowns
    atualizarDropdownMeses();

    // Inicializar cards de resumo
    atualizarResumoCards();

    // Inicializar lista de ativos
    atualizarListaAtivos();

    // Inicializar gráficos
    initMainChart();
    initDistributionChart();

    // Inicializar dados mensais
    updateMonthlyData();

    // Event listener para mudança no dropdown de meses
    const monthSelect = document.getElementById('monthSelect');
    if (monthSelect) {
        monthSelect.addEventListener('change', updateMonthlyData);
    }

    // Event listeners para botões de alternância de gráfico
    const patrimonioBtn = document.getElementById('patrimonioBtn');
    const rendimentosBtn = document.getElementById('rendimentosBtn');
    const mesBtn = document.getElementById('mesBtn');

    if (patrimonioBtn) {
        patrimonioBtn.addEventListener('click', () => toggleChartType('patrimonio'));
    }
    if (rendimentosBtn) {
        rendimentosBtn.addEventListener('click', () => toggleChartType('rendimentos'));
    }
    if (mesBtn) {
        mesBtn.addEventListener('click', () => toggleTimeframe('mes'));
    }

    // Event listener para atualização automática de preços (exemplo)
    // Pode ser usado para integração com APIs de preços
    document.addEventListener('pricesUpdated', function (event) {
        if (event.detail && event.detail.prices) {
            atualizarPrecos(event.detail.prices);
        }
    });
});

// Função auxiliar para debug - mostrar dados no console
function mostrarDados() {
    console.log('Dados atuais:', dadosBrutos);
    console.log('Patrimônio total:', calcularPatrimonioTotal());
    console.log('Investimento acumulado:', calcularInvestimentoAcumulado());
}

// Função para exportar dados (útil para backup)
function exportarDados() {
    const dataStr = JSON.stringify(dadosBrutos, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'dados_investimentos.json';
    link.click();

    URL.revokeObjectURL(url);
}

// Função para importar dados (útil para restaurar backup)
function importarDados(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const dadosImportados = JSON.parse(e.target.result);

            // Validar estrutura básica
            if (Array.isArray(dadosImportados) && dadosImportados.length > 0) {
                dadosBrutos.length = 0; // Limpar array atual
                dadosBrutos.push(...dadosImportados);

                // Atualizar toda a interface
                atualizarDropdownMeses();
                atualizarResumoCards();
                atualizarListaAtivos();
                updateChart();
                updateMonthlyData();

                alert('Dados importados com sucesso!');
            } else {
                alert('Arquivo inválido. Verifique o formato dos dados.');
            }
        } catch (error) {
            alert('Erro ao importar dados: ' + error.message);
        }
    };
    reader.readAsText(file);
}