import axios from "axios";
import { useState } from "react";
import { base_url, headers } from "../utils";
import loginimg from '../assets/image/login.png'
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router";
import OtpInput from 'react-otp-input';
const Login = () => {
    const [otp, setOtp] = useState('');
    const [mobile, setMobile] = useState(null);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    const handlemobile = (e) => {
        setError(null);
        setMobile(e.target.value);
    }
  
    const verify_otp = () => {
        if (otp) {
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
                    if (resp.data.otp == "1") {
                        setOpen(true);
                    } else {
                        navigate('/dashboard' + mobile, { state: { mobile: mobile } });
                    }
                } else {
                    setOpen(false);
                    setError(resp.data.error.mobile[0])
                }
            })
        }
    }
    return (
        <>

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
                                            {
                                                !open && (
                                                    <>
                                                        <button onClick={sendotp} className="bg-primary text-white rounded-md lg:px-5 px-3 py-2 text-xs  text-nowrap absolute lg:end-2 end-0 top-auto start-auto">Get OTP</button>

                                                    </>
                                                )
                                            }
                                        </div>
                                        <span className="text-danger">{error}</span>
                                    </div>
                                    <div className="w-full">
                                        {
                                            open && (
                                                <>
                                                    <div className="flex py-3 items-center gap-1 flex-wrap">
                                                        <div className="w-full mb-2 otpcontainer">
                                                            <OtpInput
                                                                value={otp}
                                                                onChange={setOtp}
                                                                numInputs={4}
                                                                className="size-10 border border-blue-gray-600"
                                                                renderSeparator={<span className="me-1"></span>}
                                                                renderInput={(props) => <input {...props} />}
                                                            />
                                                        </div>
                                                        <Button variant="gradient" className="rounded-full py-2 px-4 md:text-md text-xs font-light" color="red" onClick={verify_otp}>
                                                            <span>Confirm</span>
                                                        </Button>
                                                        <Button variant="gradient" className="rounded-full px-4 py-2 md:text-md text-xs font-light" color="gray" onClick={() => setOpen(false)}>
                                                            <span>Resend</span>
                                                        </Button>
                                                    </div>

                                                </>
                                            )
                                        }
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