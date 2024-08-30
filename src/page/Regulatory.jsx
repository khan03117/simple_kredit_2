import axios from "axios";
import React from "react";
import { base_url, headers } from "../utils";

const Regulatory = () => {
    const [policy, setPolicy] = React.useState(null);
    const getPolicy = async () => {
        await axios.get(`${base_url}api/policy/corpoate-regulatory-information`, { headers: headers }).then((resp) => {
            setPolicy(resp.data.data);
        });
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
                            <h2 className="sectiontitle">Corporate/Regulatory Information</h2>
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

export default Regulatory