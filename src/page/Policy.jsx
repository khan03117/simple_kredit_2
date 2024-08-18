import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { base_url, headers } from "../utils";

const Policy = () => {
    const params = useParams();
    const location = useLocation();
    const [policy, setPolicy] = useState(null);

    const getPolicy = async () => {

        await axios.get(`${base_url}api/policy/${params.url}`, { headers: headers }).then((resp) => {
            setPolicy(resp.data.data);

        })
    }
    useEffect(() => {
        getPolicy();
    }, [location.pathname])
    return (
        <>
            {
                policy && (
                    <>
                        <section className="py-20">
                            <div className="container mx-auto">
                                <div className="w-full">
                                    <h2 className="sectiontitle">{policy.title}</h2>

                                    <div id="policycontent">
                                        <div dangerouslySetInnerHTML={{ __html: policy.policy }}></div>
                                    </div>
                                </div>
                            </div>
                        </section>

                    </>
                )
            }

        </>
    )
}

export default Policy