import { useContext, useLayoutEffect, useState } from 'react'
import CardItem from './CardItem'
import GlobalContext from '~root/contexts/GlobalContext'
import Papa from 'papaparse'
import { filterMarketDataInDateRange, filterPriceByDate } from '~root/utils/list'
import { BASE_AWS_S3_BUCKER_API, MARKET_PRICE_FILE, START_DATE, END_DATE } from '~root/constants'

interface IStatsSectionProps {
    consumptionData: number[]
    timeData: number[]
}

export default function StatsSection(props: IStatsSectionProps) {
    const { consumptionData } = props
    const [price, setPrice] = useState<any[]>([])

    const ctx = useContext(GlobalContext)

    // Market price
    useLayoutEffect(() => {
        Papa.parse(`${BASE_AWS_S3_BUCKER_API}/${MARKET_PRICE_FILE}`, {
            download: true,
            complete: function (results) {
                const formattedData = results.data.slice(1).map((row: any) => {
                    if (row[1]?.length > 1) {
                        const timeData = row[0].split('-')[0]
                        const formattedDate = `${timeData.slice(6, 10)}-${timeData.slice(
                            3,
                            5,
                        )}-${timeData.slice(0, 2)}T${timeData.slice(11, -1)}:00Z`
                        const price = (row[1] / 10).toFixed(2) // c/kWh

                        return [formattedDate, price]
                    }
                })

                const data = filterMarketDataInDateRange(formattedData, START_DATE, END_DATE)
                setPrice(data)
            },
        })
    }, [])

    const pricePerHour = +(filterPriceByDate(price, ctx.time)?.at(1) / 100).toFixed(3)
    const priceList = price.map((row) => row[1])
    const cost =
        pricePerHour && ctx.consumption
            ? +(pricePerHour * ctx.consumption).toFixed(2)
            : consumptionData[12] * +(priceList[12] / 100).toFixed(3)
    // console.log(priceList)
    return (
        <div className='w-full mt-6'>
            <div className='grid grid-cols-2  gap-4 md:gap-6 text-black'>
                <CardItem
                    title='Consumptions'
                    value={ctx.consumption ? ctx.consumption : consumptionData[12]}
                    unit='kWh'
                    color='bg-[#fde047]'
                    url='/'
                />
                <CardItem
                    title='Prices'
                    value={pricePerHour ? pricePerHour : +(priceList[12] / 100).toFixed(3)}
                    unit='€'
                    url='/'
                    color='bg-[#d0d2de]'
                />
                <CardItem
                    title='Cost'
                    value={+cost.toFixed(2)}
                    unit='€'
                    url='/'
                    color='bg-[#d0d2de]'
                />
            </div>
        </div>
    )
}
