import {
  FilePdfOutlined,
  FileExcelOutlined,
  SearchOutlined,
  DatabaseOutlined,
  ProjectOutlined,
  UsergroupAddOutlined,
  RiseOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Row,
  Select,
  Space,
  Table,
  Tabs,
  Typography,
  Statistic,
  Badge,
} from 'antd';
import { useState } from 'react';
import {
  MOCK_REPORT_SUMMARY,
  MOCK_PAPER_STATS,
  MOCK_PROJECT_STATS,
  MOCK_CANDIDATE_STATS,
} from '@/services/ThongKe/constant';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const ThongKeBaoCao = () => {
  const [activeTab, setActiveTab] = useState('PAPERS');

  const columnsCandidate = [
    { title: 'Đơn vị', dataIndex: 'unit', key: 'unit' },
    { title: 'Chức danh', dataIndex: 'rank', key: 'rank', render: (val: string) => <Badge status={val === 'GS' ? 'processing' : 'success'} text={val} /> },
    { title: 'Tổng ứng viên', dataIndex: 'totalCandidates', key: 'totalCandidates', align: 'center' as const },
    { title: 'Đủ điều kiện', dataIndex: 'qualified', key: 'qualified', align: 'center' as const, render: (val: number) => <Text type="success" strong>{val}</Text> },
    { title: 'Chưa đạt', dataIndex: 'ineligible', key: 'ineligible', align: 'center' as const, render: (val: number) => <Text type="danger">{val}</Text> },
    { title: 'Điểm TB', dataIndex: 'averageScore', key: 'averageScore', align: 'center' as const },
  ];

  return (
    <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
      <Row gutter={[16, 16]} align="middle" style={{ marginBottom: 24 }}>
        <Col flex="auto">
          <Title level={2} style={{ margin: 0 }}>
            <RiseOutlined style={{ marginRight: 12, color: '#1890ff' }} />
            Hệ thống Thống kê & Báo cáo Khoa học
          </Title>
          <Text type="secondary">Phân tích xu hướng, hiệu suất nghiên cứu và quản lý chức danh</Text>
        </Col>
        <Col>
          <Space>
            <Button icon={<FileExcelOutlined />} style={{ color: '#1d7a46' }}>Xuất Excel</Button>
            <Button type="primary" icon={<FilePdfOutlined />} danger>Xuất PDF</Button>
          </Space>
        </Col>
      </Row>

      {/* Filter Section */}
      {/* <Card bordered={false} style={{ marginBottom: 16, borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={6}>
            <Text strong>Năm báo cáo</Text>
            <Select defaultValue="2024" style={{ width: '100%', marginTop: 8 }} placeholder="Chọn năm">
              <Select.Option value="2024">2024</Select.Option>
              <Select.Option value="2023">2023</Select.Option>
              <Select.Option value="2022">2022</Select.Option>
            </Select>
          </Col>
          <Col xs={24} md={6}>
            <Text strong>Khoa / Đơn vị</Text>
            <Select defaultValue="all" style={{ width: '100%', marginTop: 8 }}>
              <Select.Option value="all">Tất cả đơn vị</Select.Option>
              <Select.Option value="cntt">Khoa Công nghệ thông tin</Select.Option>
              <Select.Option value="kt">Khoa Kinh tế</Select.Option>
            </Select>
          </Col>
          <Col xs={24} md={6}>
            <Text strong>Phạm vi thời gian</Text>
            <RangePicker style={{ width: '100%', marginTop: 8 }} />
          </Col>
          <Col xs={24} md={6} style={{ display: 'flex', alignItems: 'flex-end' }}>
            <Button type="primary" icon={<SearchOutlined />} block>Truy vấn dữ liệu</Button>
          </Col>
        </Row>
      </Card> */}

      {/* Summary Stats */}
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} hoverable>
            <Statistic
              title="Tổng bài báo"
              value={MOCK_REPORT_SUMMARY.totalPapers}
              prefix={<DatabaseOutlined style={{ color: '#3f8600' }} />}
              suffix={<Text type="success" style={{ fontSize: '12px' }}> (+{MOCK_REPORT_SUMMARY.growthRate}%)</Text>}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} hoverable>
            <Statistic
              title="Tổng đề tài"
              value={MOCK_REPORT_SUMMARY.totalProjects}
              prefix={<ProjectOutlined style={{ color: '#1890ff' }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} hoverable>
            <Statistic
              title="Ứng viên GS/PGS"
              value={MOCK_REPORT_SUMMARY.totalCandidates}
              prefix={<UsergroupAddOutlined style={{ color: '#eb2f96' }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} hoverable>
            <Statistic
              title="Tổng kinh phí (triệu VNĐ)"
              value={MOCK_REPORT_SUMMARY.totalBudget}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Detailed Tabs */}
      <Card bordered={false} bodyStyle={{ padding: '0 24px 24px 24px' }} style={{ borderRadius: '12px' }}>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: 'PAPERS',
              label: 'Bài báo khoa học',
              children: (
                <Row gutter={[24, 24]}>
                  <Col span={24}>
                    <Table
                      dataSource={MOCK_PAPER_STATS}
                      pagination={false}
                      bordered
                      title={() => <Text strong>Danh sách thống kê bài báo khoa học qua các năm</Text>}
                      size="small"
                      columns={[
                        { title: 'Năm', dataIndex: 'year', key: 'year', align: 'center' },
                        { title: 'Công trình ISI', dataIndex: 'isiCount', key: 'isi', align: 'center' },
                        { title: 'Công trình Scopus', dataIndex: 'scopusCount', key: 'scopus', align: 'center' },
                        { title: 'Tạp chí Quốc gia', dataIndex: 'nationalCount', key: 'national', align: 'center' },
                        { title: 'Tổng số bài đăng', dataIndex: 'total', key: 'total', align: 'center', render: (val) => <Text strong>{val}</Text> },
                      ]}
                    />
                  </Col>
                </Row>
              )
            },
            {
              key: 'PROJECTS',
              label: 'Đề tài nghiên cứu',
              children: (
                <Row gutter={[24, 24]}>
                  <Col span={24}>
                    <Table
                      dataSource={MOCK_PROJECT_STATS}
                      pagination={false}
                      bordered
                      title={() => <Text strong>Thống kê đề tài nghiên cứu khoa học theo cấp quản lý</Text>}
                      size="small"
                      rowKey="level"
                      columns={[
                        { title: 'Cấp đề tài', dataIndex: 'level', key: 'level' },
                        { title: 'Số lượng đề tài', dataIndex: 'count', key: 'count', align: 'center' },
                        { title: 'Tổng kinh phí (triệu)', dataIndex: 'totalBudget', key: 'budget', align: 'right', render: (val) => val.toLocaleString() },
                        { title: 'Đang thực hiện', dataIndex: ['status', 'ongoing'], key: 'ongoing', align: 'center' },
                        { title: 'Đã nghiệm thu', dataIndex: ['status', 'completed'], key: 'completed', align: 'center' },
                        { title: 'Đã dừng/hủy', dataIndex: ['status', 'cancelled'], key: 'cancelled', align: 'center' },
                      ]}
                    />
                  </Col>
                </Row>
              )
            },
            {
              key: 'CANDIDATES',
              label: 'Ứng viên GS/PGS',
              children: (
                <Row gutter={[24, 24]}>
                  <Col span={24}>
                    <Table
                      dataSource={MOCK_CANDIDATE_STATS}
                      pagination={{ pageSize: 15 }}
                      bordered
                      title={() => <Text strong>Danh sách ứng viên xét chức danh GS/PGS theo đơn vị</Text>}
                      size="small"
                      columns={columnsCandidate}
                    />
                  </Col>
                </Row>
              )
            },
            {
              key: 'SUMMARY',
              label: 'Tóm tắt hợp tác',
              children: (
                <Row gutter={[24, 24]}>
                  <Col span={24}>
                    <Card bordered={false} style={{ textAlign: 'center', padding: '40px 0' }}>
                      <DatabaseOutlined style={{ fontSize: '48px', color: '#bfbfbf', marginBottom: '16px' }} />
                      <Title level={4}>Dữ liệu hợp tác tác giả</Title>
                      <Text type="secondary">
                        Tính năng này đang được cập nhật để hiển thị dưới dạng bảng ma trận chi tiết.
                      </Text>
                    </Card>
                  </Col>
                </Row>
              )
            }
          ]}
        />
      </Card>
    </div>
  );
};

export default ThongKeBaoCao;
