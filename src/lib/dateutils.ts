export const removeTime = (d: Date) => {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

export const getToday = () => removeTime(new Date())

export const getYesterday = () => {
  const d = getToday()
  d.setDate(d.getDate() - 1)
  return removeTime(d)
}
