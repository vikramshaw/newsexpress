import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  static defaultProps = {
    country: "in",
    pageSize: 8
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
  }

  constructor() {
    super();
    // console.log("I'm a constructor");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=0a5d16857ef9469bab2d78bd87f423cc&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    this.props.setProgress(30);
    let data = await fetch(url);
    this.props.setProgress(70);
    let parsedData = await data.json()
    console.log("cdm", parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=0a5d16857ef9469bab2d78bd87f423cc&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log("cdm", parsedData);
    this.setState({
      //It will concat the 1st page article with the next page
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false
    })
  }

  render() {
    return (
      <>
        <h1 className="text-center">NewsExpress - Top {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} Headlines</h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.articles.totalResults}
          // this.state.loading && <Spinner> -- If the loading is true then it will show the spinner or else not
          loader={this.state.loading && <Spinner />}>
          <div className="container">
            <div className="row mx-6">
              {this.state.articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                          <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""}
                            urlToImage={element.urlToImage} newsUrl={element.url} author={element.author ? element.author : "unknown"} date={element.publishedAt} source={element.source.name} />
                        </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
