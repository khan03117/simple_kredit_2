import React from "react";
import { base_url, headers } from "../utils";
import axios from "axios";

const Documents = () => {
    const [policy, setPolicy] = React.useState(null);
    const getPolicy = async () => {
        await axios.get(`${base_url}api/policy/documents`, { headers: headers }).then((resp) => {
            setPolicy(resp.data.data);

        })
    }
    React.useEffect(() => {
        getPolicy();
    }, [])
    return (
        <>
            <section className="py-28  documentsection">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1">
                        <div className="w-full">
                            <h2 className="sectiontitle">Document checklist for loan application</h2>
                            {/* <div className="w-full mt-3">
                                <div className="markdown prose w-full break-words dark:prose-invert light">
                                    <p>Applying for a loan typically requires a variety of documents to verify your identity, income, employment, and
                                        financial situation. Here s a comprehensive list of documents you may need for a loan application:</p>
                                    <h3>1. <strong>Personal Identification</strong></h3>
                                    <ul>
                                        <li><strong>Government-issued photo ID</strong>: Passport, driver s license, or state ID.</li>
                                        <li><strong>Social Security card</strong> or proof of Social Security number.</li>
                                    </ul>
                                    <h3>2. <strong>Proof of Income</strong></h3>
                                    <ul>
                                        <li><strong>Pay stubs</strong>: Usually the last two to three months.</li>
                                        <li><strong>Tax returns</strong>: Last two years.</li>
                                        <li><strong>W-2 forms</strong>: Last two years.</li>
                                        <li><strong>Bank statements</strong>: Last two to three months, showing direct deposits.</li>
                                        <li><strong>Employer contact information</strong>: For employment verification.</li>
                                    </ul>
                                    <h3>3. <strong>Proof of Employment</strong></h3>
                                    <ul>
                                        <li><strong>Employment verification letter</strong>: From your employer, stating your position, salary, and
                                            length of employment.</li>
                                        <li><strong>Recent employment history</strong>: Details of previous employment if you ve changed jobs recently.
                                        </li>
                                    </ul>
                                    <h3>4. <strong>Credit Information</strong></h3>
                                    <ul>
                                        <li><strong>Credit report</strong>: Some lenders will pull this themselves, but it s good to review your own.
                                        </li>
                                        <li><strong>Explanation of any credit issues</strong>: If you have negative marks, be prepared to explain them.
                                        </li>
                                    </ul>
                                    <h3>5. <strong>Proof of Address</strong></h3>
                                    <ul>
                                        <li><strong>Utility bills</strong>: Recent bills (electric, water, gas, etc.) with your name and address.</li>
                                        <li><strong>Lease or mortgage statement</strong>: If you re renting or paying a mortgage.</li>
                                    </ul>
                                    <h3>6. <strong>Debt Information</strong></h3>
                                    <ul>
                                        <li><strong>Current debt statements</strong>: Credit cards, other loans, etc.</li>
                                        <li><strong>List of monthly debt payments</strong>: To calculate debt-to-income ratio.</li>
                                    </ul>
                                    <h3>7. <strong>Asset Documentation</strong></h3>
                                    <ul>
                                        <li><strong>Bank statements</strong>: Showing savings, checking, and other liquid assets.</li>
                                        <li><strong>Investment account statements</strong>: Stocks, bonds, retirement accounts, etc.</li>
                                        <li><strong>Proof of other assets</strong>: Such as property titles or car ownership documents.</li>
                                    </ul>
                                    <h3>8. <strong>Specific Loan Documents</strong></h3>
                                    <ul>
                                        <li><strong>Loan application form</strong>: Filled out completely and accurately.</li>
                                        <li><strong>Collateral documentation</strong>: If you’re applying for a secured loan (e.g., home equity, auto
                                            loan).</li>
                                    </ul>
                                    <h3>9. <strong>Additional Documents</strong></h3>
                                    <ul>
                                        <li><strong>Business financial statements</strong>: If self-employed, including profit and loss statements.</li>
                                        <li><strong>Legal documents</strong>: Any court orders, alimony, or child support documentation if applicable.
                                        </li>
                                        <li><strong>Insurance documents</strong>: Proof of insurance on assets being used as collateral.</li>
                                    </ul>
                                    <h3>For a Smooth Loan Application Process</h3>
                                    <div className="text-start">
                                        <Link to={'/loan-application'} className="btn bg-primary text-white font-bold uppercase tracking-wider px-10 py-3 rounded-md" >Get Instance Loan</Link>
                                    </div>

                                </div>
                            </div> */}
                            <div className="content">
                                {
                                    policy && (
                                        <>
                                            <div id="policycontent">
                                                <div dangerouslySetInnerHTML={{ __html: policy?.policy }}></div>
                                            </div>
                                        </>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Documents