
import React, { Component,useEffect,useState }from "react";
import moment from "moment";
// importing Link from react-router-dom to navigate to 
// different end points.
import { Link,useParams,useLocation } from "react-router-dom";
import { withRouter } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import {APIURL,SITEURL} from "./Constant";
import icon_call from "./asset/images/icon-call.svg";
import icon_whatapp from "./asset/images/icon-whatsapp.svg";

function CmsPage() {

    const location  = useLocation();
    const [items,setItems] = useState("");
    const [isLoaded,setIsLoaded] = useState(false);
    const [error,setError] = useState("");
    const { slug } = useParams();
    useEffect(()=>{
        fetch(APIURL+"cms-page/"+slug)
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

    },[slug])

    // const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      console.log(items.data.description);
    }
    return (
        <div>
          <div>
            <Header/>
            {/*<section className="inner-banner">
              <div className="container">
                <h2 className="inner_title">{items.data.title}</h2>
              </div>
            </section>*/}
            <section id="cards">
              <div className="container py-2">
                <div className="row pb-4">
                  <div className="col-12 text-center">
                    <h3 className="black-heading">{items.data.title}</h3>
                    <div dangerouslySetInnerHTML={{__html: items.data.description}}/>
                  </div>
                </div>
              </div>
            </section>
            <Footer/>
          </div>
      </div>
    )
}

export default CmsPage