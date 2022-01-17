import { CurrencyDataType, SanitizedCurrencyType } from ".."


export class CurrencySanitizer {

  public static sanitize(data: CurrencyDataType): SanitizedCurrencyType {
    if (!data) return null
    return {
      id: data._id,
      name: data.name,
      symbol: data.symbol
    }
  }

}