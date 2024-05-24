import { useEffect } from 'react';
import successimg from '../assets/image/verified.png'
import { useLocation } from 'react-router';
import axios from 'axios';
import { base_url, headers } from '../utils';
const SuccessApplied = () => {
  const location = useLocation();
  const mobile = location.state.mobile;
  const sendtowhatsapp = async () => {
    await axios.post(`${base_url}api/loan-details-by-mobile`, { mobile: mobile }, { headers: headers }).then((resp) => {
      const text = resp.data.message;
      const receiver = resp.data.mobile;
      window.open(`https://wa.me/91${receiver}?text=${text}`);
    });
  }
  useEffect(() => {
    sendtowhatsapp();
  }, [])

  return (
    <>
      <div className="w-full">
        <div className="text-center">
          <img src={successimg} alt="" className="block mb-10 mx-auto w-[100px] " />
          <h5 className="text-xl text-primary mb-5">Successfully Applied</h5>
          <p className="text-sm text-gray-700 mb-8">
            You have successfully applied for loan application. We will contact you soon.
          </p>
        </div>
      </div>
    </>
  )
}

export default SuccessApplied