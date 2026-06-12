export const loadFromStorage = (key, defaultValue) => {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : defaultValue
  } catch {
    return defaultValue
  }
}

export const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}