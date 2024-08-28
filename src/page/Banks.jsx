import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { base_url } from "../utils";
import { GroupOutlined, TableOutlined } from "@ant-design/icons";

const Banks = () => {
    const [view, setView] = React.useState('card');
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
                    <div className="w-full mb-5">
                        <div className="flex justify-end">
                            <div>
                                <button onClick={() => setView('card')} className={`text-3xl text-gray-600  size-10  ${view == "card" ? 'border shadow border-blue-gray-200' : ""}`}>
                                    <GroupOutlined />
                                </button>
                                <button onClick={() => setView('table')} className={`text-3xl text-gray-600 size-10 ms-3  ${view == "table" ? 'border shadow border-blue-gray-200' : ""}`}>
                                    <TableOutlined />
                                </button>
                            </div>
                        </div>
                    </div>
                    {
                        view == "table" && (
                            <>

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
                                                    banks.map((bank, index) => (
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
                            </>
                        )
                    }
                    {
                        view == "card" && (
                            <>
                                <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
                                    {
                                        banks.map((bank) =>
                                            <>
                                                <div className="col-span-1">
                                                    <div className="w-full">
                                                        <div className="w-full mx-auto text-white bg-primary p-4 rounded-lg relative">
                                                            <div className="w-full mb-10">
                                                                <h4 className="font-bold text-3xl text-white">
                                                                    {bank.account_no}
                                                                </h4>
                                                                <p>{bank.bank_id}</p>

                                                            </div>

                                                            <img src="https://clipground.com/images/credit-card-chip-clipart-2.png" className="absolute top-4 end-4 size-8 object-contain" alt="" />
                                                            <div className="flex justify-between">
                                                                <p>{bank.ifsc}</p>
                                                                <p>
                                                                    {bank.account_type}
                                                                </p>
                                                            </div>
                                                            <div className="block">
                                                                <p>{bank.account_holder_name}</p>
                                                                <p className="text-xs">{bank.branch_name}</p>
                                                            </div>


                                                        </div>

                                                    </div>
                                                </div>
                                            </>
                                        )}
                                </div>
                            </>
                        )
                    }
                </div>
            </section>
        </>
    )
}

export default Banks