import { Link } from 'react-router-dom'
import trustimg from '../../assets/image/Trustpilot.png'
const Footer = () => {
    return (
        <>
            <footer className="footerbg text-white">
                <div className="container">
                    <div className="w-full mb-20 ">
                        <h4 className="text-lg">Disclaimer :</h4>
                        <p className='text-xs tracking-[1px] leading-6 font-light'>
                            It has been brought to our attention that fraudulent activities have been discovered involving people pretending to be employees or authorized representatives of SimpleKredit.com to defraud our customers. Please note that the only legitimate domain name for SimpleKredit.com is www.SimpleKredit.com. We request you to verify any borrowing or lending opportunity related to Finzy by reaching out to us through the ways mentioned below. We also request you not to respond with any personal information if you are uncertain about the communication and urge you not to send any money to third parties until you have verified with us. Please contact us at support@SimpleKredit.com or call 9341 300 300 to check borrowing/lending opportunities or report suspicious behavior.
                        </p>
                    </div>
                    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
                        <div className="w-full footerabout">
                            <h4>We re on a mission.</h4>
                            <p>
                                At Simplekredit, we’re using cutting-edge technology to transform the industry and deliver financial services that actually work for you.
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
                                    <Link to={'/loan-application'}>How to Apply</Link>
                                </li>
                                <li>
                                    <Link to={'/loan-calculator'}>Loan Calculator</Link>
                                </li>

                                <li>
                                    <Link to={'/'}>Documents Required</Link>
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
                                {/* <li>
                                    <Link to={'/'}>Repayment Policy</Link>
                                </li> */}
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
            <div className="w-full py-2 bg-black text-white">
                <p className='text-center text-sm text-blue-gray-400'>
                    &copy; {new Date().getFullYear()} All Rights Reserved by <Link className='underline'>SimpleKredit</Link> 
                </p>
            </div>
        </>
    )
}

export default Footer