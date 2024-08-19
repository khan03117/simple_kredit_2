
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { base_url, headers } from "../utils";
import parse from 'html-react-parser';
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
const Faq = () => {
    const [open, setOpen] = React.useState(0);
    const [faqs, setFaqs] = useState([]);

    const handleOpen = (value) => setOpen(open === value ? 0 : value);
    const getfaqs = async () => {
        await axios.get(`${base_url}api/faqs`, { headers: headers }).then((resp) => {
            setFaqs(resp.data.data);
        })
    }
    useEffect(() => {
        getfaqs();
    }, []);
    return (
        <>
            <section className="py-28">
                <div className="container mx-auto">
                    <div className="grid  grid-cols-1">
                        <div className="col-span-1 mb-5">
                            <h2 className="sectiontitle">Faq</h2>
                        </div>
                        <div className="col-span-1">
                            <div className="w-full ">
                                {
                                    faqs.map((faa) => (
                                        <>
                                            <Accordion open={open == faa.id}>
                                                <AccordionHeader className="relative text-primary" onClick={() => handleOpen(faa.id)}>
                                                    {faa.faq}  <div className="absolute text-primary end-2 top-2">
                                                        {
                                                            faa.id == open ? (<>
                                                                <span>
                                                                    <MinusOutlined />
                                                                </span>
                                                            </>) : (
                                                                <>
                                                                    <span>
                                                                        <PlusOutlined />
                                                                    </span>
                                                                </>
                                                            )
                                                        }


                                                    </div>
                                                </AccordionHeader>
                                                <AccordionBody>
                                                    {parse(faa.explain)}
                                                </AccordionBody>
                                            </Accordion>
                                        </>
                                    ))
                                }


                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default Faq