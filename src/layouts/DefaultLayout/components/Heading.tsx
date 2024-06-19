import { BsBell } from 'react-icons/bs'
import { IoIosArrowDown } from 'react-icons/io'

interface IHeading {
    title: string
    userName: string
}

export default function Heading(props: IHeading) {
    const { title, userName } = props

    return (
        <div className='flex items-center justify-between'>
            <h3 className='text-4xl text-white font-normal'>{title}</h3>
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
                    <h4 className='font-medium mx-3 text-default'>{userName}</h4>
                    <div className='flex justify-center items-center'>
                        <IoIosArrowDown className=''></IoIosArrowDown>
                    </div>
                </div>
            </div>
        </div>
    )
}
