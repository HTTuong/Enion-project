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
            <div className='flex items-center text-6xl font-normal text-black'>
                <h3 className='font-normal'>{value}</h3>
                <p>{unit}</p>
            </div>
            <p className='text-lg text-black'>{title}</p>
            <div
                className='w-full flex justify-end mt-4 text-2xl cursor-pointer'
                onClick={handleNavigateToDetail}
            >
                <FaArrowRight />
            </div>
        </div>
    )
}

export default CardItem
