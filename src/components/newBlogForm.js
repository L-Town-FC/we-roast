import React from "react"
import { Form, Input, InputNumber, Button, DatePicker, Card } from "antd"
import moment from 'moment';
import { getProfile } from "../services/auth"
import { createNewBlog } from "../services/contentful.API"
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

const newBlogForm = () => {
    const onFinish = values => {
        createNewBlog(values)
    }
    const today = new Date()
    const userEmail = getProfile().email
    const userName = getProfile().nickname
    const dateFormat = 'YYYY/MM/DD';

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
                <Form.Item name={["publishDate"]} label="Publish Date">
                    <DatePicker showToday defaultValue={moment(today, dateFormat)}/>
                </Form.Item>
                <Form.Item name={["shortBio"]} label="Short intro">
                    <Input />
                </Form.Item>
                <Form.Item name={["blogBody"]} label="Blog">
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

export default newBlogForm
