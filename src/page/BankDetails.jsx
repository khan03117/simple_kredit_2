import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { headers } from '../utils';

const BankDetails = (props) => {

    const [bank, setBank] = useState({});
    const [ifsc, setIfsc] = useState(null);

    const handleifsc = (e) => {
        const value = e.target.value;
        setIfsc(value.toUpperCase());
    }

    const get_bank_details = async (code) => {
        await axios.get(`https://ifsc.razorpay.com/${code}`, { headers: headers }).then((resp) => {
            if (typeof resp.data == 'object') {
                setBank(resp.data);

            } else {
                let obj = {
                    "path": "ifsc",
                    "error": "Invalid ifsc code"
                }
                props.setErrs([...props.errs, obj]);
            }
        })
    }


    useEffect(() => {
        if (ifsc && ifsc.length > 10) {
            get_bank_details(ifsc);
        }
    }, [ifsc])
    useEffect(() => {
        let mbank = bank.BANK;
        let mbranch = bank.ADDRESS;
        props.setFdata({ ...props.data, bank_id: mbank, branch_name: mbranch, ifsc: ifsc })
    }, [bank])




    return (
        <>
            <div className="w-full">
                <div className="form-group">
                    <label htmlFor="" className="formlabel">
                        Enter Account Holder Name
                    </label>
                    <input type="text" value={props?.data?.account_holder_name} name='account_holder_name' onChange={props.handleformdata} className=" block min-h-10 rounded-md border border-gray-500 w-full" />
                    <span className="text-danger block text-sm">
                        {props.errs.find(obj => obj.path === 'account_holder_name')?.error}
                    </span>
                </div>
                <div className="form-group">
                    <label htmlFor="" className="formlabel">
                        Enter IFSC
                    </label>
                    <input type="text" autoComplete='off' value={ifsc} name='ifsc' onChange={handleifsc} className=" block min-h-10 rounded-md border border-gray-500 w-full" />
                    <span className="text-danger block text-sm">
                        {props.errs.find(obj => obj.path === 'ifsc')?.error}
                    </span>
                </div>
                <div className="form-group">
                    <label htmlFor="" className="formlabel">Enter Bank</label>
                    <input type="text" value={bank?.BANK} name="bank_id" id="bank_id" onInput={props.handleformdata} readOnly className=" block min-h-10 rounded-md border border-gray-500 w-full" />
                    <span className="text-danger block text-sm">
                        {props.errs.find(obj => obj.path === 'bank_id')?.error}
                    </span>
                </div>

                <div className="form-group">
                    <label htmlFor="" className="formlabel">
                        Enter Branch Name
                    </label>
                    <input type="text" value={bank?.ADDRESS} name='branch_name' readOnly onInput={props.handleformdata} className=" block min-h-10 rounded-md border border-gray-500 w-full" />
                    <span className="text-danger block text-sm">
                        {props.errs.find(obj => obj.path === 'branch_name')?.error}
                    </span>
                </div>
                <div className="form-group">
                    <label htmlFor="" className="formlabel">
                        Enter Account Number
                    </label>
                    <input type="text" autoCapitalize='off' value={props?.data?.account_no} name="account_no" onChange={props.handleformdata} className=" block min-h-10 rounded-md border border-gray-500 w-full" />
                    <span className="text-danger block text-sm">
                        {props.errs.find(obj => obj.path === 'account_no')?.error}
                    </span>
                </div>
            </div>
        </>
    )
}

BankDetails.propTypes = {
    handleformdata: PropTypes.func.isRequired,
    data: PropTypes.object,
    errs: PropTypes.array,
    setErrs: PropTypes.func,
    setFdata: PropTypes.func
};

export default BankDetails