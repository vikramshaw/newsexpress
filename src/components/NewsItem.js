import React from 'react'

const NewsItem = (props) => {
  let { title, description, urlToImage, newsUrl, author, date, source } = props;
  return (
    <div className="my-3">
      <div className="card">
        <span className="badge rounded-pill bg-danger" style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>{source}</span>
        <img src={!urlToImage ? "https://image.cnbcfm.com/api/v1/image/107076423-16553187992022-06-15t182712z_1791861541_rc2isu9y23d9_rtrmadp_0_usa-fed.jpeg?v=1655318916&w=1920&h=1080" : urlToImage}
          className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>
          <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
        </div>
      </div>
    </div>
  );
}

export default NewsItem