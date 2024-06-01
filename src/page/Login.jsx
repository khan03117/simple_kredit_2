import axios from "axios";
import { useRef, useState } from "react";
import { base_url, headers } from "../utils";
import loginimg from '../assets/image/login.png'
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";
import { useNavigate } from "react-router";

const Login = () => {
    const [mobile, setMobile] = useState(null);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [otp1, setOtp1] = useState(null);
    const [otp2, setOtp2] = useState(null);
    const [otp3, setOtp3] = useState(null);
    const [otp4, setOtp4] = useState(null);
    const navigate = useNavigate();
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const ref4 = useRef(null);
    const handlemobile = (e) => {
        setError(null);
        setMobile(e.target.value);
    }
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
    const verify_otp = () => {
        if (otp1 && otp2 && otp3 && otp4) {
            const otp = otp1 + otp2 + otp3 + otp4;
            axios.post(`${base_url}api/verify-login`, { mobile: mobile, otp: otp }, {
                headers: headers
            }).then((resp) => {
                if (resp.data.is_success == "1") {
                    localStorage.setItem("auth_token", JSON.stringify(resp.data.data));
                    navigate("/dashboard");
                }
            })
        }
    }
    const sendotp = async () => {
        if (mobile && mobile.length == 10) {
            await axios.post(`${base_url}api/login`, { mobile: mobile }, {
                headers: headers
            }).then((resp) => {
                if (resp.data.is_success == "1") {

                    setOpen(true);
                } else {
                    setOpen(false);
                    setError(resp.data.error.mobile[0])
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
                                    <input type="text" name="otp1" maxLength={1} ref={ref1} onChange={handleotp} className="border rounded-md text-center border-blue-gray-500 h-14" />
                                    <input type="text" name="otp2" maxLength={1} ref={ref2} onChange={handleotp} className="border rounded-md text-center border-blue-gray-500 h-14" />
                                    <input type="text" name="otp3" maxLength={1} ref={ref3} onChange={handleotp} className="border rounded-md text-center border-blue-gray-500 h-14" />
                                    <input type="text" name="otp4" maxLength={1} ref={ref4} onChange={handleotp} className="border rounded-md text-center border-blue-gray-500 h-14" />
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

            <section className="lg:py-28 py-20">
                <div className="container">
                    <div className="grid grid-cols-1 items-center md:grid-cols-2">
                        <div className="w-full">
                            <div className="loginbox  shadow-md shadow-green-100 rounded-md lg:p-10 px-4 py-10 bg-green-50">
                                <div className="w-full">
                                    <h2 className="sectiontitle">
                                        Login
                                    </h2>

                                    <div className="form-group mt-10">
                                        <h4 className="text-lg text-primary font-semibold">Enter your mobile number</h4>
                                        <div className="w-full flex items-center justify-between mt-2 relative">
                                            <span className="lg:p-3 p-2 bg-white rounded-md  border border-primary border-e-0 rounded-ee-none  rounded-se-none text-secondary/60 lg:text-sm text-xs">+91</span>
                                            <input type="text" onChange={handlemobile} maxLength={10} minLength={10} className="w-full border lg:text-sm text-xs border-primary border-s-0  rounded-md rounded-ss-none rounded-es-none lg:p-3 p-2" placeholder="Enter your mobile number" />
                                            <button onClick={sendotp} className="bg-primary text-white rounded-md lg:px-5 px-3 py-2 text-xs  text-nowrap absolute lg:end-2 end-0 top-auto start-auto">Get OTP</button>
                                        </div>
                                        <span className="text-danger">{error}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:block hidden">
                            <img src={loginimg} alt="" className="max-w-full mx-auto block" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login