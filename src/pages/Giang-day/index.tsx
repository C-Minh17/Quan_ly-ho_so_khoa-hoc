import StatisticsCard from '@/components/StatisticsCard';
import { MOCK_TEACHING } from '@/services/Teaching/constant';
import {
  BookOutlined,
  ClockCircleOutlined,
  EyeOutlined,
  NumberOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { Button, Card, Table, Tag, Tooltip, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { Text } = Typography;

const GiangDay = () => {
  const totalCredits = MOCK_TEACHING.reduce((acc, curr) => acc + (curr.credits || 0), 0);
  const totalHours = MOCK_TEACHING.reduce((acc, curr) => acc + (curr.hoursEquiv || 0), 0);

  const evaluatedCount = MOCK_TEACHING.filter((t) => typeof t.evaluationScore === 'number').length;
  const avgScore = evaluatedCount > 0
    ? (MOCK_TEACHING.reduce((acc, curr) => acc + (curr.evaluationScore || 0), 0) / evaluatedCount).toFixed(2)
    : 0;

  const columns: ColumnsType<MTeaching.IRecord> = [
    {
      title: 'TT',
      key: 'stt',
      width: 55,
      align: 'center',
      render: (_: unknown, __: MTeaching.IRecord, idx: number) => idx + 1,
    },
    {
      title: 'Mã giảng dạy',
      dataIndex: 'teachId',
      width: 130,
    },
    {
      title: 'Năm học',
      dataIndex: 'academicYear',
      width: 110,
      align: 'center',
      sorter: (a, b) => a.academicYear.localeCompare(b.academicYear),
    },
    {
      title: 'Học kỳ',
      dataIndex: 'semester',
      width: 90,
      align: 'center',
      filters: ['HK1', 'HK2', 'HK3'].map(s => ({ text: s, value: s })),
      onFilter: (value, record) => record.semester === value,
    },
    {
      title: 'Mã học phần',
      dataIndex: 'courseCode',
      width: 120,
      align: 'center',
      sorter: (a, b) => (a.courseCode || '').localeCompare(b.courseCode || ''),
    },
    {
      title: 'Tên học phần',
      dataIndex: 'courseName',
      width: 250,
      sorter: (a, b) => a.courseName.localeCompare(b.courseName),
    },
    {
      title: 'Số tín chỉ',
      dataIndex: 'credits',
      width: 100,
      align: 'center',
      sorter: (a, b) => a.credits - b.credits,
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      width: 100,
      align: 'center',
      filters: ['Chính', 'Phụ'].map(r => ({ text: r, value: r })),
      onFilter: (value, record) => record.role === value,
      render: (role?: string) => role ? <Tag color={role === 'Chính' ? 'purple' : 'default'}>{role}</Tag> : '—',
    },
    {
      title: 'Số giờ quy đổi',
      dataIndex: 'hoursEquiv',
      width: 130,
      align: 'center',
      sorter: (a, b) => (a.hoursEquiv || 0) - (b.hoursEquiv || 0),
    },
    {
      title: 'Điểm đánh giá',
      dataIndex: 'evaluationScore',
      width: 130,
      align: 'center',
      sorter: (a, b) => (a.evaluationScore || 0) - (b.evaluationScore || 0),
      render: (score?: number) => score ? <Text type="success" strong>{score}</Text> : '—',
    },
    {
      title: 'Minh chứng',
      dataIndex: 'evidenceFileId',
      width: 110,
      align: 'center',
      render: (fileId?: string) =>
        fileId ? (
          <Tooltip title={`File ID: ${fileId}`}>
            <Button size='small' type='link' icon={<EyeOutlined />}>
              Xem file
            </Button>
          </Tooltip>
        ) : (
          <Text type='secondary' style={{ fontSize: 12 }}>
            —
          </Text>
        ),
    },
  ];

  const statsData = [
    {
      title: 'Tổng số lớp',
      value: MOCK_TEACHING.length,
      icon: <BookOutlined />,
      valueColor: '#1677ff',
    },
    {
      title: 'Tổng số tín chỉ',
      value: totalCredits,
      icon: <NumberOutlined />,
      valueColor: '#17C229',
    },
    {
      title: 'Tổng giờ quy đổi',
      value: totalHours,
      icon: <ClockCircleOutlined />,
      valueColor: '#722ed1',
    },
    {
      title: 'Điểm đánh giá TB',
      value: avgScore,
      icon: <StarOutlined />,
      valueColor: '#eb2f96',
    },
  ];

  return (
    <Card variant='borderless' styles={{ body: { padding: 24 } }}>
      <StatisticsCard
        title='Thống kê Giảng dạy'
        data={statsData}
        hideCard
        colSpan={{ xs: 24, sm: 12, md: 6 }}
        borderleft
        containerStyle={{ marginBottom: 16 }}
      />
      <Table<MTeaching.IRecord>
        columns={columns}
        dataSource={MOCK_TEACHING}
        rowKey='teachId'
        size='middle'
        bordered
        scroll={{ x: 1325 }}
        pagination={{ pageSize: 10, showTotal: (total) => `Tổng: ${total}` }}
      />
    </Card>
  );
};

export default GiangDay;
