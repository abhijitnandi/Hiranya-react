import React, { Component, useEffect, useState }from "react";
import { Link,useParams,useLocation,useNavigate,useSearchParams  } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import {APIURL,SITEURL} from "./Constant";

function ProductList() {

  const location  = useLocation();
  const [items,setItems] = useState([]);
  const [isLoaded,setIsLoaded] = useState(false);
  const [error,setError] = useState("");
  const [inputField , setInputField] = useState({
      'material':"",
      'purity':"",
      'gender':"",
      'net_weight':"",
    });

  const [searchParams] = useSearchParams();
  //console.log(searchParams.get('category'));
  //setInputField.category()
  useEffect(()=>{
    fetch(APIURL+"product?"+location.search.slice(1))
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

      //////////

      /////////

  },[location.search.slice(1)])
  let navigate_path = useNavigate();
      const product_filter = () =>{ 
        let new_path;
        if(searchParams.get('category')){
          new_path = `?category=`+searchParams.get('category')+`&sub_category=`+searchParams.get('sub_category')+`&material=`+inputField.material+`&purity=`+inputField.purity+`&gender=`+inputField.gender+`&net_weight=`+inputField.net_weight; 
        }
        else{
           new_path = `?keyword=`+searchParams.get('keyword')+`&material=`+inputField.material+`&purity=`+inputField.purity+`&gender=`+inputField.gender+`&net_weight=`+inputField.net_weight; 
        }
        navigate_path(new_path);
      }
    
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      document.title = 'Product';
      console.log(items);
    }  return (
    <div>
          <Header />
            <section className="inner-banner">
              <img src={SITEURL+items.sub_category.banner_folder_path+"/" + items.sub_category.banner_image} alt="" />
              <div className="rngtitl2">
                <div className="container">
                  <h2 className="inner_title headerCap">Product Search</h2>
                </div>
              </div>
            </section>
            <div className="filter-area">
              <div className="container">
                <div className="top-filter-blocks">
                  <div className="lstdrpp">
                    <label>Metal</label>
                    <select className="dropbtn" name="material" value={inputField.material} onChange={e => setInputField({...inputField, [e.target.name]: e.target.value})}>
                      <option value="">All</option>
                      {
                        items.material.map((mate) => (
                            <option key={mate.id} value={mate.slug} selected={searchParams.get('material') == mate.slug}>{mate.name}</option>
                          ))
                      }
                    </select>
                  </div>
                  <div className="lstdrpp">
                    <label>Purity</label>
                    <select className="dropbtn" name="purity" value={inputField.purity} onChange={e => setInputField({...inputField, [e.target.name]: e.target.value})}>
                      <option value="">All</option>
                      {
                        items.purity.map((pur) => (
                            <option key={pur.id} value={pur.slug}>{pur.name}</option>
                          ))
                      }
                    </select>
                  </div>
                  <div className="lstdrpp">
                    <label>Net Weight Range</label>
                    <select className="dropbtn" name="net_weight" value={inputField.net_weight} onChange={e => setInputField({...inputField, [e.target.name]: e.target.value})}>
                      <option value="">All</option>
                      {
                        items.net_weight.map((net_w) => (
                            <option key={net_w.id} value={net_w.slug}>{net_w.name}</option>
                          ))
                      }
                    </select>
                  </div>
                  <div className="lstdrpp">
                    <label>Gender</label>
                    <select className="dropbtn" name="gender" value={inputField.gender} onChange={e => setInputField({...inputField, [e.target.name]: e.target.value})}>
                      <option value="">All</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="kids">Kids</option>
                      <option value="unisex">Unisex</option>
                    </select>
                  </div>
                  <a onClick={product_filter} className="filter_btn">Filter</a>
                </div>
              </div>
            </div>
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
                                <p>Gold net weight : {item.gold_weight}</p>
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

export default ProductList