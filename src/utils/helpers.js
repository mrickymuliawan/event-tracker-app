import moment from 'moment'

export const formatDate = (date) => {
  return moment(date).format('ddd, DD MMM') + ` (${moment(date).format('LT')})`
}


export function currencyFormat(number) {
  return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")

}


