import React, { Component }from "react";
// importing Link from react-router-dom to navigate to 
// different end points.
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import c_1 from "./asset/images/c_1.png";
import c_2 from "./asset/images/c_2.png";
import c_3 from "./asset/images/c_3.png";
import icon_call from "./asset/images/icon-call.svg";
import {APIURL,SITEURL} from "./Constant";  
export default class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: "",
      isLoaded: false,
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    };
  }
  componentDidMount() {
    fetch(APIURL+"site-setting")
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
  handleSubmit(e) {
    e.preventDefault();
    //const { body } = this.state;
    fetch(APIURL+'contact-us-form-submit', {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(
      (response) => (response.json())
        ).then((response)=> {
      if (response.ack === 1) {
        alert(response.message);
        this.cancelCourse();
      }
    })
  }
  cancelCourse = () => { 
    document.getElementById("contact_frm").reset();
  }
  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      document.title = 'Contact Us';
      return (
        <div>
        <Header/>
          <section className="address-bar">
            <div className="container">
              <div className="cps">
                <div className="row mt-6">
                  <div className="col-md-12 inner_heading">
                    <h2>Get best the Consultation</h2>
                    <h1>Contact us</h1>
                    <div className="line">
                      <hr />
                    </div>
                  </div>
                </div>
                <form method="POST" id="contact_frm" onSubmit={this.handleSubmit.bind(this)}>
                  <div className="row mt-6">
                    <div className="col-md-7">
                      <div className="contact-right">
                        <h1>GET A <span>FREE</span> CONSULTATION <br />FROM US</h1>
                        <div className="expert">
                          <img src="https://www.liberatingsolution.com.au/wp-content/themes/liberatingsolution/img/experticon.png" />
                        </div>
                        <h5>Expert Consultants</h5>
                        <p>Any quaries ? Please contact with us</p>
                        <div className="contact-box-text">
                          <a href="telto:033 22582876"><span><img src={icon_call}/></span>{this.state.items.data.phone_number}</a>
                          <a href="telto: +91 09830037239"><span><i className="far fa-envelope-open" /></span>{this.state.items.data.email}</a>
                        </div>
                      </div>
                    </div>
                  
                      <div className="col-md-5">
                        <div className="all_contact">
                          <div className="form-group row mb-3">
                            <div className="col-md-6 text-left">
                              <div className="align-self-center mm">
                                <input className="form-control" type="text" placeholder="First Name" name="first_name" onChange={e => this.setState({first_name: e.target.value})} required />
                              </div>
                            </div>
                            <div className="col-md-6 text-left">
                              <div className="align-self-center mm">
                                <input className="form-control" type="text" placeholder="Last Name" name ="last_name" onChange={e => this.setState({last_name: e.target.value})} required />
                              </div>
                            </div>
                          </div>  
                          <div className="form-group row mb-3">
                            <div className="col-md-12 text-left">
                              <div className="align-self-center mm">
                                <input className="form-control" type="email" placeholder="Email" name ="email" onChange={e => this.setState({email: e.target.value})} required />
                              </div>
                            </div>
                          </div>
                          <div className="form-group row mb-3">
                            <div className="col-md-12 text-left">
                              <div className="align-self-center mm">
                                <input className="form-control" type="text" placeholder="Phone No." name ="phone" onChange={e => this.setState({phone: e.target.value})} required />
                              </div>
                            </div>
                          </div>
                          <div className="form-group row mb-3">
                            <div className="col-md-12 text-left">
                              <div className="align-self-center mm">
                                <input className="form-control" type="text" placeholder="Subject" name ="subject" onChange={e => this.setState({subject: e.target.value})} required />
                              </div>
                            </div>
                          </div>
                          <div className="form-group row mb-3">
                            <div className="col-md-12 text-left">
                              <div className="align-self-center mm">
                                <textarea className="form-control" id="message" name="message" placeholder="Write something.." style={{width: '100%', height: '170px'}} onChange={e => this.setState({message: e.target.value})}/>
                              </div>
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="col-md-12 text-left">
                              <button type="submit" className="log_in_btn">Submit</button>
                            </div>
                          </div>  
                        </div>
                      </div>
                </div>
                </form>
              </div>
            </div>
          </section>
          <section className="contact-map mt-3">
            <iframe width="100%" height="450" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.8979598894416!2d88.34971931394671!3d22.58291943828524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277b9eb3ad7f1%3A0xbf0001f7afd69c7b!2s1%2C%20Mirbahar%20St%2C%20Sonapatti%2C%20Bara%20Bazar%2C%20Jorasanko%2C%20Kolkata%2C%20West%20Bengal%20700007!5e0!3m2!1sen!2sin!4v1649426127311!5m2!1sen!2sin" width="100%"  allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </section>
          <section className="address-bar">
            <div className="container">
              <div className="row">
                <div className="col-md-4 text-center">
                  <div className="p_8_pic">
                    <img src={c_1} alt="" />
                  </div>
                  <div className="p_8_titl">Our Office</div>
                  <div className="p_8_dec">{this.state.items.data.address}</div>
                </div>
                <div className="col-md-4  text-center">
                  <div className="p_8_pic">
                    <img src={c_2} alt="" />
                  </div>
                  <div className="p_8_titl">Drop Us a line</div>
                  <div className="p_8_dec">{this.state.items.data.email}</div>
                </div>
                <div className="col-md-4 text-center">
                  <div className="p_8_pic">
                    <img src={c_3} alt="" />
                  </div>
                  <div className="p_8_titl">call us now</div>
                  <div className="p_8_dec">{this.state.items.data.phone_number}</div>
                </div>
              </div>
            </div>
          </section>
          <Footer/>
        </div>
      );
    }
  }
};