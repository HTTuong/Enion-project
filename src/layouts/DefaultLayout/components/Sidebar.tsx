import { useLocation, useNavigate } from 'react-router-dom'
import { BiHomeSmile } from 'react-icons/bi'
import classNames from 'classnames'
import { BiFile } from 'react-icons/bi'

export default function Sidebar() {
    const location = useLocation()
    const navigate = useNavigate()

    const handleNavigate = (path: string) => {
        navigate(path, { replace: false })
    }

    const routes = [
        {
            label: 'Home',
            icon: <BiHomeSmile className='mr-4 text-xl' />,
            href: '/',
        },
        {
            label: 'Enion Devices',
            icon: <BiFile className='mr-4 text-xl' />,
            href: '/devices',
        },
        {
            label: 'Appliances',
            icon: <BiFile className='mr-4 text-xl' />,
            href: '/appliances',
        },
        {
            label: 'History',
            icon: <BiHomeSmile className='mr-4 text-xl' />,
            href: '/history',
        },
    ]

    return (
        <div className='w-1/5 h-screen bg-black'>
            <div className='p-5 pt-10'>
                <div className='flex p-2'>
                    <img
                        src='https://images.squarespace-cdn.com/content/v1/6332c88e7eafea3896d93989/6d084e31-032e-4fec-9b4c-ff037ae80a91/Enion+logo+white.png?format=1500w'
                        alt=''
                        className='w-50 h-20 '
                    />
                    {/* <p className='font-semibold text-default text-lg pl-2 pt-2'>Enion</p> */}
                </div>
                <div className='list-none pt-5'>
                    {routes.map((route) => (
                        <div
                            key={route.label}
                            onClick={() => handleNavigate(route.href)}
                            className={classNames(
                                'flex items-center font-medium  text-lg my-10 py-2.5 pl-3 rounded-md hover:bg-yellow-300 hover:text-black cursor-pointer transition-all',
                                {
                                    'bg-yellow-300 text-black': route.href === location.pathname,
                                    ' text-white': route.href !== location.pathname,
                                },
                            )}
                        >
                            {route.icon}
                            {route.label}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
