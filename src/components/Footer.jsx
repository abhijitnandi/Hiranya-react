import React, { Component }from "react";
// importing Link from react-router-dom to navigate to 
// different end points.
import { Link } from "react-router-dom";
import header_logo from "./asset/images/header-logo.png";
import facebook from "./asset/images/facebook.png";
import instagram from "./asset/images/instagram.png";
import whatapp from "./asset/images/4485687.png";
export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: "",
      isLoaded: false,
    };
  }
  componentDidMount() {
    fetch("https://devforall.website/dev/hiranya/api/site-setting")
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
      //console.log(this.state.items.ack);
    return (
    <section className="footer-sec add-new">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="footer-logo">
                <Link to="/">
                  <img src={header_logo} />
                </Link>
              </div>
            </div>
            <div className="col-md-3">
              <div className="footer-nav">
                <h3>Information</h3>
                <ul className="ct-contact">
                  <li><Link to="/our-team">Our Team</Link></li>
                  <li><Link to="/our-customer">Our Esteemed Customers</Link></li>
                  <li><Link to="/our-policies">Our Policies</Link></li>
                  <li><Link to="/e-brochure">E Catalog</Link></li>
                  <li><Link to="/kyc">KYC</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-md-5">
              <div className="footer-nav">
                <h3>Customer Service</h3>
                <ul className="ct-contact">
                  <li><p>{this.state.items.data.phone_number}</p></li>
                  <li><p>{this.state.items.data.email}</p></li>
                  <li><p style={{textTransform: 'uppercase'}}>HIRANYA INDIA JEWEL PVT LTD</p></li>
                  <li><p>{this.state.items.data.address}</p>
                  </li> 
                </ul>
              </div>
              <div className="social-cntct">
                <ul>
                  <li><span><a href={this.state.items.data.facebook_url} target="_blank"><img src={facebook} /></a></span></li>
                  <li><span><a href={this.state.items.data.instagram_url} target="_blank"><img src={instagram} /></a></span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright_panel  pb20 pt20">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <p className="no_margin">©  2022 Hiranya India Jewel Pvt Ltd All Rights Reserved </p>
              </div>
              <div className="col-md-6 falr">
                <p>Designed By: <a href="https://www.xigmapro.com/" target="_blank">Xigmapro Software </a></p>
              </div>
            </div>
          </div>
        </div>
        <div className="phone-call">
          <a target="_blank" href="https://api.whatsapp.com/send?phone=9330915397">
            <img src={whatapp} width={50} alt="Call Now" title="Call Now" />
          </a>
        </div>
      </section>
    );
  }
}
};