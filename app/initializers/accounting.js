import { currency, number } from "accounting/settings";

export function initialize(/* application */) {
  currency.symbol = "R$ ";
  currency.decimal = ",";
  currency.thousand = ".";
  number.decimal = ",";
  number.thousand = ".";
}

export default {
  name: 'accounting',
  initialize
};
