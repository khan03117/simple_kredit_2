import { ClockCircleOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types';


const Featurebox = (props) => {

    return (
        <>
            <div className="w-full">
                <div className="flex items-center">
                    <div className="w-[60px] h-[60px] leading-[60px] text-center text-[2rem] bg-primary text-white">
                        <ClockCircleOutlined />
                    </div>
                    <div className="inline-block featurepara ps-4">
                        <p>
                            {props?.title}
                        </p>

                    </div>
                </div>
            </div>
        </>
    )
}
Featurebox.propTypes = {
    title: PropTypes.string.isRequired, // Define 'title' as a required string prop
};
export default Featurebox