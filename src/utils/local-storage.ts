import { ItemConfig } from "../types/local-storage"

export const setLocalStorageItem = (item: string, value: unknown, config: ItemConfig = {}) => {
  const { isObject } = config
  let itemValue = value

  if (isObject) {
    itemValue = JSON.stringify(value)
  }

  window.localStorage.setItem(item, itemValue as string)
}

export const getLocalStorageItem = (item: string, config: ItemConfig = {}) => {
  const { isNumber, isObject } = config
  const itemFound = window.localStorage.getItem(item)

  if (isNumber && itemFound) {
    return parseInt(itemFound)
  }

  if (isObject && itemFound) {
    return JSON.parse(itemFound)
  }

  return itemFound
}
export const clearLocalStorageItem = (item: string) => {
  window.localStorage.removeItem(item)
}
