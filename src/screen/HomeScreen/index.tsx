import { useLayoutEffect, useState } from 'react'
import { BASE_AWS_S3_BUCKER_API, CONSUMPTION_FILE, START_DATE, END_DATE } from '~root/constants'
import StatsSection from './StatsSections'
import LineChart from '~root/components/LineChart'
import Heading from '~root/layouts/DefaultLayout/components/Heading'
import zoomPlugin from 'chartjs-plugin-zoom'
import annotationPlugin from 'chartjs-plugin-annotation'
import { filterConsumptionDataInDateRange } from '~root/utils/list'
import ChartjsPluginScrollBar from 'chartjs-plugin-scroll-bar'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
} from 'chart.js'
import Papa from 'papaparse'

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartjsPluginScrollBar,
    zoomPlugin,
    annotationPlugin,
)

const HomeScreen = () => {
    const [consumptionData, setConsumptionData] = useState<any[]>([])
    const [consumptionLabels, setConsumptionLabels] = useState<any[]>([])
    const [consumptionTimeData, setConsumptionTimeData] = useState<any[]>([])

    // Consumption
    useLayoutEffect(() => {
        Papa.parse(`${BASE_AWS_S3_BUCKER_API}/${CONSUMPTION_FILE}`, {
            download: true,
            complete: function (results) {
                const data = filterConsumptionDataInDateRange(results.data, START_DATE, END_DATE)

                // console.log(results.data)
                const quantityList = data.map((row) => {
                    const formatedValue = row[6].split(',')[0] + '.' + row[6].split(',')[1]
                    return parseFloat(formatedValue)
                })
                setConsumptionData(quantityList)
                const labels = quantityList.map((item, index) => {
                    return index % 24
                })
                setConsumptionLabels(labels)
                const timeList = data.map((row) => {
                    return row[5]
                })

                setConsumptionTimeData(timeList)
            },
        })
    }, [])

    return (
        <div className='w-full flex flex-col p-6 pt-10 sm:p-8 sm:pt-8'>
            <Heading title='Home' userName='Enion' />

            <div className='w-full lg:grid grid-cols-3 gap-6 mt-10'>
                <div className='col-span-2 bg-black/20 h-fit rounded-2xl shadow-lg p-0 sm:p-8'>
                    {/* Heading: Status */}
                    <div className='flex w-full items-center justify-between mt-8 sm:mt-0'>
                        <div className='flex w-full justify-between items-center'>
                            <h3 className='text-lg sm:text-3xl text-white font-medium'>STATS</h3>
                        </div>
                    </div>
                    {/* Card list */}
                    <StatsSection
                        consumptionData={consumptionData}
                        timeData={consumptionTimeData}
                    />
                    {/* Consumption */}
                    <div className='flex flex-col w-full mt-10'>
                        {/* Heading */}
                        <div className='flex w-full justify-between items-center'>
                            <h3 className='text-lg sm:text-3xl text-white font-normal select-none'>
                                CONSUMPTION
                            </h3>
                        </div>
                        <LineChart
                            labels={consumptionLabels}
                            valueLabel='Number of votes'
                            data={consumptionData}
                            unitType='kW'
                            timeData={consumptionTimeData}
                        />
                    </div>
                </div>
                <div className='col-span-1 bg-white h-fit rounded-2xl shadow-lg p-8 hidden lg:block'>
                    <p className=' text-default'>
                        This page is home page where shows the amount of consumptions, market price
                        and cost per hour
                    </p>
                </div>
            </div>
        </div>
    )
}

export default HomeScreen
