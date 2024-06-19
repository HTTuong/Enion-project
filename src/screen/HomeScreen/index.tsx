import { useLayoutEffect, useState } from 'react'
import { BsBell } from 'react-icons/bs'
import { IoIosArrowDown } from 'react-icons/io'
import { BASE_AWS_S3_BUCKER_API, CONSUMPTION_FILE, START_DATE, END_DATE } from '~root/constants'
import StatsSection from './StatsSections'
import LineChart from '~root/components/LineChart'

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
        <div className='w-full flex flex-col p-8'>
            <div className='flex items-center justify-between'>
                <h3 className='text-4xl text-white font-normal'>Home</h3>
                <div className='flex items-center'>
                    <div className='bg-white py-2 px-3 shadow-md rounded-md hover:shadow-lg transition-shadow cursor-pointer'>
                        <BsBell className='text-xl' />
                    </div>
                    <div className='flex justify-center  bg-white py-2 px-3 shadow-md rounded-md ml-4 relative hover:shadow-lg transition-shadow cursor-pointer'>
                        <img
                            className='w-6 h-6 rounded-full '
                            src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAAAAABWESUoAAABWElEQVR4AaWSIWjDYBCFv/95qmYn66aqYqsK9TNR8QTiITBfOzk/WVlVb6pqKyvqCVQVcrtwLD/N4vaZ3L1cjsflwaptmpIpSWybpl3jXM2sZYKoXO4WkFh01tuWxIgSvPVmj1X0G7P+DhkJbvawCoXQ+oormQQnlz6RCL59/JBbMQhHyJxd2CEIGrNhZSIzGC1/lbW5wRfEiFgO2hIlQJ03Gya2K19xi+7i5QfiicSXyyecg/vZQ2LK0cwq2Pjgmb8IrtYgUT465ik241PMoPyUmCGhsUz8l8Qc211E4aNEzNHZIX7t/XV25zmiN9z8Eque2fuLQ86CxDNt/vDs5e7ZZ6Jw8b4YzZi9IyUyj36MgFj1zhIRJEUE2hz6OsKRCBQRIJPDEewmERAcXfqKRrx7003Pe3OxjunXu9fF9DJLt90XxKxZPV2QKM3i5qu6qrbMsK6quuAHDgrRaprttGsAAAAASUVORK5CYII='
                            alt='user avatar'
                        />
                        <h4 className='font-medium mx-3 text-default'>Enion</h4>
                        <div className='flex justify-center items-center'>
                            <IoIosArrowDown className=''></IoIosArrowDown>
                        </div>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-3 gap-6 mt-10'>
                <div className='col-span-2 bg-black/20 h-fit rounded-2xl shadow-lg  p-8'>
                    {/* Heading: Status */}
                    <div className='flex w-full items-center justify-between'>
                        <div className='flex w-full justify-between items-center'>
                            <h3 className='text-3xl text-white font-medium'>STATS</h3>
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
                            <h3 className='text-3xl text-white font-normal select-none'>
                                Consumption
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
                <div className='col-span-1 bg-white h-fit rounded-2xl shadow-lg p-8'>
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
