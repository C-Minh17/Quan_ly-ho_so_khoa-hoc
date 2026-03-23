import StatisticsCard from '@/components/StatisticsCard';
import ChucDanhProgress from '@/components/ChucDanhProgress';
import { MOCK_POSITION_HISTORY } from '@/services/PositionHistory/constant';
import {
  ApartmentOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  EyeOutlined,
  HistoryOutlined,
} from '@ant-design/icons';
import { Badge, Button, Card, Table, Tooltip, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { Text } = Typography;

const isCurrent = (r: MPositionHistory.IRecord) => !r.endDate;

const formatMonth = (d?: string) => {
  if (!d) return '—';
  const [y, m] = d.split('-');
  return `${m}/${y}`;
};


const CongTac = () => {
  const currentCount = MOCK_POSITION_HISTORY.filter(isCurrent).length;
  const endedCount = MOCK_POSITION_HISTORY.length - currentCount;
  const hasDecision = MOCK_POSITION_HISTORY.filter((r) => r.decisionFileId).length;

  const columns: ColumnsType<MPositionHistory.IRecord> = [
    {
      title: 'TT',
      key: 'stt',
      width: 55,
      align: 'center',
      render: (_: unknown, __: MPositionHistory.IRecord, idx: number) => idx + 1,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'endDate',
      width: 140,
      align: 'center',
      filters: [
        { text: 'Đang công tác', value: 'current' },
        { text: 'Đã kết thúc', value: 'ended' },
      ],
      onFilter: (value, record) =>
        value === 'current' ? isCurrent(record) : !isCurrent(record),
      render: (_: unknown, record: MPositionHistory.IRecord) =>
        isCurrent(record) ? (
          <Badge
            status='success'
            text={
              <Text style={{ color: '#17C229', fontWeight: 600, fontSize: 12 }}>
                Đang công tác
              </Text>
            }
          />
        ) : (
          <Badge
            status='default'
            text={<Text type='secondary' style={{ fontSize: 12 }}>Đã kết thúc</Text>}
          />
        ),
    },
    {
      title: 'Chức vụ',
      dataIndex: 'title',
      width: 180,
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'Đơn vị công tác',
      dataIndex: 'unit',
      width: 300,
    },
    {
      title: 'Từ ngày',
      dataIndex: 'startDate',
      width: 100,
      align: 'center',
      sorter: (a, b) => a.startDate.localeCompare(b.startDate),
      render: (date: string) => formatMonth(date),
    },
    {
      title: 'Đến ngày',
      dataIndex: 'endDate',
      width: 100,
      align: 'center',
      render: (date?: string) => (date ? formatMonth(date) : 'Hiện tại'),
    },
    {
      title: 'Mã chức vụ',
      dataIndex: 'positionId',
      width: 130,
      align: 'center',
    },
    {
      title: 'Bằng chứng (QĐ)',
      dataIndex: 'decisionFileId',
      width: 120,
      align: 'center',
      render: (fileId?: string) =>
        fileId ? (
          <Tooltip title={`Quyết định: ${fileId}`}>
            <Button size='small' type='link' icon={<EyeOutlined />}>
              Xem QĐ
            </Button>
          </Tooltip>
        ) : (
          <Text type='secondary' style={{ fontSize: 12 }}>—</Text>
        ),
    },
  ];

  const statsData = [
    {
      title: 'Tổng số vị trí',
      value: MOCK_POSITION_HISTORY.length,
      icon: <HistoryOutlined />,
      valueColor: '#1677ff',
    },
    {
      title: 'Đang công tác',
      value: currentCount,
      icon: <CheckCircleOutlined />,
      valueColor: '#17C229',
    },
    {
      title: 'Đã kết thúc',
      value: endedCount,
      icon: <ClockCircleOutlined />,
      valueColor: '#8c8c8c',
    },
    {
      title: 'Có quyết định',
      value: hasDecision,
      icon: <ApartmentOutlined />,
      valueColor: '#FFAF0B',
    },
  ];

  return (
    <Card variant='borderless' styles={{ body: { padding: 24 } }}>
      <ChucDanhProgress />
      <StatisticsCard
        title='Thống kê Công tác'
        data={statsData}
        hideCard
        colSpan={{ xs: 24, sm: 12, md: 6 }}
        borderleft
        containerStyle={{ marginBottom: 16 }}
      />

      <Table<MPositionHistory.IRecord>
        columns={columns}
        dataSource={MOCK_POSITION_HISTORY}
        rowKey='positionId'
        size='middle'
        bordered
        scroll={{ x: 1125 }}
        pagination={{ pageSize: 10, showTotal: (total) => `Tổng: ${total}` }}
      />
    </Card>
  );
};

export default CongTac;
