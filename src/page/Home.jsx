
import homeimg from '../assets/image/homeimg.png';
import { useEffect, useRef, useState } from 'react';

import Featurebox from '../components/Featurebox';
import applyimg from '../assets/image/visa_card.png'
import UseBox from '../components/UseBox';
import ServiceCard from '../components/ServiceCard';
// import customerimg from '../assets/image/Costumer.png';
import axios from 'axios';
import { base_url, headers } from '../utils';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react';
import {useNavigate } from 'react-router';
import LoanCalculater from '../components/LoanCalculater';
import contactimg from '../assets/image/about.webp'
import { Link } from 'react-router-dom';
import ContactForm from './ContactForm';

const Home = () => {
    const [mobile, setMobile] = useState(null);
    const[errs, setErrs] = useState([]);
    const [loans, setLoans] = useState([]);
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
                }else{
                    setErrs(resp.data.errors);
                }
            })
        }
    }
    const getloans = async () => {

        await axios.get(`${base_url}api/loans`, {
            headers: headers
        }).then((resp) => {
            setLoans(resp.data);
        })

    }
    const handleOpen = () => {
        setOpen(!open);
    }
    useEffect(() => {
        getloans();
    }, [])

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
    const features = [
        `Minimum Documentation`, 'Faster Approval', '100% Online Process', 'Loan upto 40.0 Lacs'
    ];
    return (
        <>
            {
                open && (
                    <>
                        <Dialog className='customdialog' dismiss={
                            {
                                enabled: false,
                                escapeKey: false
                            }

                        } open={open} handler={handleOpen}>
                            <DialogHeader>Verify OTP</DialogHeader>
                            <DialogBody className='customdialogbody' >
                                <div className="grid grid-cols-4 gap-3">
                                    <input type="tel" name="otp1" maxLength={1} ref={ref1} onChange={handleotp} className="border rounded-md text-center border-blue-gray-500 h-14" />
                                    <input type="tel" name="otp2" maxLength={1} ref={ref2} onChange={handleotp} className="border rounded-md text-center border-blue-gray-500 h-14" />
                                    <input type="tel" name="otp3" maxLength={1} ref={ref3} onChange={handleotp} className="border rounded-md text-center border-blue-gray-500 h-14" />
                                    <input type="tel" name="otp4" maxLength={1} ref={ref4} onChange={handleotp} className="border rounded-md text-center border-blue-gray-500 h-14" />
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
            

            <section className="homesection lg:py-20 py-20">
                <div className="container">
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 items-center">
                        <div className="w-full overflow-hidden">
                            <div className="w-full">
                                <h4 className="text-sm text-primary">Welcome to SimpleKredit</h4>
                                <h1 className='lg:text-[4rem] text-[2rem] leading-[1.3] text-secondary font-bold'>
                                    Simplify all your banking and loan methods
                                </h1>
                                <div className="w-full mt-5">
                                    <div className="flex flex-wrap items-center gap-4">
                                        <div className="inline-flex items-center mobileotpbox">
                                            <span className="mobilecode">+91</span>
                                            <input type="tel" value={mobile} maxLength={10} onChange={handlemobile} placeholder='Enter mobile number' className="max-w-full text-sm min-h-10 bg-transparent lg:w-[170px] w-full" />
                                            <button onClick={sendotp} className="bg-primary px-5 py-3 lg:text-md text-sm text-nowrap rounded-full text-white">
                                                Apply Now
                                            </button>
                                        </div>

                                        <Link to={'/login'} className='px-5 py-3 rounded-full bg-secondary text-white'>Check Status</Link>
                                    </div>
                                    {
                                      errs['mobile'] && (
                                        <>
                                        <span className="text-danger">
                                            {errs['mobile']}
                                        </span>
                                        </>
                                      )
                                    }
                                  
                                </div>
                            </div>
                        </div>
                        <div className="w-full ">
                            <div className="w-full lg:block hidden">
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
                                features.map((ft) => (
                                    <>
                                        <div className="w-full">
                                            <Featurebox title={ft} />
                                        </div>
                                    </>
                                ))
                            }

                        </div>
                    </div>
                </section>

                <section className="py-8 pb-16">
                    <div className="container mx-auto">
                        <div className="grid md:grid-cols-2 grid-cols-1">
                            <div className="w-full">
                                <div className="w-full">
                                    <img src={applyimg} alt="" className='lg:max-w-[450px] max-w-full' />
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="w-full lg:bg-transparent bg-white lg:p-0 p-3 rounded-xl">
                                    <h2 className="sectiontitle">
                                        You can apply
                                    </h2>
                                    <ul className='*:text-[1rem] *:py-2 text-blue-gray-600 list-inside conditionsul'>
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
            <section className='invoices v1 invoicesection lg:py-16 py-6 lg:my-0 my-1'>
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="w-full">
                            <div className="w-full">
                                <UseBox title="Get loan from  simple process" />
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="w-full">
                                <UseBox  title="Calculate and confirm your loans" />
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
                        {
                            loans.map((lon, index) => (
                                <>
                                    <div key={index} className="w-full">
                                        <ServiceCard bg='bg-primary' loan={lon} />
                                    </div>
                                </>
                            ))
                        }


                    </div>

                    {/* <div className="w-full flex justify-center">
                        <div className="lg:w-1/2 md:w-2/3">
                            <div className="w-full bg-primary bg-opacity-20 p-5 rounded-full flex items-center gap-4">
                                <img src={customerimg} alt="" className='customer_bg' />

                                <p className="text-black font-bold text-xl">
                                    We Have <span className="text-primary">3k+ </span> Global Clients The World
                                </p>
                            </div>
                        </div>
                    </div> */}
                </div>
            </section>
            <section className='bg-white pt-20'>
                <div className="container mx-auto">
                    <div className="w-full mb-5">
                        <h3 className="sectiontitle text-center">
                            Loan Calculator
                        </h3>
                    </div>
                    <div className="w-full mb-10">
                        <LoanCalculater />
                    </div>
                </div>
            </section>
            <section className='py-10'>
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                        <div className="col-span-1">
                            <ContactForm/>
                        </div>
                        <div className="col-span-1">
                            <div className="w-full mb-10">
                                <h3 className="sectiontitle">
                                    Contact Us
                                </h3>
                                <img className='lg:max-w-[400px] max-w-full mx-auto' src={contactimg} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Home