import successimg from '../assets/image/verified.png'
const SuccessApplied = () => {
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