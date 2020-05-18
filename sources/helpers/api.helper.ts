import ICountry from '../interfaces/country.interface'
import CountryPropertyEnum from '../enums/country.property.enum'
import fetch from 'node-fetch'

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
    .slice(0, 10)
    .map((country: ICountry) => country.country)
}

export const getCountries = async (): Promise<ICountry[]> => {
  const fetchResponse = await fetch(process.env.API_GET_STATISTIC!)
  const fetchData = await fetchResponse.json()
  return fetchData
}
