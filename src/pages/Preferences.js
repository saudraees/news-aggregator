import React, { useState, useEffect } from "react"
import { Select, Button, Row, Col, message, Typography } from "antd"

const { Title } = Typography

const Preferences = () => {
    // preferences
    const [preferredSources, setPreferredSources] = useState([])
    const [preferredCategories, setPreferredCategories] = useState([])
    const [preferredAuthors, setPreferredAuthors] = useState([])

    // available data
    const [extractedCategories, setExtractedCategories] = useState([])
    const [extractedSources, setExtractedSources] = useState([])
    const [extractedAuthors, setExtractedAuthors] = useState([])

    // Load preferences from local storage on component mount
    useEffect(() => {
        const savedSources = JSON.parse(localStorage.getItem("preferredSources")) || []
        const savedCategories = JSON.parse(localStorage.getItem("preferredCategories")) || []
        const savedAuthors = JSON.parse(localStorage.getItem("preferredAuthors")) || []
        setPreferredSources(savedSources)
        setPreferredCategories(savedCategories)
        setPreferredAuthors(savedAuthors)

        setExtractedCategories(JSON.parse(localStorage.getItem("allCategories")))
        setExtractedSources(JSON.parse(localStorage.getItem("allSources")))
        setExtractedAuthors(JSON.parse(localStorage.getItem("allAuthors")))
    }, [])

    // Save preferences to local storage
    const savePreferences = () => {
        localStorage.setItem("preferredSources", JSON.stringify(preferredSources))
        localStorage.setItem("preferredCategories", JSON.stringify(preferredCategories))
        localStorage.setItem("preferredAuthors", JSON.stringify(preferredAuthors))
        message.success("Preferences saved!")
    }

    return (
        <div>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={12} lg={12}>
                    <Title level={5}>Preferred Sources</Title>
                    <Select
                        mode="multiple"
                        placeholder="Select Preferred Sources"
                        style={{ width: "100%" }}
                        value={preferredSources}
                        onChange={(value) => setPreferredSources(value)}
                        options={extractedSources}
                    />
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={12} lg={12}>
                    <Title level={5}>Preferred Categories</Title>
                    <Select
                        mode="multiple"
                        placeholder="Select Preferred Categories"
                        style={{ width: "100%" }}
                        value={preferredCategories}
                        onChange={(value) => setPreferredCategories(value)}
                        options={extractedCategories}
                    />
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={12} lg={12}>
                    <Title level={5}>Preferred Authors</Title>
                    <Select
                        mode="multiple"
                        placeholder="Select Preferred Authors"
                        style={{ width: "100%" }}
                        value={preferredAuthors}
                        onChange={(value) => setPreferredAuthors(value)}
                        options={extractedAuthors}
                    />
                </Col>
            </Row>
            <Row justify='end' style={{ paddingTop: '16px' }}>
                <Col>
                    <Button type="primary" onClick={savePreferences}>
                        Save Preferences
                    </Button>
                </Col>
            </Row>
        </div >
    )
}

export default Preferences
