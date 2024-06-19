// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2' // Import the chart type you need
import type { ChartData } from 'chart.js' // Import types

import { convertNumberToMonth } from '~root/utils/list'

interface BarChartDataProps {
    valueLabel: string
    labels: string[]
    timeData?: string[] | undefined
    data: number[]
    unitType: string
}

const BarChart = (props: BarChartDataProps) => {
    const [consumption, setConsumption] = useState<number>(props.data ? props.data[12] : 0)
    const [min, setMin] = useState<number>(0)
    const [pointOfTime, setPointOfTime] = useState<string>(
        props.timeData ? props.timeData[12] : '00:00',
    )

    useEffect(() => {
        setConsumption(props.data[12])
        if (props.timeData) {
            setPointOfTime(props.timeData[12])
        }
    }, [props.data, props.timeData])

    const chartData = React.useMemo(
        (): ChartData<'bar'> => ({
            labels: props.labels,
            datasets: [
                {
                    label: undefined,
                    data: props.data,
                    // borderColor: '#fddd4d',
                    backgroundColor: '#fddd4d',
                    // borderWidth: 2,
                },
            ],
        }),
        [props.data, props.labels],
    )

    return (
        <div className='flex flex-col'>
            <div className='flex justify-between items-center text-white/90'>
                <p className='ml-10 text-2xl '>
                    {consumption} {props.unitType}
                </p>
                <p>
                    {pointOfTime?.slice(11, -4)} | {convertNumberToMonth(pointOfTime?.slice(5, 7))}{' '}
                    {pointOfTime?.slice(8, 10)}
                </p>
            </div>
            <Bar
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
                            // duration: 1000,
                            easing: 'linear',
                            // from: 1,
                            // to: 0,
                            // loop: true,
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
                                    const xMax = chart.config._config.options.scales.x.max
                                    const xMin = chart.config._config.options.scales.x.min
                                    const avgValueIndexOnX = (xMax + xMin) / 2
                                    // console.log(chart.config)
                                    setConsumption(
                                        chart.config._config.data.datasets[0].data[
                                            avgValueIndexOnX
                                        ],
                                    )
                                    setMin(chart.config._config.options.scales.x.min)
                                    if (props.timeData) {
                                        setPointOfTime(
                                            props.timeData[
                                                chart.config._config.options.scales.x.min + 12
                                            ],
                                        )
                                    }
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

export default BarChart
