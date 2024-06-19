import { useLocation, useNavigate } from 'react-router-dom'
import { BiHomeSmile } from 'react-icons/bi'
import classNames from 'classnames'
import { BsRouterFill } from 'react-icons/bs'
import { MdOutlineDevices } from 'react-icons/md'
import { FaHistory } from 'react-icons/fa'

export default function Sidebar() {
    const location = useLocation()
    const navigate = useNavigate()

    const handleNavigate = (path: string) => {
        navigate(path, { replace: false })
    }

    const routes = [
        {
            label: 'Home',
            icon: <BiHomeSmile className='lg:mr-4 text-3xl lg:text-xl' />,
            href: '/',
        },
        {
            label: 'Enion Devices',
            icon: <BsRouterFill className='lg:mr-4 text-3xl lg:text-xl' />,
            href: '/devices',
        },
        {
            label: 'Appliances',
            icon: <MdOutlineDevices className='lg:mr-4 text-3xl lg:text-xl' />,
            href: '/appliances',
        },
        {
            label: 'History',
            icon: <FaHistory className='lg:mr-4 text-3xl lg:text-xl' />,
            href: '/history',
        },
    ]

    return (
        <div className='w-1/5 h-screen bg-black'>
            <div className='p-2 sm:p-5 pt-10'>
                <div className='flex justify-center items-center w-full lg:p-2'>
                    <img
                        src='https://images.squarespace-cdn.com/content/v1/6332c88e7eafea3896d93989/6d084e31-032e-4fec-9b4c-ff037ae80a91/Enion+logo+white.png?format=1500w'
                        alt=''
                        className='w-50 h-20 hidden lg:block'
                    />
                    {/* https://app.enion.fi/app/assets/enion-463b11d2.svg */}
                    <img
                        src='https://app.enion.fi/app/assets/enion-463b11d2.svg'
                        alt=''
                        className='w-full sm:w-3/4  block lg:hidden'
                    />
                    {/* <p className='font-semibold text-default text-lg pl-2 pt-2'>Enion</p> */}
                </div>
                <div className='list-none pt-5'>
                    {routes.map((route) => (
                        <div
                            key={route.label}
                            onClick={() => handleNavigate(route.href)}
                            className={classNames(
                                'flex justify-center lg:justify-start items-center font-medium  text-lg my-10 py-2 lg:py-2.5 lg:pl-3 rounded-md hover:bg-yellow-300 hover:text-black cursor-pointer transition-all',
                                {
                                    'bg-yellow-300 text-black': route.href === location.pathname,
                                    ' text-white': route.href !== location.pathname,
                                },
                            )}
                        >
                            <div className='flex justify-center items-center'>{route.icon}</div>
                            <p className='hidden lg:block'>{route.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
