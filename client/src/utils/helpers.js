import { differenceInYears } from 'date-fns'

export const calculatPreciseAge = (dob) => {
  const birthday = new Date(dob)
  const today = new Date()

  const years = differenceInYears(today, birthday)
  const months = Math.abs(today.getMonth() - birthday.getMonth())
  const days = Math.abs(today.getDate() - birthday.getDate())

  return `${years} years, ${months} months, ${days} days`
}

export const calculateAge = (dob) => {
  const birthday = new Date(dob)
  const today = new Date()

  const years = differenceInYears(today, birthday)
  return years
}

export const suppressor = () => {
  // does nothing really, just suppresses the no un-used vars rule when needed
}
