import axios from "axios";
import { base_url, headers } from "../utils";
import { useState } from "react";

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [message, setMessage] = useState('');
    const [msg, setMsg] = useState('');
    const [errors, setErrors] = useState([]);
    const sendMessage = async () => {
        const data = {
            name: name,
            email: email,
            mobile: mobile,
            message: message
        };
        await axios.post(`${base_url}api/contact-query`, { ...data }, { headers: headers }).then((resp) => {
            setMsg(resp.data.message);
            if (resp.data.is_success == "1") {
                setName('')
                setEmail('')
                setMobile('')
                setMessage('')
            }
            return setErrors(resp.data.errors);

        })
    }
    return (
        <>
            <div className="w-full p-7 bg-white rounded-lg border-e-4 border-primary contactform">
                {
                    msg && (
                        <>
                            <div className={`p-3 rounded-lg ${Object.entries(errors).length ? 'bg-orange-400' : 'bg-primary'} `}>
                                <p className="text-white">{msg}</p>
                            </div>
                        </>
                    )
                }
                <div className="form-group mb-4">
                    <label className="form-label">Enter Name</label>
                    <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="form-control" placeholder="Enter your name" />
                    {
                        errors && errors['name'] && (
                            <>
                                <small className="text-red-500 text-xs">{errors['name']}</small>
                            </>
                        )
                    }
                </div>
                <div className="form-group mb-4">
                    <label className="form-label">Enter Email</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" placeholder="Enter your email" />
                    {
                        errors && errors['email'] && (
                            <>
                                <small className="text-red-500 text-xs">{errors['email']}</small>
                            </>
                        )
                    }
                </div>
                <div className="form-group mb-4">
                    <label className="form-label">Enter mobile</label>
                    <input type="tel" onChange={(e) => setMobile(e.target.value)} value={mobile} className="form-control" placeholder="Enter your mobile" />
                    {
                        errors && errors['mobile'] && (
                            <>
                                <small className="text-red-500 text-xs">{errors['mobile']}</small>
                            </>
                        )
                    }
                </div>
                <div className="form-group mb-4">
                    <label className="form-label">Enter message</label>
                    <textarea name="" onChange={(e) => setMessage(e.target.value)} className='form-control' placeholder='Enter your message' id="">{message}</textarea>
                    {
                        errors && errors['message'] && (
                            <>
                                <small className="text-red-500 text-xs">{errors['message']}</small>
                            </>
                        )
                    }
                </div>
                <div className="form-group">
                    <button onClick={sendMessage} className="px-10 min-w-48 py-3 bg-primary text-white  rounded-full">Submit</button>
                </div>
            </div>
        </>
    )
}

export default ContactForm