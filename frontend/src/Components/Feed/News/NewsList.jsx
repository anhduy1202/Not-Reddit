import "./news.css";
import { format } from "timeago.js";

const NewsList = (props) => {
  const { title, name, author, url, urlToImage, publishedAt } = props;
  return (
    <section className="newslist-container">
      <div className="newslist-info-container">
        <p className="newslist-source"> r/{name} </p>
        <div className="newslist-time"> {format(publishedAt)} </div>
      </div>
      <div className="newslist-content-container">
        <div className="newslist-title"> {title} </div>
        <div className="newslist-image-container">
          <a href={`${url}`} rel="noreferrer" target="_blank">
            <img src={urlToImage} alt="news img" className="newslist-image" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default NewsList;
