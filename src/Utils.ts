export function getPriceUnit(billingFrequency: String): String{
    let priceText ='$/ '
    priceText += billingFrequency == "ONCE" ? 'one time' : 'month'
    return priceText
}