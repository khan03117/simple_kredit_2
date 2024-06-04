/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import successimg from '../assets/image/verified.png'
import { useLocation } from 'react-router';
import axios from 'axios';
import { base_url, headers } from '../utils';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const SuccessApplied = (props) => {
  const [wmsg, setWmsg] = useState(null);
  const [agent, setAgnet] = useState(null);
  const location = useLocation();
  const mobile = location.state.mobile;

  const sendtowhatsapp = async () => {
    await axios.post(`${base_url}api/loan-details-by-mobile`, { mobile: mobile }, { headers: headers }).then((resp) => {
      const text = resp.data.message;
      const amob = resp.data.mobile;
      setWmsg(text);
      setAgnet(amob);
      window.open(`https://wa.me/91${amob}?text=${text}`);
    });
  }

  useEffect(() => {
    sendtowhatsapp();
  }, [agent, wmsg]);
  // const chatwithus = () => {
  //   window.open(`https://wa.me/91${agent}?text=${wmsg}. Please contact me.`);
  // }

  return (
    <>
      <div className="w-full">
        <div className="text-center">
          <img src={successimg} alt="" className="block mb-10 mx-auto w-[100px] " />
          <h5 className="text-xl text-primary mb-5">Successfully Applied</h5>
          <p className="text-sm text-gray-700 mb-8">
            {props?.msg} We will contact you soon.
          </p>
          <Link target='_blank' to={`https://wa.me/91${agent}?text=${wmsg}. Please contact me.`} className="bg-primary text-white py-2 px-4 rounded-md text-sm">
            Talk to SimpleKredit
          </Link>
        </div>
      </div>
    </>
  )
}

SuccessApplied.prototype = {
  msg: PropTypes.string,
  whatsapp: PropTypes.string
}

export default SuccessApplied