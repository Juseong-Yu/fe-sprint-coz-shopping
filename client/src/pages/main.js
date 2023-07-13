import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import { React, useState } from 'react';
import './main.css';
import filledstar from '../img/filled_star.png'
import emptystar from '../img/empty_star.png'

export default function Main({data, bookmarked, setbookmarked}){
  let data_refined = data.filter((ele) => ele.image_url!==null && ele.type === 'Product' ).slice(0,4);
  let bookmarkdata_refined = data.filter((ele) => bookmarked.includes(ele.id)).slice(0,4);
  console.log(data_refined)
  {console.log(bookmarked)}

  function bookmarkadd(id){
    let tmp = bookmarked.slice()
    tmp.push(id)
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
    <div className='main_container'>
      <h2>상품 리스트</h2>
      <section className='main_product_list'>
        {data_refined.map((ele) => {
          return (
          <div key={ele.id} className='main_content'>
            <img className='main_images' src={ele.image_url} alt={ele.title}></img>
            {(bookmarked.includes(ele.id)) ? 
            <img className='main_star' src={filledstar} onClick={()=> bookmarkdel(ele.id)}></img> : <img className="main_star" src={emptystar} onClick={()=> bookmarkadd(ele.id)}></img>}
            <div className='main_title'>
              <span className='main_name'>{ele.title}</span>
              <span>{ele.discountPercentage}%</span>
            </div>
            <span className='main_price'>{ele.price}원</span>
          </div>
          )
        })}
      </section>
      <h2>북마크 리스트</h2>
      <section className='main_product_list'>
        {bookmarkdata_refined.map((ele) => {
          return (
          <div key={ele.id} className='main_content'>
            {ele.type === 'Brand'?<img className='main_images' src={ele.brand_image_url} alt={ele.title}></img>:<img className='main_images' src={ele.image_url} alt={ele.title}></img>}
            {(bookmarked.includes(ele.id)) ? 
            <img className='main_star' src={filledstar} onClick={()=> bookmarkdel(ele.id)}></img> : <img className="main_star" src={emptystar} onClick={()=> bookmarkadd(ele.id)}></img>}
            <div className='product_title'>
              {ele.type === 'Brand'?<span className='main_name'>{ele.brand_name}</span>:<></>}
              {ele.type === 'Category'?<span className='main_name'>#{ele.title}</span>:<></>}
              {(ele.type === 'Product' || ele.type === 'Exhibition') ?<span className='main_name'>{ele.title}</span>:<></>}
              {ele.type === 'Product' ?<span className='discountPercentage'>{ele.discountPercentage}%</span> : <></>}
              {ele.type === 'Category' ?<span></span> : <></>}
              {ele.type === 'Exhibition' ?<span></span> :<></> }
              {ele.type === 'Brand' ?<span>관심 고객수</span> : <></> }
            </div>
            {ele.type === 'Product' ?<span className='main_price'>{ele.price}원</span>: <></>}
            {ele.type === 'Category' ?<span> </span>: <></>}
            {ele.type === 'Exhibition' ?<span className='main_sub_title'>{ele.sub_title}</span>: <></>}
            {ele.type === 'Brand' ?<span className='main_follower'>{ele.follower}</span>: <></>}
          </div>
          )
        })}
      </section>
    </div>
  )
}