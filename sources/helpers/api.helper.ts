import ICountry from '../interfaces/country.interface'
import CountryPropertyEnum from '../enums/country.property.enum'

export const getTopTenCountriesByDeath = (countries: ICountry[]) => {
  return countries
    .sort((a, b) => {
      return b.death - a.death
    })
    .splice(0, 10)
}

export const calcByProp = (
  countries: ICountry[],
  property: CountryPropertyEnum,
) => {
  return countries.reduce((sum, country) => sum + country[property], 0)
}

export const getTopTenByProp = (
  countries: ICountry[],
  property: CountryPropertyEnum,
) => {
  return countries
    .sort((a: ICountry, b: ICountry) => {
      return b[property] - a[property]
    })
    .splice(0, 10)
    .map((country) => country.name)
}
