import './App.css';
import Header from './components/header.js';
import React, {component, useState ,useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Main from './pages/main.js';
import Products from './pages/products';
import Bookmark from './pages/bookmark';
import Footer from './components/footer';
import axios from 'axios';

function App() {
  const [bookmarked, setbookmarked] = useState([])
  const [data, setdata] = useState([])
  useEffect(() => {
    // 컴포넌트 생성 시 아래 함수가 실행됩니다.
    axios.get('http://cozshopping.codestates-seb.link/api/v1/products')
    .then((res)=> {
      setdata(res.data);
    })
    .catch((err) => console.log(err))
  }, []);
  
  return (
    <Router>
      <div className="App">
          <Header />
          <Routes>
            <Route path='/' element={<Main data = {data} bookmarked={bookmarked} setbookmarked={setbookmarked}/>}/>
            <Route path='/products/List' element={<Products data = {data} bookmarked={bookmarked} setbookmarked={setbookmarked}/>} />
            <Route path='/bookmark' element={<Bookmark />} />
          </Routes>
          <Footer />
      </div>
    </Router>
  );
}

export default App;
