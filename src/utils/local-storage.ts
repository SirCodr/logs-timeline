export const setLocalStorageItem = (item, value, config = {}) => {
  const { isObject } = config
  let itemValue = value

  if (isObject) {
    itemValue = JSON.stringify(value)
  }

  window.localStorage.setItem(item, itemValue)
}

export const getLocalStorageItem = (item, config = {}) => {
  const { isNumber, isObject } = config
  const itemFound = window.localStorage.getItem(item)

  if (isNumber) {
    return parseInt(itemFound)
  }

  if (isObject) {
    return JSON.parse(itemFound)
  }

  return itemFound
}
export const clearLocalStorageItem = (item) => {
  window.localStorage.removeItem(item)
}
