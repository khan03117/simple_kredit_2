import { Link } from 'react-router-dom'
import trustimg from '../../assets/image/Trustpilot.png'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { base_url, headers } from '../../utils';
import parse from 'html-react-parser';
const Footer = () => {
    const [disclaimer, setDisclaimer] = useState('...Loading');
    const get_disclaimer = async () => {
        await axios.get(`${base_url}api/disclaimer`, { headers: headers }).then((res) => {
            setDisclaimer(res.data.data);
        })
    }
    useEffect(() => {
        get_disclaimer();
    }, []);
    return (
        <>
            <footer className="footerbg text-white">
                <div className="container">
                    <div className="w-full mb-20 ">
                        <h4 className="text-lg">Disclaimer :</h4>
                        <div className='text-xs tracking-[1px] leading-6 font-light'>
                            {parse(disclaimer)}
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
                        <div className="w-full footerabout">
                            <h4>We re on a mission.</h4>
                            <p>
                                At simple-credit.org, we’re using cutting-edge technology to transform the industry and deliver financial services that actually work for you.
                            </p>
                            <div className="w-full">
                                <img src={trustimg} alt="" />
                            </div>
                        </div>
                        <div className="w-full">
                            <h5 className="element-title">
                                Loan
                            </h5>
                            <ul>
                                <li>
                                    <Link to={'/about'}>About Us</Link>
                                </li>
                                <li>
                                    <Link to={'/loan-application'}>How to Apply</Link>
                                </li>
                                <li>
                                    <Link to={'/loan-calculator'}>Loan Calculator</Link>
                                </li>

                                <li>
                                    <Link to={'/document-list'}>Documents Required</Link>
                                </li>
                                <li>
                                    <Link to={'/faq'}>Faq</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="w-full">
                            <h5 className="element-title">
                                Policies
                            </h5>
                            <ul>
                                <li>
                                    <Link to={'/policy/privacy-policy'}>Privacy policy</Link>
                                </li>
                                <li>
                                    <Link to={'/policy/grievance-redressal-policy'}>Grievance redressal policy</Link>
                                </li>
                                <li>
                                    <Link to={'/policy/interest-rate-policy'}>Interest Rate Policy</Link>
                                </li>
                                <li>
                                    <Link to={'/policy/default-collection-policy'}>Default and Collection Policy</Link>
                                </li>
                                <li>
                                    <Link to={'/policy/terms-conditions'}>Terms & Conditions</Link>
                                </li>
                                <li>
                                    <Link to={'/policy/refund-policy'}>Refund Policy</Link>
                                </li>
                                <li>
                                    <Link to={'/policy/fee-charges'}>Fee & Charges</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="w-full">
                            <h5 className="element-title">
                                Diclaimers
                            </h5>
                            <ul>
                                <li>
                                    <Link to={'/policy/third-party-links'}>Third-Party Links  </Link>
                                </li>
                                <li>
                                    <Link to={'/policy/qualification-approval'}>Pre-Qualification vs. Approval</Link>
                                </li>
                                <li>
                                    <Link to={'/policy/marketing-advertising'}>Marketing and Advertising</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </footer>
            <div className="w-full py-3 bg-black text-white">
                <p className='text-center text-sm text-blue-gray-400'>
                    &copy; {new Date().getFullYear()} All Rights Reserved by <Link className=''>simple-credit.org</Link>
                </p>
            </div>
        </>
    )
}

export default Footer