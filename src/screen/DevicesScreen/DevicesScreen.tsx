import Heading from '~root/layouts/DefaultLayout/components/Heading'

export default function DevicesScreen() {
    return (
        <div className='w-full flex flex-col p-8'>
            <Heading title='Enion Devices' userName='Enion' />

            <div className='grid grid-cols-3 gap-6 mt-10'>
                <div className='col-span-2 bg-black/20 h-fit rounded-2xl   p-8'>
                    <div className='flex flex-col items-center w-full '>
                        {/* Heading */}
                        <div className='flex w-full justify-between items-center'>
                            <h3 className='text-3xl text-white font-normal'>STATS</h3>
                            <div className='flex items-center text-base text-default/60 mt-1'>
                                <p className='hover:text-black cursor-pointer transition-colors'>
                                    See all
                                </p>
                            </div>
                        </div>
                        <button className='mt-10 p-2 px-8 w-fit bg-yellow-300 text-xl font-medium rounded-2xl cursor-pointer hover:bg-yellow-400 transition-colors '>
                            + ADD DEVICE
                        </button>
                    </div>
                </div>
                <div className='col-span-1 bg-white h-fit rounded-2xl shadow-lg p-8'>
                    <p className=' text-default'>
                        This page contains status of Enion 3 smart devices
                    </p>
                </div>
            </div>
        </div>
    )
}
