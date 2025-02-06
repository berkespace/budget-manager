export const Currencies =[
    {value:"TRY",label:"₺ Lira",locale:"tr-TR"},
    {value:"USD",label:"$ U.S. Dollar",locale:"en-US"},
    {value:"EUR",label:"€ Euro",locale:"de-DE"},
    {value:"RUB",label:"₽ Ruble",locale:"en-US"}
]

export type Currency = (typeof Currencies)[0];