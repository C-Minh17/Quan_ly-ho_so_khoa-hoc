import {
  FileSearchOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
  EyeOutlined,
  SearchOutlined,
  GlobalOutlined,
  FilePdfOutlined,
  UserOutlined,
  CommentOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons';
import {
  Button,
  Card,
  Descriptions,
  Divider,
  Modal,
  Input,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
  Tabs,
  Badge,
  Timeline,
  Row,
  Col,
  Alert,
  Form,
  Input as AntDeisgnInput
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { MOCK_SCIENTIFIC_WORKS } from '@/services/KiemDuyet/constant';

const { Text, Title } = Typography;
const { TextArea } = AntDeisgnInput;

const KiemDuyetPage = () => {
  const [activeTab, setActiveTab] = useState('ALL');
  const [searchText, setSearchText] = useState('');
  const [selectedWork, setSelectedWork] = useState<MKiemDuyet.IScientificWork | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [actionModalVisible, setActionModalVisible] = useState(false);
  const [currentAction, setCurrentAction] = useState<'APPROVE' | 'REJECT' | 'SUPPLEMENT' | null>(null);
  const [form] = Form.useForm();

  const filteredData = MOCK_SCIENTIFIC_WORKS.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.userName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.userId.toLowerCase().includes(searchText.toLowerCase());

    if (activeTab === 'ALL') return matchesSearch;
    return matchesSearch && item.status === activeTab;
  });

  const getStatusTag = (status: MKiemDuyet.ReviewStatus) => {
    switch (status) {
      case 'PENDING':
        return <Tag color="processing" icon={<SyncOutlined spin />}>Chờ duyệt</Tag>;
      case 'APPROVED':
        return <Tag color="success" icon={<CheckCircleOutlined />}>Đã duyệt</Tag>;
      case 'REJECTED':
        return <Tag color="error" icon={<CloseCircleOutlined />}>Từ chối</Tag>;
      case 'SUPPLEMENT_REQUESTED':
        return <Tag color="warning" icon={<SyncOutlined />}>Yêu cầu bổ sung</Tag>;
      case 'FINAL_REVIEW':
        return <Tag color="purple" icon={<SafetyCertificateOutlined />}>Chờ duyệt cuối</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  const getWorkTypeTag = (type: MKiemDuyet.WorkType) => {
    const map: Record<string, { label: string, color: string }> = {
      'ARTICLE': { label: 'Bài báo', color: 'blue' },
      'CONFERENCE': { label: 'Hội nghị', color: 'cyan' },
      'PROJECT': { label: 'Đề tài', color: 'green' },
      'BOOK': { label: 'Sách', color: 'orange' },
      'PATENT': { label: 'Sáng chế', color: 'magenta' },
    };
    return <Tag color={map[type]?.color}>{map[type]?.label}</Tag>;
  };

  const showDetail = (record: MKiemDuyet.IScientificWork) => {
    setSelectedWork(record);
    setModalVisible(true);
  };

  const handleAction = (action: 'APPROVE' | 'REJECT' | 'SUPPLEMENT') => {
    setCurrentAction(action);
    setActionModalVisible(true);
  };

  const onConfirmAction = (values: any) => {
    console.log('Action:', currentAction, 'Values:', values, 'For:', selectedWork?.id);
    setActionModalVisible(false);
    setModalVisible(false);
  };

  const columns: ColumnsType<MKiemDuyet.IScientificWork> = [
    {
      title: 'STT',
      key: 'stt',
      width: 50,
      align: 'center',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Loại công trình',
      dataIndex: 'type',
      width: 120,
      render: (type: MKiemDuyet.WorkType) => getWorkTypeTag(type),
    },
    {
      title: 'Tên công trình/Đề tài',
      dataIndex: 'title',
      ellipsis: true,
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: 'Người nộp',
      key: 'user',
      width: 180,
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <Text>{record.userName}</Text>
          <Text type="secondary" style={{ fontSize: '12px' }}>{record.userId}</Text>
        </Space>
      ),
    },
    {
      title: 'Ngày nộp',
      dataIndex: 'submissionDate',
      width: 110,
      align: 'center',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      width: 150,
      render: (status: MKiemDuyet.ReviewStatus) => getStatusTag(status),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 100,
      align: 'center',
      fixed: 'right',
      render: (_, record) => (
        <Tooltip title="Kiểm duyệt">
          <Button
            type="primary"
            shape="circle"
            icon={<FileSearchOutlined />}
            onClick={() => showDetail(record)}
          />
        </Tooltip>
      ),
    },
  ];

  const renderWorkDetails = (work: MKiemDuyet.IScientificWork) => {
    const { details, type } = work;

    switch (type) {
      case 'ARTICLE': {
        const d = details as MKiemDuyet.ArticleDetails;
        return (
          <Descriptions column={2} bordered size="small">
            <Descriptions.Item label="Tên tạp chí" span={2} labelStyle={{ backgroundColor: '#f9f9f9', fontWeight: 500, width: '150px' }}>{d.journalName}</Descriptions.Item>
            <Descriptions.Item label="ISSN" labelStyle={{ backgroundColor: '#f9f9f9', fontWeight: 500, width: '150px' }}>{d.issn}</Descriptions.Item>
            <Descriptions.Item label="Chỉ số Q" labelStyle={{ backgroundColor: '#f9f9f9', fontWeight: 500, width: '150px' }}>{d.quartile || 'Chưa cập nhật'}</Descriptions.Item>
            <Descriptions.Item label="Tập/Số" labelStyle={{ backgroundColor: '#f9f9f9', fontWeight: 500, width: '150px' }}>{d.vol}({d.issue})</Descriptions.Item>
            <Descriptions.Item label="Trang" labelStyle={{ backgroundColor: '#f9f9f9', fontWeight: 500, width: '150px' }}>{d.pages}</Descriptions.Item>
            <Descriptions.Item label="DOI" span={2} labelStyle={{ backgroundColor: '#f9f9f9', fontWeight: 500, width: '150px' }}>{d.doi || '—'}</Descriptions.Item>
          </Descriptions>
        );
      }
      case 'PROJECT': {
        const d = details as MKiemDuyet.ProjectDetails;
        return (
          <Descriptions column={2} bordered size="small">
            <Descriptions.Item label="Tên đề tài" span={2} labelStyle={{ backgroundColor: '#f9f9f9', fontWeight: 500, width: '150px' }}>{d.projectName}</Descriptions.Item>
            <Descriptions.Item label="Mã số" labelStyle={{ backgroundColor: '#f9f9f9', fontWeight: 500, width: '150px' }}>{d.projectCode}</Descriptions.Item>
            <Descriptions.Item label="Vai trò" labelStyle={{ backgroundColor: '#f9f9f9', fontWeight: 500, width: '150px' }}>{d.role}</Descriptions.Item>
            <Descriptions.Item label="Thời gian" labelStyle={{ backgroundColor: '#f9f9f9', fontWeight: 500, width: '150px' }}>{d.duration}</Descriptions.Item>
            <Descriptions.Item label="CQ cấp kinh phí" labelStyle={{ backgroundColor: '#f9f9f9', fontWeight: 500, width: '150px' }}>{d.fundingAgency}</Descriptions.Item>
          </Descriptions>
        );
      }
      case 'BOOK': {
        const d = details as MKiemDuyet.BookDetails;
        return (
          <Descriptions column={2} bordered size="small">
            <Descriptions.Item label="Nhà xuất bản" span={2} labelStyle={{ backgroundColor: '#f9f9f9', fontWeight: 500, width: '150px' }}>{d.publisher}</Descriptions.Item>
            <Descriptions.Item label="ISBN" labelStyle={{ backgroundColor: '#f9f9f9', fontWeight: 500, width: '150px' }}>{d.isbn}</Descriptions.Item>
            <Descriptions.Item label="Lần xuất bản" labelStyle={{ backgroundColor: '#f9f9f9', fontWeight: 500, width: '150px' }}>{d.edition}</Descriptions.Item>
          </Descriptions>
        );
      }
      default:
        return <Text italic>Thông tin chi tiết chưa có template hiển thị</Text>;
    }
  };

  const items = [
    { key: 'ALL', label: <Badge count={MOCK_SCIENTIFIC_WORKS.length} offset={[12, -2]}>Tất cả</Badge> },
    { key: 'PENDING', label: <Badge count={MOCK_SCIENTIFIC_WORKS.filter(i => i.status === 'PENDING').length} offset={[12, -2]} status="processing">Chờ duyệt</Badge> },
    { key: 'FINAL_REVIEW', label: <Badge count={MOCK_SCIENTIFIC_WORKS.filter(i => i.status === 'FINAL_REVIEW').length} offset={[12, -2]} status="warning">Final Review</Badge> },
    { key: 'SUPPLEMENT_REQUESTED', label: 'Bổ sung' },
    { key: 'APPROVED', label: 'Đã duyệt' },
    { key: 'REJECTED', label: 'Từ chối' },
  ];

  return (
    <div style={{ padding: '24px', minHeight: '100vh' }}>
      <Row gutter={[16, 16]} align="middle" style={{ marginBottom: 24 }}>
        <Col flex="auto">
          <Title level={3} style={{ margin: 0 }}>
            <SafetyCertificateOutlined style={{ marginRight: 12, color: '#1890ff' }} />
            Dashboard Kiểm duyệt Công trình Khoa học
          </Title>
          <Text type="secondary">Phê duyệt, quản lý và xác thực tính chính xác của dữ liệu khoa học</Text>
        </Col>
        <Col>
          <Input
            placeholder="Tìm kiếm tên, mã cán bộ..."
            prefix={<SearchOutlined />}
            style={{ width: 300, borderRadius: '6px' }}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
          />
        </Col>
      </Row>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={items}
        style={{ marginBottom: 16 }}
      />

      <Table<MKiemDuyet.IScientificWork>
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        onRow={(record) => ({
          onDoubleClick: () => showDetail(record),
        })}
      />

      <Modal
        title={
          <Space>
            <EyeOutlined />
            <span>Chi tiết kiểm duyệt: {selectedWork?.title}</span>
          </Space>
        }
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        width={1000}
        styles={{
          header: {
            borderBottom: '2px solid #f0f2f5',
            paddingBottom: '12px',
          },
          body: {
            paddingTop: '20px',
            maxHeight: '70vh',
            overflowY: 'auto',
          }
        }}
        footer={[
          <Button key="back" onClick={() => setModalVisible(false)}>
            Đóng
          </Button>,
          <Button key="supplement" danger ghost icon={<SyncOutlined />} onClick={() => handleAction('SUPPLEMENT')}>
            Yêu cầu bổ sung
          </Button>,
          <Button key="reject" danger icon={<CloseCircleOutlined />} onClick={() => handleAction('REJECT')}>
            Từ chối
          </Button>,
          <Button key="approve" type="primary" icon={<CheckCircleOutlined />} onClick={() => handleAction('APPROVE')}>
            Phê duyệt
          </Button>,
        ]}
      >
        {selectedWork && (
          <div className="review-detail-content">
            <Row gutter={24}>
              <Col span={16}>
                <Divider orientation="left" style={{ marginTop: 0 }}>Thông tin công trình</Divider>
                <div style={{ padding: '0 12px' }}>
                  <div style={{ marginBottom: 16 }}>
                    <Space direction="vertical" size={12}>
                      <div>
                        <Text type="secondary">Tác giả: </Text>
                        <Text strong>{selectedWork.authors.join(', ')}</Text>
                      </div>
                      <div>
                        <Text type="secondary">Loại công trình: </Text>
                        {getWorkTypeTag(selectedWork.type)}
                      </div>
                    </Space>
                  </div>
                  {renderWorkDetails(selectedWork)}
                </div>

                <Divider orientation="left">Thông tin người nộp</Divider>
                <Descriptions
                  column={2}
                  size="small"
                  style={{ marginBottom: 16, padding: '0 12px' }}
                  labelStyle={{ color: 'rgba(0,0,0,0.45)', fontWeight: 'normal', width: '80px' }}
                  contentStyle={{ fontWeight: 500 }}
                >
                  <Descriptions.Item label="Họ tên">{selectedWork.userName}</Descriptions.Item>
                  <Descriptions.Item label="Đơn vị">{selectedWork.affiliation}</Descriptions.Item>
                  <Descriptions.Item label="Mã số">{selectedWork.userId}</Descriptions.Item>
                  <Descriptions.Item label="Lĩnh vực">
                    <Space size={[4, 8]} wrap>
                      {selectedWork.tags.map((t: string) => <Tag key={t} style={{ margin: 0 }}>{t}</Tag>)}
                    </Space>
                  </Descriptions.Item>
                </Descriptions>

                <Divider orientation="left">File minh chứng & Tài liệu</Divider>
                <Space direction="vertical" style={{ width: '100%' }}>
                  {selectedWork.evidenceFiles.map((file: string, idx: number) => (
                    <Button key={idx} type="dashed" block icon={<FilePdfOutlined />} style={{ textAlign: 'left' }}>
                      Minh chứng_{idx + 1}.pdf (Click để xem)
                    </Button>
                  ))}
                </Space>
              </Col>

              <Col span={8}>
                <Divider orientation="left" style={{ marginTop: 0 }}>Kiểm tra dữ liệu</Divider>
                <Card size="small" style={{ marginBottom: 16 }}>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Alert
                      message={selectedWork.duplicateCheckResult || "Chưa quét trùng lặp"}
                      type={selectedWork.duplicateCheckResult?.includes('Trùng lặp') ? "warning" : "success"}
                      showIcon
                      style={{ padding: '8px' }}
                    />
                    <Button block icon={<GlobalOutlined />} href={`https://www.scopus.com/search/submit.uri?field1=TITLE&value1=${selectedWork.title}`} target="_blank">
                      Tra cứu Scopus
                    </Button>
                    <Button block icon={<SearchOutlined />} href={`https://scholar.google.com/scholar?q=${selectedWork.title}`} target="_blank">
                      Google Scholar
                    </Button>
                  </Space>
                </Card>

                {selectedWork.status === 'APPROVED' && (
                  <Card
                    size="small"
                    styles={{ body: { padding: '4px 16px', paddingBottom: 16 } }}
                    style={{
                      marginTop: 16,
                      textAlign: 'center',
                      background: '#f6ffed',
                      borderColor: '#b7eb8f',
                      height: 'fit-content',

                    }}
                  >
                    <Statistic title="Điểm tự động tích lũy" value={selectedWork.score || 0} precision={1} suffix="điểm" />
                  </Card>
                )}
              </Col>
            </Row>
          </div>
        )}
      </Modal>

      <Modal
        title={
          currentAction === 'APPROVE' ? 'Xác nhận phê duyệt' :
            currentAction === 'REJECT' ? 'Xác nhận từ chối' :
              'Yêu cầu bổ sung thông tin'
        }
        open={actionModalVisible}
        onCancel={() => setActionModalVisible(false)}
        onOk={() => form.submit()}
        okText="Xác nhận"
        cancelText="Hủy"
        okButtonProps={{
          danger: currentAction !== 'APPROVE',
          icon: currentAction === 'APPROVE' ? <CheckCircleOutlined /> : <CommentOutlined />
        }}
      >
        <Form form={form} layout="vertical" onFinish={onConfirmAction}>
          <Form.Item
            name="comment"
            label={currentAction === 'APPROVE' ? "Ghi chú (tùy chọn)" : "Lý do / Hướng dẫn bổ sung"}
            rules={[{ required: currentAction !== 'APPROVE', message: 'Vui lòng nhập nội dung phản hồi' }]}
          >
            <TextArea rows={4} placeholder="Nhập nội dung gửi đến người dùng..." />
          </Form.Item>
          {currentAction === 'APPROVE' && (
            <Form.Item name="score_override" label="Chỉnh sửa điểm (mặc định theo quy định)">
              <Input type="number" step={0.1} placeholder="Cài đặt điểm" />
            </Form.Item>
          )}
        </Form>
      </Modal>

    </div>
  );
};

const Statistic = ({ title, value, precision, suffix }: any) => (
  <div style={{ padding: '4px 0' }}>
    <div style={{ fontSize: '14px', color: 'rgba(0,0,0,0.45)', lineHeight: 1.5 }}>{title}</div>
    <div style={{ fontSize: '22px', color: '#52c41a', fontWeight: 'bold', lineHeight: 1.2 }}>
      {value.toFixed(precision)} <span style={{ fontSize: '14px', fontWeight: 'normal' }}>{suffix}</span>
    </div>
  </div>
);

export default KiemDuyetPage;
