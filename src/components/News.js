import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {

  static defaultProps = {
    country: "in",
    pageSize: 8,
  }

  static propTypes= {
    country: PropTypes.string,
    pageSize:PropTypes.number,
  }

  constructor() {
    super();
    // console.log("I'm a constructor");
    this.state= {
      articles: [],
      loading: false,
      page: 1
    }
  }

  async updateNews(){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=9830904d976041d0989bf715702fc86e&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log("cdm", parsedData);
    this.setState({ 
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
  }

  //This will run after render() has been returned
  async componentDidMount(){
    // console.log("cdm");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=9830904d976041d0989bf715702fc86e&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log("cdm", parsedData);
    // this.setState({ 
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false
    // })
    this.updateNews();
}

  handlePrevClick= async ()=> {
    console.log("prev");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=9830904d976041d0989bf715702fc86e&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log(parsedData);
    // this.setState ({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false
    // })
    await this.setState({page: this.state.page - 1});
    await this.updateNews();
  }

  handleNextClick= async ()=> {
    console.log("Next");
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=9830904d976041d0989bf715702fc86e&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //   this.setState({loading: true});
    //   let data = await fetch(url);
    //   let parsedData = await data.json()
    //   console.log(parsedData);
    //   this.setState ({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles, 
    //     loading: false
    //   })
    await this.setState({page: this.state.page + 1});
    await this.updateNews();  
  }

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">NewsExpress - Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row mx-6">
          {!this.state.loading && this.state.articles.map ((element)=> {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""}  
              urlToImage={element.urlToImage} newsUrl={element.url} author={element.author? element.author: "unknown"} date={element.publishedAt} source={element.source.name} />
            </div>
            })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&laquo; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &raquo;</button>
        </div>
      </div>
    );
  }
}

export default News;
