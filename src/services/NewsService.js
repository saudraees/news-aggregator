import axios from "axios"
import { message } from "antd"

export const fetchNewsApiArticles = async (query, page) => {
    try {
        const response = await axios.get("https://newsapi.org/v2/everything", {
            params: {
                q: query,
                page,
                apiKey: process.env.REACT_APP_NEWS_API_KEY, // Replace with your NewsAPI key
            },
        })

        return {
            status: response.data.status,
            articles: convertNewsApiDataToArticleType(response.data.articles),
            totalResults: response.data.totalResults
        }
    } catch (error) {
        message.error("Failed to fetch articles from NewsAPI. Please try again.")
        return { status: '404', articles: [], totalResults: 0 }
    }
}

export const fetchGuardianArticles = async (query, page) => {
    try {
        const response = await axios.get("https://content.guardianapis.com/search", {
            params: {
                q: query,
                'show-fields': 'trailText,byline,thumbnail',
                page,
                'api-key': process.env.REACT_APP_GUARDIAN_API_KEY, // Replace with your Guardian API key
            },
        })

        return {
            status: response.data.response.status,
            articles: convertGuardianDataToArticleType(response.data.response.results),
            totalResults: response.data.response.total
        }
    } catch (error) {
        message.error("Failed to fetch articles from The Guardian. Please try again.")
        return { status: '404', articles: [], totalResults: 0 }
    }
}

export const fetchNYTimesArticles = async (query, page) => {
    try {
        const response = await axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json", {
            params: {
                q: query,
                page,
                'api-key': process.env.REACT_APP_NY_TIMES_API_KEY, // Replace with your MY Times API key
            },
        })

        return {
            status: response.data.status,
            articles: convertNYTimesDataToArticleType(response.data.response.docs),
            totalResults: response.data.response.meta.hits
        }
    } catch (error) {
        message.error("Failed to fetch articles from New York Times. Please try again.")
        return { status: '404', articles: [], totalResults: 0 }
    }
}

const convertNewsApiDataToArticleType = (articles) => {
    return articles.map((article) => {
        return {
            title: article.title,
            description: article.description,
            source: article.source.name,
            author: article.author || "N/A",
            category: "N/A",
            datePublished: new Date(article.publishedAt).toLocaleDateString(),
            imageUrl: article.urlToImage,
            articleUrl: article.url,
        }
    })
}

const convertGuardianDataToArticleType = (articles) => {
    return articles.map((article) => {
        return {
            title: article.webTitle,
            description: article.fields.trailText,
            source: "Guardian",
            author: article.fields.byline || "N/A",
            category: article.sectionName,
            datePublished: new Date(article.webPublicationDate).toLocaleDateString(),
            imageUrl: article.fields.thumbnail,
            articleUrl: article.webUrl,
        }
    })
}

const convertNYTimesDataToArticleType = (articles) => {
    return articles.map((article) => {
        return {
            title: article.headline.main,
            description: article.abstract,
            source: "NY Times",
            author: article.byline?.original?.replace("By ", "") || "N/A",
            category: article.subsection_name,
            datePublished: new Date(article.pub_date).toLocaleDateString(),
            imageUrl: article.multimedia.length > 0
                ? `https://www.nytimes.com/${article.multimedia[0].url}`
                : null,
            articleUrl: article.web_url,
        }
    })
}