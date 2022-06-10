import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
  Table,
  Space,
  Tag,
  Popconfirm,
} from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import './index.scss'
import Http from '@/utils/http'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useStore from '@/store'
import img404 from '@/assets/img/error.png'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
  const navigate = useNavigate()
  const { channelStore } = useStore()
  // 频道列表管理

  // 表格数据
  const [articleDatalist, setList] = useState({
    list: [],
    count: 0,
  })
  const [params, setParams] = useState({
    page: 1,
    per_page: 10,
  })

  const onFinish = (values) => {
    const { channel_id, date, status } = values
    const data = {}
    if (status !== -1) {
      data.status = status
    }
    if (channel_id) {
      data.channel_id = channel_id
    }
    if (date) {
      data.begin_pubdate = date[0].format('YYYY-MM-DD')
      data.end_pubdate = date[1].format('YYYY-MM-DD')
    }
    setParams({ ...params, ...data })
  }
  useEffect(() => {
    const loadList = async () => {
      const { data: res } = await Http.get('/mp/articles', { params })
      setList({
        list: res.results,
        count: res.total_count,
      })
    }
    loadList()
  }, [params])

  const pageSizeChange = (page) => {
    setParams({ ...params, page })
  }
  const delArticle = async (data) => {
    await Http.delete(`/mp/articles/${data.id}`)
    setParams({ ...params, page: 1 })
  }
  const goToPublish = (data) => {
    navigate(`/publish/${data.id}`)
  }
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: (cover) => {
        return (
          <img src={cover.images[0] || img404} width={80} height={60} alt="" />
        )
      },
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220,
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (data) => <Tag color="green">审核通过</Tag>,
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate',
    },
    {
      title: '阅读数',
      dataIndex: 'read_count',
    },
    {
      title: '评论数',
      dataIndex: 'comment_count',
    },
    {
      title: '点赞数',
      dataIndex: 'like_count',
    },
    {
      title: '操作',
      render: (data) => {
        return (
          <Space size="middle">
            <Button
              onClick={goToPublish(data)}
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
            />
            <Popconfirm
              title="确认是否删除文章？"
              onConfirm={() => delArticle(data)}
              onCancel={() => {}}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        )
      },
    },
  ]
  return (
    <div>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: -1 }} onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={-1}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              initialValues="lucy"
              style={{ width: 120 }}
            >
              {channelStore.channelList.map((item) => (
                <Option value={item.id} key={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`根据筛选条件共查询到${articleDatalist.count}条结果：`}>
        <Table
          rowKey="id"
          columns={columns}
          pagination={{
            pageSize: params.per_page,
            total: articleDatalist.count,
            onChange: pageSizeChange,
          }}
          dataSource={articleDatalist.list}
        ></Table>
      </Card>
    </div>
  )
}

export default observer(Article)
