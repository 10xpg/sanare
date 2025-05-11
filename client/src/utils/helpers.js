import { differenceInYears } from 'date-fns'

export const calculateAge = (dob) => {
  const birthday = new Date(dob)
  const today = new Date()

  const years = differenceInYears(today, birthday)
  const months = Math.abs(today.getMonth() - birthday.getMonth())
  const days = Math.abs(today.getDate() - birthday.getDate())

  return `${years} years, ${months} months, ${days} days`
}
