import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
// import React from 'react';


function App() {

  let post = '서울 맛집';
  let [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동 맛집', '독학중']);

  let [따봉, 따봉변경] = useState([0, 0, 0]); // 변수명은 배열이 아니어도 된다
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(0);
  let [add, setAdd] = useState('');


  return (
    <div className="App">
      <div className="black-nav">
        <h4>React Blog</h4>
      </div>

      <button style={{ width: '100px', height: '30px' }} onClick={() => {
        let copy = [...글제목];
        copy[0] = '여자 코트 추천';
        글제목변경(copy);
      }}>글수정</button>

      <button style={{ width: '100px', height: '30px' }} onClick={() => {
        let copy = [...글제목];
        copy.sort();
        글제목변경(copy);
      }}>가나다순 정렬</button>

      {
        글제목.map(function (a, i) {
          return (
            <div className="list" key={i}>
              <h4 onClick={() => {
                setModal(true);
                setTitle(title = i);
              }}>
                {a}-{title}
                <span onClick={(e) => {
                  e.stopPropagation();
                  let copy = [...따봉];
                  copy[i] = copy[i] + 1;
                  따봉변경(copy)
                }}>👍{따봉[i]}</span></h4>
              <p>2월 17일 발행</p>
              <button onClick={() => {
                let copy = [...글제목];
                copy.splice(i, 1);
                글제목변경(copy);
              }}>삭제</button>
            </div>
          )
        })
      }
      <input type="text"
        onChange={(e) => {
          if (e.target.value !== null) {
            setAdd(e.target.value);
          }
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter' && e.target.value !== '') {
            글제목변경([add, ...글제목]);
            console.log(e.target.value);
            따봉변경([0, ...따봉]);
          }
        }}
      />
      <button onClick={() => {
        if (add !== '') 글제목변경([add, ...글제목]);
        // let copy = [...글제목];
        // copy.unshift(add);
        // 글제목변경(copy);
        따봉변경([0, ...따봉]);
      }}>글발행</button>

      {
        modal === true ? <Modal color={'green'} 글제목={글제목} 글제목변경={글제목변경} title={title} /> : null
      }

    </div>
  );
}

// 모달 => 함수? 라고 생각하면 편할듯, props 기법

function Modal(props) {
  return (
    <div className='modal' style={{ background: props.color }}>
      <h4>{props.글제목[props.title]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={() => {
        let copy = [...props.글제목];
        copy[0] = '여자 코트 추천';
        props.글제목변경(copy);
      }}>글수정</button>
    </div>
  )
}



export default App;

// className, {}, style={{a : 'b'}} 
// let [a,b] = useState('')
// {/* <h4 style={{ color: 'red', fontSize: '30px' }}>블로그임</h4> */}

// useState변경 -> 변경함수(), onClick
// state가 array/ object이면 카피본을 만들어서 수정해야한다
