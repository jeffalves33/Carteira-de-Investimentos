let mainChart, distributionChart;
let currentChartType = 'patrimonio';
let currentTimeframe = 'mes';

// Dados estruturados no formato JSON
const dadosBrutos = [
    {
        mes: "Maio",
        investimento: 0,
        acoes: [
        ]
    },
    {
        mes: "Junho",
        investimento: 440.28,
        acoes: [
            { nome: "BBAS3F", sigla: "Ação", plataforma: "Rico", precoCompra: 21.80, precoAtual: 21.73, quantidade: 1 },
            { nome: "BTHF11", sigla: "FIIS", plataforma: "Rico", precoCompra: 8.57, precoAtual: 8.66, quantidade: 3 },
            { nome: "BTC", sigla: "CRIPT", plataforma: "Binance", precoCompra: 50, precoAtual: 47.56, quantidade: 1 },
            { nome: "CDBINTER", sigla: "RFIXA", plataforma: "Inter", precoCompra: 102.11, precoAtual: 102.30, quantidade: 1 },
            { nome: "HFOF11", sigla: "FIIS", plataforma: "Rico", precoCompra: 6.02, precoAtual: 5.78, quantidade: 2 },
            { nome: "IPCA40+6,99", sigla: "RFIXA", plataforma: "Tesouro Direto", precoCompra: 48.85, precoAtual: 48.45, quantidade: 1 },
            { nome: "IPCA50+6,98", sigla: "RFIXA", plataforma: "Tesouro Direto", precoCompra: 57.91, precoAtual: 58.00, quantidade: 1 },
            { nome: "SAPR4F", sigla: "Ação", plataforma: "Rico", precoCompra: 6.60, precoAtual: 7.50, quantidade: 3 },
            { nome: "XPML11", sigla: "FIIS", plataforma: "Rico", precoCompra: 101.86, precoAtual: 103.20, quantidade: 1 },
        ]
    },
];

// Funções para calcular valores baseados nos dados
function calcularValorInvestido(acao) {
    return acao.precoCompra * acao.quantidade;
}

function calcularValorAtual(acao) {
    return acao.precoAtual * acao.quantidade;
}

function calcularRetorno(acao) {
    const investido = calcularValorInvestido(acao);
    const atual = calcularValorAtual(acao);
    return ((atual - investido) / investido) * 100;
}

function calcularPatrimonioTotal(dadosMes) {
    return dadosMes.acoes.reduce((total, acao) => total + calcularValorAtual(acao), 0);
}

function calcularRendimentoTotal(dadosMes) {
    return dadosMes.acoes.reduce((total, acao) => {
        const investido = calcularValorInvestido(acao);
        const atual = calcularValorAtual(acao);
        return total + (atual - investido);
    }, 0);
}

function calcularInvestimentoTotal(dadosMes) {
    return dadosMes.acoes.reduce((total, acao) => total + calcularValorInvestido(acao), 0);
}

// Função para obter dados dos gráficos
function obterDadosGrafico() {
    const labels = dadosBrutos.map(item => item.mes.substring(0, 3));

    if (currentTimeframe === 'semana') {
        // Para semanas, usar apenas os últimos 4 pontos de dados
        const ultimosDados = dadosBrutos.slice(-4);
        const labelsSemanais = ultimosDados.map((_, i) => `Sem ${i + 1}`);

        if (currentChartType === 'patrimonio') {
            const patrimonioData = ultimosDados.map(item => calcularPatrimonioTotal(item));
            return {
                labels: labelsSemanais,
                data: patrimonioData,
                label: 'Patrimônio (R$)'
            };
        } else {
            const rendimentoData = ultimosDados.map(item => calcularRendimentoTotal(item));
            return {
                labels: labelsSemanais,
                data: rendimentoData,
                label: 'Rendimento (R$)'
            };
        }
    } else {
        // Para meses, usar todos os dados
        if (currentChartType === 'patrimonio') {
            const patrimonioData = dadosBrutos.map(item => calcularPatrimonioTotal(item));
            return {
                labels: labels,
                data: patrimonioData,
                label: 'Patrimônio (R$)'
            };
        } else {
            const rendimentoData = dadosBrutos.map(item => calcularRendimentoTotal(item));
            return {
                labels: labels,
                data: rendimentoData,
                label: 'Rendimento (R$)'
            };
        }
    }
}

// Função para obter ativos atuais (último mês)
function obterAtivosAtuais() {
    const ultimoMes = dadosBrutos[dadosBrutos.length - 1];

    // Agrupar ativos por nome para somar quantidades
    const ativosAgrupados = {};

    ultimoMes.acoes.forEach(acao => {
        if (ativosAgrupados[acao.nome]) {
            ativosAgrupados[acao.nome].quantidade += acao.quantidade;
        } else {
            ativosAgrupados[acao.nome] = { ...acao };
        }
    });

    return Object.values(ativosAgrupados).map(acao => ({
        nome: acao.nome,
        sigla: acao.sigla,
        plataforma: acao.plataforma,
        valorInvestido: calcularValorInvestido(acao),
        valorAtual: calcularValorAtual(acao),
        retorno: calcularRetorno(acao),
        quantidade: acao.quantidade
    }));
}

