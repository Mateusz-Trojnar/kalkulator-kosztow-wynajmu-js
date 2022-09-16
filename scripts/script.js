const fuelCostInPln = 7.76
const priceForOneNight = 120
const avgcombustion = 8.7
const milliseconds = 86400000
const currentYear = new Date().getFullYear()

const carInfo = [{
        model: "Hyundai",
        quantity: 8,
        category: "basic",
    },
    {
        model: "Bmw",
        quantity: 5,
        category: "standard",
    },
    {
        model: "Audi",
        quantity: 3,
        category: "medium",
    },
    {
        model: "Porshe",
        quantity: 2,
        category: "premium",
    },
];

const vatValue = 1.23
const percentageFromQuantity = 1.15
const percentageFromDrivingLicense = 1.2

document.querySelector("#submit").addEventListener("click", () => {

    let price = priceForOneNight
    let carSelected = document.querySelector("#car").value
    let carModelQuantity = carInfo[carSelected].quantity
    const categoryField = carInfo[carSelected].category
    const yearOfReceiptOfDrivingLicense = document.querySelector("#drivinglicense").value
    const newDrivingLicense = currentYear - yearOfReceiptOfDrivingLicense


    if (newDrivingLicense < 5) {

        if (newDrivingLicense < 3 && categoryField == "premium") {
            document.querySelector("#result").innerHTML = `Nie możesz wypożyczyć samochodu wersji premium`
        } else {

            const kilometers = document.querySelector("#kilometers").value
            const fuelCost = ((kilometers * avgcombustion) / fuelCostInPln)
            const receptionCar = document.querySelector("#reception").value
            const returnCar = document.querySelector("#return").value
            const rentFrom = new Date(receptionCar).getTime()
            const rentTo = new Date(returnCar).getTime()
            const result = (rentTo / milliseconds) - (rentFrom / milliseconds)

            switch (categoryField) {
                case 'basic':
                    price *= 1
                    break
                case 'standard':
                    price *= 1.3
                    break
                case 'medium':
                    price *= 1.6
                    break
                case 'premium':
                    price *= 2
                    break
                default:
                    price *= 1
            }

            if (carModelQuantity > 3) {
                const nettoPrice = (result * priceForOneNight + price + fuelCost) * percentageFromDrivingLicense
                const bruttoPrice = nettoPrice * vatValue
                document.querySelector("#result").innerHTML = `Cena netto: ${nettoPrice.toFixed(2)} zł <br>Cena brutto: ${bruttoPrice.toFixed(2)} zł<br> W tym: koszty paliwa: ${fuelCost.toFixed(2)}zł, koszt wypożyczenia na ${result} dni: ${(nettoPrice - fuelCost).toFixed(2)}zł`
            } else if (carModelQuantity <= 3) {
                const nettoPrice = ((result * priceForOneNight + price + fuelCost) * percentageFromDrivingLicense) * percentageFromQuantity
                const bruttoPrice = nettoPrice * vatValue
                document.querySelector("#result").innerHTML = `Cena netto: ${nettoPrice.toFixed(2)} zł <br>Cena brutto: ${bruttoPrice.toFixed(2)} zł<br> W tym: koszty paliwa: ${fuelCost.toFixed(2)}zł, koszt wypożyczenia na ${result} dni: ${(nettoPrice - fuelCost).toFixed(2)}zł`
            }

        }
    } else {


        if (newDrivingLicense < 3 && categoryField == "premium") {
            document.querySelector("#result").innerHTML = `Nie możesz wypożyczyć samochodu wersji premium`
        } else {

            const kilometers = document.querySelector("#kilometers").value
            const fuelCost = ((kilometers * avgcombustion) / fuelCostInPln)
            const receptionCar = document.querySelector("#reception").value
            const returnCar = document.querySelector("#return").value
            const rentFrom = new Date(receptionCar).getTime()
            const rentTo = new Date(returnCar).getTime()
            const result = (rentTo / milliseconds) - (rentFrom / milliseconds)

            switch (categoryField) {
                case 'basic':
                    price *= 1
                    break
                case 'standard':
                    price *= 1.3
                    break
                case 'medium':
                    price *= 1.6
                    break
                case 'premium':
                    price *= 2
                    break
                default:
                    price *= 1
            }

            if (carModelQuantity > 3) {
                const nettoPrice = result * priceForOneNight + price + fuelCost
                const bruttoPrice = nettoPrice * vatValue
                document.querySelector("#result").innerHTML = `Cena netto: ${nettoPrice.toFixed(2)} zł <br>Cena brutto: ${bruttoPrice.toFixed(2)} zł<br> W tym: koszty paliwa: ${fuelCost.toFixed(2)}zł, koszt wypożyczenia na ${result} dni: ${(nettoPrice - fuelCost).toFixed(2)}zł`
            } else if (carModelQuantity <= 3) {
                const nettoPrice = (result * priceForOneNight + price + fuelCost) * percentageFromQuantity
                const bruttoPrice = nettoPrice * vatValue
                document.querySelector("#result").innerHTML = `Cena netto: ${nettoPrice.toFixed(2)} zł <br>Cena brutto: ${bruttoPrice.toFixed(2)} zł<br> W tym: koszty paliwa: ${fuelCost.toFixed(2)}zł, koszt wypożyczenia na ${result} dni: ${(nettoPrice - fuelCost).toFixed(2)}zł`
            }

        }
    }
})