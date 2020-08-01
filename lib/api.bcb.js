const axios = require('axios')

// todas as moedas disponíveis no Banco Central do Brasil
const getUrlMoedas = () => 'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/Moedas?%24format=json'
const getMoedas = url => axios.get(url)
const moedasBCB = async() => {
    try{
        const url = getUrlMoedas()
        const moedas = await getMoedas(url)
        return moedas.data.value
    }catch(e){
        console.error(e)
    }
}

// cotacao mais recente de moeda disponível no Banco Central do Brasil
const getUrlCotacao = (simboloMoeda, data) => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda='${simboloMoeda}'&@dataCotacao='${data}'&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao,tipoBoletim`
const getCotacao = (url) => axios.get(url)
const reduceMaiorCotacao = (prev,curr) => (prev.dataHoraCotacao > curr.dataHoraCotacao) ? prev : curr
const cotacaoBCB = async(simboloMoeda, data) => {
    try{
        const url = getUrlCotacao(simboloMoeda, data)
        const cotacoes = await getCotacao(url)
        const todasCotacoes = cotacoes.data.value
        const cotacaoMaisRecente = todasCotacoes.reduce(reduceMaiorCotacao)
        return cotacaoMaisRecente
    }catch(e){
        console.error(e)
    }
}

// pegar todas as cotacoes de todas as moedas disponiveis no Banco Central do Brasil
const todasCotacoes = async(data) => {
    try{
        const moedas = await moedasBCB() 
        const cotacoes = []
        for(let i=0; i<moedas.length;i++){
            let a = await cotacaoBCB(moedas[i].simbolo, data)
            a.simbolo = moedas[i].simbolo
            cotacoes.push(a)
        }
        return cotacoes
    }catch(e){
        console.error(e)
    }
}

//cotacaoBCB('EUR','07-31-2020').then(res=>console.log(res))
//todasCotacoes('07-30-2020')
//moedasBCB()

module.exports = {
    getUrlMoedas,
    getMoedas,
    moedasBCB,
    getUrlCotacao,
    getCotacao,
    reduceMaiorCotacao,
    cotacaoBCB,
    todasCotacoes
}