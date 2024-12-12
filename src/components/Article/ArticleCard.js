import React from "react";
import { Card, Col } from "antd";

const ArticleCard = ({ article }) => {
    return (
        <Col xs={24} sm={12} md={8} lg={8}>
            <Card
                hoverable
                style={{ height: "100%", display: "flex", flexDirection: "column" }}
                cover={
                    <>
                        <div style={{
                            display: "flex",
                            justifyContent: 'center',
                            backgroundColor: 'lightgray',
                            padding: '4px'
                        }}>
                            <div style={{ fontWeight: 'bold' }}>{article.source} </div>
                        </div>
                        <img
                            alt="article"
                            src={article.imageUrl || 'image-logo.png'}
                            style={{ objectFit: "cover", height: 150, borderRadius: 0 }}
                        />
                    </>
                }
            >
                <div
                    style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontWeight: "bold",
                        marginBottom: "8px",
                    }}
                >
                    {article.title}
                </div>
                <div
                    style={{
                        flex: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 3, // Show up to 3 lines
                        WebkitBoxOrient: "vertical",
                    }}
                >
                    {article.description}
                </div>
                <a
                    href={article.articleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginTop: "auto", color: "#1890ff" }}
                >
                    Read more
                </a>
                <div style={{ textAlign: 'end' }}>
                    <div>Author: {article.author}</div>
                </div>
                <div style={{ margin: "8px 0" }}>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between' }}>
                        <div style={{ fontStyle: "italic" }}>Category: {article.category}</div>
                        <div style={{ fontStyle: "italic" }}>Date: {article.datePublished}</div>
                    </div>
                </div>
            </Card>
        </Col>
    )
}

export default ArticleCard;