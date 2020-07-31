const axios = require('axios')

// todas as moedas disponíveis no Banco Central do Brasil
const getUrlMoedas = moedas => 'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/Moedas?%24format=json'
const getMoedas = url => axios.get(url)
const moedasBCB = async() => {
    try{
        const url = getUrlMoedas()
        const moedas = await getMoedas(url)
        return moedas
    }catch(e){
        console.error(e)
    }
}

// todas as cotações das moedas disponíveis no Banco Central do Brasil
const getUrlCotacoes = (simboloMoeda, data) => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda='${simboloMoeda}'&@dataCotacao='${data}'&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao,tipoBoletim`
const getCotacoes = (url) => axios.get(url)
const cotacoesBCB = async(simboloMoeda, data) => {
    try{
        const url = getUrlCotacoes(simboloMoeda, data)
        const cotacoes = await getCotacoes(url)
        console.log(cotacoes.data.value)
    }catch(e){
        console.error(e)
    }
}

cotacoesBCB('EUR','07-30-2020')

module.exports = {
    getUrlMoedas,
    getMoedas,
    moedasBCB
}