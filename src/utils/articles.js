export const sortArticlesByPublishDate = (articles) => {
    return articles.sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished))
}

export const extractSourcesFromArticles = (articles) => {
    const sources = articles.reduce((source, article) => {
        if (article.source && !source.some(s => s.label === article.source)) {
            source.push({
                label: article.source,
                value: article.source
            })
        }
        return source
    }, [])

    return sources
}

export const extractCategoriesFromArticles = (articles) => {
    const categories = articles.reduce((category, article) => {
        if (article.category && !category.some(c => c.label === article.category)) {
            category.push({
                label: article.category,
                value: article.category
            })
        }
        return category
    }, [])

    return categories
}

export const extractAuthorsFromArticles = (articles) => {
    const authors = articles.reduce((author, article) => {
        if (article.author && !author.some(s => s.label === article.author)) {
            author.push({
                label: article.author,
                value: article.author
            })
        }
        return author
    }, [])

    return authors
}

export const processCategoryFilter = (articles, categories) => {
    const filteredArticles = articles.reduce((filtered, article) => {
        if (categories.includes(article.category)) {
            filtered.push(article)
        }
        return filtered
    }, [])

    return filteredArticles
}

export const processSourceFilter = (articles, sources) => {
    const filteredArticles = articles.reduce((filtered, article) => {
        if (sources.includes(article.source)) {
            filtered.push(article)
        }
        return filtered
    }, [])

    return filteredArticles
}

export const processDateFilter = (articles, date) => {
    const filteredArticles = articles.reduce((filtered, article) => {
        if (article.datePublished >= date) {
            filtered.push(article)
        }
        return filtered
    }, [])

    return filteredArticles
}