import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { base_url, headers } from './../utils';
const LoanDetails = (props) => {
    const [loan_type, setLoanType] = useState();
    const [amount, setAmount] = useState(null);
    const [rate, setRate] = useState(null);
    const [tenure, setTenure] = useState(null);
    const [emi, setEmi] = useState(null);
    const [types, setTypes] = useState([]);
    function calculateEMI(principal, annualInterestRate, loanTenureMonths) {
        // Convert annual interest rate to a monthly rate
        let monthlyInterestRate = annualInterestRate / 12 / 100;
        // Calculate EMI using the formula
        let numerator = principal * monthlyInterestRate * Math.pow((1 + monthlyInterestRate), loanTenureMonths);
        let denominator = Math.pow((1 + monthlyInterestRate), loanTenureMonths) - 1;
        let emi = numerator / denominator;
        return setEmi(emi.toFixed(2));
    }
    useEffect(() => {
        props.handleformemi(emi)
    }, [emi]);
    const get_interest_rates = async () => {
        await axios.post(`${base_url}api/get-loan-by-type`, { loan_type: loan_type }, {
            headers: headers
        }).then((resp) => {
            if (resp.data.is_success == "1") {
                setRate(resp.data.data.interest_rate);
            }
        })
    }

    const get_all_loan_types = async () => {
        await axios.get(`${base_url}api/loans`, { headers: headers }).then((resp) => {
            setTypes(resp.data)
        })
    }
    useEffect(() => {
        if (loan_type) {
            calculateEMI(amount, rate, tenure * 12);
            get_interest_rates();
        }

    }, [rate, amount, loan_type, tenure]);
    const selectloanhandle = (e) => {
        props.handleformdata(e);
        const value = e.target.value;
        setLoanType(value);

    }
    const handleloanamount = (e) => {
        props.handleformdata(e);
        setAmount(e.target.value);
    }
    const handleyear = (e) => {
        props.handleformdata(e);
        setTenure(e.target.value);
    }
    useEffect(() => {
        get_all_loan_types();
    }, []);

    return (
        <>
            <div className="w-full">
                <h4>Enter Loan Details</h4>
                <div className="form-group">
                    <label className='block formlabel' htmlFor="">Select Loan</label>
                    <select name="loan_type" onChange={selectloanhandle} id="" className="w-full min-h-10 outline-none rounded-md border border-gray-500">
                        <option value="" selected>---Select---</option>
                        {
                            types.map((loan) => (
                                <>
                                    <option value={loan.id}>{loan.loan}</option>
                                </>
                            ))
                        }

                    </select>
                    <span className="text-danger block text-sm">
                        {props.errs.find(obj => obj.path === 'loan_type')?.error}
                    </span>
                </div>
                <div className="form-group mb-4">
                    <label className='block formlabel' htmlFor="">Enter Amount</label>
                    <input type="number" min={50000} max={2500000} value={props?.data?.amount} name='amount' onChange={handleloanamount} className=" block min-h-10 rounded-md border border-gray-500 w-full" />
                    <span className="text-danger block text-sm">
                        {props.errs.find(obj => obj.path === 'amount')?.error}
                    </span>
                </div>
                <div className="form-group mb-4">
                    <label className='block formlabel' htmlFor="">Select Years</label>
                    <select name="tenure" onChange={handleyear} className="w-full min-h-10 border border-gray-500">
                        <option value="">---Select---</option>
                        <option value="1">1 Year</option>
                        <option value="1.5">1.5 Years</option>
                        <option value="2">2 Years</option>
                        <option value="2.5">2.5 Years</option>
                        <option value="3">3 Years</option>
                        <option value="3.5">3.5 Years</option>
                        <option value="4">4 Years</option>
                    </select>
                </div>
                <div className="form-group mb-4">
                    <label className='block formlabel' htmlFor="">Enter Rate</label>
                    <input type="text" value={rate} readOnly className=" block min-h-10 rounded-md border border-gray-500 w-full" />
                </div>
                <div className="form-group mb-4">
                    <label className='block formlabel' htmlFor="">EMI</label>
                    <input type="text" value={emi} readOnly className=" block min-h-10 rounded-md border border-gray-500 w-full" />
                </div>



            </div>
        </>
    )
}
LoanDetails.propTypes = {
    handleformdata: PropTypes.func.isRequired,
    data: PropTypes.object,
    errs: PropTypes.array,
    handleformemi: PropTypes.func.isRequired
};


export default LoanDetails