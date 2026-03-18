import StatisticsCard from '@/components/StatisticsCard';
import { MOCK_PUBLICATIONS } from '@/services/Publication/constant';
import {
  BookOutlined,
  ContainerOutlined,
  EyeOutlined,
  SafetyCertificateOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { Button, Card, Space, Table, Tag, Tooltip, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { Text } = Typography;


const formatAuthors = (authors?: any[]) => {
  if (!authors || !authors.length) return '—';
  const sorted = [...authors].sort((a, b) => a.order - b.order);
  return sorted.map((a) => (
    <span key={a.fullName}>
      {a.fullName}
      {a.order < sorted.length ? ', ' : ''}
    </span>
  ));
};

const BaiBaoKhoaHoc = () => {
  const journalCount = MOCK_PUBLICATIONS.filter((p) => p.type === 'journal_article').length;
  const q1q2Count = MOCK_PUBLICATIONS.filter((p) => p.quartile === 'Q1' || p.quartile === 'Q2').length;
  const hasEvidence = MOCK_PUBLICATIONS.filter((p) => p.evidenceFileId).length;

  const columns: ColumnsType<MPublication.IRecord> = [
    {
      title: 'TT',
      key: 'stt',
      width: 55,
      align: 'center',
      render: (_: unknown, __: MPublication.IRecord, idx: number) => idx + 1,
    },
    {
      title: 'Tên ấn phẩm',
      dataIndex: 'title',
      width: 280,
      sorter: (a, b) => a.title.localeCompare(b.title),

    },
    {
      title: 'Ngày XB',
      dataIndex: 'publicationDate',
      width: 100,
      align: 'center',
      sorter: (a, b) => (a.publicationDate ?? '').localeCompare(b.publicationDate ?? ''),
    },
    {
      title: 'Năm XB',
      dataIndex: 'year',
      width: 80,
      align: 'center',
      sorter: (a, b) => a.year - b.year,
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      width: 140,
      align: 'center',
      onFilter: (value, record) => record.type === value,
      render: (type: string) => (
        <Tag color="blue">{type}</Tag>
      ),
    },
    {
      title: 'Tác giả',
      dataIndex: 'authors',
      width: 250,
      render: (authors: any[]) => (
        <Text style={{ maxWidth: 230, whiteSpace: 'pre-wrap' }}>
          {formatAuthors(authors)}
        </Text>
      ),
    },
    {
      title: 'Tạp chí',
      dataIndex: 'journalTitle',
      width: 200,
      render: (t?: string) => t ? <Text italic>{t}</Text> : '—',
    },
    {
      title: 'Kỷ yếu hội nghị',
      dataIndex: 'proceedingsTitle',
      width: 200,
      render: (t?: string) => t ? <Text italic>{t}</Text> : '—',
    },
    {
      title: 'ISSN',
      dataIndex: 'issn',
      width: 120,
    },
    {
      title: 'eISSN',
      dataIndex: 'eIssn',
      width: 120,
    },
    {
      title: 'ISBN',
      dataIndex: 'isbn',
      width: 130,
    },
    {
      title: 'Tập (Volume)',
      dataIndex: 'volume',
      width: 110,
    },
    {
      title: 'Số (Issue)',
      dataIndex: 'issue',
      width: 100,
    },
    {
      title: 'Trang',
      dataIndex: 'pages',
      width: 110,
    },
    {
      title: 'DOI',
      dataIndex: 'doi',
      width: 180,
    },
    {
      title: 'Lượt trích dẫn',
      dataIndex: 'citationCount',
      width: 130,
      align: 'center',
    },
    {
      title: 'Tự trích dẫn',
      dataIndex: 'selfCitationCount',
      width: 120,
      align: 'center',
    },
    {
      title: 'Chỉ mục',
      dataIndex: 'indexing',
      width: 130,
      align: 'center',
      render: (indexing?: string[]) =>
        indexing?.length ? (
          <Space size={4} wrap style={{ justifyContent: 'center' }}>
            {indexing.map((idx) => (
              <Tag color='blue' key={idx} style={{ margin: 0 }}>
                {idx}
              </Tag>
            ))}
          </Space>
        ) : (
          '-'
        ),
    },
    {
      title: 'Xếp hạng',
      dataIndex: 'quartile',
      width: 100,
      align: 'center',
      filters: ['Q1', 'Q2', 'Q3', 'Q4'].map((q) => ({ text: q, value: q })),
      onFilter: (value, record) => record.quartile === value,
      render: (q?: string) =>
        q ? <Tag color='blue'>{q}</Tag> : '—',
    },
    {
      title: 'Điểm',
      dataIndex: 'hdgsPointYear',
      width: 80,
      align: 'center',
      sorter: (a, b) => (a.hdgsPointYear || 0) - (b.hdgsPointYear || 0),
      render: (point?: number) => (point ? <Text strong>{point}</Text> : '—'),
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
      title: 'Tổng bài báo/sách',
      value: MOCK_PUBLICATIONS.length,
      icon: <BookOutlined />,
      valueColor: '#1677ff',
    },
    {
      title: 'Tạp chí khoa học',
      value: journalCount,
      icon: <ContainerOutlined />,
      valueColor: '#17C229',
    },
    {
      title: 'Thuộc Q1/Q2',
      value: q1q2Count,
      icon: <StarOutlined />,
      valueColor: '#eb2f96',
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
        title='Thống kê Ấn phẩm khoa học'
        data={statsData}
        hideCard
        colSpan={{ xs: 24, sm: 12, md: 6 }}
        borderleft
        containerStyle={{ marginBottom: 16 }}
      />
      <Table<MPublication.IRecord>
        columns={columns}
        dataSource={MOCK_PUBLICATIONS}
        rowKey='pubId'
        size='middle'
        bordered
        scroll={{ x: 2800 }}
        pagination={{ pageSize: 10, showTotal: (total) => `Tổng: ${total}` }}
      />
    </Card>
  );
};

export default BaiBaoKhoaHoc;
