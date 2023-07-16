import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import { React, useState } from 'react';
import './bookmark.css';
import filledstar from '../img/filled_star.png'
import emptystar from '../img/empty_star.png'

export default function BookMark({data, bookmarked, setbookmarked}){
  let data_refined = data.filter((ele) => ele.image_url !== null || ele.brand_image_url !== null);
  let bookmarkdata_refined = data_refined.filter((ele) => bookmarked.includes(ele.id));
  let category_all = data_refined[1];
  let category_product = data_refined.filter((ele)=>ele.type === 'Product')[0];
  let category_category = data_refined.filter((ele)=>ele.type === 'Category')[0];
  let category_exhibition = data_refined.filter((ele)=>ele.type === 'Exhibition')[0];
  let category_brand = data.filter((ele)=>ele.type === 'Brand' && ele.brand_image_url !== null)[0];
  const [modal, setModal] = useState([])
  const [category, setcategory] = useState('All');
  function openModal(ele){
    return setModal(ele)
  }
  function bookmarkadd(id){
    let tmp = bookmarked.slice()
    tmp.push(id)
    {console.log(bookmarked)}
    return setbookmarked(tmp)
  }

  function bookmarkdel(id){
    
    let tmp = bookmarked.filter((ele) => {
      return !(ele === id)
    }
      )
    return setbookmarked(tmp)
  }

  return (
    <main>
      <section className='category_container' >
        <div className='category_li_container' onClick={()=>setcategory('All')}>
          <img className='category_img' src={category_all === undefined ? {}: (category_all.image_url === null) ? category_all.brand_image_url:category_all.image_url} alt="전체"></img>
          <span>전체</span>
        </div>
        <div className='category_li_container' onClick={()=>setcategory('Product')}>
          <img className='category_img' src={category_product === undefined ? {}: category_product.image_url} alt="상품"></img>
          <span>상품</span>
        </div >
        <div className='category_li_container' onClick={()=>setcategory('Category')}>
          <img className='category_img' src={category_category === undefined ? {}: category_category.image_url} alt="카테고리"></img>
          <span>카테고리</span>
        </div>
        <div className='category_li_container' onClick={()=>setcategory('Exhibition')}>
          <img className='category_img' src={category_exhibition === undefined ? {}: category_exhibition.image_url} alt="기획전"></img>
          <span>기획전</span>
        </div>
        <div className='category_li_container' onClick={()=>setcategory('Brand')}>
          <img className='category_img' src={category_brand === undefined ? {}: category_brand.brand_image_url} alt="브랜드"></img>
          <span>브랜드</span>
        </div>
      </section>
      <section className='product_lists'>
      {data_refined.filter((ele)=>{
        if(category === 'All'){
          return true
        }else{
          return(ele.type === category)
        }
       
      }).filter((ele)=>{
        if(bookmarked.includes(ele.id)){
          return true
        }
      })
      .map((ele)=>{
        return (
          <div key={ele.id} className='product_content'>
            {ele.type === 'Brand' ? <img className='product_images' src={ele.brand_image_url} alt={ele.title} onClick={()=>openModal(ele)}></img>:<img className='product_images' src={ele.image_url} alt={ele.title} onClick={()=>openModal(ele)}></img>}
            {(bookmarked.includes(ele.id)) ? 
            <img className='product_star' src={filledstar} onClick={()=> bookmarkdel(ele.id)} ></img> : <img className="product_star" src={emptystar} onClick={()=> bookmarkadd(ele.id)}></img>}
            <div className='product_title'>
              {ele.type === 'Brand'?<span className='product_name'>{ele.brand_name}</span>:<></>}
              {ele.type === 'Category'?<span className='product_name'>#{ele.title}</span>:<></>}
              {(ele.type === 'Product' || ele.type === 'Exhibition') ?<span className='product_name'>{ele.title}</span>:<></>}
              {ele.type === 'Product' ?<span className='discountPercentage'>{ele.discountPercentage}%</span> : <></>}
              {ele.type === 'Category' ?<span></span> : <></>}
              {ele.type === 'Exhibition' ?<span></span> :<></> }
              {ele.type === 'Brand' ?<span>관심 고객수</span> : <></> }
            </div>
            {ele.type === 'Product' ?<span className='product_price'>{ele.price}원</span>: <></>}
            {ele.type === 'Category' ?<span> </span>: <></>}
            {ele.type === 'Exhibition' ?<span className='product_sub_title'>{ele.sub_title}</span>: <></>}
            {ele.type === 'Brand' ?<span className='product_follower'>{ele.follower}</span>: <></>}
          </div>
        )
      })}
      </section>
      <div className={modal.length === 0 ? "display_none" : "modal"} >
        <div>
        <img src={modal.image_url === null ? modal.brand_image_url : modal.image_url} className={modal.length === 0 ? "display_none" : 'modal_img'}></img>
          <div className={modal.length === 0 ? "display_none" : 'modal_X'} onClick={()=>setModal([])}>X</div>
          <p className={modal.length === 0 ? "display_none" : 'modal_title'}>{modal.title === null ? modal.brand_name : modal.title}</p>
        </div>
        {(bookmarked.includes(modal.id)) ?
        <img className={`${'main_star'} ${modal.length === 0 ? "display_none" : 'modal_star'}`} src={filledstar} onClick={()=> bookmarkdel(modal.id)}></img> : <img className={`${'main_star'} ${modal.length === 0 ? "display_none" : 'modal_star'}`} src={emptystar} onClick={()=> bookmarkadd(modal.id)}></img>}
      </div>
    </main>
  )
}