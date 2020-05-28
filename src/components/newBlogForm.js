import React, { useState } from "react"
import {
    Form,
    Input,
    InputNumber,
    Button,
    DatePicker,
    Card,
    Upload,
    message,
    Spin,
} from "antd"
import moment from "moment"
import { navigate } from "gatsby"
import { useAuth0 } from "../services/auth.API"
import {
    LoadingOutlined,
    PlusOutlined,
} from "@ant-design/icons"

const validateMessages = {
    required: "${label} is required!",
    types: {
        email: "${label} is not validate email!",
        number: "${label} is not a validate number!",
    },
    number: {
        range: "${label} must be between ${min} and ${max}",
    },
}

const NewBlogForm = () => {
    const {
        loading,
        user,
        isAuthenticated,
        logout,
        getTokenSilently,
    } = useAuth0()

    const [isUploading, setIsUploading] = useState(false)
    const [pageLoading, setPageLoading] = useState(false)
    const [url, setUrl] = useState(null)

    const uploadButton = (
        <div>
            {isUploading ? <LoadingOutlined /> : <PlusOutlined />}
            <div className="ant-upload-text">Upload</div>
        </div>
    )

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }

    function beforeUpload(file) {
        const isJpgOrPng =
            file.type === "image/jpeg" || file.type === "image/png"
        if (!isJpgOrPng) {
            message.error("You can only upload JPG/PNG file!")
        }
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
            message.error("Image must smaller than 2MB!")
        }
        return isJpgOrPng && isLt2M
    }

    function getBase64(img, callback) {
        const reader = new FileReader()
        reader.addEventListener("load", () => callback(reader.result))
        reader.readAsDataURL(img)
    }

    const handleChange = info => {
        if (info.file.status === "uploading") {
            setIsUploading(true)
            return
        }
        if (info.file.status === "done") {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, url => {
                setUrl(url)
                setIsUploading(false)
            })
        }
    }

    const normFile = e => {
        console.log("Upload event:", e)
        if (Array.isArray(e)) {
            return e
        }
        return e && e.fileList
    }

    if (loading || !user || pageLoading) {
        return <Spin tip="Loading..." size="large" />
    }

    const onFinish = async values => {
        setPageLoading(true)
        if (!values.author) {
            values.author = user.nickname
        }
        values.imageUrl = url
        try {
            const token = await getTokenSilently()
            const res = await fetch("/.netlify/functions/addNewBlog", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { authorization: `Bearer ${token}` },
            })
            if(res.status===200){
                console.log("Message went through")
                navigate("/")
            }
        } catch (error) {
            console.error(error)
        }
        setPageLoading(false)
    }
    const today = new Date()
    const userEmail = user.email
    const userName = user.nickname
    const dateFormat = "YYYY/MM/DD"

    return (
        <Card hoverable>
            <Form
                {...layout}
                name="new-blog"
                onFinish={onFinish}
                validateMessages={validateMessages}
            >
                <Form.Item
                    name={["title"]}
                    label="Title"
                    rules={[
                        {
                            required: true,
                            message: "You need a title for your new blog",
                        },
                    ]}
                    extra="Make it catchy!"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={["author"]}
                    label="Author"
                    extra="this is your site alias"
                >
                    <Input disabled defaultValue={userName} />
                </Form.Item>
                <Form.Item
                    name={["publishDate"]}
                    label="Publish Date"
                    extra="Defaults to today"
                >
                    <DatePicker
                        showToday
                        defaultValue={moment(today, dateFormat)}
                    />
                </Form.Item>
                <Form.Item
                    name="hero"
                    label="Display Image"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <Upload
                        name="logo"
                        listType="picture"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        {url ? (
                            <img
                                src={url}
                                alt="avatar"
                                style={{ width: "100%" }}
                            />
                        ) : (
                            uploadButton
                        )}
                    </Upload>
                </Form.Item>
                <Form.Item
                    name={["shortBio"]}
                    label="Short intro"
                    extra="This will be shown in the preview"
                >
                    <Input />
                </Form.Item>
                <Form.Item name={["blogBody"]} label="Body">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default NewBlogForm
