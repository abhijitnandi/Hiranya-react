
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
import ImageGallery from 'react-image-gallery';
import '../../node_modules/react-image-gallery/styles/css/image-gallery.css';
function ProductDetails() {

    const [items,setItems] = useState("");
    const [isLoaded,setIsLoaded] = useState(false);
    const [error,setError] = useState("");
    const [inputField , setInputField] = useState({
      'name':"",
      'address':"",
      'email':"",
      'contact_number':"",
      'whatapp_number':"",
      'country':"",
      'zip':"",
      'state':"",
      'state':"",
      'message':"",
      'product_id':"",
    });
    const { slug } = useParams();
    useEffect(()=>{
        fetch(APIURL+"product-details/"+slug)
          .then(res => res.json())
          .then(
            result => {
              setItems(result);
              //console.log(items.data.product_id);
              setInputField({
                'product_id':result.data.product_id
              })
              setIsLoaded(true);
            },
            error => {
              setError(error);
              setIsLoaded(true);
            }
          );

    },[])
    const handleSubmit = (e) => {
        e.preventDefault();
        //const { body } = this.state;
        fetch(APIURL+'product-details-enquiry', {
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

    // const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      //console.log(items.data.description);
      document.title = items.data.name;
    }
    return (
        <div>
          <Header/>
            <div className="prdct-detail">
              <div className="container">
                <div className="product product-details clearfix">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="carosel-box">
                          <div id="product-main-view">
                          <ImageGallery items={items.data.image} />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="product-body">
                        <h2 className="product-name">{items.data.name}</h2>
                        <div className="product-code">
                          <div className="detail-page-procode">Product Code : 
                            <strong>{items.data.product_code}</strong>
                          </div>
                        </div>
                          <div dangerouslySetInnerHTML={{__html: items.data.description}}/>    
                        <div className="metal-breakup">
                          <h4 className="price_breakup_title">Weight Breakup</h4>
                          <ul>
                            {
                              items.data.gold_weight  ? (
                                <li className="pb_metalprice">
                                  <div className="breakup_content"><span>Gold Wt.</span><span>{items.data.gold_weight}</span></div>
                                </li>
                                ): (
                                  <li className="pb_metalprice"></li>
                                )
                            }
                            {
                              items.data.dimond_weight  ? (
                                <li className="pb_metalprice">
                                  <div className="breakup_content"><span>Diamond (Net Wt.)</span><span>{items.data.dimond_weight}</span></div>
                                </li>
                                ): (
                                  <li className="pb_metalprice"></li>
                                )
                            }
                            {
                              items.data.net_weight != "" ? (
                                <li className="pb_metalprice">
                                  <div className="breakup_content"><span>Net Weight Range</span><span>{items.data.net_weight}</span></div>
                                </li>
                                ): (
                                  <li className="pb_metalprice"></li>
                                )
                            }
                          </ul>
                        </div>
                        <div className="product-btns">
                          <div className="buy-button">
                            {/* Button trigger modal */}
                            <button type="button" className="cart-btns" data-bs-toggle="modal" data-bs-target="#exampleModal">Product Enquiry</button>
                          </div>
                        </div>
                        <div className="contact-box-container">
                          <p className="contact-text">Any Questions ? Please contact us at</p>
                          <div className="contact-box-text">
                            <a href="telto:033 22582876"><span><img src={icon_call} /></span>033 22582876</a>
                            <a href="telto: +91 9330915397"><span><img src={icon_whatapp} /></span>+91 9330915397</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          <Footer/>
          <div className="cntnt modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                <div className="modal-header">
                  <div className="logo text-center">
                    <a href="#"><img src={logo} /></a>
                  </div>
                </div>
                <form className="mdal-frm"  id="contact_frm" method="POST" onSubmit={e => {handleSubmit(e)}}>
                  <input type="hidden" className="form-control" name="product_id" value={items.data.product_id} />
                  <div className="modal-body">
                    <h4>Send your enquiry for quote</h4>
                    <div className="form-group row">
                      <div className="col-md-12">
                        <label htmlFor="product">Product Name</label>
                        <input type="text" className="form-control" name="product_name" value={items.data.name} readOnly/>
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-md-12">
                        <label htmlFor="product">Customer Name <sup>*</sup></label>
                        <input type="text" className="form-control" name="name" placeholder="Customer Name" value={inputField.name} onChange={e => setInputField({...inputField, [e.target.name]: e.target.value})} required />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-md-12">
                        <label htmlFor="add">Address</label>
                        <input type="text" className="form-control" name="address" placeholder="Full Address" value={inputField.address} onChange={e => setInputField({...inputField, [e.target.name]: e.target.value})} required />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-md-12">
                        <label htmlFor="email1">Email address <sup>*</sup></label>
                        <input type="email" className="form-control" name="email" placeholder="Enter email" value={inputField.email} onChange={e => setInputField({...inputField, [e.target.name]: e.target.value})} required/>
                        <small id="emailHelp" className="form-text text-muted">Your information is safe with us.</small>
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-md-12">
                        <label htmlFor="password1">Contact No.<sup>*</sup></label>
                        <input type="number" name="contact_number" className="form-control" placeholder="Contact No." value={inputField.contact_number} onChange={e => setInputField({...inputField, [e.target.name]: e.target.value})} required/>
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-md-12">
                        <label htmlFor="password1">Whatsapp No. <sup>*</sup></label>
                        <input type="number" name="whatapp_number" className="form-control" placeholder="Whatsapp No." value={inputField.whatapp_number} onChange={e => setInputField({...inputField, [e.target.name]: e.target.value})} />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-md-6">
                        <label htmlFor="password1">Country</label>
                        <input type="text" name="country" className="form-control" placeholder="Country" value={inputField.country} onChange={e => setInputField({...inputField, [e.target.name]: e.target.value})} required/>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="usr">Zip:</label>
                        <input type="text" className="form-control" name="zip" value={inputField.zip} onChange={e => setInputField({...inputField, [e.target.name]: e.target.value})} required />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-md-6">
                        <label htmlFor="password1">State</label>
                        <input type="text" className="form-control" name="state" value={inputField.state} onChange={e => setInputField({...inputField, [e.target.name]: e.target.value})} required />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="usr">Town / City:</label>
                        <input type="text" className="form-control" name="city" value={inputField.city} onChange={e => setInputField({...inputField, [e.target.name]: e.target.value})} required />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-md-12">
                        <label htmlFor="password1">Message</label>
                        <textarea className="form-control" name="message" palceholder="write somthing..." rows={3} value={inputField.message} onChange={e => setInputField({...inputField, [e.target.name]: e.target.value})} required />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer border-top-0 d-flex justify-content-center">
                    <button type="submit" className="cart-bttnss">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
      </div>
    )
}

export default ProductDetails