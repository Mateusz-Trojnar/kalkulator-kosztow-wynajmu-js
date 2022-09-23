const fuelCostInPln = 7.76
const priceForOneNight = 120
const avgcombustion = 8.7
const milliseconds = 86400000
const currentYear = new Date().getFullYear()

const carInfo = [{
        model: "Hyundai",
        quantity: 8,
        category: "basic",
        id: 0
    },
    {
        model: "Bmw",
        quantity: 5,
        category: "standard",
        id: 1
    },
    {
        model: "Audi",
        quantity: 3,
        category: "medium",
        id: 2
    },
    {
        model: "Porshe",
        quantity: 2,
        category: "premium",
        id: 3
    },
];

carInfo.forEach(element => {
    document.querySelector("#car").innerHTML += `<option value="${element.id}">${element.model}</option>`
});

const vatValue = 1.23
const percentageFromQuantity = 1.15
const percentageFromDrivingLicense = 1.2

function getCarRentCost() {

    let price = priceForOneNight
    let carSelected = document.querySelector("#car").value
    let carModelQuantity = carInfo[carSelected].quantity
    const categoryField = carInfo[carSelected].category
    const yearOfReceiptOfDrivingLicense = document.querySelector("#drivinglicense").value
    const newDrivingLicense = currentYear - yearOfReceiptOfDrivingLicense

    const kilometers = document.querySelector("#kilometers").value
    const fuelCost = ((kilometers * avgcombustion) / fuelCostInPln)
    const receptionCar = document.querySelector("#reception").value
    const returnCar = document.querySelector("#return").value
    const rentFrom = new Date(receptionCar).getTime()
    const rentTo = new Date(returnCar).getTime()
    const result = (rentTo / milliseconds) - (rentFrom / milliseconds)

    const data = {
        price: price,
        carSelected: carSelected,
        carModelQuantity: carModelQuantity,
        categoryField: categoryField,
        yearOfReceiptOfDrivingLicense: yearOfReceiptOfDrivingLicense,
        newDrivingLicense: newDrivingLicense,
        kilometers: kilometers,
        fuelCost: fuelCost,
        result: result,
        receptionCar: receptionCar,
        returnCar: returnCar,
    }
    return data
}

document.querySelector("#submit").addEventListener("click", () => {


    const data = getCarRentCost()

    if (data.kilometers.length == 0 || data.yearOfReceiptOfDrivingLicense.length == 0 || data.receptionCar.length == 0 || data.returnCar.length == 0) {
        document.querySelector("#result").innerHTML = `Wypełnij wszystkie pola`
    } else {

        if (data.newDrivingLicense < 5) {

            if (data.newDrivingLicense < 3 && data.categoryField == "premium") {
                document.querySelector("#result").innerHTML = `Nie możesz wypożyczyć samochodu wersji premium`
            } else {

                switch (data.categoryField) {
                    case 'basic':
                        data.price *= 1
                        break
                    case 'standard':
                        data.price *= 1.3
                        break
                    case 'medium':
                        data.price *= 1.6
                        break
                    case 'premium':
                        data.price *= 2
                        break
                    default:
                        data.price *= 1
                }

                if (data.carModelQuantity > 3) {
                    const nettoPrice = (data.result * priceForOneNight + data.price + data.fuelCost) * percentageFromDrivingLicense
                    const bruttoPrice = nettoPrice * vatValue
                    document.querySelector("#result").innerHTML = `Cena netto: ${nettoPrice.toFixed(2)} zł <br>Cena brutto: ${bruttoPrice.toFixed(2)} zł<br> W tym: koszty paliwa: ${data.fuelCost.toFixed(2)}zł, koszt wypożyczenia na ${data.result} dni: ${(nettoPrice - data.fuelCost).toFixed(2)}zł`
                } else if (data.carModelQuantity <= 3) {
                    const nettoPrice = ((data.result * priceForOneNight + data.price + data.fuelCost) * percentageFromDrivingLicense) * percentageFromQuantity
                    const bruttoPrice = nettoPrice * vatValue
                    document.querySelector("#result").innerHTML = `Cena netto: ${nettoPrice.toFixed(2)} zł <br>Cena brutto: ${bruttoPrice.toFixed(2)} zł<br> W tym: koszty paliwa: ${data.fuelCost.toFixed(2)}zł, koszt wypożyczenia na ${data.result} dni: ${(nettoPrice - data.fuelCost).toFixed(2)}zł`
                }
            }

        } else {

            if (data.newDrivingLicense < 3 && data.categoryField == "premium") {
                document.querySelector("#result").innerHTML = `Nie możesz wypożyczyć samochodu wersji premium`
            } else {

                switch (data.categoryField) {
                    case 'basic':
                        data.price *= 1
                        break
                    case 'standard':
                        data.price *= 1.3
                        break
                    case 'medium':
                        data.price *= 1.6
                        break
                    case 'premium':
                        data.price *= 2
                        break
                    default:
                        data.price *= 1
                }

                if (data.carModelQuantity > 3) {
                    const nettoPrice = data.result * priceForOneNight + data.price + data.fuelCost
                    const bruttoPrice = nettoPrice * vatValue
                    document.querySelector("#result").innerHTML = `Cena netto: ${nettoPrice.toFixed(2)} zł <br>Cena brutto: ${bruttoPrice.toFixed(2)} zł<br> W tym: koszty paliwa: ${data.fuelCost.toFixed(2)}zł, koszt wypożyczenia na ${data.result} dni: ${(nettoPrice - data.fuelCost).toFixed(2)}zł`
                } else if (data.carModelQuantity <= 3) {
                    const nettoPrice = (data.result * priceForOneNight + data.price + data.fuelCost) * percentageFromQuantity
                    const bruttoPrice = nettoPrice * vatValue
                    document.querySelector("#result").innerHTML = `Cena netto: ${nettoPrice.toFixed(2)} zł <br>Cena brutto: ${bruttoPrice.toFixed(2)} zł<br> W tym: koszty paliwa: ${data.fuelCost.toFixed(2)}zł, koszt wypożyczenia na ${data.result} dni: ${(nettoPrice - data.fuelCost).toFixed(2)}zł`
                }

            }
        }
    }
})