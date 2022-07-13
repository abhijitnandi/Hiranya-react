
import React, { Component,useEffect,useState }from "react";
import moment from "moment";
// importing Link from react-router-dom to navigate to 
// different end points.
import { Link,useParams   } from "react-router-dom";
import { withRouter } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import {APIURL,SITEURL} from "./Constant";
import icon_call from "./asset/images/icon-call.svg";
import icon_whatapp from "./asset/images/icon-whatsapp.svg";
import header_logo from "./asset/images/header-logo.png";
import logo from "./asset/images/logo.png";
function Kyc() {

    const [items,setItems] = useState("");
    const [isLoaded,setIsLoaded] = useState(false);
    const [error,setError] = useState("");
    const [inputField , setInputField] = useState({
      'name':"",
      'address':"",
      'email':"",
      'contact_number':"",
      'pan_no':"",
      'gst_no':"",
      'trade_license_no':"",
      'itr':"",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        //const { body } = this.state;
        fetch(APIURL+'kyc-form-submit', {
            method: "POST",
            body: JSON.stringify(inputField),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          }).then(
          (response) => (response.json())
            ).then((response)=> {
          if (response.ack === 1) {
            alert(response.message);
            cancelCourse();
          }
        })
    };
    const cancelCourse = (e) => {
      document.getElementById("contact_frm").reset();
    };
    document.title = 'KYC';
    return (
        <div>
          <Header/>
            <section className="address-bar">
              <div className="container">
                <div className="cps">
                  <div className="col-md-12">
                    <div className="book-left-content input_form">
                      <form  id="contact_frm" method="POST" onSubmit={e => {handleSubmit(e)}} enctype="multipart/form-data">
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-12 m0 col-xs-12 rm_add_75"><span>Name<i>*</i></span>
                            <input id="name" type="text" name="name" placeholder="Enter here" className="form-control" value={inputField.name} onChange={e => setInputField({...inputField, [e.target.name]: e.target.value})} required /> 
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 m0 col-xs-12 rm_add_75"><span>Email<i>*</i></span>
                            <input id="email" type="email" name="email" placeholder="Enter here" className="form-control" value={inputField.email} onChange={e => setInputField({...inputField, [e.target.name]: e.target.value})} required />
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 m0 col-xs-12 rm_add_76"><span>Contact Number<i>*</i></span>
                            <input id="contact_number" type="tel" name="contact_number" placeholder="Enter here" className="form-control" value={inputField.contact_number} onChange={e => setInputField({...inputField, [e.target.name]: e.target.value})} required />
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 m0 col-xs-12 rm_add_75"><span>Address</span>
                            <input id="address" type="text" name="address" placeholder="Enter here" className="form-control" value={inputField.address} onChange={e => setInputField({...inputField, [e.target.name]: e.target.value})} />
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 m0 col-xs-12 rm_add_76"><span>Pan No.</span>
                            <input id="pan_no" type="text" name="pan_no" placeholder="Enter here" className="form-control" value={inputField.pan_no} onChange={e => setInputField({...inputField, [e.target.name]: e.target.value})} />
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 m0 col-xs-12 rm_add_76"><span>GST No.</span>
                            <input id="gst_no" type="text" name="gst_no" placeholder="Enter here" className="form-control" value={inputField.gst_no} onChange={e => setInputField({...inputField, [e.target.name]: e.target.value})} />
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 m0 col-xs-12 rm_add_76"><span>Trade license No.</span>
                            <input id="trade_license_no" type="text" name="trade_license_no" placeholder="Enter here" className="form-control" value={inputField.trade_license_no} onChange={e => setInputField({...inputField, [e.target.name]: e.target.value})} />
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 m0 col-xs-12 rm_add_76"><span>ITR of last 3 FY</span>
                            <input id="itr" type="file" name="itr" className="form-control" value={inputField.itr} onChange={e => setInputField({...inputField, [e.target.name]: e.target.value})} />
                          </div>
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <button type="submit" value="submit now" className="res-btn get-start">Submit</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          <Footer/>
      </div>
    )
}

export default Kyc