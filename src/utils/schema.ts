export function arePropsValid (props) {
  return true
  if (!props || !schema) return false

  if (!Object.entries(props).length || !Object.entries(schema).length) return false

  for (const [key, value] of Object.entries(schema.properties)) {
    if (value.required && !props[key]) return false

    if (value.required && typeof props[key] === 'string' && !props[key].trim().length) return false

    if (value.type !== typeof props[key]) return false

    return true
  }
}