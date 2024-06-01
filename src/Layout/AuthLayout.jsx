import { Navigate, Outlet, useLocation } from 'react-router';
import Footer from '.././components/Footer'
import { StickyNavbar } from '.././components/Navbar'
import { useEffect, useState } from 'react';
// import Sidebar from '.././components/Sidebar';
import { MenuOutlined } from '@ant-design/icons';
import { CreditCardFilled, DashboardOutlined, DollarOutlined, FormOutlined, LogoutOutlined } from "@ant-design/icons"
import { Link } from 'react-router-dom';
import {
    Drawer,
    Typography,
    IconButton,
} from "@material-tailwind/react"

const AuthLayout = () => {
    const [open, setOpen] = useState(true);
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);
    const location = useLocation();
    const pathname = location.pathname;
    useEffect(() => {
        window.scrollTo(0, 0);
        setOpen(false)
    }, [location.pathname]);
    const token = JSON.parse(localStorage.getItem('auth_token'));
    const logout = () => {
        localStorage.clear();
        window.location.href = '/login';
    }
    const sidebar = (<>

        <div className="relative h-full ">
            <div className="w-full  py-5">

                <div className="w-full p-5">
                    <ul className=" list-inside *:py-3">
                        <li>
                            <Link to="/dashboard" className={`${pathname == "/dashboard" ? 'text-green-800 font-semibold bg-primary/20' : "text-gray-500"} lg:text-lg text-sm block w-full rounded-lg shadow-md shadow-blue-gray-100 lg:p-4 p-2 hover:text-gray-700`}>
                                <span className="icon me-4">
                                    <DashboardOutlined />
                                </span>
                                <span className="">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/application" className={`${pathname == "/application" ? 'text-green-800 font-semibold bg-primary/20' : "text-gray-500"} lg:text-lg text-sm block w-full rounded-lg shadow-md shadow-blue-gray-100 lg:p-4 p-2 hover:text-gray-700`}>
                                <span className="icon me-4">
                                    <FormOutlined />
                                </span>
                                <span className="">Application</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/bank" className={`${pathname == "/bank" ? 'text-green-800 font-semibold bg-primary/20' : "text-gray-500"} lg:text-lg text-sm block w-full rounded-lg shadow-md shadow-blue-gray-100 lg:p-4 p-2 hover:text-gray-700`}>
                                <span className="icon me-4">
                                    <DollarOutlined />
                                </span>
                                <span className="">Bank Account</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={`/transactions`} className={`${pathname == "/transactions" ? 'text-green-800 font-semibold bg-primary/20' : "text-gray-500"} lg:text-lg text-sm block w-full rounded-lg shadow-md shadow-blue-gray-100 lg:p-4 p-2 hover:text-gray-700`}>
                                <span className="icon me-4">
                                    <CreditCardFilled />
                                </span>
                                <span className="">Transactions</span>
                            </Link>
                        </li>
                        <li>
                            <button onClick={logout} className={`${pathname == "/logout" ? 'text-green-800 font-semibold bg-primary/20' : "text-gray-500"} text-start lg:text-lg text-sm block w-full rounded-lg shadow-md shadow-blue-gray-100 lg:p-4 p-2 hover:text-gray-700`}>
                                <span className="icon me-4">
                                    <LogoutOutlined />
                                </span>
                                <span className="">Logout</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </>);

    return (

        <>
            <Drawer open={open} onClose={closeDrawer} className="p-4">
                <div className="w-full">
                    <div className="flex justify-between">
                        <Typography variant="h5" color="blue-gray">
                            User Dashboard
                        </Typography>
                        <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </IconButton>
                    </div>

                    <div className="w-full">
                        {sidebar}
                    </div>
                </div>

            </Drawer>



            {
                token ? (
                    <>
                        <StickyNavbar />
                        <main className='w-full  mx-auto' >
                            <div className={`flex w-full relative dashboardlayout sidebaropen `}>
                                <div className="sidebar lg:block hidden  lg:py-28 py-20 bg-white">

                                    <h2 className="text-md  flex justify-between font-bold pb-4 ps-5 text-2xl  border-b border-primary">
                                        <span className="text-primary">User Dashboard</span>
                                    </h2>

                                    {sidebar}

                                </div>
                                <div className="content lg:py-20 h-full py-[4rem] lg:ps-5 ps-0">
                                    <div className="bg-white h-full w-full lg:p-8 p-2  rounded-lg">
                                        <div className="w-full lg:hidden block mb-3">
                                            <button onClick={openDrawer} className="size-10">
                                                <MenuOutlined />
                                            </button>
                                        </div>
                                        <Outlet />
                                    </div>
                                </div>
                            </div>
                        </main>

                        <Footer />
                    </>
                ) : (
                    <Navigate to={'/'} />
                )
            }


        </>
    )
}

export default AuthLayout