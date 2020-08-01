const todasCotacoes = [
    {
      cotacaoCompra: 6.1099,
      cotacaoVenda: 6.1117,
      dataHoraCotacao: '2020-07-30 10:02:17.847',
      tipoBoletim: 'Abertura'
    },
    {
      cotacaoCompra: 6.1088,
      cotacaoVenda: 6.1106,
      dataHoraCotacao: '2020-07-30 11:03:18.331',
      tipoBoletim: 'Intermediário'
    },
    {
      cotacaoCompra: 6.1138,
      cotacaoVenda: 6.116,
      dataHoraCotacao: '2020-07-30 12:05:17.235',
      tipoBoletim: 'Intermediário'
    },
    {
      cotacaoCompra: 6.1045,
      cotacaoVenda: 6.1057,
      dataHoraCotacao: '2020-07-30 13:07:49.433',
      tipoBoletim: 'Intermediário'
    },
    {
      cotacaoCompra: 6.1109,
      cotacaoVenda: 6.1121,
      dataHoraCotacao: '2020-07-30 13:07:49.442',
      tipoBoletim: 'Fechamento PTAX'
    }
]

const api = require('./api.bcb')

const moedas = api.moedasBCB()


console.log(moedas)
console.log('')