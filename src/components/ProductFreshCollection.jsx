import React, { Component, useEffect, useState }from "react";
import { Link,useParams,useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import {APIURL,SITEURL} from "./Constant";

function ProductFreshCollection() {

  const location  = useLocation();
  const [items,setItems] = useState([]);
  const [isLoaded,setIsLoaded] = useState(false);
  const [error,setError] = useState("");

  useEffect(()=>{
       
    fetch(APIURL+"fresh-collection")
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
      document.title = 'Product Fresh Collection';
    }
  return (
    <div>
          <Header />
            <section className="inner-banner">
              <div className="container">
                <h2 className="inner_title">Product Fresh Collection</h2>
              </div>
            </section>
            <section className="Product-listing">
              <div className="container">
                <div className="row">
                  {
                    items.ack === 1 ? (
                      items.data.map((item) => (
                        <div className="col-md-4" key={item.product_id}>
                          <div className="home_product ">
                            <div className="product-img">
                              <Link to={`/product-details/${item.product_slug}`}>
                                <img src={SITEURL+item.folder_name+"/" + item.image} alt="" />
                              </Link>
                            </div>
                            <div className="product-btm">
                              <div className="product-content">
                                <Link to={`/product-details/${item.product_slug}`} className="d-block">
                                  <h4>{item.name}</h4>
                                </Link>
                                <p>sku : {item.product_sku}</p>
                              </div>
                              <div className="view-btn">
                                <Link to={`/product-details/${item.product_slug}`}>View Details</Link>
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
              </div>
            </section>
          <Footer/>
        </div>
  )
}

export default ProductFreshCollection