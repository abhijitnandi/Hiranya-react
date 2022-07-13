import React, { Component }from "react";
import moment from "moment";
// importing Link from react-router-dom to navigate to 
// different end points.
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import {APIURL,SITEURL} from "./Constant";
  
export default class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    };
  }
  componentDidMount() {
    fetch(APIURL+"blog")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error: error
          });
        }
      );
  }
  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      document.title = 'Blog';
      //console.log(this.state.items.data);
      return (
        <div>
          <Header/>
            <section className="inner-banner">
              <div className="container">
                <h2 className="inner_title">Jewellery Blog</h2>
              </div>
            </section>
            <section className="blog-sec">
              <div className="container">
                <h3 className="black-heading  wow fadeInUp " data-wow-delay="0.7s">JEWELRY DESIGN BLOG</h3>
                <div className="row">
                {
                  items.ack === 1 ? (
                    items.data.map((item) => (
                      <div className="col-md-9 col-12 mx-auto mb-4" key={item.id}>
                        <div className="post-wrap">
                          <figure>
                            <div className="post-img-wrapp">
                              <a href="#">
                                <img src={SITEURL+item.folder_path+"/" + item.image} />
                              </a>
                            </div>
                            <div className="post-image-mask">
                              <span />
                            </div>
                          </figure>
                          <div className="post-date">
                            <span className="post-date-day">{moment(item.posted_date).format("DD")}</span>
                            <span className="post-date-month">{moment(item.posted_date).format("MMM")}</span>
                          </div>
                        </div>
                        <div className="post-content">
                          <div className="meta-categories-wrapp">
                            <div className="wd-post-cat">
                              <p>Jewellery</p>
                            </div>
                          </div>
                          <h3 className="wd-entities-title title post-title">
                            <a href="#" rel="bookmark">{item.name}</a>
                          </h3>
                          <p className="meta-author">Posted by {item.posted_by}</p>
                          <p>{item.short_description}</p>
                          <h5 className="read-more-section">
                            <Link to={`/blog-details/${item.slug}`}>Continue reading</Link></h5>
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
      );
    }
  }
};