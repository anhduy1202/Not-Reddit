import { useEffect } from "react";
import { useSelector } from "react-redux";
import useFetchData from "../../Hooks/useFetchData";
import FeedLayout from "../Layout/FeedLayout";
import NewsList from "./NewsList";

const News = () => {
  const user = useSelector((state) => state.user.user?.currentUser);
  // const { isLoading, apiData, serverError } = useFetchData(
  //   `/v1/news`,
  //   user?.accessToken
  // );
  const dummyData = [
    {
      title:
        "Explainer: What happens after Ghislaine Maxwell's guilty verdict? - Reuters",
      name: "Reuters",
      author: "Daniel",
      description:
        "British socialite Ghislaine Maxwell on Wednesday was convicted of recruiting and grooming teenage girls for sexual encounters with the late financier Jeffrey Epstein between 1994 and 2004.",
      url: "https://www.reuters.com/world/us/what-happens-after-ghislaine-maxwells-guilty-verdict-2021-12-29/",
      urlToImage:
        "https://www.reuters.com/resizer/R9omO5HhK28kfMivZjlk_bWM-ng=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/FJFDWCWRYNNLRE4HMFHFLWFACU.jpg",
      publishedAt: "2021-12-30T06:25:00Z",
    },
    {
      title:
        "Explainer: What happens after Ghislaine Maxwell's guilty verdict? - Reuters",
      name: "Reuters",
      author: "Daniel",
      description:
        "British socialite Ghislaine Maxwell on Wednesday was convicted of recruiting and grooming teenage girls for sexual encounters with the late financier Jeffrey Epstein between 1994 and 2004.",
      url: "https://www.reuters.com/world/us/what-happens-after-ghislaine-maxwells-guilty-verdict-2021-12-29/",
      urlToImage:
        "https://www.reuters.com/resizer/R9omO5HhK28kfMivZjlk_bWM-ng=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/FJFDWCWRYNNLRE4HMFHFLWFACU.jpg",
      publishedAt: "2021-12-30T06:25:00Z",
    },
    {
      title:
        "Explainer: What happens after Ghislaine Maxwell's guilty verdict? - Reuters",
      name: "Reuters",
      author: "Daniel",
      description:
        "British socialite Ghislaine Maxwell on Wednesday was convicted of recruiting and grooming teenage girls for sexual encounters with the late financier Jeffrey Epstein between 1994 and 2004.",
      url: "https://www.reuters.com/world/us/what-happens-after-ghislaine-maxwells-guilty-verdict-2021-12-29/",
      urlToImage:
        "https://www.reuters.com/resizer/R9omO5HhK28kfMivZjlk_bWM-ng=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/FJFDWCWRYNNLRE4HMFHFLWFACU.jpg",
      publishedAt: "2021-12-30T06:25:00Z",
    },
    {
      title:
        "Explainer: What happens after Ghislaine Maxwell's guilty verdict? - Reuters",
      name: "Reuters",
      author: "Daniel",
      description:
        "British socialite Ghislaine Maxwell on Wednesday was convicted of recruiting and grooming teenage girls for sexual encounters with the late financier Jeffrey Epstein between 1994 and 2004.",
      url: "https://www.reuters.com/world/us/what-happens-after-ghislaine-maxwells-guilty-verdict-2021-12-29/",
      urlToImage:
        "https://www.reuters.com/resizer/R9omO5HhK28kfMivZjlk_bWM-ng=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/FJFDWCWRYNNLRE4HMFHFLWFACU.jpg",
      publishedAt: "2021-12-30T06:25:00Z",
    },
  ];

  return (
    <FeedLayout>
      <section className="news-container">
        {dummyData?.map((news) => {
          return (
            <NewsList
              title={news.title}
              name={news.name}
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
