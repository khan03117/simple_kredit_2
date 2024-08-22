import adv1 from '../assets/image/adv-1.png';
import adv2 from '../assets/image/adv-2.png';
const Dashboard = () => {

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
                                href={`https://wa.me/91${9098989898}?text=hi sir, i need loan.`}
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