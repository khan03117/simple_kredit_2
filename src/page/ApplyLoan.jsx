import { CheckCircleFilled, CheckOutlined } from "@ant-design/icons"
import setpimg from '../assets/image/stepimg.png';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { base_url, headers } from "../utils";
import { Button } from "@material-tailwind/react";
import OtpInput from 'react-otp-input';
const ApplyLoan = () => {
    const [mobile, setMobile] = useState(null);
    const [error, setError] = useState(null);
    const [otp, setOtp] = useState('');
    const [open, setOpen] = useState(false);
    // const [otp1, setOtp1] = useState(null);
    // const [otp2, setOtp2] = useState(null);
    // const [otp3, setOtp3] = useState(null);
    // const [otp4, setOtp4] = useState(null);
    // const [otp, setOtp] = useState('');

    // const ref1 = useRef(null);
    // const ref2 = useRef(null);
    // const ref3 = useRef(null);
    // const ref4 = useRef(null);
    const handlemobile = (e) => {
        setError(null);
        setMobile(e.target.value);
    }
    const navigate = useNavigate();

    // const handleotp = (e) => {
    //     const key = e.target.name;
    //     const value = e.target.value;
    //     if (key == "otp1") {
    //         setOtp1(value);
    //         ref2.current.focus();
    //     }
    //     if (key == "otp2") {
    //         setOtp2(value);
    //         ref3.current.focus();
    //     }
    //     if (key == "otp3") {
    //         setOtp3(value);
    //         ref4.current.focus();
    //     }
    //     if (key == "otp4") {
    //         setOtp4(value);
    //     }
    // }
    const sendotp = async () => {
        if (mobile && mobile.length == 10) {
            await axios.post(`${base_url}api/send-otp`, { mobile: mobile }, {
                headers: headers
            }).then((resp) => {
                if (resp.data.is_success == "1") {
                    if (resp.data.otp == "1") {
                        setOpen(true);
                    } else {
                        navigate('/apply?mobile=' + mobile, { state: { mobile: mobile } });
                    }
                } else {
                    setOpen(false);
                    setError(resp.data.errors.mobile[0])
                }
            })
        }
    }
    const verify_otp = () => {
        if (otp) {

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

            <section className="pt-[6+5rem]">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
                        <div className="md:col-span-1 order-2 md:block hidden  ">
                            <div className="w-full flex h-full items-center">
                                <img src={setpimg} className="block" alt="" />
                            </div>
                        </div>
                        <div className="md:col-span-2 order-1">
                            <div className="w-full lg:p-28 py-14">
                                <h4 className="sectiontitle  text-primary font-semibold">
                                    Here are a few things you will need to get started
                                </h4>

                                <div className="w-full pt-3">
                                    <ul className="list-inside *:text-sm *:py-2 *:text-secondary/60">
                                        <li>
                                            <CheckOutlined className="text-primary" />   Your phone for OTP
                                        </li>
                                        <li>
                                            <CheckOutlined className="text-primary" />   PAN Card
                                        </li>
                                        <li>
                                            <CheckOutlined className="text-primary" /> Recent passport sized photograph
                                        </li>
                                        {/* <li>
                                            <CheckOutlined className="text-primary" /> IT Return/Form 16 for last year
                                        </li> */}
                                        <li>
                                            <CheckOutlined className="text-primary" /> Bank statements for the last 6 months
                                        </li>
                                        {/* <li>
                                            <CheckOutlined className="text-primary" /> Salary Slips for the last 3 months
                                        </li> */}
                                        <li>
                                            <CheckOutlined className="text-primary" /> Masked e-Aadhaar or any proof of current address
                                        </li>
                                    </ul>
                                </div>
                                <div className="w-full pt-4">
                                    <h4 className="text-lg text-primary font-semibold">Enter your mobile number</h4>
                                    <div className="w-full flex items-center justify-between mt-2 relative">
                                        <span className="p-3 bg-white rounded-full  border border-primary border-e-0 rounded-ee-none  rounded-se-none text-secondary/60">+91</span>
                                        <input type="tel" value={mobile} onChange={handlemobile} maxLength={10} minLength={10} className="w-full border border-primary border-s-0  rounded-full rounded-ss-none rounded-es-none py-3 px-3" placeholder="Enter your mobile number" />
                                        {
                                            !open && (
                                                <>

                                                    <button disabled={open} onClick={sendotp} className="bg-primary text-white rounded-full px-5 py-2  text-nowrap absolute end-2 top-auto start-auto">Get OTP</button>
                                                </>
                                            )
                                        }
                                    </div>
                                    <div className="w-full">
                                        {
                                            open && (
                                                <>
                                                    <div className="flex py-3 items-center gap-2">
                                                        <div className="w-full otpcontainer">
                                                            <OtpInput
                                                                value={otp}
                                                                onChange={setOtp}
                                                                numInputs={4}
                                                                className="size-10 border border-blue-gray-600"
                                                                renderSeparator={<span className="me-1"></span>}
                                                                renderInput={(props) => <input {...props} />}
                                                            />
                                                        </div>
                                                        <Button variant="gradient" className="rounded-full py-2 px-3" color="red" onClick={verify_otp}>
                                                            <span>Confirm</span>
                                                        </Button>
                                                        <Button variant="gradient" className="rounded-full px-3 py-2" color="gray" onClick={() => setOpen(false)}>
                                                            <span>Resend</span>
                                                        </Button>
                                                    </div>

                                                </>
                                            )
                                        }
                                    </div>
                                    <span className="text-danger">{error}</span>
                                    <ul className="*:py-1 mt-4 text-sm tracking-wider leading-6  text-blue-gray-500">
                                        <li>
                                            <CheckCircleFilled className="text-primary" />  I have read <Link className="text-primary underline text-sm">Terms & Conditions.</Link>
                                        </li>
                                        <li>
                                            <CheckCircleFilled className="text-primary" />  I have read <Link className="text-primary underline text-sm">privacy policy.</Link>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ApplyLoan