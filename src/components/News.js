import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  render() {
    return (
      <div>
        <div className="container my-3">
            <h1>NewsExpress - Top Headlines</h1>
            <div className="row">
                <div className="col-md-4">
                    <NewsItem title="My Title" description="Mydesc"/>
                </div>
                <div className="col-md-4">
                    <NewsItem title="My Title" description="Mydesc"/>
                </div>
                <div className="col-md-4">
                    <NewsItem title="My Title" description="Mydesc"/>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

export default News