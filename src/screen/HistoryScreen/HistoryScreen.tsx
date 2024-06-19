import Papa from 'papaparse'
import { useLayoutEffect, useState } from 'react'
import BarChart from '~root/components/BarChart'
import Heading from '~root/layouts/DefaultLayout/components/Heading'
import { filterMarketDataInDateRange } from '~root/utils/list'
import { BASE_AWS_S3_BUCKER_API, MARKET_PRICE_FILE, START_DATE, END_DATE } from '~root/constants'

export default function HistoryScreen() {
    const [marketPriceData, setMarketPriceData] = useState<any[]>([])
    const [marketPriceLabels, setMarketPriceLabels] = useState<any[]>([])
    const [marketPriceTimeData, setMarketPriceTimeData] = useState<any[]>([])

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

                const quantityList = data.map((row) => {
                    return parseFloat(row[1])
                })

                setMarketPriceData(quantityList)
                const labels = quantityList.map((item, index) => {
                    return index % 24
                })
                setMarketPriceLabels(labels)
                const timeList = data.map((row) => {
                    return row[0]
                })
                setMarketPriceTimeData(timeList)
            },
        })
    }, [])

    return (
        <div className='w-full flex flex-col p-6 pt-10 sm:p-8 sm:pt-8'>
            <Heading title='History' userName='Enion' />

            <div className='w-full lg:grid  grid-cols-3 gap-6 mt-10'>
                <div className='col-span-2 bg-black/20 h-fit rounded-2xl p-0 sm:p-8'>
                    {/* Market price */}
                    <div className='flex flex-col w-full mt-8 sm:mt-0'>
                        {/* Heading */}
                        <div className='flex w-full justify-between items-center mb-8'>
                            <h3 className=' text-lg sm:text-3xl text-white font-normal select-none'>
                                MARKET PRICES
                            </h3>
                        </div>
                        <BarChart
                            labels={marketPriceLabels}
                            valueLabel='Number of votes'
                            data={marketPriceData}
                            unitType='c/kWh'
                            timeData={marketPriceTimeData}
                        />
                    </div>
                </div>
                <div className='col-span-1 bg-white h-fit rounded-2xl shadow-lg p-8 hidden lg:block'>
                    <p className=' text-default'>This page shows market price chart in 2022</p>
                </div>
            </div>
        </div>
    )
}
