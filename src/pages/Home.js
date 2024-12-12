import React, { useState, useEffect } from "react"
import { Input, Select, DatePicker, Space, Modal, Row, Col, message, Button, Divider, Spin, Tooltip } from "antd"
import { FilterOutlined, CloseOutlined } from '@ant-design/icons'
import { fetchGuardianArticles, fetchNewsApiArticles, fetchNYTimesArticles } from "../services/NewsService"
import { extractAuthorsFromArticles, extractCategoriesFromArticles, extractSourcesFromArticles, processCategoryFilter, processDateFilter, processSourceFilter, sortArticlesByPublishDate } from "../utils/articles"
import ArticleList from "../components/Article/ArticleList"
import { saveFilterValuesToLocalStorage } from "../utils/preferences"

const { Search } = Input

const Home = () => {
    const [allArticles, setAllArticles] = useState([])
    const [filteredArticles, setFilteredArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)

    // filter values that will be populated based on data fetched
    const [extractedCategories, setExtractedCategories] = useState([])
    const [extractedSources, setExtractedSources] = useState([])
    const [extractedAuthors, setExtractedAuthors] = useState([])

    // filters
    const [keyword, setKeyword] = useState("")
    const [sources, setSources] = useState([])
    const [categories, setCategories] = useState([])
    const [date, setDate] = useState(null)
    const isFilterActive = sources.length || categories.length || date

    const [isModalOpen, setIsModalOpen] = useState(false)

    const filterArticles = (articles) => {
        let filtered = articles
        if (categories.length) {
            filtered = processCategoryFilter(filtered, categories)
        }
        if (sources.length) {
            filtered = processSourceFilter(filtered, sources)
        }
        if (date) {
            filtered = processDateFilter(filtered, date)
        }

        return filtered
    }

    const filterArticlesByPreference = (articles) => {
        const preferredSources = JSON.parse(localStorage.getItem("preferredSources")) || []
        const preferredCategories = JSON.parse(localStorage.getItem("preferredCategories")) || []
        const preferredAuthors = JSON.parse(localStorage.getItem("preferredAuthors")) || []

        let filtered = articles
        if (preferredCategories.length) {
            filtered = filtered.filter(f => preferredCategories.includes(f.category))
        }
        if (preferredSources.length) {
            filtered = filtered.filter(f => preferredSources.includes(f.source))
        }
        if (preferredAuthors.length) {
            filtered = filtered.filter(f => preferredAuthors.includes(f.author))
        }

        return filtered
    }

    const handleFilter = () => {
        let filtered = filterArticles(allArticles)
        setFilteredArticles(filtered)
    }

    const handleFilterClear = () => {
        setSources([])
        setCategories([])
        setDate(null)
    }

    const handleSearchClear = () => {
        setKeyword("")
        setFilteredArticles([])
        setAllArticles([])
    }

    // Fetch and process articles from our datasources
    const fetchAndProcessArticles = async () => {
        setLoading(true)
        try {
            const [newsApiData, guardianData, nyTimesData] = await Promise.all([
                fetchNewsApiArticles(keyword, currentPage),
                fetchGuardianArticles(keyword, currentPage),
                fetchNYTimesArticles(keyword, currentPage)
            ])

            const combinedArticles = sortArticlesByPublishDate([
                ...newsApiData.articles,
                ...guardianData.articles,
                ...nyTimesData.articles
            ])

            let filtered = []
            // Apply preferences
            filtered = filterArticlesByPreference(combinedArticles)
            // Apply filters
            filtered = filterArticles(filtered)

            const newCategories = [...extractedCategories, ...extractCategoriesFromArticles(combinedArticles)]
            const newSources = [...extractedSources, ...extractSourcesFromArticles(combinedArticles)]
            const newAuthors = [...extractedAuthors, ...extractAuthorsFromArticles(combinedArticles)]
            saveFilterValuesToLocalStorage(newSources, newCategories, newAuthors)

            setExtractedCategories(newCategories)
            setExtractedSources(newSources)
            setExtractedAuthors(newAuthors)
            setFilteredArticles([...filteredArticles, ...filtered])
            setAllArticles([...allArticles, ...combinedArticles])
        } catch (error) {
            message.error("Failed to fetch articles. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (keyword)
            fetchAndProcessArticles()
    }, [keyword, currentPage])

    useEffect(() => {
        handleFilter()
    }, [sources, categories, date])

    return (
        <Spin spinning={loading} tip="Loading...">
            <Row align="middle" justify='space-between'>
                <Col xs={16} sm={18} md={19} lg={20}>
                    <Search
                        placeholder="Search articles"
                        allowClear
                        enterButton="Search"
                        onClear={handleSearchClear}
                        onSearch={(value) => setKeyword(value)}
                    />
                </Col>
                <Col>
                    <Button
                        type="primary"
                        onClick={() => setIsModalOpen(true)}
                        icon={<FilterOutlined />}
                        disabled={!filteredArticles.length}
                        style={{ marginRight: '6px' }}
                    >
                        Filters
                    </Button>
                    {isFilterActive ? (
                        <Tooltip title="Clear Filters">
                            <Button size="small" shape="circle" icon={<CloseOutlined />} onClick={handleFilterClear} />
                        </Tooltip>
                    ) : null}
                </Col>
            </Row>
            <Divider />
            {filteredArticles.length ? (
                <>
                    <ArticleList articles={filteredArticles} />
                    <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
                        <h3 style={{ textAlign: 'center' }}> You have read all the articles! </h3>
                        <Button type="primary" onClick={() => setCurrentPage(currentPage + 1)}>
                            Load more!
                        </Button>
                    </div>
                </>
            )
                : keyword && !loading
                    ? <p>Unable to find any articles based on your search and preferences.</p>
                    : <p>Please enter keywords for your desired news articles in the search bar.</p>
            }
            <Modal
                title="Filter Content"
                open={isModalOpen}
                okText="Apply Filter"
                onOk={() => {
                    handleFilter()
                    setIsModalOpen(false)
                }}
                onCancel={() => setIsModalOpen(false)}
                destroyOnClose
            >
                <Space
                    direction="vertical"
                    size="middle"
                    style={{
                        display: 'flex',
                    }}
                >
                    <Select
                        placeholder="Select Sources"
                        style={{ width: "50%" }}
                        onChange={(value) => setSources(value)}
                        options={extractedSources}
                        allowClear
                        mode="multiple"
                    />
                    <Select
                        placeholder="Select Category"
                        style={{ width: "50%" }}
                        onChange={(value) => setCategories(value)}
                        options={extractedCategories}
                        allowClear
                        mode="multiple"
                    />
                    <DatePicker
                        placeholder="Publish Date"
                        style={{ width: "50%" }}
                        onChange={(date) => setDate(date)}
                    />
                </Space>
            </Modal>
        </Spin>
    )
}

export default Home
