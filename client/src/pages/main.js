import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import { React, useState } from 'react';
import './main.css';
import filledstar from '../img/filled_star.png'
import emptystar from '../img/empty_star.png'

export default function Main({data, bookmarked, setbookmarked }){
  let data_refined = data.filter((ele) => ele.image_url!==null && ele.type === 'Product' ).slice(0,4);
  let bookmarkdata_refined = data.filter((ele) => bookmarked.includes(ele.id)).slice(0,4);
  const [modal, setModal] = useState([])
  const [bookMarkModal, setBookMarkModal] = useState('none')

  function openModal(ele){
    return setModal(ele)
  }
  function bookmarkadd(id){
    let tmp = bookmarked.slice()
    tmp.push(id)
    if(bookMarkModal === 'add'){
      setBookMarkModal('add2')
    }else{
      setBookMarkModal('add');
    }
    return setbookmarked(tmp)
  }

  function bookmarkdel(id){
    if(bookMarkModal === 'delete'){
      setBookMarkModal('delete2')
    }else{
      setBookMarkModal('delete');
    }
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
            <img className='main_images' src={ele.image_url} alt={ele.title} onClick={()=>openModal(ele)}></img>
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
          <div key={ele.id} className='main_content' >
            {ele.type === 'Brand'?<img className='main_images' src={ele.brand_image_url} alt={ele.title} onClick={()=>openModal(ele)}></img>:<img className='main_images' src={ele.image_url} alt={ele.title} onClick={()=>openModal(ele)}></img>}
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
      {console.log(modal)}
      <div className={modal.length === 0 ? "display_none" : "modal"} >
        <div>
          <img src={modal.image_url === null ? modal.brand_image_url : modal.image_url} className={modal.length === 0 ? "display_none" : 'modal_img'}></img>
          <div className={modal.length === 0 ? "display_none" : 'modal_X'} onClick={()=>setModal([])}>X</div>
          <p className={modal.length === 0 ? "display_none" : 'modal_title'}>{modal.title === null ? modal.brand_name : modal.title}</p>
        </div>
        {(bookmarked.includes(modal.id)) ?
        <img className={`${'main_star'} ${modal.length === 0 ? "display_none" : 'modal_star'}`} src={filledstar} onClick={()=> bookmarkdel(modal.id)}></img> : <img className={`${'main_star'} ${modal.length === 0 ? "display_none" : 'modal_star'}`} src={emptystar} onClick={()=> bookmarkadd(modal.id)}></img>}
      </div>
      <div className='bookmarkmodal'>
        <p className={bookMarkModal === 'add' ? 'bookmarkmodal_1': bookMarkModal === 'add2' ? 'bookmarkmodal_2' : "display_none"}><img className='bookmarkModalStar' src={filledstar}></img>상품이 북마크에 추가되었습니다.</p>
        <p className={bookMarkModal === 'delete' ? 'bookmarkmodal_1':bookMarkModal === 'delete2'?'bookmarkmodal_2':"display_none"}><img className='bookmarkModalStar' src={emptystar}></img>상품이 북마크에 제거되었습니다.</p>
      </div>
    </div>
  )
}