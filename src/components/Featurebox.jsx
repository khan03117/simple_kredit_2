import { FileOutlined } from '@ant-design/icons';
import { SiSpeedypage } from "react-icons/si";
import { MdOnlinePrediction } from "react-icons/md";
import { SiAmazondynamodb } from "react-icons/si";
import PropTypes from 'prop-types';


const Featurebox = ({title, index}) => {

    return (
        <>
            <div className="w-full">
                <div className="flex items-center">
                    <div className="w-[60px] h-[60px] leading-[60px] rounded shadow-md shadow-primary text-center text-[2rem] bg-primary text-white">
                        {
                            index == 0 && (
                                <>
                                    <FileOutlined/>
                                </>
                            )
                        }
                        {
                            index == 1 && (
                                <>
                                    <SiSpeedypage className='mx-auto mt-3'/>
                                </>
                            )
                        }
                        {
                            index == 2 && (
                                <>
                                    <MdOnlinePrediction className='mx-auto mt-3' />
                                </>
                            )
                        }
                        {
                            index == 3 && (
                                <>
                                    <SiAmazondynamodb className='mx-auto mt-3' />
                                </>
                            )
                        }
                      
                    </div>
                    <div className="inline-block featurepara ps-4">
                        <p>
                            {title}
                        </p>

                    </div>
                </div>
            </div>
        </>
    )
}
Featurebox.propTypes = {
    title: PropTypes.string.isRequired, // Define 'title' as a required string prop
    index : PropTypes.string
};
export default Featurebox