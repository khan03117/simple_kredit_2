import React from 'react';
import adv1 from '../assets/image/adv-1.png';
import adv2 from '../assets/image/adv-2.png';
import axios from 'axios';
import { base_url } from '../utils';
import { Navigate } from 'react-router';

const Dashboard = () => {

    const [user, setUser] = React.useState('');
    const token = JSON.parse(localStorage.getItem('auth_token'));
    const get_applications = async () => {
        await axios.get(`${base_url}api/agent_no`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((resp) => {
            if (resp.status === 200) {
                return setUser(resp.data.data);

            } else {
                <Navigate to={'/'} />
            }

        })
    }
    React.useEffect(() => {
        get_applications();
    }, []);
    return (
        <>
            <div className="w-full">
                <h2 className="sectiontitle">
                    Welcome To Simple Credit user application dashboard
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 my-4 gap-4">
                    <div className="w-full">
                        <img src={adv1} alt="" className="w-full rounded-lg" />
                    </div>
                    <div className="w-full">
                        <img src={adv2} alt="" className="w-full rounded-lg" />
                    </div>
                </div>

                <div className="w-full">
                    <div className="w-full bg-primary/20 rounded-xl text-center py-20 px-20">
                        <p className="text-3xl text-green-800 text-center">
                            Your loan request is under process.
                        </p>
                        <div className="w-full mt-5">
                            <a
                                className="px-5 inline-block py-3 bg-primary rounded-lg text-white font-bold"
                                href={`https://wa.me/91${user}?text=hi sir, i need loan.`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Get instant loan
                            </a>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default Dashboard