import axios from 'axios';
import React from 'react'
import { base_url, headers } from '../utils';
const About = () => {
  const [policy, setPolicy] = React.useState(null);

  const getPolicy = async () => {

    await axios.get(`${base_url}api/policy/about`, { headers: headers }).then((resp) => {
      setPolicy(resp.data.data);

    })
  }
  React.useEffect(() => {
    getPolicy();
  }, [location.pathname])
  return (
    <>
    <section className="py-20"></section>
      {
        policy && (
          <>
          
            <section className=''>
              <div className="container mx-auto">
                <div className="grid grid-cols-12">
                  <div className="col-span-2"></div>
                  <div className="lg:col-span-8 col-span-12">
                    <div className="w-full">
                      <h4 className="text-primary sectiontitle">
                        About Us
                      </h4>
                      <div id="policycontent">
                        <div dangerouslySetInnerHTML={{ __html: policy?.policy ?? "<p>Loading</p>" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )
      }
    </>
  )
}

export default About