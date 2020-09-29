import React from 'react';
import './App.css';
import Post from './Post';

function App() {
  return (
    <div className="app">
      
      <div className="app__header">
      <img className="app__headerImage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png" alt=""/>

      </div>
      <h1>Instagram clone with react!!!</h1>
      <Post username="Ahmed"  caption="Wow really Nice!!!" imageUrl="https://images.dailyhive.com/20170827090910/lake-louise-alberta.jpg"/>
      <Post/>
      <Post/>
      
    </div>
  );
}

export default App;
