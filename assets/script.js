document.getElementById('taxaDepreciacao').addEventListener('input', calcularVidaUtil);
document.getElementById('valorInicial').addEventListener('input', calcularVidaUtil);

function calcularVidaUtil() {
    const valorInicial = parseFloat(document.getElementById('valorInicial').value);
    const taxaDepreciacao = parseFloat(document.getElementById('taxaDepreciacao').value);
    if (!isNaN(valorInicial) && !isNaN(taxaDepreciacao) && taxaDepreciacao !== 0) {
        const vidaUtil = Math.floor(100 / taxaDepreciacao);
        document.getElementById('vidaUtil').value = vidaUtil;
    }
}

function calcularDepreciacao() {
    const dataAquisicaoStr = document.getElementById('dataAquisicao').value;
    const dataDepreciacaoStr = document.getElementById('dataDepreciacao').value;
    const valorInicial = parseFloat(document.getElementById('valorInicial').value);
    const taxaDepreciacao = parseFloat(document.getElementById('taxaDepreciacao').value) / 100;

    const dataAquisicao = parseData(dataAquisicaoStr);
    const dataDepreciacao = parseDataFiscal(dataDepreciacaoStr);

    if (!dataAquisicao || !dataDepreciacao || isNaN(valorInicial) || isNaN(taxaDepreciacao)) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    const anoAquisicao = dataAquisicao.getFullYear();
    const anoFiscal = dataDepreciacao.getFullYear();
    const mesAquisicao = dataAquisicao.getMonth();
    const depreciacaoMensal = (valorInicial * taxaDepreciacao) / 12;

    const mesesAnoAquisicao = 12 - (mesAquisicao + 1);
    const depreciacaoAnoAquisicao = Math.min(valorInicial, depreciacaoMensal * mesesAnoAquisicao);

    const resultadosDiv = document.getElementById('resultadosIntermediarios');
    resultadosDiv.innerHTML = '';

    let depreciacaoAcumulada = depreciacaoAnoAquisicao;
    for (let ano = anoAquisicao + 1; ano <= anoFiscal; ano++) {
        let depreciacaoAnual = Math.min(valorInicial - depreciacaoAcumulada, depreciacaoMensal * 12);
        if (depreciacaoAnual <= 0) {
            depreciacaoAnual = 0;
        }
        const p = document.createElement('p');
        p.innerText = `Depreciação durante o exercício de ${ano}: R$ ${depreciacaoAnual.toFixed(2)}`;
        resultadosDiv.appendChild(p);
        depreciacaoAcumulada += depreciacaoAnual;
    }

    depreciacaoAcumulada = Math.min(valorInicial, depreciacaoAcumulada);

    document.getElementById('depreciacaoAnoAquisicao').innerText = `Depreciação durante o exercício de ${anoAquisicao}: R$ ${depreciacaoAnoAquisicao.toFixed(2)}`;
    document.getElementById('depreciacaoAcumulada').innerText = `Depreciação acumulada: R$ ${depreciacaoAcumulada.toFixed(2)}`;
}

function parseData(dataStr) {
    const partes = dataStr.split('/');
    if (partes.length === 3) {
        return new Date(partes[2], partes[1] - 1, partes[0]);
    }
    return null;
}

function parseDataFiscal(dataStr) {
    const partes = dataStr.split('/');
    if (partes.length === 3 && partes[0] === '31' && partes[1] === '12') {
        return new Date(partes[2], 11, 31);
    }
    return null;
}

function calcularMesesDesdeProximoMes(data1, data2) {
    const ano1 = data1.getFullYear();
    const mes1 = data1.getMonth() + 1;
    const ano2 = data2.getFullYear();
    const mes2 = data2.getMonth() + 1;

    const meses = (ano2 - ano1) * 12 + (mes2 - mes1);
    return meses;
}
