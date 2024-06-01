import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { base_url } from "../utils";

const Banks = () => {
   
    const [banks, setBanks] = useState([]);
    const token = JSON.parse(localStorage.getItem('auth_token'));
    const get_applications = async () => {
        await axios.get(`${base_url}api/my-banks`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((resp) => {
            if (resp.status === 200) {
               
                return setBanks(resp.data.data);
            } else {
                <Navigate to={'/'} />
            }

        })
    }
    useEffect(() => {
        get_applications();
    }, []);
    return (
        <>
            <section className="p">
                <div className="container">
                    <div className="grid grid-cols-1">
                        <div className="w-full overflow-x-auto">
                            <h1 className="sectiontitle mb-5">My Bank Account</h1>

                            <table border={1} className="table-fixed w-full text-xs border border-blue-gray-300">
                                <thead>
                                    <tr className='*:p-2  *:lg:w-max *:w-28 *:text-nowrap w-full *:border *:border-blue-gray-300'>
                                        <th>Sr No</th>
                                        <th>Bank Name</th>
                                        <th>IFSC</th>
                                        <th>Branch Name</th>
                                        <th>Account Type</th>
                                        <th>Account No</th>
                                        <th>Account Holder</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        banks.map((bank,index) => (
                                            <>
                                                <tr className='*:p-2 text-center *:border *:border-blue-gray-300'>
                                                    <td>{index + 1}</td>
                                                    <td>{bank.bank_id}</td>
                                                    <td>{bank.ifsc}</td>
                                                    <td>{bank.branch_name}</td>
                                                    <td>{bank.account_type}</td>
                                                    <td>{bank.account_no}</td>
                                                    <td>{bank.account_holder_name}</td>

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

export default Banks