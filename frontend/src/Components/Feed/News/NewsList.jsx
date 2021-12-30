const NewsList = (props) => {
    const {title, name, author, url, urlToImage, publishedAt} = props;
    return ( 
       <section className="newslist-container">
           {title}
       </section>
     );
}
 
export default NewsList;