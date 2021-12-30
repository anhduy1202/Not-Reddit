const axios = require("axios");
const baseUrl = "https://newsapi.org/v2";
const newsController = {
    //GET ALL TRENDING NEWS
    getHotNews:async(req,res) => {
        try{ 
        const news = await axios.get(`${baseUrl}/top-headlines?country=us&apiKey=${process.env.API_KEY}`);
        res.status(200).json(news.data.articles);
    }catch(err) {
            res.status(500).json(err);
        }
    }
}

module.exports = newsController;