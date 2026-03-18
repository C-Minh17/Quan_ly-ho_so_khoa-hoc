import StatisticsCard from '@/components/StatisticsCard';
import { MOCK_AWARDS } from '@/services/Award/constant';
import {
  SafetyCertificateOutlined,
  TrophyOutlined,
  GlobalOutlined,
  StarOutlined,
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

const GiaiThuong = () => {
  const intlCount = MOCK_AWARDS.filter((a) => a.level === 'Quốc tế').length;
  const nationalCount = MOCK_AWARDS.filter((a) => a.level === 'Quốc gia').length;
  const hasEvidence = MOCK_AWARDS.filter((a) => a.evidenceFileId).length;

  const columns: ColumnsType<MAward.IRecord> = [
    {
      title: 'TT',
      key: 'stt',
      width: 55,
      align: 'center',
      render: (_: unknown, __: MAward.IRecord, idx: number) => idx + 1,
    },
    {
      title: 'Mã giải thưởng',
      dataIndex: 'awardId',
      width: 130,
    },
    {
      title: 'Tên giải thưởng',
      dataIndex: 'title',
      width: 350,
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'Cấp giải thưởng',
      dataIndex: 'level',
      width: 150,
      align: 'center',
      filters: ['Quốc tế', 'Quốc gia', 'Địa phương', 'Cơ sở giáo dục'].map((l) => ({ text: l, value: l })),
      onFilter: (value, record) => record.level === value,
      render: (level?: string) => (level ? <Tag color="blue">{level}</Tag> : '—'),
    },
    {
      title: 'Ngày nhận',
      dataIndex: 'date',
      width: 120,
      align: 'center',
      sorter: (a, b) => (a.date || '').localeCompare(b.date || ''),
      render: (date?: string) => formatMonthYear(date),
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
      title: 'Tổng số giải',
      value: MOCK_AWARDS.length,
      icon: <TrophyOutlined />,
      valueColor: '#1677ff',
    },
    {
      title: 'Cấp Quốc tế',
      value: intlCount,
      icon: <GlobalOutlined />,
      valueColor: '#eb2f96',
    },
    {
      title: 'Cấp Quốc gia',
      value: nationalCount,
      icon: <StarOutlined />,
      valueColor: '#17C229',
    },
    {
      title: 'Có minh chứng',
      value: hasEvidence,
      icon: <SafetyCertificateOutlined />,
      valueColor: '#FFAF0B',
    },
  ];

  return (
    <Card variant='borderless' styles={{ body: { padding: 24 } }}>
      <StatisticsCard
        title='Thống kê Giải thưởng'
        data={statsData}
        hideCard
        colSpan={{ xs: 24, sm: 12, md: 6 }}
        borderleft
        containerStyle={{ marginBottom: 16 }}
      />
      <Table<MAward.IRecord>
        columns={columns}
        dataSource={MOCK_AWARDS}
        rowKey='awardId'
        size='middle'
        bordered
        scroll={{ x: 1000 }}
        pagination={{ pageSize: 10, showTotal: (total) => `Tổng: ${total}` }}
      />
    </Card>
  );
};

export default GiaiThuong;
