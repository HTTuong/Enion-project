// @ts-nocheck
import React, { useEffect, useState, useContext } from 'react'
import { Line } from 'react-chartjs-2' // Import the chart type you need
import type { ChartData } from 'chart.js' // Import types
import GlobalContext from '~root/contexts/GlobalContext'

import { convertNumberToMonth } from '~root/utils/list'

interface LineChartDataProps {
    valueLabel: string
    labels: string[]
    timeData?: string[]
    data: number[]
    unitType: string
}

const LineChart = (props: LineChartDataProps) => {
    const [consumption, setConsumption] = useState<number>(props.data ? props.data[12] : 0)
    const [min, setMin] = useState<number>(0)
    const [pointOfTime, setPointOfTime] = useState<string>(
        props.timeData ? props.timeData[12] : '00:00',
    )
    const context = useContext(GlobalContext)

    useEffect(() => {
        setConsumption(props.data[12])
        if (props.timeData) {
            setPointOfTime(props.timeData[12])
        }
    }, [props.data, props.timeData])

    const chartData = React.useMemo(
        (): ChartData<'line'> => ({
            labels: props.labels,
            datasets: [
                {
                    label: undefined,
                    data: props.data,
                    borderColor: '#fddd4d',
                    borderWidth: 2,
                    tension: 0.4,
                    pointRadius: 2,
                },
            ],
        }),
        [props.data, props.labels],
    )

    return (
        <div className='flex flex-col'>
            <div className='flex justify-end items-center'>
                <p className='text-slate-300'>
                    {pointOfTime?.slice(11, -4)} | {convertNumberToMonth(pointOfTime?.slice(5, 7))}{' '}
                    {pointOfTime?.slice(8, 10)}
                </p>
            </div>

            <Line
                data={chartData}
                options={{
                    responsive: true,
                    scales: {
                        x: {
                            min: min,
                            max: min + 24,
                            grid: {
                                color: '#0b1118',
                            },
                            ticks: {
                                color: '#d0d2de', // not 'fontColor:' anymore
                                // fontSize: 18,
                                font: {
                                    size: 12, // 'size' now within object 'font {}'
                                },
                            },
                        },
                        y: {
                            ticks: {
                                color: '#d0d2de', // not 'fontColor:' anymore
                                // fontSize: 18,
                                font: {
                                    size: 12, // 'size' now within object 'font {}'
                                },
                                // Include a dollar sign in the ticks
                                callback: function (value, index, ticks) {
                                    return value + ' ' + props.unitType
                                },
                            },
                            grid: {
                                color: '#333',
                            },
                            min: 0,
                            max: Math.max(...props.data),
                        },
                    },

                    animations: {
                        tension: {
                            easing: 'linear',
                        },
                    },

                    plugins: {
                        legend: {
                            display: false,
                        },
                        title: {
                            display: true,
                        },
                        annotation: {
                            annotations: {
                                line1: {
                                    type: 'line',
                                    xMin: min + 12,
                                    xMax: min + 12,
                                    borderColor: 'rgb(255, 255, 255)',
                                    borderWidth: 1,
                                },
                            },
                        },
                        zoom: {
                            pan: {
                                enabled: true,
                                mode: 'x',
                                onPan: ({ chart }) => {
                                    const avgValueIndexOnX =
                                        (chart.config._config.options.scales.x.max +
                                            chart.config._config.options.scales.x.min) /
                                        2
                                    // console.log(chart.config)
                                    const consumption = chart.config._config.data.datasets[0].data[
                                        avgValueIndexOnX
                                    ] as number
                                    setConsumption(consumption)
                                    context.setConsumption(consumption) // set global to calculate cost
                                    setMin(chart.config._config.options.scales.x.min)
                                    const pointOfTime = props.timeData[
                                        chart.config._config.options.scales.x.min + 12
                                    ] as string
                                    setPointOfTime(pointOfTime)
                                    context.setTime(pointOfTime)
                                },
                            },
                            zoom: {
                                // pinch: {
                                //     enabled: true, // Enable pinch zooming
                                // },
                                // wheel: {
                                //     enabled: true, // Enable wheel zooming
                                // },
                                mode: 'x',
                            },
                        },
                    },
                }}
            />
        </div>
    )
}

export default LineChart
