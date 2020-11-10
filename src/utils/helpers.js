import moment from 'moment'

export const formatDate = (date) => {
  return moment(date).format('ddd, DD MMM') + ` (${moment(date).format('LT')})`
}


