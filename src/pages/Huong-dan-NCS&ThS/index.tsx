import StatisticsCard from '@/components/StatisticsCard';
import ChucDanhProgress from '@/components/ChucDanhProgress';
import { MOCK_SUPERVISION } from '@/services/Supervision/constant';
import {
  CheckCircleOutlined,
  DashboardOutlined,
  TeamOutlined,
  TrophyOutlined,
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

const Supervision = () => {
  const phdCount = MOCK_SUPERVISION.filter((s) => s.level === 'Tiến sĩ').length;
  const defendedCount = MOCK_SUPERVISION.filter((s) => s.status === 'Đã bảo vệ').length;
  const ongoingCount = MOCK_SUPERVISION.filter((s) => s.status === 'Đang làm').length;

  const columns: ColumnsType<MSupervision.IRecord> = [
    {
      title: 'TT',
      key: 'stt',
      width: 55,
      align: 'center',
      render: (_: unknown, __: MSupervision.IRecord, idx: number) => idx + 1,
    },
    {
      title: 'Mã',
      dataIndex: 'supId',
      width: 100,
    },
    {
      title: 'Học viên / NCS',
      dataIndex: 'studentName',
      width: 180,
      sorter: (a, b) => a.studentName.localeCompare(b.studentName),
    },
    {
      title: 'Cấp bậc',
      dataIndex: 'level',
      width: 110,
      align: 'center',
      filters: ['Tiến sĩ', 'Thạc sĩ', 'Đại học'].map(l => ({ text: l, value: l })),
      onFilter: (value, record) => record.level === value,
      render: (level: string) => {
        const color = level === 'Tiến sĩ' ? 'magenta' : level === 'Thạc sĩ' ? 'cyan' : 'blue';
        return <Tag color={color}>{level}</Tag>;
      },
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      width: 170,
      align: 'center',
      filters: ['Hướng dẫn chính', 'Đồng hướng dẫn'].map(r => ({ text: r, value: r })),
      onFilter: (value, record) => record.role === value,
    },
    {
      title: 'Cơ sở đào tạo',
      dataIndex: 'institution',
      width: 250,
      sorter: (a, b) => (a.institution || '').localeCompare(b.institution || ''),
    },
    {
      title: 'Tên đề tài / Luận án',
      dataIndex: 'thesisTitle',
      width: 300,
    },
    {
      title: 'Từ ngày',
      dataIndex: 'startDate',
      width: 100,
      align: 'center',
      sorter: (a, b) => (a.startDate || '').localeCompare(b.startDate || ''),
      render: (date?: string) => formatMonthYear(date),
    },
    {
      title: 'Ngày bảo vệ',
      dataIndex: 'defenseDate',
      width: 100,
      align: 'center',
      sorter: (a, b) => (a.defenseDate || '').localeCompare(b.defenseDate || ''),
      render: (date?: string) => formatMonthYear(date),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      width: 120,
      align: 'center',
      filters: ['Đang làm', 'Đã bảo vệ', 'Dừng'].map(s => ({ text: s, value: s })),
      onFilter: (value, record) => record.status === value,
      render: (status?: string) => status ? <Tag color={status === 'Đang làm' ? 'processing' : status === 'Đã bảo vệ' ? 'success' : 'error'}>{status}</Tag> : '—',
    },
    {
      title: 'Minh chứng',
      dataIndex: 'decisionFileId',
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
          <Text type='secondary' style={{ fontSize: 12 }}>—</Text>
        ),
    },
  ];

  const statsData = [
    {
      title: 'Tổng số HV/NCS',
      value: MOCK_SUPERVISION.length,
      icon: <TeamOutlined />,
      valueColor: '#1677ff',
    },
    {
      title: 'Hướng dẫn Tiến sĩ',
      value: phdCount,
      icon: <TrophyOutlined />,
      valueColor: '#722ed1',
    },
    {
      title: 'Đã bảo vệ',
      value: defendedCount,
      icon: <CheckCircleOutlined />,
      valueColor: '#17C229',
    },
    {
      title: 'Đang làm',
      value: ongoingCount,
      icon: <DashboardOutlined />,
      valueColor: '#FFAF0B',
    },
  ];

  return (
    <Card variant='borderless' styles={{ body: { padding: 24 } }}>
      <ChucDanhProgress />
      <StatisticsCard
        title='Thống kê Hướng dẫn'
        data={statsData}
        hideCard
        colSpan={{ xs: 24, sm: 12, md: 6 }}
        borderleft
        containerStyle={{ marginBottom: 16 }}
      />
      <Table<MSupervision.IRecord>
        columns={columns}
        dataSource={MOCK_SUPERVISION}
        rowKey='supId'
        size='middle'
        bordered
        scroll={{ x: 1425 }}
        pagination={{ pageSize: 10, showTotal: (total) => `Tổng: ${total}` }}
      />
    </Card>
  );
};

export default Supervision;
