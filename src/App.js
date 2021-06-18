/*
- Write a React component that fetches the data from the link below 
and shows a gallery of cats in various moods.
- When the start or end is reached, the gallery should cycle to the 
opposite end.
- The left and right buttons should trigger a sliding animation to the 
next/previous image 
(example: https://raw.githubusercontent.com/farzadso/Bootstrap-Carousel/master/preview.gif)
- The preview panel at the bottom should move one image to the left or 
right when the buttons are clicked.
- The gallery can have a maximum width of 500 but should be responsive 
if the window is made smaller.
*/

import React, {useState, useEffect} from 'react'
import './App.css'

const link = 'https://gist.githubusercontent.com/manfredxu99/df3be12d855d2e8825d30784a43d4b31/raw/d5efd3062343703df33bf0ec1b0c469fb83cb9f9/cat.json';
const CHEVRON_LEFT_SRC = 'https://icons.deanishe.net/icon/material/444/arrow-back/256.png'
const CHEVRON_RIGHT_SRC = 'https://icons.deanishe.net/icon/material/444/arrow-right/256.png'

const CatGallery = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const fetchData = () => fetch(link).then(res => res.json()).then(resData => setData(resData.cats));
    fetchData();
  }, []);
  
  function chevronRight () {
    if (count === data.length - 1) {
      setCount(0)
    } else {
      setCount(count + 1)
    }
  }
  function chevronLeft () {
    if (count === 0) {
      setCount(data.length - 1)
    } else {
      setCount(count - 1)
    }
  }
  return (
    <>
      <div className='flex'>
        <div onClick={() => chevronLeft()} >
          <img className='left' alt={CHEVRON_LEFT_SRC} src={CHEVRON_LEFT_SRC} />
        </div>
        {data && <img className='image' alt={data[count]?.src} src={data[count]?.src} />}
        <div onClick={() => chevronRight()} >
          <img className='right' alt={CHEVRON_RIGHT_SRC} src={CHEVRON_RIGHT_SRC} />
        </div>
      </div>
      <div className='preview'>
        <div className='flex flex-dot'>
          {data.map((cat, index) => <div key={index} className={index === count ? 'dot' : 'current-dot'} />)}
        </div>
      </div>
    </>
  )
}

export default CatGallery