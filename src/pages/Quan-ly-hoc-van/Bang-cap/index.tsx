import StatisticsCard from '@/components/StatisticsCard';
import ChucDanhProgress from '@/components/ChucDanhProgress';
import { MOCK_DEGREES } from '@/services/Degree/constant';
import {
  BankOutlined,
  BookOutlined,
  CalendarOutlined,
  EyeOutlined,
  FileTextOutlined,
  GlobalOutlined,
  SafetyCertificateOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, List, Row, Space, Tag, Tooltip, Typography } from 'antd';

const { Text, Title } = Typography;

const formatDate = (d?: string) => {
  if (!d) return '—';
  const [y, m, day] = d.split('-');
  return `${day}/${m}/${y}`;
};

const LEVEL_COLOR: Record<string, { bg: string; color: string; border: string }> = {
  'Cử nhân': { bg: '#e6f4ff', color: '#1677ff', border: '#91caff' },
  'Kỹ sư': { bg: '#f6ffed', color: '#52c41a', border: '#b7eb8f' },
  'Thạc sĩ': { bg: '#fff7e6', color: '#fa8c16', border: '#ffd591' },
  'Tiến sĩ': { bg: '#f9f0ff', color: '#722ed1', border: '#d3adf7' },
  'Tiến sĩ Khoa học': { bg: '#fff0f6', color: '#c41d7f', border: '#ffadd2' },
};

const BangCap = () => {
  const hasFile = MOCK_DEGREES.filter((d) => d.diplomaFileId).length;
  const noFile = MOCK_DEGREES.length - hasFile;

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
        containerStyle={{ marginBottom: 20 }}
      />

      <List
        dataSource={MOCK_DEGREES}
        rowKey='degreeId'
        itemLayout='vertical'
        renderItem={(record, index) => {
          const levelStyle = LEVEL_COLOR[record.level] ?? {
            bg: '#fafafa',
            color: '#595959',
            border: '#d9d9d9',
          };

          return (
            <List.Item style={{ padding: 0, marginBottom: 12, border: 'none' }}>
              <Card
                styles={{ body: { padding: '14px 20px' } }}
                style={{ borderRadius: 10, border: '1px solid #f0f0f0' }}
                hoverable
              >
                <Row align='middle' gutter={[16, 0]} wrap={false}>
                  {/* Index badge */}
                  <Col flex='none'>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: levelStyle.bg,
                        border: `1.5px solid ${levelStyle.border}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: 14,
                        color: levelStyle.color,
                      }}
                    >
                      {index + 1}
                    </div>
                  </Col>

                  {/* Main content */}
                  <Col flex='auto' style={{ minWidth: 0 }}>
                    {/* Header */}
                    <Space align='center' style={{ marginBottom: 6, flexWrap: 'wrap' }}>
                      <Tag
                        style={{
                          background: levelStyle.bg,
                          color: levelStyle.color,
                          border: `1px solid ${levelStyle.border}`,
                          borderRadius: 6,
                          fontWeight: 600,
                          fontSize: 12,
                          padding: '1px 10px',
                          margin: 0,
                        }}
                      >
                        {record.level}
                      </Tag>
                      <Title level={5} style={{ margin: 0, fontSize: 15, fontWeight: 600, color: '#1a1a2e' }}>
                        {record.major}
                      </Title>
                    </Space>

                    {/* Detail row */}
                    <Row gutter={[12, 4]}>
                      <Col xs={24}>
                        <Space size={6}>
                          <BankOutlined style={{ color: '#1677ff', fontSize: 13 }} />
                          <Text style={{ fontSize: 13 }}>{record.institution}</Text>
                        </Space>
                      </Col>
                      <Col xs={24}>
                        <Space size={6}>
                          <GlobalOutlined style={{ color: '#52c41a', fontSize: 13 }} />
                          <Text style={{ fontSize: 13 }}>{record.country}</Text>
                        </Space>
                      </Col>
                      <Col xs={24}>
                        <Space size={6}>
                          <CalendarOutlined style={{ color: '#fa8c16', fontSize: 13 }} />
                          <Text style={{ fontSize: 13 }}>{formatDate(record.graduationDate)}</Text>
                        </Space>
                      </Col>

                      {record.thesisTitle && (
                        <Col xs={24}>
                          <Space size={6} align='start'>
                            <FileTextOutlined style={{ color: '#722ed1', fontSize: 13, marginTop: 2 }} />
                            <Text italic style={{ fontSize: 13, color: '#595959' }}>
                              {record.thesisTitle}
                            </Text>
                          </Space>
                        </Col>
                      )}
                    </Row>
                  </Col>

                  {/* Action */}
                  <Col flex='none'>
                    {record.diplomaFileId ? (
                      <Tooltip title={`File ID: ${record.diplomaFileId}`}>
                        <Button
                          type='primary'
                          size='small'
                          icon={<EyeOutlined />}
                          style={{ borderRadius: 8, fontSize: 12 }}
                        >
                          Xem file
                        </Button>
                      </Tooltip>
                    ) : (
                      <Tag color='warning' style={{ fontSize: 11, borderRadius: 6, margin: 0 }}>
                        Chưa có file
                      </Tag>
                    )}
                  </Col>
                </Row>
              </Card>
            </List.Item>
          );
        }}
      />
    </Card>
  );
};

export default BangCap;
