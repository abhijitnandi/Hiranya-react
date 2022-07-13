import React, { Component }from "react";
import moment from "moment";
// importing Link from react-router-dom to navigate to 
// different end points.
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import {APIURL,SITEURL} from "./Constant";
import wedding from "./asset/images/wedding.jpg";
import lightweight from "./asset/images/lightweight.jpg";
import fashion from "./asset/images/fashion.jpg";
import icon1 from "./asset/images/icon-1.png";
import icon2 from "./asset/images/icon-2.png";
import icon3 from "./asset/images/icon-3.png";
import making from "./asset/images/making.jpg";
import spk_img from "./asset/images/spk-img.jpg";
import product_1 from "./asset/images/product-1.jpg";
import product_2 from "./asset/images/product-2.jpg";
import product_3 from "./asset/images/product-3.jpg";
import product_4 from "./asset/images/product-4.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


import Slider from "react-slick";
  
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    };
  }
  componentDidMount() {
    fetch(APIURL+"home-page")
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
      var settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
      document.title = 'Home';
      //console.log(this.state.items.data[0].site_setting);
      return (
        <div>
        <Header/>
          <section className="banner">
            <Slider {...settings}>
              {
                items.data[0].banner.map((banner) => (
                  <div key={banner.id}>
                    <img height="100%" src={SITEURL+banner.folder_path+"/" + banner.image} />
                  </div>
                )
                )
              }
            </Slider>
          </section>
          <div className="speaker-sec">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div className="about-img-one wow fadeInLeft " data-wow-delay="0.3s">
                    <img src={SITEURL+this.state.items.data[0].site_setting.folder_path+"/" + this.state.items.data[0].site_setting.about_us_image} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="about-content wow fadeInUp " data-wow-delay="0.5s">
                    <h4 className="brown-heading">About Us</h4>
                    <h3 className="about-heading">Hiranya <br /><span>Jewel</span></h3>
                    <div><div dangerouslySetInnerHTML={{__html: this.state.items.data[0].site_setting.about_us_description}}/></div>
                    <Link to="/about-us" className="blck-btn">Read more</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section className="hotel-ser-pan">
            <div>
              <div dangerouslySetInnerHTML={{__html: this.state.items.data[0].site_setting.jewelry_content}}/></div>
          </section>
          <section className="promise-sec">
            <div className="container">
              <h4 className="brown-heading  wow fadeInUp " data-wow-delay="0.5s">Our Promise</h4>
              <h3 className="black-heading  wow fadeInUp " data-wow-delay="0.7s">Hiranya Pledges</h3>
              <div dangerouslySetInnerHTML={{__html: this.state.items.data[0].site_setting.our_promise}}/></div>
          </section>
          <section className="making-sec">
            <div class="row">
              <div dangerouslySetInnerHTML={{__html: this.state.items.data[0].site_setting.youtube_video}}/>
            </div>
          </section>
          <section className="speaker-sec">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-6">
                  <div className="spk-content wow fadeInLeft " data-wow-delay="0.3s">
                    <div>
                      <div dangerouslySetInnerHTML={{__html: this.state.items.data[0].site_setting.our_partners}}/></div>
                    </div>
                </div>
                <div className="col-md-6">
                  <div className="speaker-img wow fadeInRight " data-wow-delay="0.5s">
                    <img src={spk_img} />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="product-sec">
            <div className="container">
              <h4 className="brown-heading wow fadeInUp " data-wow-delay="0.5s">Our Product</h4>
              <h3 className="black-heading wow fadeInUp " data-wow-delay="0.7s">Fresh Collections</h3>
              <div className="row">
                {
                  items.data[0].fresh_product.map((fresh_product) => (
                    <div className="col-md-3" key={fresh_product.id}>
                      <div className="product-box wow fadeInUp " data-wow-delay="0.3s">
                        <div className="item uncover">
                          <Link to={`/product-details/${fresh_product.product_slug}`}>
                            <img src={SITEURL+fresh_product.folder_name+"/" + fresh_product.image} alt="" />
                          </Link>
                          <div className="overlay">
                            <span>{fresh_product.category_name}</span>
                            <span>{fresh_product.sub_category_name}</span>
                            <span />
                            <span />
                          </div>
                          <div className="item-content">
                            <h3>{fresh_product.category_name}</h3>
                            <p>{fresh_product.sub_category_name}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    ))
                }
              </div>
              <Link to="/fresh-collection" className="blck-btn">view more</Link>
            </div>
          </section>
          <section className="blog-sec">
            <div className="container">
              <h4 className="brown-heading  wow fadeInUp " data-wow-delay="0.5s">Our Blog</h4>
              <h3 className="black-heading  wow fadeInUp " data-wow-delay="0.7s">JEWELRY DESIGN BLOG</h3>
              <p>There are many variations of passages of lorem ipsum available.</p>
              <div className="row">
              { 
                items.data[0].blog.map((blog) => (
                  <div className="col-md-4" key={blog.id}>
                    <div className="post-wrap">
                      <figure>
                        <div className="post-img-wrapp">
                          <a href="#">
                            <img src={SITEURL+blog.folder_path+"/" + blog.image} />
                          </a>
                        </div>
                        <div className="post-image-mask">
                          <span />
                        </div>
                      </figure>
                      <div className="post-date">
                        <span className="post-date-day">{moment(blog.posted_date).format("DD")}</span>
                        <span className="post-date-month">{moment(blog.posted_date).format("MMM")}</span>
                      </div>
                    </div>
                    <div className="post-content">
                      <div className="meta-categories-wrapp">
                        <div className="wd-post-cat">
                          <p>Wooden accessories</p>
                        </div>
                      </div>
                      <h3 className="wd-entities-title title post-title">
                        <a href="#" rel="bookmark">{blog.name}</a>
                      </h3>
                      <p>{blog.short_description}</p>
                      <h5 className="read-more-section">
                        <Link to={`/blog-details/${blog.slug}`} className="btn-read-more more-link">Continue reading</Link></h5>
                    </div>
                  </div>
                )
                )
              }
              </div>
              <Link to="/blog" className="blck-btn">View more</Link>
            </div>
          </section>
          <Footer/>
        </div>
      );
    }
  }
};