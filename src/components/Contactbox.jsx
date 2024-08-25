// import React from 'react'
import PropTypes from 'prop-types';

const Contactbox = ({ data }) => {
    return (
        <>
            <div className="w-full h-full bg-white p-4 shadow-lg shadow-blue-gray-100 rounded-lg">
                <h4 className='contactTitle text-primary md:text-xl text-md mb-5 block font-bold'>{data.title}</h4>
                {
                    data.executive && (
                        <>
                         <h5 className="text-sm">
                                
                                <p className='text-sm text-primary'>
                                <span className="text-black font-bold">Executive :</span>   {data.executive}
                                </p>
                            </h5>
                        </>
                    )
                }
                <div className="pb-3">
                    {
                        data.phone && (
                            <>
                                <p className="text-sm">
                                    <span className="text-black"> Contact No :  </span>  <a className='text-primary hover:text-red-900' href={`tel:+91-${data.phone}`}>{data?.phone}</a>
                                </p>
                            </>
                        )
                    }
                    {
                        data.timing && (
                            <>
                                <p className='text-gray-600 text-sm'>{data.timing}</p>
                            </>
                        )
                    }

                </div>
                {
                    data.email && (
                        <>
                            <h5 className="text-sm">
                                <span className="text-black">Email :</span>

                                <a className='text-primary hover:text-red-900' href={`mailto:${data.email}`}>{data?.email}</a>

                            </h5>
                        </>
                    )
                }
              
                {
                    data.address && (
                        <>
                            <h5 className="text-sm">
                                <span className="text-black">Address :</span>
                                <p className='text-sm text-primary'>
                                    {data.address}
                                </p>
                            </h5>
                        </>
                    )
                }
            </div>
        </>
    )
}
Contactbox.propTypes = {
    data: PropTypes.array.isRequired

};

export default Contactbox