// Função para obter distribuição do portfólio
function obterDistribuicaoPortfolio() {
    const ultimoMes = dadosBrutos[dadosBrutos.length - 1];
    const distribuicao = {
        'Ação': 0,
        'FIIS': 0,
        'RFIXA': 0,
        'CRIPT': 0
    };

    ultimoMes.acoes.forEach(acao => {
        const valor = calcularValorAtual(acao);
        distribuicao[acao.sigla] += valor;
    });

    const total = Object.values(distribuicao).reduce((sum, val) => sum + val, 0);

    return {
        labels: ['Ações', 'FIIs', 'Renda Fixa', 'Crypto'],
        data: [
            Math.round((distribuicao['Ação'] / total) * 100),
            Math.round((distribuicao['FIIS'] / total) * 100),
            Math.round((distribuicao['RFIXA'] / total) * 100),
            Math.round((distribuicao['CRIPT'] / total) * 100)
        ]
    };
}

// Função para atualizar cards de resumo
function atualizarResumoCards() {
    const ultimoMes = dadosBrutos[dadosBrutos.length - 1];
    const penultimoMes = dadosBrutos[dadosBrutos.length - 2];

    const patrimonioAtual = calcularPatrimonioTotal(ultimoMes);
    const patrimonioAnterior = calcularPatrimonioTotal(penultimoMes);
    const rendimentoAtual = calcularRendimentoTotal(ultimoMes);
    const rendimentoAnterior = calcularRendimentoTotal(penultimoMes);
    const totalAtivos = ultimoMes.acoes.length;
    const totalAtivosAnterior = penultimoMes.acoes.length;

    const variacaoPatrimonio = ((patrimonioAtual - patrimonioAnterior) / patrimonioAnterior) * 100;
    const variacaoRendimento = rendimentoAtual - rendimentoAnterior;
    const variacaoAtivos = totalAtivos - totalAtivosAnterior;

    // Atualizar patrimônio
    document.getElementById('patrimonioTotal').textContent =
        `R$ ${patrimonioAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

    const patrimonioChangeEl = document.getElementById('patrimonioChange');
    patrimonioChangeEl.innerHTML = `
                <i class="bi bi-arrow-${variacaoPatrimonio >= 0 ? 'up' : 'down'}"></i>
                ${variacaoPatrimonio >= 0 ? '+' : ''}${variacaoPatrimonio.toFixed(1)}% este mês
            `;
    patrimonioChangeEl.className = `summary-change ${variacaoPatrimonio >= 0 ? 'positive' : 'negative'}`;

    // Atualizar rendimento
    const rendimentoEl = document.getElementById('rendimentoTotal');
    rendimentoEl.textContent = `R$ ${rendimentoAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    rendimentoEl.className = `summary-value ${rendimentoAtual >= 0 ? 'profit' : 'loss'}`;

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
        'CRIPT': 'bi bi-currency-bitcoin'
    };
    return icons[sigla] || 'bi bi-circle';
}

function getColorForAsset(sigla) {
    const colors = {
        'Ação': 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        'FIIS': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        'RFIXA': 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
        'CRIPT': 'linear-gradient(135deg, #f7931a 0%, #ff6b35 100%)'
    };
    return colors[sigla] || '#6b7280';
}

function getSiglaName(sigla) {
    const names = {
        'Ação': 'Ações',
        'FIIS': 'FIIs',
        'RFIXA': 'Renda Fixa',
        'CRIPT': 'Crypto'
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
                    '#f59e0b'
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
    //document.getElementById('semanaBtn').classList.toggle('active', timeframe === 'semana');

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
    const selectedMonth = document.getElementById('monthSelect').value;
    const dadosMes = dadosBrutos.find(item => item.mes.toLowerCase() === selectedMonth);

    if (dadosMes) {
        const totalInvestido = calcularInvestimentoTotal(dadosMes);
        const rendimento = calcularRendimentoTotal(dadosMes);
        const melhorAcao = dadosMes.acoes.reduce((melhor, acao) => {
            const retornoAtual = calcularRetorno(acao);
            const retornoMelhor = calcularRetorno(melhor);
            return retornoAtual > retornoMelhor ? acao : melhor;
        });
        const transacoes = dadosMes.acoes.length;

        document.getElementById('totalInvestido').textContent =
            `R$ ${totalInvestido.toLocaleString('pt-BR')}`;

        document.getElementById('ganhouPerdeu').textContent =
            `${rendimento >= 0 ? '+' : ''}R$ ${Math.abs(rendimento).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
        document.getElementById('ganhouPerdeu').className =
            `monthly-value ${rendimento >= 0 ? 'profit' : 'loss'}`;

        // Atualizar ícone
        const iconElement = document.querySelector('#ganhouPerdeuIcon i');
        iconElement.className = rendimento >= 0 ? 'bi-graph-up' : 'bi-graph-down';
        document.getElementById('ganhouPerdeuIcon').style.background =
            rendimento >= 0 ? 'var(--gradient-success)' : 'var(--gradient-danger)';

        document.getElementById('melhorDesempenho').textContent = melhorAcao.nome;
        document.getElementById('melhorPercentual').textContent =
            `${calcularRetorno(melhorAcao) >= 0 ? '+' : ''}${calcularRetorno(melhorAcao).toFixed(1)}%`;
        document.getElementById('transacoes').textContent = transacoes.toString();
    }
}

// Inicializar tudo quando a página carregar
document.addEventListener('DOMContentLoaded', function () {
    atualizarDropdownMeses();
    atualizarResumoCards();
    atualizarListaAtivos();
    initMainChart();
    initDistributionChart();
    updateMonthlyData();
});
