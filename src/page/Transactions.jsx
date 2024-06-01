import { useEffect, useState } from "react"

const Transactions = () => {
    const [list, setList] = useState([]);
    useEffect(() => {
        setList([]);
    }, [])
    return (
        <>
            <section className="p">
                <div className="container">
                    <div className="grid grid-cols-1">
                        <div className="w-full">
                            <h1 className="sectiontitle mb-5">Transactions</h1>
                            {
                                list.length == 0 && (
                                    <>
                                        <div className="flex justify-center">
                                            <div className="lg:w-1/2 w-full p-5  bg-primary/20 text-green-800">
                                                <h4 className="text-center">
                                                    No Transactions Found
                                                </h4>
                                            </div>
                                        </div>
                                    </>
                                )
                            }



                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Transactions