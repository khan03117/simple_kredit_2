
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import React from "react";
const Faq = () => {
    const [open, setOpen] = React.useState(0);
    const [alwaysOpen, setAlwaysOpen] = React.useState(true);

    const handleAlwaysOpen = () => setAlwaysOpen((cur) => !cur);
    const handleOpen = (value) => setOpen(open === value ? 0 : value);
    return (
        <>
            <section className="py-28">
                <div className="container mx-auto">
                    <div className="grid  grid-cols-1">
                    
                        <div className="col-span-1">
                            <div className="w-full">
                                <Accordion open={alwaysOpen}>
                                    <AccordionHeader onClick={handleAlwaysOpen}>What is Material Tailwind?</AccordionHeader>
                                    <AccordionBody>
                                        We&apos;re not always in the position that we want to be at. We&apos;re constantly
                                        growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
                                        ourselves and actualize our dreams.
                                    </AccordionBody>
                                </Accordion>
                                <Accordion open={open === 1}>
                                    <AccordionHeader onClick={() => handleOpen(1)}>
                                        How to use Material Tailwind?
                                    </AccordionHeader>
                                    <AccordionBody>
                                        We&apos;re not always in the position that we want to be at. We&apos;re constantly
                                        growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
                                        ourselves and actualize our dreams.
                                    </AccordionBody>
                                </Accordion>
                                <Accordion open={open === 2}>
                                    <AccordionHeader onClick={() => handleOpen(2)}>
                                        What can I do with Material Tailwind?
                                    </AccordionHeader>
                                    <AccordionBody>
                                        We&apos;re not always in the position that we want to be at. We&apos;re constantly
                                        growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
                                        ourselves and actualize our dreams.
                                    </AccordionBody>
                                </Accordion>
                            </div>
                        </div>
                    
                    </div>
                </div>
            </section>
        </>
    )
}

export default Faq