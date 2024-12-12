import React from "react"
import { Row } from "antd"
import ArticleCard from "./ArticleCard"

const ArticleList = ({ articles }) => {
    return (
        <Row gutter={[16, 16]}>
            {articles.map((article, index) => (
                <ArticleCard key={index} article={article} />
            ))}
        </Row>
    )
}

export default ArticleList