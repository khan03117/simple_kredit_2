import axios from "axios"
import { base_url, headers } from "../utils"
import { useEffect, useState } from "react";
import { Navigate } from "react-router";

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

                            <table border={1} className="table-fixed w-full border text-xs border-blue-gray-300">
                                <thead>
                                <tr className='*:p-2  *:lg:w-max *:w-28 *:text-nowrap w-full *:border *:border-blue-gray-300'>
                                        <th>Application Id</th>
                                        <th>Loan</th>
                                        <th>Amount</th>
                                        <th>Tenure</th>
                                        <th>Interest Rate</th>
                                        <th>Emi</th>
                                        <th>File Charge</th>
                                        <th>Application Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        apps.map((app, index) => (
                                            <>
                                                <tr className='*:p-2 text-center *:border *:border-blue-gray-300'>
                                                    <td>{index + 1}</td>
                                                    <td>{app.application_id}</td>
                                                    <td>{app.loan.amount}</td>
                                                    <td>{app.loan.tenure} Years</td>
                                                    <td>{app.loan.interest_rate}%</td>
                                                    <td>{app.loan.emi.toFixed(2)}</td>
                                                    <td>
                                                        {app.file_charge.toFixed(2)}
                                                    </td>
                                                    <td>
                                                        {
                                                            app.loan.approve_at ? (<>
                                                                <span className="inline-block px-3 py-1 text-xs rounded-full bg-primary text-white">Approved</span>

                                                            </>) : (<>
                                                                <span className="inline-block px-3 py-1 text-xs rounded-full bg-yellow-900 text-white">Pending</span>

                                                            </>)
                                                        }
                                                    </td>
                                                    <td>
                                                        <button onClick={() => sendtowhatsapp()} className="px-3 py-2 bg-primary text-white rounded-lg text-nowrap font-bold">Contact Us</button>
                                                    </td>
                                                </tr>
                                            </>
                                        ))
                                    }

                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Applications