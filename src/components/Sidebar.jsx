import { CreditCardFilled, DashboardOutlined, DollarOutlined, FormOutlined, LogoutOutlined } from "@ant-design/icons"
import { Link, useLocation } from "react-router-dom"

const Sidebar = () => {
        const location = useLocation();
        const pathname = location.pathname;

    return (
        <>

            <div className="relative h-full ">
                <div className="w-full  py-5">

                    <div className="w-full p-5">
                        <ul className=" list-inside *:py-3">
                            <li>
                                <Link to="/dashboard" className={`${pathname == "/dashboard" ? 'text-green-800 font-semibold bg-primary/20' : "text-gray-500"} text-lg block w-full rounded-lg shadow-md shadow-blue-gray-100 p-4 hover:text-gray-700`}>
                                    <span className="icon me-4">
                                        <DashboardOutlined /> 
                                    </span>
                                    <span className="">Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/application" className={`${pathname == "/application" ? 'text-green-800 font-semibold bg-primary/20' : "text-gray-500"} text-lg block w-full rounded-lg shadow-md shadow-blue-gray-100 p-4 hover:text-gray-700`}>
                                    <span className="icon me-4">
                                        <FormOutlined />
                                    </span>
                                    <span className="">Application</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/bank" className={`${pathname == "/bank" ? 'text-green-800 font-semibold bg-primary/20' : "text-gray-500"} text-lg block w-full rounded-lg shadow-md shadow-blue-gray-100 p-4 hover:text-gray-700`}>
                                    <span className="icon me-4">
                                        <DollarOutlined />
                                    </span>
                                    <span className="">Bank Account</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={`/transactions`} className={`${pathname == "/transactions" ? 'text-green-800 font-semibold bg-primary/20' : "text-gray-500"} text-lg block w-full rounded-lg shadow-md shadow-blue-gray-100 p-4 hover:text-gray-700`}>
                                    <span className="icon me-4">
                                        <CreditCardFilled />
                                    </span>
                                    <span className="">Transactions</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/logout" className={`${pathname == "/logout" ? 'text-green-800 font-semibold bg-primary/20' : "text-gray-500"} text-lg block w-full rounded-lg shadow-md shadow-blue-gray-100 p-4 hover:text-gray-700`}>
                                    <span className="icon me-4">
                                        <LogoutOutlined />
                                    </span>
                                    <span className="">Logout</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Sidebar