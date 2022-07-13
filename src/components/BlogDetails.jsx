
import React, { Component,useEffect,useState }from "react";
import moment from "moment";
// importing Link from react-router-dom to navigate to 
// different end points.
import { Link,useParams   } from "react-router-dom";
import { withRouter } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import {APIURL,SITEURL} from "./Constant";

function BlogDetails() {

    const [items,setItems] = useState("");
    const [isLoaded,setIsLoaded] = useState(false);
    const [error,setError] = useState("");
    const { slug } = useParams();
    useEffect(()=>{
        fetch(APIURL+"blog-details/"+slug)
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
      //console.log(this.state.items);
      document.title = items.data.name;
  }
    return (
        <div>
          <Header/>
            <section className="blog-sec">
              <div className="container">
                <div className="row">
                {
                  items.ack === 1 ? (
                    <div className="col-md-12 col-12  mb-4">
                      <div className="meta-categories-wrapp position-relative top-0 start-0 end-0 mx-auto text-center">
                        <div className="wd-post-cat">
                          <p>Jewellery</p>
                        </div>
                      </div>
                      <h3 className="wd-entities-title title post-title text-center">
                        <a href="#" rel="bookmark">{items.data.name}</a>
                      </h3>
                      <p className="meta-author text-center">Posted by {items.data.posted_by}</p>
                      <div className="post-wrap">
                        <figure>
                          <div className="post-img-wrapp">
                            <a href="#">
                              <img src={SITEURL+items.data.folder_path+"/" + items.data.image} />
                            </a>
                          </div>
                          <div className="post-image-mask">
                            <span />
                          </div>
                        </figure>
                        <div className="post-date">
                          <span className="post-date-day">{moment(items.data.posted_date).format("DD")}</span>
                          <span className="post-date-month">{moment(items.data.posted_date).format("MMM")}</span>
                        </div>
                      </div>
                      <div className="post-content text-start details-blog">
                        <div dangerouslySetInnerHTML={{__html: items.data.description}}/></div>
                    </div>
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

export default BlogDetails