import { PlusOutlined } from '@ant-design/icons';
import ploan from '../assets/image/personal_loan.png'
import PropTypes from 'prop-types';

const ServiceCard = (props) => {
    return (
        <>
            <div className={`service_card p-6 rounded-2xl ${props.bg}`}>
                <div className="w-full mb-10 mt-6">
                    <div className="circle_icon rounded-full  size-20 bg-white text-center grid place-content-center">
                        <img src={ploan} alt="" width={60} />
                    </div>
                </div>

                <div className="w-full mt-4 mb-9">
                    <h2 className="text-xl">Personal Loan</h2>
                    <p>Get instant loan with minimum file charge.</p>
                </div>
                <div className="w-full">
                    <button className="btn bg-white rounded-full px-6 py-3 cursor-pointer">
                        <PlusOutlined />   Apply Now
                    </button>
                </div>
            </div>
        </>
    )
}

ServiceCard.propTypes = {
    bg: PropTypes.string
}


export default ServiceCard