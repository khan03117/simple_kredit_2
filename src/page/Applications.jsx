import axios from "axios"
import { base_url, headers } from "../utils"
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { WhatsAppOutlined } from "@ant-design/icons";

const Applications = () => {
    const [apps, setApps] = useState([]);
    const [user, setUser] = useState({});
    const token = JSON.parse(localStorage.getItem('auth_token'));
    const get_applications = async () => {
        await axios.get(`${base_url}api/my-applications`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((resp) => {
            if (resp.status === 200) {
                setUser(resp.data.user);
                return setApps(resp.data.data);
            } else {
                <Navigate to={'/'} />
            }

        })
    }
    useEffect(() => {
        get_applications();
    }, []);
    const sendtowhatsapp = async () => {
        await axios.post(`${base_url}api/loan-details-by-mobile`, { mobile: user.mobile }, { headers: headers }).then((resp) => {
            const text = resp.data.message;
            const amob = resp.data.mobile;

            window.open(`https://wa.me/91${amob}?text=${text}`);
        });
    }

    return (
        <>
            <section className="p">
                <div className="container">
                    <div className="grid grid-cols-1">
                        <div className="w-full overflow-y-auto">
                            <h1 className="sectiontitle mb-5">Applications</h1>


                        </div>
                    </div>
                    <div className="grid lg:grid-cols-3 grid-cols-1 gap-5">
                        {
                            apps.map((app) => (
                                <>
                                    <div className="col-span-1">
                                        <div className="w-full">
                                            <div className="w-[90%] mx-auto text-white bg-primary p-4 rounded-lg relative">
                                                <p>Loan Amount</p>
                                                <h4 className="font-bold text-3xl mb-10 text-white">
                                                    &#8377;  {app.loan.amount}
                                                </h4>
                                                <img src="https://clipground.com/images/credit-card-chip-clipart-2.png" className="absolute top-4 end-4 size-8 object-contain" alt="" />
                                                <div className="flex justify-between">
                                                    <p>App Id: {app.application_id}</p>
                                                    <p>
                                                        {app.loan.tenure} Yrs.
                                                    </p>
                                                </div>

                                            </div>

                                        </div>
                                        <div className="w-full *:text-primary font-bold text-sm *:pb-2 bg-yellow-100 p-4 rounded-lg shadow-sm shadow-yellow-900 pt-10 -mt-6">
                                            <div className="flex justify-between ">
                                                <div>
                                                    Interest Rate
                                                </div>
                                                <div className="text-end text-black">
                                                    {app.loan.interest_rate}
                                                </div>
                                            </div>
                                            <div className="flex justify-between">
                                                <div>
                                                    EMI
                                                </div>
                                                <div className="text-end text-black">
                                                &#8377; {app.loan.emi.toFixed(2)}
                                                </div>
                                            </div>
                                            <div className="flex justify-between">
                                                <div>
                                                    Status
                                                </div>
                                                <div className="text-end">
                                                    {
                                                        app.loan.approve_at ? (<>
                                                            <span className="inline-block px-3 py-1 text-xs rounded-full bg-primary text-white">Approved</span>

                                                        </>) : (<>
                                                            <span className="inline-block px-3 py-1 text-xs rounded-full bg-yellow-900 text-white">Pending</span>

                                                        </>)
                                                    }
                                                </div>
                                            </div>
                                            <div className="flex justify-between">
                                                <div>
                                                    Contact us
                                                </div>
                                                <div>
                                                    <button className="text-3xl text-green-800" onClick={sendtowhatsapp} >
                                                        <WhatsAppOutlined/>
                                                    </button>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </>
                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Applications