import trustimg from '../../assets/image/Trustpilot.png'
const Footer = () => {
    return (
        <>
            <footer className="footerbg text-white">
                <div className="container">
                    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1">
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
                                Company
                            </h5>
                            <ul>
                                <li>
                                    <a href="">How to Apply</a>
                                </li>
                                <li>
                                    <a href="">Loan Calculator</a>
                                </li>
                                <li>
                                    <a href="">Fees & Charges</a>
                                </li>
                                <li>
                                    <a href="">Documents Required</a>
                                </li>
                                <li>
                                    <a href="">Faq</a>
                                </li>
                            </ul>
                        </div>
                        <div className="w-full">
                            <h5 className="element-title">
                                Company
                            </h5>
                            <ul>
                                <li>
                                    <a href="">How to Apply</a>
                                </li>
                                <li>
                                    <a href="">Loan Calculator</a>
                                </li>
                                <li>
                                    <a href="">Fees & Charges</a>
                                </li>
                                <li>
                                    <a href="">Documents Required</a>
                                </li>
                                <li>
                                    <a href="">Faq</a>
                                </li>
                            </ul>
                        </div>
                        <div className="w-full">
                            <h5 className="element-title">
                                Company
                            </h5>
                            <ul>
                                <li>
                                    <a href="">How to Apply</a>
                                </li>
                                <li>
                                    <a href="">Loan Calculator</a>
                                </li>
                                <li>
                                    <a href="">Fees & Charges</a>
                                </li>
                                <li>
                                    <a href="">Documents Required</a>
                                </li>
                                <li>
                                    <a href="">Faq</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer