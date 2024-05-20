
import homeimg from '../assets/image/homeimg.png';
import { useRef, useState } from 'react';

import Featurebox from '../components/Featurebox';
import applyimg from '../assets/image/visa_card.png'
import UseBox from '../components/UseBox';
import ServiceCard from '../components/ServiceCard';
import customerimg from '../assets/image/Costumer.png';
import axios from 'axios';
import { base_url, headers } from '../utils';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react';
import { useNavigate } from 'react-router';

const Home = () => {
    const [mobile, setMobile] = useState(null);
    const [open, setOpen] = useState(false);
    const [otp1, setOtp1] = useState(null);
    const [otp2, setOtp2] = useState(null);
    const [otp3, setOtp3] = useState(null);
    const [otp4, setOtp4] = useState(null);

    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const ref4 = useRef(null);

    const navigate = useNavigate();
    const handlemobile = (e) => {
        return setMobile(e.target.value);
    }
    const handleotp = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        if (key == "otp1") {
            setOtp1(value);
            ref2.current.focus();
        }
        if (key == "otp2") {
            setOtp2(value);
            ref3.current.focus();
        }
        if (key == "otp3") {
            setOtp3(value);
            ref4.current.focus();
        }
        if (key == "otp4") {
            setOtp4(value);
        }
    }


    const sendotp = async () => {
        if (mobile && mobile.length == 10) {
            await axios.post(`${base_url}api/send-otp`, { mobile: mobile }, {
                headers: headers
            }).then((resp) => {
                if (resp.data.is_success == "1") {

                    setOpen(true);
                }
            })
        }
    }
    const handleOpen = () => {
        setOpen(!open);
    }
    const verify_otp = () => {
        if (otp1 && otp2 && otp3 && otp4) {
            const otp = otp1 + otp2 + otp3 + otp4;
            axios.post(`${base_url}api/verify-otp`, { mobile: mobile, otp: otp }, {
                headers: headers
            }).then((resp) => {
                if (resp.data.is_success == "1") {
                    navigate('/apply?mobile=' + mobile, { state: { mobile: mobile } });
                }
            })
        }
    }
    return (
        <>
            {
                open && (
                    <>
                        <Dialog dismiss={
                            {
                                enabled: false,
                                escapeKey: false
                            }

                        } open={open} handler={handleOpen}>
                            <DialogHeader>Verify OTP</DialogHeader>
                            <DialogBody >
                                <div className="grid grid-cols-4 gap-3">
                                    <input type="text" name="otp1" ref={ref1} onChange={handleotp} className="border rounded-md text-center border-blue-gray-500 h-14" />
                                    <input type="text" name="otp2" ref={ref2} onChange={handleotp} className="border rounded-md text-center border-blue-gray-500 h-14" />
                                    <input type="text" name="otp3" ref={ref3} onChange={handleotp} className="border rounded-md text-center border-blue-gray-500 h-14" />
                                    <input type="text" name="otp4" ref={ref4} onChange={handleotp} className="border rounded-md text-center border-blue-gray-500 h-14" />
                                </div>
                            </DialogBody>
                            <DialogFooter>
                                <Button
                                    variant="outlined"
                                    color="red"
                                    onClick={handleOpen}
                                    className="mr-1"
                                >
                                    <span>Cancel</span>
                                </Button>
                                <Button variant="gradient" color="green" onClick={verify_otp}>
                                    <span>Confirm</span>
                                </Button>
                            </DialogFooter>
                        </Dialog>
                    </>
                )
            }

            <section className="homesection">
                <div className="container">
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                        <div className="w-full">
                            <div className="w-full">
                                <h4 className="text-sm text-primary">Welcome to SimpleKredit</h4>
                                <h1 className='text-[4rem] leading-[1.3] text-secondary font-extrabold'>
                                    Simplify all your banking and loan methods
                                </h1>
                                <div className="w-full mt-5">
                                    <div className="flex items-center gap-5">


                                        <div className="inline-flex mobileotpbox">
                                            <span className="mobilecode">+91</span>
                                            <input type="text" value={mobile} maxLength={10} onChange={handlemobile} placeholder='Enter mobile number' className="max-w-full min-w-[100px]" />
                                            <button onClick={sendotp} className="bg-primary px-5 py-3 rounded-full text-white">
                                                Apply Now
                                            </button>
                                        </div>
                                        <button to={'/'} className='px-5 py-3 rounded-full bg-secondary text-white'>Check Status</button>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="w-full">
                                <img src={homeimg} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="conditonsbg">

                <section className="features py-16">
                    <div className="container">
                        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
                            {
                                [1, 2, 3, 4].map(() => (
                                    <>
                                        <div className="w-full">
                                            <Featurebox title="Hassle free Financial Support upto ₹ 40.0 Lacs" />
                                        </div>
                                    </>
                                ))
                            }

                        </div>
                    </div>
                </section>

                <section className="py-8 pb-16">
                    <div className="container">
                        <div className="flex">
                            <div className="w-1/2">
                                <div className="w-full">
                                    <img src={applyimg} alt="" className='max-w-[450px]' />
                                </div>
                            </div>
                            <div className="w-1/2">
                                <div className="w-full">
                                    <h2 className="sectiontitle">
                                        You can apply
                                    </h2>
                                    <ul className='*:text-[1rem] *:py-2 font-light list-inside conditionsul'>
                                        <li>
                                            If you are an Indian citizen above 18 years of age
                                        </li>
                                        <li>
                                            If you have a valid current address proof
                                        </li>
                                        <li>
                                            If you have a bank account with internet banking facility
                                        </li>
                                        <li>
                                            Annual Percentage Rate offered to the customer during the period of 02nd Oct 2022 To 31st Mar 2023
                                        </li>
                                        <li>
                                            Min APR - 8%. Max APR - 11%. Repayment schedule: Min - 12 months & Max - 240 Months.^T&C apply
                                        </li>
                                        <li>
                                            Example: On a personal loan of Rs. 1 lakh at rate of 8% per annum, for a tenure of 24 months, the EMI amount will be Rs.4,523
                                        </li>
                                        <li>
                                            List of documents required for loan approva
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


            </div>
            <section className='invoices v1 invoicesection py-16'>
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="w-full">
                            <div className="w-full">
                                <UseBox />
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="w-full">
                                <UseBox />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-16 bg-black text-white">
                <div className="container">
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
                        <div className="w-full text-center">
                            <h1 className='text-[3rem] font-bold'>120K</h1>
                            <h4 className='text-lg font-light'>Loans Taken</h4>
                        </div>
                        <div className="w-full text-center">
                            <h1 className='text-[3rem] font-bold'>7+</h1>
                            <h4 className='text-lg font-light'>Experience</h4>
                        </div>
                        <div className="w-full text-center">
                            <h1 className='text-[3rem] font-bold'>75+</h1>
                            <h4 className='text-lg font-light'>Business Partner</h4>
                        </div>
                        <div className="w-full text-center">
                            <h1 className='text-[3rem] font-bold'>100%</h1>
                            <h4 className='text-lg font-light'>Happy Clients</h4>
                        </div>
                    </div>
                </div>
            </section>
            <section className='py-16'>
                <div className="container">
                    <div className="w-full mb-10">
                        <h2 className="sectiontitle text-center">
                            Your Gateway To Strategic Business Loans
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div className="w-full">
                            <ServiceCard bg='bg-primary bg-opacity-20' />
                        </div>
                        <div className="w-full">
                            <ServiceCard bg='bg-primary bg-opacity-40' />
                        </div>
                        <div className="w-full">
                            <ServiceCard bg='bg-primary bg-opacity-60' />
                        </div>
                        <div className="w-full">
                            <ServiceCard bg='bg-primary bg-opacity-100' />
                        </div>
                    </div>

                    <div className="w-full flex justify-center">
                        <div className="lg:w-1/2 md:w-2/3">
                            <div className="w-full bg-primary bg-opacity-20 p-5 rounded-full flex items-center gap-4">
                                <img src={customerimg} alt="" className='customer_bg' />

                                <p className="text-black font-bold text-xl">
                                    We Have <span className="text-primary">3k+ </span> Global Clients The World
                                </p>
                            </div>
                        </div>
                    </div>




                </div>
            </section>

        </>
    )
}

export default Home