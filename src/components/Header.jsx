import React, { Component,useEffect,useState }from "react";
// importing Link from react-router-dom to navigate to 
// different end points.
import { Link, useNavigate } from "react-router-dom";
import header_logo from "./asset/images/header-logo.png";
import desk_call from "./asset/images/desk_call_icon.svg";
import desk_whatapp from "./asset/images/desk_whatsup_icons.svg";
import {APIURL,SITEURL} from "./Constant";

function Header() {
  const [items,setItems] = useState("");
  const [isLoaded,setIsLoaded] = useState(false);
  const [error,setError] = useState("");
  const [inputField , setInputField] = useState({
      'keyword':"",
    });
  useEffect(()=>{
      fetch(APIURL+"category")
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

  },[inputField.keyword])
  let navigate = useNavigate(); 
  const product_serach = () =>{ 
    //console.log(inputField.keyword);
    let path = `product?keyword=`+inputField.keyword; 
    navigate(path);
  }
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      //console.log(items.data.description);
    }
  return (
    <div>
    <div className="phn-header">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="contactinfo">
                <a href="telto:033 22582876"><span><img src={desk_call} /></span>033 22582876</a>
                <a href="telto:91 9330915397"><span><img src={desk_whatapp} /></span>91 9330915397</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="top-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <div className="logo">
                <img src={header_logo} />
              </div>
            </div>
            {/*<div className="col-md-4">
              <div className="rela">
                <div className="search-box">
                  <input type="text" className="search-txt" name="keyword" value={inputField.keyword} onChange={e => setInputField({...inputField, [e.target.name]: e.target.value})} required placeholder="Search..." />
                  <button className="search-btn" onClick={product_serach}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx={11} cy={11} r={8} /><line x1={21} y1={21} x2="16.65" y2="16.65" /></svg>
                  </button>
                </div>
              </div>
            </div>*/}
          </div>
        </div>
      </section>
      <section className="bottom-header">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link to="/" className="nav-link">Home</Link> 
              </li>
                {
                  items.ack === 1 ? (
                    items.data.map((item) => (
                        <li className="nav-item dropdown" key={item.id}>
                          <a className="nav-link dropdown-toggle " href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {item.name}
                          </a>
                          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <div className="vertical-menu">
                              <ul>
                                {item.sub_category.map((sub_item) => (
                                    <li key={sub_item.id}>
                                      <Link to={`/product?category=${item.slug}&sub_category=${sub_item.slug}`} className="cate-link"><span><img src={SITEURL+sub_item.folder_path+"/" + sub_item.image} /></span> {sub_item.name}</Link>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        </li>
                      )
                    )
                  ) : (
                    <div> No Data Found</div>
                  )
                }
              
              <li className="nav-item ">
                <Link to="/blog" className="nav-link">Blogs</Link>
              </li>
              <li className="nav-item ">
                <Link to="/contact-us" className="nav-link">Contact Us</Link>
              </li>
              <li>
                <Link to="/kyc" className="dedcription-btn" href="#">
                  <span className="name-descripeion"><i className="fas fa-file-alt" /> Kyc</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </section>
    </div>
    )
}
export default Header