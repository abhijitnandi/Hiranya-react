
import React, { Component,useEffect,useState }from "react";
import moment from "moment";
// importing Link from react-router-dom to navigate to 
// different end points.
import { Link,useParams,useLocation } from "react-router-dom";
import { withRouter } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import {APIURL,SITEURL} from "./Constant";
import { Carousel } from 'react-responsive-carousel';

function OurCustomer() {

    const location  = useLocation();
    const [items,setItems] = useState("");
    const [isLoaded,setIsLoaded] = useState(false);
    const [error,setError] = useState("");
    useEffect(()=>{
        fetch(APIURL+"our-customer")
          .then(res => res.json())
          .then(
            result => {
              setItems(result);
              setIsLoaded(true);
            },
            error => {
              setError(error);
              setIsLoaded(true);
            }
          );

    },[])

    // const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      document.title = 'Our Customer';
    }
    return (
        <div>
          <div>
            <Header/>
            <section className="inner-banner">
              <div className="container">
                <h2 className="inner_title">Our Esteemed Customers</h2>
              </div>
            </section>
            <section id="cards">
              <div className="container py-2">
                <div className="row pb-4">
                  <div className="col-12 text-center">
                    <h3 className="black-heading">Our Esteemed Customers</h3>
                  </div>
                  <div className="col-md-12">
                    <Carousel autoPlay interval="1000" infiniteLoop transitionTime="1000" showThumbs={false}>
                      {
                        items.data.map((item) => (
                          <div className="slide" key={item.id}>
                            <img height="100%" src={SITEURL+item.folder_path+"/" + item.image} />
                            <p>{item.name}</p>
                          </div>
                        )
                        )
                      }
                    </Carousel>
                  </div>
                </div>
              </div>
              {/* /cards */}
            </section>
            <Footer/>
          </div>
      </div>
    )
}

export default OurCustomer