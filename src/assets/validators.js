const dateValidator = (data) => /^\d\d\.\d\d\.\d\d\d\d$/.test(data)
const russianAlpha = (name) => /^[А-яё -]+$/.test(name)
const phoneValidator = (phone) => /^7\d{10}$/.test(phone)
const indexValidator = (index) => /^\d{6}$/.test(index)
const streetValidator = (street) => /^[А-яё0-9- ]+$/.test(street)
const seriesValidation = (series) => /^(\d{4}|)$/.test(series)
const passportNumberValidation = (number) => /^(\d{6}|)$/.test(number)

export {
  dateValidator,
  russianAlpha,
  phoneValidator,
  indexValidator,
  streetValidator,
  seriesValidation,
  passportNumberValidation
}
