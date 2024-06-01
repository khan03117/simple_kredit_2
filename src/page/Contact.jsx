import ContactForm from "./ContactForm";


const Contact = () => {
 
    return (

        <>
            <section className='lg:py-28 py-28'>
                <div className="container mx-auto">
                <div className="col-span-2 mb-5">
                            <h2 className="sectiontitle mb-4">
                                Get in touch with us
                            </h2>
                            <p>
                                Please write to us at care@simplekredit.in for any service-related queries or feedback. Alternatively, you may also use the moneyview App to lodge a complaint or report an issue. We generally respond within 24-48 working hours.
                                Timings: Monday to Saturday - 9 am to 6 pm - Excluding public holidays
                            </p>
                        </div>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                      
                        <div className="col-span-1">
                            <ContactForm/>
                        </div>
                        <div className="col-span-1">
                            <div className="w-full mb-10">
                                <h3 className="sectiontitle">
                                    Contact Us
                                </h3>
                                <div className="w-full">
                                    <iframe className="w-full h-96" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120555.753034163!2d72.80954728413832!3d19.222818528659126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b1d20c897f25%3A0xfc46d0650dc68fd2!2sB.M.C.%20Market!5e0!3m2!1sen!2sin!4v1717124392488!5m2!1sen!2sin"  allowfullscreen="" loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"></iframe>

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