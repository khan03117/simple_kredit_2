import { Link } from 'react-router-dom'
import trustimg from '../../assets/image/Trustpilot.png'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { base_url, headers } from '../../utils';
import parse from 'html-react-parser';
import logo from '../../assets/image/logo.png'
const Footer = () => {
    const [disclaimer, setDisclaimer] = useState('...Loading');
    const [copyright, setCopyright] = React.useState('...Loading');
    const get_disclaimer = async () => {
        await axios.get(`${base_url}api/disclaimer`, { headers: headers }).then((res) => {
            setDisclaimer(res.data.data);
        })
    }
    const get_copyright = async () => {
        await axios.get(`${base_url}api/policy/copyright`, { headers: headers }).then((res) => {
            setCopyright(res.data.data);
        })
    }
    useEffect(() => {
        get_disclaimer();
        get_copyright();
    }, []);
    return (
        <>
            <footer className="footerbg text-white">
                <div className="container">

                    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
                        <div className="w-full footerabout">
                            <div className="w-full mb-4">
                                <img src={logo} alt="logo" className="max-w-[80%] invert-[1]" />
                            </div>
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
                                <li>
                                    <Link to={'/regulatory'}>Regulatory</Link>
                                </li>
                            </ul>
                        </div>

                    </div>
                    <div className="w-full">
                        <div className="w-full ">
                            <h4 className="text-lg">Disclaimer :</h4>
                            <div className='text-xs tracking-[1px] leading-6 font-light'>
                                {parse(disclaimer)}
                            </div>
                        </div>
                    </div>

                </div>
            </footer>
            <div className="w-full py-5 text-center bg-black text-white">
                <p className="text-sm">&copy; {new Date().getFullYear()} All Rights Reserved by simple-credit.org </p>
                <div className="border-t border-white block w-full h-1"></div>
                <div className='text-center text-sm' dangerouslySetInnerHTML={{ __html: copyright?.policy }}></div>
            </div>
        </>
    )
}

export default Footer