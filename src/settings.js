export const api = {
  url: '//' + window.location.hostname + (window.location.hostname === 'localhost' ? ':3131' : ''),
  tables: 'api/tables',
  products: 'api/products',
  order: 'api/order',
  booking: 'api/booking',
  event: 'api/event',
  dateStartParamKey: 'date_gte',
  dateEndParamKey: 'date_lte',
  notRepeatParam: 'repeat=false',
  repeatParam: 'repeat_ne=false',
};