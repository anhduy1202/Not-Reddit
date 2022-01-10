import { useEffect } from "react";
import { useSelector } from "react-redux";
import useFetchData from "../../Hooks/useFetchData";
import Loading from "../../Loading/Loading";
import FeedLayout from "../Layout/FeedLayout";
import NewsList from "./NewsList";
import "./news.css";
import { baseURL } from "../../../utils/listContainer";

const News = () => {
  const user = useSelector((state) => state.user.user?.currentUser);
  const { isLoading, apiData, serverError } = useFetchData(
    `${baseURL}/news`,
    user?.accessToken,
    "get"
  );

  return (
    <FeedLayout>
      <section className="news-container">
        <Loading
          loadingType="BeatLoader"
          color="white"
          size="10px"
          loading={isLoading}
        />
        {apiData?.map((news,idx) => {
          return (
            <NewsList
              key={idx}
              title={news.title}
              name={news.source.name}
              author={news.author}
              url={news.url}
              urlToImage={news.urlToImage}
              publishedAt={news.publishedAt}
            />
          );
        })}
      </section>
    </FeedLayout>
  );
};

export default News;
