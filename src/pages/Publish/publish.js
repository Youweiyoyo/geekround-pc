import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
} from 'antd'
import { observer } from 'mobx-react-lite'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams } from 'react-router-dom'
import { useState, useRef } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './index.scss'
import useStore from '@/store'
import Http from '@/utils/http'
const { Option } = Select

const Publish = () => {
  const { channelStore } = useStore()
  const [value, setValue] = useState('')
  const [fileList, setFileList] = useState([])
  const [imgCount, setImgCount] = useState(1)
  //  1.使用 useRef 暂存图片
  const fileListRef = useRef([])
  //  上传组件
  const onUploadChange = ({ fileList }) => {
    // 会执行3次，分阶段上传
    setFileList(fileList)
    // 2.将上传的图片暂存起来
    fileListRef.current = fileList
  }
  const radioChange = (data) => {
    const valueIndex = data.target.value
    setImgCount(valueIndex)

    if (fileListRef.current.length === 0) return
    // 3.根据模式进行判断
    if (valueIndex === 1) {
      const img = fileListRef.current ? fileListRef.current[0] : []
      setFileList([img])
    } else if (valueIndex === 3) {
      setFileList(fileListRef.current)
    }
  }
  const onFinish = async (FormData) => {
    const { channel_id, content, title, type } = FormData
    const params = {
      channel_id,
      content,
      title,
      type,
      cover: {
        type,
        images: fileList.map((item) => item.response.data.url),
      },
    }
    await Http.post('/mp/articles?draft=false', params)
  }
  const [params] = useSearchParams()
  const id = params.get('id')
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{id ? '编辑文章' : '发布文章'}</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          onFinish={onFinish}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1, content: 'This is not 404' }}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelStore.channelList.map((item) => (
                <Option value={item.name} key={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={radioChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imgCount > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                multiple={imgCount > 1}
                maxCount={imgCount}
                action="http://geek.itheima.net/v1_0/upload"
                fileList={fileList}
                onChange={onUploadChange}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
            ></ReactQuill>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default observer(Publish)
