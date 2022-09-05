import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, urlToImage, newsUrl, author, date, source} = this.props;
    return (
      <div className="my-3">
        <div className="card">
          <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style= {{zIndex: '1', left: '90%'}}>{source}</span>
          <img
            src={
              !urlToImage
                ? "https://image.cnbcfm.com/api/v1/image/107076423-16553187992022-06-15t182712z_1791861541_rc2isu9y23d9_rtrmadp_0_usa-fed.jpeg?v=1655318916&w=1920&h=1080"
                : urlToImage
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {author} on {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              rel="noreferrer"
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem