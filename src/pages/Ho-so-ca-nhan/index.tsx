import {
  BankOutlined,
  BookOutlined,
  GlobalOutlined,
  IdcardOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  TrophyOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Card, Col, Descriptions, Divider, Row, Space, Tag, Typography } from 'antd';

const { Title, Text } = Typography;

const fakeUser: MUser.IRecord = {
  userId: 'USR-2024-001',
  fullName: 'Nguyễn Văn An',
  nameAscii: 'Nguyen Van An',
  gender: 'Nam',
  dob: '1985-04-12',
  nationalId: '079085012345',
  orcid: '0000-0002-1825-0097',
  externalIds: {
    scopusId: '57212345678',
    webOfScienceId: 'AAB-1234-2021',
    googleScholarId: 'abcXYZ123',
  },
  affiliationPrimary: 'Trường Đại học Khoa học Tự nhiên – ĐHQG TP.HCM',
  departments: ['Khoa Công nghệ Thông tin', 'Phòng Quản lý Khoa học'],
  academicRankCurrent: 'Phó Giáo sư',
  degreeHighest: 'Tiến sĩ',
  politicalTheoryStatus: 'Cao cấp',
  foreignLanguageCerts: [
    { language: 'Tiếng Anh', cert: 'IELTS', score: '7.5' },
    { language: 'Tiếng Pháp', cert: 'DELF B2', score: 'B2' },
  ],
};

const formatDob = (dob?: string) => {
  if (!dob) return '—';
  const [y, m, d] = dob.split('-');
  return `${d}/${m}/${y}`;
};

const getRankColor = (rank?: string) => {
  if (!rank) return 'default';
  if (rank === 'Giáo sư') return 'red';
  if (rank === 'Phó Giáo sư') return 'volcano';
  if (rank === 'Giảng viên chính') return 'orange';
  return 'blue';
};

const getDegreeColor = (degree: string) => {
  if (degree === 'Tiến sĩ Khoa học') return 'purple';
  if (degree === 'Tiến sĩ') return 'geekblue';
  if (degree === 'Thạc sĩ') return 'cyan';
  return 'default';
};

const HoSoCaNhan = () => {
  const u = fakeUser;

  const InlineLabel = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
    <Space size={4}>
      {icon}
      <Text type='secondary'>{text}</Text>
    </Space>
  );

  return (
    <Card variant='borderless' styles={{ body: { height: '100%', padding: '24px' } }}>
      <div
        style={{
          background: 'linear-gradient(135deg, #1677ff 0%, #0958d9 100%)',
          borderRadius: 12,
          padding: '32px 28px',
          marginBottom: 24,
          boxShadow: '0 6px 24px rgba(22,119,255,0.25)',
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          flexWrap: 'wrap',
        }}
      >
        <Avatar
          size={96}
          icon={<UserOutlined />}
          style={{
            backgroundColor: 'rgba(255,255,255,0.25)',
            border: '3px solid rgba(255,255,255,0.6)',
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1, minWidth: 200 }}>
          <Title level={3} style={{ color: '#fff', margin: 0, marginBottom: 6 }}>
            {u.fullName}
          </Title>
          <Space wrap size={8}>
            {u.academicRankCurrent && (
              <Tag color='gold' style={{ fontWeight: 600 }}>
                {u.academicRankCurrent}
              </Tag>
            )}
            <Tag color='blue' style={{ fontWeight: 600 }}>
              {u.degreeHighest}
            </Tag>
            {u.gender && (
              <Tag
                color={u.gender === 'Nam' ? 'cyan' : 'pink'}
                style={{ fontWeight: 600 }}
              >
                {u.gender}
              </Tag>
            )}
          </Space>
          <div style={{ marginTop: 10 }}>
            <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14 }}>
              <BankOutlined style={{ marginRight: 6 }} />
              {u.affiliationPrimary}
            </Text>
          </div>
        </div>
        <div style={{ textAlign: 'right', color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>
          <div>ID: {u.userId}</div>
        </div>
      </div>

      <Row gutter={[20, 20]}>
        <Col xs={24} lg={12}>
          <Card
            size='small'
            title={
              <Space>
                <IdcardOutlined style={{ color: '#1677ff' }} />
                Thông tin cá nhân
              </Space>
            }
            style={{ borderRadius: 10, height: '100%' }}
          >
            <Descriptions column={1} size='small'>
              <Descriptions.Item
                label={<InlineLabel icon={<UserOutlined />} text='Họ và tên' />}
              >
                <Text strong>{u.fullName}</Text>
              </Descriptions.Item>
              {u.nameAscii && (
                <Descriptions.Item
                  label={
                    <InlineLabel
                      icon={<UserOutlined />}
                      text='Tên không dấu'
                    />
                  }
                >
                  {u.nameAscii}
                </Descriptions.Item>
              )}
              {u.dob && (
                <Descriptions.Item
                  label={
                    <InlineLabel icon={<IdcardOutlined />} text='Ngày sinh' />
                  }
                >
                  {formatDob(u.dob)}
                </Descriptions.Item>
              )}
              {u.gender && (
                <Descriptions.Item
                  label={
                    <InlineLabel icon={<UserOutlined />} text='Giới tính' />
                  }
                >
                  {u.gender}
                </Descriptions.Item>
              )}
              {u.nationalId && (
                <Descriptions.Item
                  label={
                    <InlineLabel icon={<IdcardOutlined />} text='CCCD / CMT' />
                  }
                >
                  <Text copyable>{u.nationalId}</Text>
                </Descriptions.Item>
              )}
            </Descriptions>
          </Card>
        </Col>

        {/* ── Học vị & Chức danh ── */}
        <Col xs={24} lg={12}>
          <Card
            size='small'
            title={
              <Space>
                <TrophyOutlined style={{ color: '#faad14' }} />
                Học vị &amp; Chức danh
              </Space>
            }
            style={{ borderRadius: 10, height: '100%' }}
          >
            <Descriptions column={1} size='small'>
              <Descriptions.Item
                label={
                  <InlineLabel icon={<BookOutlined />} text='Bằng cấp cao nhất' />
                }
              >
                <Tag color={getDegreeColor(u.degreeHighest)}>{u.degreeHighest}</Tag>
              </Descriptions.Item>
              {u.academicRankCurrent && (
                <Descriptions.Item
                  label={
                    <InlineLabel
                      icon={<TrophyOutlined />}
                      text='Chức danh hiện tại'
                    />
                  }
                >
                  <Tag color={getRankColor(u.academicRankCurrent)}>
                    {u.academicRankCurrent}
                  </Tag>
                </Descriptions.Item>
              )}
              {u.politicalTheoryStatus && (
                <Descriptions.Item
                  label={
                    <InlineLabel
                      icon={<SafetyCertificateOutlined />}
                      text='Lý luận chính trị'
                    />
                  }
                >
                  <Tag color='green'>{u.politicalTheoryStatus}</Tag>
                </Descriptions.Item>
              )}
            </Descriptions>
          </Card>
        </Col>

        {/* ── Đơn vị công tác ── */}
        <Col xs={24} lg={12}>
          <Card
            size='small'
            title={
              <Space>
                <TeamOutlined style={{ color: '#52c41a' }} />
                Đơn vị công tác
              </Space>
            }
            style={{ borderRadius: 10, height: '100%' }}
          >
            <Descriptions column={1} size='small'>
              <Descriptions.Item
                label={
                  <InlineLabel
                    icon={<BankOutlined />}
                    text='Cơ quan chính'
                  />
                }
              >
                {u.affiliationPrimary}
              </Descriptions.Item>
              {u.departments && Array.isArray(u.departments) && (
                <Descriptions.Item
                  label={
                    <InlineLabel icon={<TeamOutlined />} text='Phòng/Khoa' />
                  }
                >
                  <Space wrap>
                    {u.departments.map((dep: string) => (
                      <Tag key={dep} color='geekblue'>
                        {dep}
                      </Tag>
                    ))}
                  </Space>
                </Descriptions.Item>
              )}
            </Descriptions>
          </Card>
        </Col>

        {/* ── Định danh khoa học ── */}
        <Col xs={24} lg={12}>
          <Card
            size='small'
            title={
              <Space>
                <GlobalOutlined style={{ color: '#722ed1' }} />
                Định danh khoa học
              </Space>
            }
            style={{ borderRadius: 10, height: '100%' }}
          >
            <Descriptions column={1} size='small'>
              {u.orcid && (
                <Descriptions.Item label='ORCID'>
                  <Text copyable>{u.orcid}</Text>
                </Descriptions.Item>
              )}
              {u.externalIds?.scopusId && (
                <Descriptions.Item label='Scopus ID'>
                  <Text copyable>{u.externalIds.scopusId}</Text>
                </Descriptions.Item>
              )}
              {u.externalIds?.webOfScienceId && (
                <Descriptions.Item label='Web of Science'>
                  <Text copyable>{u.externalIds.webOfScienceId}</Text>
                </Descriptions.Item>
              )}
              {u.externalIds?.googleScholarId && (
                <Descriptions.Item label='Google Scholar'>
                  <Text copyable>{u.externalIds.googleScholarId}</Text>
                </Descriptions.Item>
              )}
            </Descriptions>
          </Card>
        </Col>

        {/* ── Ngoại ngữ ── */}
        {u.foreignLanguageCerts && Array.isArray(u.foreignLanguageCerts) && (
          <Col xs={24}>
            <Card
              size='small'
              title={
                <Space>
                  <GlobalOutlined style={{ color: '#13c2c2' }} />
                  Chứng chỉ ngoại ngữ
                </Space>
              }
              style={{ borderRadius: 10 }}
            >
              <Row gutter={[12, 12]}>
                {u.foreignLanguageCerts.map(
                  (cert: { language: string; cert: string; score: string }) => (
                    <Col key={cert.language} xs={24} sm={12} md={8}>
                      <div
                        style={{
                          background:
                            'linear-gradient(135deg,#f0f9ff 0%,#e6f7ff 100%)',
                          borderRadius: 8,
                          padding: '12px 16px',
                          border: '1px solid #bae7ff',
                        }}
                      >
                        <div
                          style={{
                            fontWeight: 600,
                            marginBottom: 4,
                            color: '#1677ff',
                          }}
                        >
                          {cert.language}
                        </div>
                        <Space size={4}>
                          <Text type='secondary'>Chứng chỉ:</Text>
                          <Tag color='blue'>{cert.cert}</Tag>
                        </Space>
                        <div style={{ marginTop: 4 }}>
                          <Space size={4}>
                            <Text type='secondary'>Điểm / Cấp:</Text>
                            <Text strong>{cert.score}</Text>
                          </Space>
                        </div>
                      </div>
                    </Col>
                  ),
                )}
              </Row>
            </Card>
          </Col>
        )}
      </Row>

      <Divider style={{ marginTop: 24, marginBottom: 8 }} />
      <Text type='secondary' style={{ fontSize: 12 }}>
        Người dùng: {u.userId} · Dữ liệu minh họa (fake data)
      </Text>
    </Card>
  );
};

export default HoSoCaNhan;
