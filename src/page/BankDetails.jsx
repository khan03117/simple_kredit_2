import PropTypes from 'prop-types';

const BankDetails = (props) => {

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
                    <label htmlFor="" className="formlabel">Select Bank</label>
                    <select value={props?.data?.bank_id} name='bank_id' onChange={props.handleformdata} className="w-full min-h-10 border border-gray-500">
                        <option value="">---Select---</option>
                        <option value="1">State Bank of India</option>
                    </select>
                    <span className="text-danger block text-sm">
                        {props.errs.find(obj => obj.path === 'bank_id')?.error}
                    </span>
                </div>
                <div className="form-group">
                    <label htmlFor="" className="formlabel">
                        Enter IFSC
                    </label>
                    <input type="text" value={props?.data?.ifsc} name='ifsc' onChange={props.handleformdata} className=" block min-h-10 rounded-md border border-gray-500 w-full" />
                    <span className="text-danger block text-sm">
                        {props.errs.find(obj => obj.path === 'ifsc')?.error}
                    </span>
                </div>
                <div className="form-group">
                    <label htmlFor="" className="formlabel">
                        Enter Branch Name
                    </label>
                    <input type="text" value={props?.data?.branch_name} name='branch_name' onChange={props.handleformdata} className=" block min-h-10 rounded-md border border-gray-500 w-full" />
                    <span className="text-danger block text-sm">
                        {props.errs.find(obj => obj.path === 'branch_name')?.error}
                    </span>
                </div>
                <div className="form-group">
                    <label htmlFor="" className="formlabel">
                        Enter Account Number
                    </label>
                    <input type="text" value={props?.data?.account_no} name="account_no" onChange={props.handleformdata} className=" block min-h-10 rounded-md border border-gray-500 w-full" />
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
    errs: PropTypes.array
};

export default BankDetails