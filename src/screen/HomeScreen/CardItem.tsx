import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa6'
import classNames from 'classnames'

interface ICardItemProps {
    title: string
    value: number
    unit: string
    url: string
    color?: string
}

const CardItem: FC<ICardItemProps> = (props) => {
    const { title, value, unit, url, color = 'bg-yellow-200' } = props

    const navigate = useNavigate()

    const handleNavigateToDetail = () => {
        navigate(url, { replace: false })
    }

    return (
        <div className={classNames(`col-span-1 flex flex-col h-fit ${color} rounded-3xl p-4`)}>
            <div className='flex justify-center md:justify-start flex-col sm:flex-row  items-center font-normal text-black'>
                <h3 className='text-5xl md:text-7xl font-normal'>{value}</h3>
                <p className='text-3xl md:text-6xl'>{unit}</p>
            </div>
            <p className='text-lg text-black text-center mt-3 sm:mt-0'>{title}</p>
            <div
                className='w-full flex justify-center md:justify-end mt-4 text-2xl cursor-pointer'
                onClick={handleNavigateToDetail}
            >
                <FaArrowRight />
            </div>
        </div>
    )
}

export default CardItem
