import { ArrowRightOutlined } from "@ant-design/icons"
import PropTypes from 'prop-types';

const UseBox = (props) => {
    return (
        <>
            <div className="col-lg-6 wow animate__fadeInUp" data-wow-offset="100" data-wow-delay="0.1s" data-wow-duration="0.8s" >
                <div className="invoices-card invoices-card-small bg-white shadow-lg shadow-gray-300">
                    <div className="invoices-card-head">
                        <a href="blog-details.html" className="read-more v2">
                            <ArrowRightOutlined className="inline-block -rotate-45"/>
                        </a>
                        <div className="numbber-stitle">
                            <h6 className="count-num">01</h6>
                            <h6 className="stitle">Invoicing</h6>
                        </div>
                    </div>
                    <h2 className="card-title font-v4">
                       {props.title}
                    </h2>
                    <p className="card-para">Welcome to our hassle-free loan solution, <br /> where
                        you can track your application status.</p>
                </div>
            </div>
        </>
    )
}
UseBox.propTypes = {
    title: PropTypes.string.isRequired, // Define 'title' as a required string prop
};

export default UseBox