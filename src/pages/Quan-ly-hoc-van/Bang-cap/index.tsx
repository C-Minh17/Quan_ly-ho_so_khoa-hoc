import StatisticsCard from '@/components/StatisticsCard';
import ChucDanhProgress from '@/components/ChucDanhProgress';
import { MOCK_DEGREES } from '@/services/Degree/constant';
import {
  BookOutlined,
  EyeOutlined,
  SafetyCertificateOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { Button, Card, Table, Tooltip, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { Text } = Typography;


const formatDate = (d?: string) => {
  if (!d) return '—';
  const [y, m, day] = d.split('-');
  return `${day}/${m}/${y}`;
};


const BangCap = () => {
  const hasFile = MOCK_DEGREES.filter((d) => d.diplomaFileId).length;
  const noFile = MOCK_DEGREES.length - hasFile;

  const columns: ColumnsType<MDegree.IRecord> = [
    {
      title: 'TT',
      key: 'stt',
      width: 55,
      align: 'center',
      render: (_: unknown, __: MDegree.IRecord, idx: number) => idx + 1,
    },
    {
      title: 'Trình độ',
      dataIndex: 'level',
      width: 150,
      filters: [
        { text: 'Cử nhân', value: 'Cử nhân' },
        { text: 'Kỹ sư', value: 'Kỹ sư' },
        { text: 'Thạc sĩ', value: 'Thạc sĩ' },
        { text: 'Tiến sĩ', value: 'Tiến sĩ' },
        { text: 'Tiến sĩ Khoa học', value: 'Tiến sĩ Khoa học' },
      ],
      onFilter: (value, record) => record.level === value,
    },
    {
      title: 'Chuyên ngành',
      dataIndex: 'major',
      width: 200,
    },
    {
      title: 'Cơ sở đào tạo',
      dataIndex: 'institution',
      width: 250,
      sorter: (a, b) => a.institution.localeCompare(b.institution),
    },
    {
      title: 'Quốc gia',
      dataIndex: 'country',
      width: 120,
    },
    {
      title: 'Tên luận văn / luận án',
      dataIndex: 'thesisTitle',
      width: 300,
      render: (title?: string) =>
        title ? (
          <Text ellipsis style={{ maxWidth: 280 }}>
            {title}
          </Text>
        ) : (
          <Text type='secondary'>—</Text>
        ),
    },
    {
      title: 'Năm tốt nghiệp',
      dataIndex: 'graduationDate',
      width: 130,
      align: 'center',
      sorter: (a, b) => (a.graduationDate ?? '').localeCompare(b.graduationDate ?? ''),
      render: (d?: string) => formatDate(d),
    },
    {
      title: 'Bằng chứng',
      dataIndex: 'diplomaFileId',
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
      title: 'Tổng bằng cấp',
      value: MOCK_DEGREES.length,
      icon: <BookOutlined />,
      valueColor: '#1677ff',
    },
    {
      title: 'Tiến sĩ / TSKH',
      value: MOCK_DEGREES.filter((d) => d.level === 'Tiến sĩ' || d.level === 'Tiến sĩ Khoa học').length,
      icon: <TrophyOutlined />,
      valueColor: '#722ed1',
    },
    {
      title: 'Có bằng chứng',
      value: hasFile,
      icon: <SafetyCertificateOutlined />,
      valueColor: '#17C229',
    },
    {
      title: 'Chưa có bằng chứng',
      value: noFile,
      icon: <SafetyCertificateOutlined />,
      valueColor: '#FFAF0B',
    },
  ];

  return (
    <Card variant='borderless' styles={{ body: { padding: 24 } }}>
      <ChucDanhProgress />
      <StatisticsCard
        title='Thống kê Bằng cấp'
        data={statsData}
        hideCard
        colSpan={{ xs: 24, sm: 12, md: 6 }}
        borderleft
        containerStyle={{ marginBottom: 16 }}
      />

      <Table<MDegree.IRecord>
        columns={columns}
        dataSource={MOCK_DEGREES}
        rowKey='degreeId'
        size='middle'
        bordered
        scroll={{ x: 1215 }}
        pagination={{ pageSize: 10, showTotal: (total) => `Tổng: ${total}` }}
      />
    </Card>
  );
};

export default BangCap;
