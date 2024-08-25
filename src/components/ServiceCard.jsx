import { PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ServiceCard = (props) => {
    return (
        <>
            <div className={`service_card ${props.loan.id > 2 ? 'text-white' : 'text-black' }  relative w-full h-full p-6 rounded-2xl  ${props.bg} bg-opacity-${props.loan.id * 20}`}>
                <div className="w-full mb-10 mt-6">
                    <div className="circle_icon rounded-full p-4  size-20 bg-white text-center grid place-content-center">
                        <img src={props.loan.icon} alt="" width={60} />
                    </div>
                </div>

                <div className="w-full mt-4  mb-20">
                    <h2 className="text-xl">{props.loan.loan}</h2>
                    <p>{props.loan.description}</p>
                </div>
                <div className="w-full absolute bottom-10 start-4">
                    <Link to={'/loan-application'} className="btn bg-white text-black rounded-full px-6 py-3 cursor-pointer">
                        <PlusOutlined />   Apply Now
                    </Link>
                </div>
            </div>
        </>
    )
}

ServiceCard.propTypes = {
    bg: PropTypes.string,
    loan: PropTypes.object
}


export default ServiceCard