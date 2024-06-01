import { Link } from "react-router-dom"

const Dashboard = () => {
    return (
        <>
            <div className="w-full">
                <h2 className="sectiontitle">
                    Welcome to Simple Kredit use application dashboard
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 my-4 gap-4">
                    <div className="w-full">
                        <img src="https://cuadvertising.net/wp-content/uploads/2017/08/client-carloans-4.jpg" alt="" className="w-full rounded-lg" />
                    </div>
                    <div className="w-full">
                        <img src="https://cuadvertising.net/wp-content/uploads/2017/08/client-carloans-4.jpg" alt="" className="w-full rounded-lg" />
                    </div>
                </div>

                <div className="w-full">
                    <div className="w-full bg-primary/20 rounded-xl text-center py-20 px-20">
                        <p className="text-3xl text-green-800 text-center">
                            You dont have any loan.
                        </p>
                        <div className="w-full mt-5">
                            <Link className="px-5 inline-block py-3 bg-primary rounded-lg text-white font-bold" to={`https://SimpleKredit.com/91${9098989898}?text=hi sir, i need loan.`}>
                                Get instant loan
                            </Link>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default Dashboard