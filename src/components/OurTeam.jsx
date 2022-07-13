import React, { Component, useEffect, useState }from "react";
import { Link,useParams,useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import {APIURL,SITEURL} from "./Constant";

function OurTeam() {

  const location  = useLocation();
  const [items,setItems] = useState([]);
  const [isLoaded,setIsLoaded] = useState(false);
  const [error,setError] = useState("");

  useEffect(()=>{
       
    fetch(APIURL+"our-team")
      .then(res => res.json())
      .then(
        result => {
          //etPath(all)
          setIsLoaded(true)
          setItems(result)
        },
        error => {
          setIsLoaded(true)
          setError(error)
        }
      );

  },[])

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      document.title = 'Our Team';
    }
  return (
    <div>
          <Header />
            <section className="inner-banner">
              <div className="container">
                <h2 className="inner_title">Our Team</h2>
              </div>
            </section>
            <section id="cards">
              <div className="container py-2">
                <div className="row pb-4">
                  <div className="col-12 text-center">
                    <div className="black-heading">Leadership</div>
                  </div>
                </div>
                <div className="row">
                  {
                    items.ack === 1 ? (
                      items.data.map((item) => (
                        <div className="col-lg-4 col-md-4 mb-4 pt-5">
                          <div className="card shadow-sm border-0">
                            <div className="card-body">
                              <div className="user-picture">
                                <img src={SITEURL+item.folder_path+"/" + item.image} alt="" className="shadow-sm rounded-circle" height={130} width={130} />
                              </div>
                              <div className="user-content">
                                <h5 className="text-capitalize user-name">{item.name}</h5>
                                <p className=" text-capitalize text-muted  blockquote-footer">{item.designation}</p>
                                <p className=" text-muted pt-3 mb-0">{item.details}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        ))
                    ) : (
                      <div> No Data Found</div>
                    )
                  }
                </div>
                <div className="row py-5">
                  <div className="col-12 text-center">
                    <div className="black-heading">Our Team</div>
                    <div dangerouslySetInnerHTML={{__html: items.cms.description}}/>
                  </div>
                </div>
              </div>
            </section>
          <Footer/>
        </div>
  )
}

export default OurTeam