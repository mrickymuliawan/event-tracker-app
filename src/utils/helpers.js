import moment from 'moment'

export const formatDate = (date) => {
  return moment(date).format('ddd, DD MMM') + ` (${moment(date).format('LT')})`
}


export function currencyFormat(number, user = null) {
  let countryCode = 'ID'
  let currency = 'IDR'

  const result = new Intl.NumberFormat(countryCode, {
    style: 'currency', currency: currency, minimumFractionDigits: 0
  }).format(number)

  return result
}


