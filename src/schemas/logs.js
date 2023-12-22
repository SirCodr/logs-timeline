export const CREATE_LOG_SCHEMA = {
  type: 'object',
  properties: {
    date: {
      type: 'string',
      format: 'date',
      required: true
    },
    title: {
      type: 'string',
      required: true
    },
    category: {
      type: 'string',
      required: true
    }
  }
}