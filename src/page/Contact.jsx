import React from "react";
import Contactbox from "../components/Contactbox";
import ContactForm from "./ContactForm";
import axios from "axios";
import { base_url } from "../utils";


const Contact = () => {
    const [items, setItems] = React.useState([]);
    const getitems = async () => {
        const item = await axios.get(base_url + 'api/support');
        setItems(item.data.data);
    }
    React.useEffect(() => {
        getitems();
    }, []);
    return (

        <>
            <section className='lg:py-28 py-28'>
                <div className="container mx-auto">
                    <div className="col-span-2 mb-5">
                        <h2 className="sectiontitle mb-4">
                            Get in touch with us
                        </h2>
                        <p>
                            Please write to us at care@simple-credit.org for any service-related queries or feedback. Alternatively, you may also use the moneyview App to lodge a complaint or report an issue. We generally respond within 24-48 working hours.
                            Timings: Monday to Saturday - 9 am to 6 pm - Excluding public holidays
                        </p>
                    </div>
                    <div className="grid md:grid-cols-12 grid-cols-1 gap-5">

                        <div className="lg:col-span-4 col-span-1">
                            <ContactForm />
                        </div>
                        <div className="lg:col-span-8 col-span-1">
                            <div className="w-full mb-10 h-full">
                                <h3 className="sectiontitle">
                                    Contact Us
                                </h3>
                                <div className="w-full h-full">
                                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                                        {
                                            items.map((itm) => (
                                                <>
                                                    <div className="col-span-1">
                                                        <Contactbox data={itm} />
                                                    </div>
                                                </>
                                            ))
                                        }

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

export default Contact