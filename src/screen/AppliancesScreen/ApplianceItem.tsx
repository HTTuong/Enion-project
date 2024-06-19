import { FC } from 'react'
import { IconType } from 'react-icons/lib'
import { useNavigate } from 'react-router-dom'

import classNames from 'classnames'
import { IoIosArrowForward } from 'react-icons/io'

import { alpha, styled } from '@mui/material/styles'
import { yellow } from '@mui/material/colors'
import Switch from '@mui/material/Switch'

interface IApplianceItemProps {
    Icon: IconType
    isA?: boolean
    isM?: boolean
    deviceName: string
    enionProduct: string
    url: string
    color?: string
    notUse?: boolean
}

const YellowSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: yellow['A700'],
        '&:hover': {
            backgroundColor: alpha(yellow['A700'], theme.palette.action.hoverOpacity),
        },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: yellow['A700'],
    },
}))

const ApplianceItem: FC<IApplianceItemProps> = (props) => {
    const { deviceName, isA, isM, enionProduct, Icon, notUse, url, color = 'bg-[#1a2026]' } = props

    const navigate = useNavigate()

    const handleNavigateToDetail = () => {
        navigate(url, { replace: false })
    }

    return (
        <div
            className={classNames(
                `col-span-1 flex items-center justify-between h-fit ${color} rounded-3xl py-4 px-4  sm:py-4 sm:px-6 mb-6`,
            )}
        >
            <div className=' flex items-center'>
                <Icon className='text-white/70 text-3xl sm:text-4xl mr-4' />
                <div className='flex flex-col text-white  text-6xl font-normal'>
                    <h3 className='font-normal text-xl'>{deviceName}</h3>
                    <p className='text-base text-white/70'>{enionProduct}</p>
                </div>
            </div>
            <div className='flex-1 flex flex-col sm:flex-row justify-around items-center'>
                <div className='flex py-1  sm:py-0'>
                    {notUse && <span className='h-3 w-3 bg-red-500 rounded-sm ml-6'></span>}
                    {isA && (
                        <div className='flex items-center'>
                            <span className='h-3 w-3 bg-green-500 rounded-sm mx-6'></span>
                            <span className='py-1 px-2 bg-yellow-400 text-black rounded-md'>A</span>
                        </div>
                    )}
                    {isM && (
                        <div className='flex items-center'>
                            <span className='h-3 w-3 bg-green-500 rounded-sm mx-6'></span>
                            <span className='py-1 px-2 bg-white text-black rounded-md'>M</span>
                        </div>
                    )}
                </div>
                <div className='flex items-center py-1 sm:py-0'>
                    <p className=' text-base text-white/60 select-none'>Relay</p>
                    <YellowSwitch defaultChecked />
                </div>
            </div>
            <div
                className=' flex items-center justify-end text-2xl cursor-pointer'
                onClick={handleNavigateToDetail}
            >
                <IoIosArrowForward className='text-white' />
            </div>
        </div>
    )
}

export default ApplianceItem
