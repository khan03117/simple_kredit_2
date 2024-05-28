import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from 'react';
import { base_url, headers } from '../utils';
import { Radio } from '@material-tailwind/react';
const LoanCalculater = () => {
    const [months, setMonths] = useState(12);
    const [amount, setAmount] = useState(50000);
    const [loans, setLoans] = useState([]);
    const [loan_id, setLoanId] = useState(1);
    const [emi, setEmi] = useState(null);
    const options = {
        chart: {
            type: 'pie'
        },
        plotOptions: {
            pie: {
                innerSize: '50%',
                depth: 45,
                allowPointSelect: false,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: {point.y:.1f}'
                },
                states: {
                    hover: {
                        enabled: false
                    }
                },
            }
        },
        title: {
            text: 'Emi Calculator'
        },
        series: [
            {
                name: 'Share',
                data: [
                    { name: 'Principal Amount', y: Math.ceil(amount) },
                    { name: 'Interest Amount', y: Math.ceil(emi*months - amount) },

                ]
            }
        ]
    };
    const handlemonths = (e) => {
        let month = e.target.value
        if (month > 11) {
            setMonths(month)
        }

    }
    const handleamount = (e) => {
        let amount = e.target.value
        setAmount(amount);
    }
    const getloans = async () => {
        await axios.get(`${base_url}api/loans`, { headers: headers }).then((resp) => {
            setLoans(resp.data);
        })
    }
   
    function calculate_emi(principal, annualInterestRate, loanTenureMonths) {
        // Convert annual interest rate to a monthly rate
        let monthlyInterestRate = annualInterestRate / 12 / 100;
        // Calculate EMI using the formula
        let numerator = principal * monthlyInterestRate * Math.pow((1 + monthlyInterestRate), loanTenureMonths);
        let denominator = Math.pow((1 + monthlyInterestRate), loanTenureMonths) - 1;
        let emi = numerator / denominator;
        return setEmi(emi.toFixed(2));
    }

    useEffect(() => {
        getloans();
    }, []);

    useEffect(() => {
        //calculateEMI();
        calculate_emi(amount, loans.find(obj => obj.id == loan_id)?.interest_rate ?? 16, months )
    }, [amount, loan_id, months])



    return (
        <>
            <section className="py-20">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-5 ">
                        <div className="col-span-1">
                            <HighchartsReact highcharts={Highcharts} options={options} />
                        </div>
                        <div className="col-span-1">
                            <div className="w-full h-full">
                                <div className="w-full calucationform">
                                    <div className="form-group mb-8">
                                        <label className='formlabel' htmlFor="">Select Loan Type</label>
                                        <div className="flex items-center gap-3 flex-wrap">
                                            {
                                                loans.map((loan) => (
                                                    <>
                                                        <div className={` loantypebox inline-block ${loan.id == loan_id ? 'bg-primary/20 text-white' : 'bg-white'}  rounded-lg pe-3`}>
                                                            <Radio color={loan.id == loan_id ? 'green' : 'gray'} onClick={() => setLoanId(loan.id)} name='loan_type' label={loan.loan} checked={loan_id == loan.id} />
                                                        </div>
                                                    </>
                                                ))
                                            }
                                        </div>

                                    </div>
                                    <div className="form-group mb-8">
                                        <label className='formlabel' htmlFor="">Tenure of Loan </label>
                                        <div className="relative w-full">
                                            <input onChange={handlemonths} type="range" style={{ background: `linear-gradient(to right, rgb(6, 141, 83) ${(months / 48) * 100}%, rgb(221, 221, 221) ${(months / 48) * 100}%)` }} step={6} max={48} value={months} className="w-full progress-box" />
                                            <span className='absolute -top-6 rounded-md px-3 font-bold end-0 w-auto h-8 leading-8 bg-primary/20 text-green-800 inline-block '>{months} Months</span>
                                        </div>
                                    </div>
                                    <div className="form-group mb-8">
                                        <label className='formlabel' htmlFor="">Enter Amount  </label>
                                        <div className="relative w-full">
                                            <input onChange={handleamount} type="range" style={{ background: `linear-gradient(to right, rgb(6, 141, 83) ${(amount / 1000000) * 100}%, rgb(221, 221, 221) ${(amount / 1000000) * 100}%)` }} step={500} max={1000000} value={amount} className="w-full progress-box" />
                                            <span className='absolute -top-8 end-0  z-10'>
                                                <span className="text-green-800 size-8 leading-8 rounded-s-md text-center  bg-primary/20 inline-block">&#8377;</span>
                                                <input type="text" name="" onChange={handleamount} value={amount} id="" className="w-24  bg-primary/20  text-green-800 font-bold outline-none h-8 leading-8 px-3 ps-0 rounded-md rounded-s-none" />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <table className="w-full emitable text-start  *:text-sm   table-fixed">
                                            <tr>
                                                <td className='text-start'>Monthly emi</td>
                                                <td>
                                                    &#8377;  {Math.ceil(emi).toFixed(2)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='text-start'>Principal amount</td>
                                                <td>
                                                    &#8377;  {Math.ceil(amount).toFixed(2)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='text-start'>Total interest amount</td>
                                                <td>
                                                    &#8377;  {Math.ceil(emi * months - amount).toFixed(2)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='text-start'>Total  amount</td>
                                                <td>
                                                    &#8377;  {Math.ceil(emi * months).toFixed(2)}
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LoanCalculater