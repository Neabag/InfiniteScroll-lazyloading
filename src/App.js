import React, { Component } from 'react';
import axios from 'axios';
import InfiniteScroll from "react-infinite-scroll-component";

import './App.css';
import Post from './components/post/post';

const style = {
  width: "300px",
  height: "200px",
  overflow: "auto",
  float: "left",
  // display: "inline-block",

  /* Optional, only to check that it works with margin/padding */
  margin: "30px",
  padding: "20px",
  border: "10px solid black"
};


export default class App extends Component {
  state = {
    items: [],
    curPage: 1,
    itemArr: [],
    curPageItem: 1
  }
  componentDidMount = () => {
    console.log("component mounted", this.state.items);
    axios.get("https://jsonplaceholder.typicode.com/photos?_page=1&_limit=10").then(res => {
      console.log(res.data);
      this.setState({ items: res.data, curPage: this.state.curPage + 1, itemArr: res.data, curPageItem: this.state.curPageItem + 1 });
      console.log(this.state);
    })
  }
  fetchMoreData = () => {
    let curPage = this.state.curPage;
    axios.get(`https://jsonplaceholder.typicode.com/photos?_page=${curPage}&_limit=10`).then(res => {
      console.log(res.data);
      this.setState({ items: this.state.items.concat(res.data), curPage: this.state.curPage + 1 });
      // console.log(this.state);
    })
  };
  fetchMoreItems = (e) => {
    console.log(e.target.scrollTop, e.target, e.target.clientHeight, e.target.scrollHeight);
    if ((e.target.scrollTop + e.target.clientHeight) >= e.target.scrollHeight) {
      let curPage = this.state.curPageItem;
      axios.get(`https://jsonplaceholder.typicode.com/photos?_page=${curPage}&_limit=10`).then(res => {
        console.log(res.data);
        this.setState({ itemArr: this.state.itemArr.concat(res.data), curPageItem: this.state.curPageItem + 1 });
      })
    }
  };
  render() {
    // {this.state.items.length>0?
    // this.state.items.map(i,index){

    // }}
    return (
      <div>
        <h1>demo: react-infinite-scroll-component</h1>
        <hr />
        {this.state.items.length > 0 ? (
          <div style={style} id="scrollable">
            <InfiniteScroll
              dataLength={this.state.items.length}
              next={this.fetchMoreData}
              hasMore={true}
              scrollableTarget="scrollable"
              loader={<h4>Loading...</h4>
              }
            >
              {this.state.items.map((i, index) => (
                <Post key={index}
                  name={i.title}
                  url={i.url} />
              ))}
            </InfiniteScroll>
          </div>
        ) : (
            ""
          )}
        <div onScroll={(e) => this.fetchMoreItems(e)} style={style} >
          {this.state.itemArr.map((i, index) => (
            <Post key={index}
              name={i.title}
              url={i.url} />
          ))}
        </div>
      </div>
    );
  }
}

