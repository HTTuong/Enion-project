import { FaCar } from 'react-icons/fa6'
import { MdOutlineHeatPump, MdOutlineSevereCold } from 'react-icons/md'
import ApplianceItem from '~root/screen/AppliancesScreen/ApplianceItem'
import Heading from '~root/layouts/DefaultLayout/components/Heading'

export default function AppliancesScreen() {
    return (
        <div className='w-full flex flex-col p-8'>
            <Heading title='Appliances' userName='Enion' />

            <div className='grid grid-cols-3 gap-6 mt-10'>
                <div className='col-span-2 bg-black/20 h-fit rounded-2xl   p-8'>
                    <div className='flex flex-col w-full '>
                        {/* Heading */}
                        <div className='flex w-full justify-between items-center'>
                            <h3 className='text-3xl text-white font-normal'>STATS</h3>
                            <div className='flex items-center text-base text-default/60 mt-1'>
                                <p className='hover:text-black cursor-pointer transition-colors'>
                                    See all
                                </p>
                            </div>
                        </div>
                        {/* List of appliances */}
                        <div className='flex flex-col mt-6'>
                            <ApplianceItem
                                deviceName='Heater'
                                enionProduct='Enion 3'
                                url='/'
                                isA
                                Icon={MdOutlineHeatPump}
                            />
                            <ApplianceItem
                                Icon={MdOutlineSevereCold}
                                deviceName='AirCon'
                                enionProduct='Enion 3'
                                isM
                                url='/'
                            />
                            <ApplianceItem
                                Icon={FaCar}
                                deviceName='EV Charger'
                                enionProduct='Enion 1'
                                url='/'
                                notUse
                            />
                        </div>
                    </div>
                </div>
                <div className='col-span-1 bg-white h-fit rounded-2xl shadow-lg p-8'>
                    <p className=' text-default'>
                        This page contains status of electrical devices connected to Enion smart
                        devices
                    </p>
                </div>
            </div>
        </div>
    )
}
