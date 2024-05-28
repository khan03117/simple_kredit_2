/* eslint-disable no-unused-vars */
import { ArrowLeftOutlined, ArrowRightOutlined, CheckCircleFilled } from '@ant-design/icons';
import { Button, Radio } from '@material-tailwind/react';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import LoanDetails from './LoanDetails';
import BankDetails from './BankDetails';
import successimg from '../assets/image/verified.png'
import { useLocation, useNavigate } from 'react-router';
import { base_url, headers } from '../utils';
import SuccessApplied from '../components/SuccessApplied';

const Apply = () => {
    const location = useLocation();
    const Navigate = useNavigate();
    const mobile = location?.state?.mobile ?? false;
    const [fdata, setFdata] = useState({ mobile: mobile });
    const[whatsapp, setWhtasapp] = useState(null);
    const [pancard, setPancard] = useState(null);
    const [year, setYear] = useState(null);
    const [month, setMonth] = useState(null);
    const [date, setDate] = useState(null);
    const [errs, setErrs] = useState([]);
    const [msg, setMsg] = useState(null);
    const [pincode, setPincode] = useState(null);
    const [states, setStates] = useState([]);
    const [cities, setCity] = useState([]);
    const [applied, setApplied] = useState(false);
    const [pdetails, setPdetails] = useState({ personal: false, document: false, address: false, loan: false, bank: false });
    const dateref = useRef(null);
    const monthref = useRef(null);

    const handleformstep = () => {

        if (!validateErrors()) {
            console.log(errs.length)
            if (!pdetails.personal) {
                setPdetails({ ...pdetails, personal: true });
            }
            if (pdetails.personal && !pdetails.document) {
                setPdetails({ ...pdetails, personal: true, document: true });
            }
            if (pdetails.document && !pdetails.address) {
                setPdetails({ ...pdetails, personal: true, document: true, address: true });
            }
            if (pdetails.address && !pdetails.loan) {
                setPdetails({ ...pdetails, personal: true, document: true, address: true, loan: true });
            }
            if (pdetails.loan && !pdetails.bank) {
                setPdetails({ ...pdetails, personal: true, document: true, address: true, loan: true, bank: true });
            }
        }

    }
    const check_already_applied = async () => {
        await axios.post(`${base_url}api/validate-mobile-loan`, { mobile: mobile }, { headers: headers }).then((resp) => {
            if (resp.data.is_success == "1") {
                setMsg(resp.data.message);
                setPdetails({ ...pdetails, personal: true, document: true, address: true, loan: true, bank: true });
                setApplied(true);
            }
        })
    }
    useEffect(() => {
        check_already_applied();
    }, [])

    const apply_now = async () => {
        await axios.post(`${base_url}api/apply-now`, { ...fdata }, { headers: headers }).then((resp) => {
            if (resp.data.is_success == "1") {
                setMsg(resp.data.message);
                setApplied(true);
                setWhtasapp(resp.data.whatsapp)
            }
        })
    }
    useEffect(() => {
        if (pdetails.bank) {
            apply_now();
        }

    }, [pdetails])

    const handleformdata = (e) => {
        const value = e.target.value;
        const key = e.target.name;
        setFdata((prevFdata) => ({ ...prevFdata, [key]: value }));
    }
    // React.useEffect(() => {
    //     console.log(fdata);
    // }, [fdata]);
    const handledate = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        if (key === "year") {
            if (value <= new Date().getFullYear() - 18) {
                setYear(value);
                if (value.length === 4) {
                    monthref.current.focus();
                }

            }
        }
        if (key === "month") {
            if (value < 13) {
                setMonth(value);
                if (value.length === 2) {
                    dateref.current.focus();
                }
            }
        }
        if (key === "date") {
            const maxdate = new Date(year, month, 0).getDate();
            if (value <= maxdate) {
                setDate(value);

            }
        }
    }
    const validateErrors = () => {
        let errors = [];
        if (!pdetails.personal) {


            if (!fdata.name) {
                let obj = {
                    path: "name",
                    error: "Full Name is required."
                }
                errors.push(obj);
            }
            if (!fdata.dob) {
                let obj = {
                    path: "dob",
                    error: "Date of Birth is required."
                }
                errors.push(obj);
            }
            if (year) {
                if (year < new Date().getFullYear() - 80) {
                    let obj = {
                        path: "year",
                        error: "You are too old to register."
                    }
                    errors.push(obj);
                }
            }
            if (!year) {
                let obj = {
                    path: "year",
                    error: "year is required."
                }
                errors.push(obj);
            }
        }
        if (pdetails.personal && !pdetails.document) {


            if (!fdata.pancard_no) {
                let obj = {
                    path: "pancard_no",
                    error: "Pancard Number is required."
                }
                errors.push(obj);
            }
        }
        if (pdetails.document && !pdetails.address) {


            if (!fdata.pincode) {
                let obj = {
                    path: "pincode",
                    error: "Pincode is required."
                }
                errors.push(obj);
            }
            if (!fdata.address) {
                let obj = {
                    path: "address",
                    error: "Address is required."
                }
                errors.push(obj);
            }
            if (!fdata.city) {
                let obj = {
                    path: "city",
                    error: "City is required."
                }
                errors.push(obj);
            }
            if (!fdata.state) {
                let obj = {
                    path: "state",
                    error: "State is required."
                }
                errors.push(obj);
            }

        }
        if (pdetails.address && !pdetails.loan) {
            if (!fdata.loan_type) {
                let obj = {
                    path: "loan_type",
                    error: "Loan type is required."
                }
                errors.push(obj);
            }
            if (!fdata.amount) {
                let obj = {
                    path: "amount",
                    error: "Amount is required."
                }
                errors.push(obj);
            }
        }
        if (pdetails.loan && !pdetails.bank) {
            if (!fdata.account_holder_name) {
                let obj = {
                    path: "account_holder_name",
                    error: "Account Holder Name is required."
                }
                errors.push(obj);
            }
            if (!fdata.bank_id) {
                let obj = {
                    path: "bank_id",
                    error: "Bank Id is required."
                }
                errors.push(obj);
            }
            if (!fdata.account_no) {
                let obj = {
                    path: "account_no",
                    error: "Bank Account Number is required."
                }
                errors.push(obj);
            }
        }
        setErrs(errors);

        if (errors.length === 0) {
            setErrs([]);
            return false;
        }
        return true;
    }
    const handlepincode = (e) => {
        setErrs([]);
        const value = e.target.value;
        setPincode(value);
        if (value.length == 6) {

            validatePincode(value);
        }

    }
    const validatePincode = async (value) => {
        await axios.get(`https://api.postalpincode.in/pincode/${value}`).then((resp) => {
            if (resp.data[0].Status === "Success") {
                const postoffice = resp.data[0].PostOffice;
                const cities = postoffice.map(obj => obj.District);
                const mcity = cities[0];
                const mstate = postoffice[0].State;
                setCity([mcity]);
                setStates([mstate]);
                setFdata({ ...fdata, city: mcity, state: mstate });

            } else {
                let obj = {
                    "path": "pincode",
                    "error": "Invalid Pincode"
                }
                setErrs([...errs, obj]);
            }

        })
    }
    const gotoback = () => {
        const trues = Object.entries(pdetails).filter(item => item[1] === true);
        const key = trues[trues.length - 1][0];
        const arr = { ...pdetails };
        arr[key] = false;
        setPdetails({ ...arr });
    }
    useEffect(() => {
        setFdata({ ...fdata, 'pincode': pincode })
    }, [pincode])
    const handleformemi = (emi) => {
        setFdata({ ...fdata, 'emi': emi });
    }
    const handlepancard = (e) => {
        setErrs([]);
        const value = e.target.value;
        setPancard(value.toUpperCase());
    }
    const validatepancard = async () => {
        // await axios.post(`https://api.pancardstatus.in/api/v1/pan/${pancard}`, {pan_number : pancard}, {headers : headers}).then((resp) => {
        //     console.log(resp)
        // })
        await axios.get(`https://api2.incred.com/v2/credit-line/pan/check/${pancard}?NAME=${fdata?.name} `, { headers: headers }).then((resp) => {
            if (resp.data.status) {
                setFdata({ ...fdata, 'pancard_no': pancard })
            } else if (!resp.data.status) {
                console.log(resp.data.status)
                let obj = {
                    "path": "pancard_no",
                    "error": "Invalid Pan Card"
                }
                setErrs([...errs, obj]);
            }


        })
    }

    useEffect(() => {
        if (pancard && pancard.length == 10) {
            validatepancard();
        }

    }, [pancard])
    useEffect(() => {
        const fulldate = year + '-' + month + '-' + date;
        setFdata({ ...fdata, "dob": fulldate });
    }, [year, month, date])
    if (!mobile) {

        return Navigate('/');
    }


    return (
        <>
            <section className="py-10"></section>
            <section className='py-10'>
                <div className="container">
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                        <div className="col-span-2 lg:order-2 order-1">
                            <div className="grid lg:grid-cols-1 md:grid-cols-1 grid-cols-1 gap-5 ">
                                <div className="loanapplyform border-s-4 border-primary p-5 bg-white rounded-md shadow-sm shadow-blue-gray-200 w-full">
                                    {
                                        !pdetails.personal && (
                                            <>
                                                <div className="w-full">
                                                    <h4>Personal Details</h4>
                                                    <div className="w-full mb-4">
                                                        <label className='block formlabel' htmlFor="">Enter Name</label>
                                                        <input type="text" name='name' value={fdata.name} onChange={handleformdata} className=" block min-h-10 rounded-md border border-gray-500 w-full" />
                                                        <span className="text-danger block text-sm">
                                                            {errs.find(obj => obj.path === 'name')?.error}
                                                        </span>
                                                    </div>
                                                    <div className="w-full mb-4">
                                                        <label className='block formlabel' htmlFor="">
                                                            Date of birth
                                                        </label>
                                                        <div className="grid grid-cols-3 gap-2">
                                                            <div className="w-full">
                                                                <input type="number" name="year" value={year} onChange={handledate} maxLength={4} placeholder='yyyy' id="" className="border border-gray-500 rounded-md max-w-full min-h-10 p-3 text-center" />
                                                                <span className="text-danger block text-sm">
                                                                    {errs.find(obj => obj.path === 'year')?.error}
                                                                </span>
                                                            </div>
                                                            <div className="w-full">
                                                                <input type="number" ref={monthref} disabled={!year} onChange={handledate} value={month} maxLength={2} placeholder='mm' name="month" id="" className="border border-gray-500 rounded-md max-w-full min-h-10 p-3 text-center" />
                                                            </div>
                                                            <div className="w-full">
                                                                <input type="number" ref={dateref} disabled={!month} value={date} onChange={handledate} maxLength={2} placeholder='dd' name="date" id="" className="border border-gray-500 rounded-md max-w-full min-h-10 p-3 text-center" />
                                                            </div>

                                                        </div>
                                                        <span className="text-danger block text-sm">
                                                            {errs.find(obj => obj.path === 'dob')?.error}
                                                        </span>
                                                    </div>
                                                    <div className="w-full mb-4">
                                                        <label htmlFor="" className='block formlabel'>Enter Email</label>
                                                        <input type="email" value={fdata?.email} onChange={handleformdata} placeholder='Enter email id' name="email" className="border border-gray-500 rounded-md w-full min-h-10 p-3 text-start" />
                                                    </div>
                                                    <div className="w-full mb-4">
                                                        <label className='block formlabel' htmlFor="">Gender</label>
                                                        <div className="flex gap-10  border bg-white rounded-lg border-gray-500">
                                                            <Radio name='gender' onChange={handleformdata} color='green' label="Male" value={'Male'} />
                                                            <Radio name='gender' onChange={handleformdata} color='green' label="Female" value={'Female'} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }


                                    {
                                        pdetails.personal && !pdetails.document && (
                                            <>
                                                <h4>Document Details</h4>
                                                <div className="w-full mb-4">
                                                    <label className='block formlabel' htmlFor="">Pancard No.</label>
                                                    <input type="text" value={pancard} name='pancard_no' onChange={handlepancard} className=" block min-h-10 rounded-md border border-gray-500 w-full" />
                                                    <span className="text-danger block text-sm">
                                                        {errs.find(obj => obj.path === 'pancard_no')?.error}
                                                    </span>
                                                </div>
                                                <div className="w-full mb-4">
                                                    <label className='block formlabel' htmlFor="">Aadhar No.</label>
                                                    <input type="tel" maxLength={12} name='aadhar_no' onChange={handleformdata} className=" block min-h-10 rounded-md border border-gray-500 w-full" />
                                                    <span className="text-danger block text-sm">
                                                        {errs.find(obj => obj.path === 'aadhar_no')?.error}
                                                    </span>
                                                </div>
                                            </>
                                        )
                                    }
                                    {
                                        pdetails.document && !pdetails.address && (
                                            <>

                                                <h4>Address</h4>
                                                <div className="w-full mb-4">
                                                    <label className='block formlabel' htmlFor="">Pincode</label>
                                                    <input type="text" autoComplete='off' value={pincode} name='pincode' maxLength={6} onInput={handlepincode} className=" block min-h-10 rounded-md border border-gray-500 w-full" />
                                                    <span className="text-danger block text-sm">
                                                        {errs.find(obj => obj.path === 'pincode')?.error}
                                                    </span>
                                                </div>
                                                <div className="w-full mb-4">
                                                    <label className='block formlabel' htmlFor="">Address</label>
                                                    <input type="text" value={fdata?.address} name='address' onChange={handleformdata} className=" block min-h-10 rounded-md border border-gray-500 w-full" />
                                                    <span className="text-danger block text-sm">
                                                        {errs.find(obj => obj.path === 'address')?.error}
                                                    </span>
                                                </div>
                                                <div className="w-full mb-4">
                                                    <label className='block formlabel' htmlFor="">Enter City</label>
                                                    <input type='text' readOnly name='city' value={cities[0]} onChange={handleformdata} className="w-full shadow-none outline-none rounded-md border min-h-10 border-gray-500" />

                                                    <span className="text-danger block text-sm">
                                                        {errs.find(obj => obj.path === 'city')?.error}
                                                    </span>
                                                </div>
                                                <div className="w-full mb-4">
                                                    <label className='block formlabel' htmlFor="">Enter State</label>
                                                    <input name='state' value={states[0]} onChange={handleformdata} className="w-full shadow-none outline-none rounded-md border min-h-10 border-gray-500" />

                                                    <span className="text-danger block text-sm">
                                                        {errs.find(obj => obj.path === 'state')?.error}
                                                    </span>
                                                </div>
                                            </>
                                        )
                                    }
                                    {
                                        pdetails.address && !pdetails.loan && (
                                            <>
                                                <LoanDetails errs={errs} data={fdata} handleformemi={handleformemi} handleformdata={handleformdata} />
                                            </>
                                        )

                                    }
                                    {
                                        pdetails.loan && !pdetails.bank && (
                                            <>
                                                <BankDetails errs={errs} setErrs={setErrs} data={fdata} setFdata={setFdata} handleformdata={handleformdata} />
                                            </>
                                        )

                                    }
                                    {
                                        applied && (
                                            <>
                                                
                                                <SuccessApplied whatsapp={whatsapp} msg={msg} />
                                            </>
                                        )
                                    }

                                    {
                                        !pdetails.bank && (
                                            <>
                                                <div className="w-full flex justify-between">
                                                    {
                                                        pdetails.personal && (
                                                            <>
                                                                <Button onClick={() => gotoback()} className='block mt-3' type='submit' variant='outlined'>
                                                                    <ArrowLeftOutlined /><span className="ms-4">
                                                                        Back
                                                                    </span>
                                                                </Button>
                                                            </>
                                                        )
                                                    }

                                                    <Button onClick={handleformstep} className='block mt-3' type='submit' variant='gradient'>Next
                                                        <span className="ms-4">
                                                            <ArrowRightOutlined />
                                                        </span>
                                                    </Button>
                                                </div>
                                            </>
                                        )
                                    }


                                </div>

                            </div>
                        </div>
                        <div className="col-span-1 lg:order-1 order-2">
                            <div className="w-full h-full">
                                <ul className='*:py-4 *:relative list-none stepsul'>
                                    {
                                        Object.entries(pdetails).map(([key, val], index) => (
                                            <>
                                                <li>
                                                    <div className="flex gap-2 items-start">
                                                        <span className="mt-1">
                                                            {!val ? <CheckCircleFilled className='text-gray-700' /> : <CheckCircleFilled className='text-primary' />}
                                                        </span>

                                                        <button className="w-full text-start pt-0">
                                                            <h5 className={`button text capitalize font-medium ${val ? 'text-primary' : 'text-secondary'}`}>{key} Information</h5>
                                                            <p className="text text-xs tracking-wider font-light">{'Enter your ' + key + ' details'}</p>
                                                        </button>

                                                    </div>

                                                </li>
                                            </>
                                        ))
                                    }

                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

        </>
    )
}

export default Apply