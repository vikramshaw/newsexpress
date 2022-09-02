import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {

  constructor() {
    super();
    console.log("I'm a constructor");
    this.state= {
      articles: [],
      loading: false
    }
  }
  //This will run after render() has been returned
  async componentDidMount(){
    console.log("cdm");
    let url = "https://newsapi.org/v2/top-headlines?country=in&apikey=9830904d976041d0989bf715702fc86e";
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({ articles: parsedData.articles })
}

  render() {
    return (
      <div className="container my-3">
        <h1>NewsExpress - Top Headlines</h1>
        <div className="row mx-6">
          {this.state.articles.map ((element)=> {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""}  urlToImage={element.urlToImage} newsUrl={element.url}/>
            </div>
            })}
        </div>
      </div>
    );
  }
}

export default News;
