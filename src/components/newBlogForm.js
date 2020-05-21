import React from "react"
import { Form, Input, InputNumber, Button, DatePicker, Card } from "antd"
import moment from "moment"
import { navigate } from "gatsby"
//import { createNewBlog } from "../services/contentful.API"
import { useAuth0 } from "../services/auth.API"
import UploadHero from "./uploadHero"

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

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

    if (loading || !user) {
        return <p>Loading Account Profile...</p>
    }

    const onFinish = async values => {
        // createNewBlog(values)
        try {
            const token = await getTokenSilently()
            const res = await fetch("/.netlify/functions/addInfluencer", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { authorization: `Bearer ${token}` },
            })
            console.log("Success")
            console.log(res)
            navigate("/")
        } catch (error) {
            console.error("You messed up")
            console.error(error)
        }
        // navigate("/")
    }
    const today = new Date()
    const userEmail = user.email
    const userName = user.nickname
    const dateFormat = "YYYY/MM/DD"

    return (
        <Card hoverable>
            <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                validateMessages={validateMessages}
            >
                <Form.Item
                    name={["title"]}
                    label="Title"
                    rules={[{ required: true }]}
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
                    name={["email"]}
                    label="Email"
                    rules={[{ type: "email" }]}
                    extra="this will be kept private"
                >
                    <Input disabled defaultValue={userEmail} />
                </Form.Item>
                {/* <Form.Item
                    name={["user", "age"]}
                    label="Age"
                    rules={[{ type: "number", min: 0, max: 99 }]}
                >
                    <InputNumber />
                </Form.Item> */}
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
                    name={["hero"]}
                    label="Display Image"
                    extra="This will be shown in the preview"
                >
                    <UploadHero />
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
