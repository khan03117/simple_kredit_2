import { CheckCircleFilled, CheckOutlined } from "@ant-design/icons"
import setpimg from '../assets/image/stepimg.png';
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";
import { base_url, headers } from "../utils";
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";

const ApplyLoan = () => {
    const [mobile, setMobile] = useState(null);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [otp1, setOtp1] = useState(null);
    const [otp2, setOtp2] = useState(null);
    const [otp3, setOtp3] = useState(null);
    const [otp4, setOtp4] = useState(null);

    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const ref4 = useRef(null);
    const handlemobile = (e) => {
        setError(null);
        setMobile(e.target.value);
    }
    const navigate = useNavigate();
    const handleOpen = () => {
        setOpen(!open);
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
                    setOpen(false);
                    setError(resp.data.errors.mobile[0])
                }
            })
        }
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
                        <Dialog className="customdialog" dismiss={
                            {
                                enabled: false,
                                escapeKey: false
                            }

                        } open={open} handler={handleOpen}>
                            <DialogHeader>Verify OTP</DialogHeader>
                            <DialogBody >
                                <div className="grid grid-cols-4 gap-3">
                                    <input type="number" name="otp1" maxLength={1} ref={ref1} onChange={handleotp} className="border rounded-md text-center border-blue-gray-500 h-14" />
                                    <input type="number" name="otp2" maxLength={1} ref={ref2} onChange={handleotp} className="border rounded-md text-center border-blue-gray-500 h-14" />
                                    <input type="number" name="otp3" maxLength={1} ref={ref3} onChange={handleotp} className="border rounded-md text-center border-blue-gray-500 h-14" />
                                    <input type="number" name="otp4" maxLength={1} ref={ref4} onChange={handleotp} className="border rounded-md text-center border-blue-gray-500 h-14" />
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
                                        <span className="p-3 bg-white rounded-md  border border-primary border-e-0 rounded-ee-none  rounded-se-none text-secondary/60">+91</span>
                                        <input type="tel" onChange={handlemobile} maxLength={10} minLength={10} className="w-full border border-primary border-s-0  rounded-md rounded-ss-none rounded-es-none py-3 px-3" placeholder="Enter your mobile number" />
                                        <button onClick={sendotp} className="bg-primary text-white rounded-md px-5 py-2  text-nowrap absolute end-2 top-auto start-auto">Get OTP</button>
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