import StatisticsCard from '@/components/StatisticsCard';
import { MOCK_PROJECTS } from '@/services/Project/constant';
import {
  CheckCircleOutlined,
  DashboardOutlined,
  ProjectOutlined,
  SafetyCertificateOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { Button, Card, Table, Tag, Tooltip, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { Text } = Typography;


const formatMonthYear = (dateStr?: string) => {
  if (!dateStr) return '—';
  const [y, m] = dateStr.split('-');
  return `${m}/${y}`;
};

const DeTaiKhoaHoc = () => {
  const completedCount = MOCK_PROJECTS.filter((p) => p.status === 'Đã nghiệm thu').length;
  const ongoingCount = MOCK_PROJECTS.filter((p) => p.status === 'Đang thực hiện').length;
  const hasEvidence = MOCK_PROJECTS.filter((p) => p.evidenceFileId).length;

  const columns: ColumnsType<MProject.IRecord> = [
    {
      title: 'TT',
      key: 'stt',
      width: 55,
      align: 'center',
      render: (_: unknown, __: MProject.IRecord, idx: number) => idx + 1,
    },
    {
      title: 'Mã đề tài',
      dataIndex: 'projectId',
      width: 110,
    },
    {
      title: 'Tên đề tài',
      dataIndex: 'title',
      width: 320,
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'Cấp quản lý',
      dataIndex: 'level',
      width: 120,
      align: 'center',
      filters: ['Quốc gia', 'Bộ', 'Ngành', 'Cơ sở', 'Quỹ'].map((l) => ({ text: l, value: l })),
      onFilter: (value, record) => record.level === value,
      render: (level: string) => <Tag color={"blue"}>{level}</Tag>,
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      width: 100,
      align: 'center',
      filters: ['PI', 'co-PI', 'member'].map((l) => ({ text: l, value: l })),
      onFilter: (value, record) => record.role === value,
      render: (role?: string) =>
        role ? <Tag color={"blue"}>{role}</Tag> : '—',
    },
    {
      title: 'Từ ngày',
      dataIndex: 'startDate',
      width: 120,
      align: 'center',
      sorter: (a, b) => (a.startDate ?? '').localeCompare(b.startDate ?? ''),
      render: (date?: string) => <Text>{formatMonthYear(date)}</Text>,
    },
    {
      title: 'Đến ngày',
      dataIndex: 'endDate',
      width: 120,
      align: 'center',
      sorter: (a, b) => (a.endDate ?? '').localeCompare(b.endDate ?? ''),
      render: (date?: string) => <Text>{formatMonthYear(date)}</Text>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      width: 140,
      align: 'center',
      filters: ['Đang thực hiện', 'Đã nghiệm thu', 'Đình chỉ'].map((l) => ({ text: l, value: l })),
      onFilter: (value, record) => record.status === value,
      render: (status?: string) =>
        status ? <Tag color={"blue"}>{status}</Tag> : '—',
    },
    {
      title: 'Kết quả',
      dataIndex: 'acceptanceResult',
      width: 110,
      align: 'center',
      filters: ['Xuất sắc', 'Đạt', 'Không đạt'].map((l) => ({ text: l, value: l })),
      onFilter: (value, record) => record.acceptanceResult === value,
      render: (res?: string) =>
        res ? (
          <Text type={res === 'Xuất sắc' ? 'success' : res === 'Không đạt' ? 'danger' : 'secondary'}>
            {res}
          </Text>
        ) : (
          '—'
        ),
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
            Chưa có
          </Text>
        ),
    },
  ];

  const statsData = [
    {
      title: 'Tổng đề tài',
      value: MOCK_PROJECTS.length,
      icon: <ProjectOutlined />,
      valueColor: '#1677ff',
    },
    {
      title: 'Đã nghiệm thu',
      value: completedCount,
      icon: <CheckCircleOutlined />,
      valueColor: '#17C229',
    },
    {
      title: 'Đang thực hiện',
      value: ongoingCount,
      icon: <DashboardOutlined />,
      valueColor: '#FFAF0B',
    },
    {
      title: 'Có minh chứng',
      value: hasEvidence,
      icon: <SafetyCertificateOutlined />,
      valueColor: '#722ed1',
    },
  ];

  return (
    <Card variant='borderless' styles={{ body: { padding: 24 } }}>
      <StatisticsCard
        title='Thống kê Đề tài khoa học'
        data={statsData}
        hideCard
        colSpan={{ xs: 24, sm: 12, md: 6 }}
        borderleft
        containerStyle={{ marginBottom: 16 }}
      />
      <Table<MProject.IRecord>
        columns={columns}
        dataSource={MOCK_PROJECTS}
        rowKey='projectId'
        size='middle'
        bordered
        scroll={{ x: 1215 }}
        pagination={{ pageSize: 10, showTotal: (total) => `Tổng: ${total}` }}
      />
    </Card>
  );
};

export default DeTaiKhoaHoc;
