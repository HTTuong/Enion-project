export const getEvenNumbersArray = (start: number, end: number) => {
    const result: string[] = []
    let current = start
    while (current <= end) {
        if (current % 2 === 0) {
            result.push(current.toString())
        }
        current += 2
    }
    return result
}

export const getEvenNumbersArrayPlus1 = (start: number, end: number) => {
    const result: string[] = []
    let current = start
    while (current <= end) {
        result.push(current.toString())

        current += 1
    }
    return result
}

export const getEvenArray = (start: number, end: number) => {
    const result: number[] = []
    let current = start
    while (current <= end) {
        if (current % 2 === 0) {
            result.push(current)
        }
        current += 2
    }
    return result
}

export const filterConsumptionDataInDateRange = (
    product_data: any[],
    start: string,
    end: string,
) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    const result: any[] = []

    product_data.slice(1, -1).forEach((row: any[]) => {
        const date = new Date(row[5])

        if (date >= startDate && date < endDate) {
            result.push(row)
        }
    })

    return result
}

export const filterMarketDataInDateRange = (product_data: any[], start: string, end: string) => {
    const startDate = new Date(start)
    const endDate = new Date(end)

    const result: any[] = []

    product_data.forEach((row: any[]) => {
        if (row != undefined) {
            const date = new Date(row![0])
            if (date >= startDate && date < endDate) {
                result.push(row)
            }
        }
    })

    return result
}

export const getAverageValue = (list: number[]) => {
    const sum = list.reduce((a, b) => a + b, 0)
    const avg = sum / list.length || 0
    return avg
}

export const getMiddleValueInArray = (arr: number[]) => {
    const middle = arr[Math.round((arr.length - 1) / 2)]
    return middle
}

export const convertTimeToDate = (pointOfTime: string) => {
    // const date = (new Date(pointOfTime) + '').split(' ')
    const date = new Date(pointOfTime)
    return date + ''

    // return date[1] + ' ' + date[2]
}

export const convertTimeToAMFormat = (pointOfTime: string) => {
    const date = new Date(pointOfTime)

    let hours = date.getHours() - 2
    let minutes: number | string = date.getMinutes()

    // Check whether AM or PM
    const newformat = hours >= 12 ? 'PM' : 'AM'

    // Find current hour in AM-PM Format
    hours = hours % 12

    // To display "0" as "12"
    hours = hours ? hours : 12
    minutes = minutes < 10 ? '0' + minutes : minutes

    return hours + ':' + minutes + ' ' + newformat
}

export const convertNumberToMonth = (number: string) => {
    let result = ''
    switch (number) {
        case '01':
            result = 'Jan'
            break
        case '02':
            result = 'Feb'
            break
        case '03':
            result = 'Mar'
            break
        case '04':
            result = 'Apr'
            break
        case '05':
            result = 'May'
            break
        case '06':
            result = 'Jun'
            break
        case '07':
            result = 'Jul'
            break
        case '08':
            result = 'Aug'
            break
        case '09':
            result = 'Sep'
            break
        case '10':
            result = 'Oct'
            break
        case '11':
            result = 'Nov'
            break
        case '12':
            result = 'Dec'
            break
    }
    return result
}

export const filterPriceByDate = (data: any[], filterDate: string) => {
    const dateList = data.filter((item) => item[0] == filterDate)
    const row = dateList.at(0)
    return row
}
