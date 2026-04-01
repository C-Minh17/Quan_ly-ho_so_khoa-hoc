import { MOCK_USERS } from '@/services/User/constant';
import {
  UserOutlined,
  SolutionOutlined,
  EyeOutlined,
  SearchOutlined,
  ReadOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Descriptions, Divider, Modal, Input, Row, Space, Table, Tag, Tooltip, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

const { Text, Title } = Typography;

const QuanLyNguoiDung = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedUser, setSelectedUser] = useState<MUser.IRecord | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const filteredUsers = MOCK_USERS.filter((user) =>
    user.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
    user.userId.toLowerCase().includes(searchText.toLowerCase()) ||
    user.affiliationPrimary.toLowerCase().includes(searchText.toLowerCase())
  );

  const showDetail = (record: MUser.IRecord) => {
    setSelectedUser(record);
    setModalVisible(true);
  };

  const columns: ColumnsType<MUser.IRecord> = [
    {
      title: 'STT',
      key: 'stt',
      width: 60,
      align: 'center',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Mã cán bộ',
      dataIndex: 'userId',
      width: 120,
      sorter: (a, b) => a.userId.localeCompare(b.userId),
    },
    {
      title: 'Họ và tên',
      dataIndex: 'fullName',
      width: 200,
      render: (text, record) => (
        <Space direction='vertical' size={0}>
          <Text strong>{text}</Text>
        </Space>
      ),
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      width: 100,
      align: 'center',
      render: (gender: string) => (
        <Tag color={gender === 'Nam' ? 'blue' : gender === 'Nữ' ? 'magenta' : 'default'}>
          {gender}
        </Tag>
      ),
      filters: [
        { text: 'Nam', value: 'Nam' },
        { text: 'Nữ', value: 'Nữ' },
      ],
      onFilter: (value: any, record) => record.gender === value,
    },
    {
      title: 'Học hàm/Học vị',
      key: 'rankDegree',
      width: 200,
      render: (_, record) => (
        <Space direction='vertical' size={0}>
          {record.academicRankCurrent && <Tag color='gold'>{record.academicRankCurrent}</Tag>}
          <Tag color='cyan'>{record.degreeHighest}</Tag>
        </Space>
      ),
    },
    {
      title: 'Đơn vị công tác',
      dataIndex: 'affiliationPrimary',
      width: 250,
      ellipsis: true,
    },
    {
      title: 'Lý luận CT',
      dataIndex: 'politicalTheoryStatus',
      width: 120,
      align: 'center',
      render: (status) => status && <Tag color='purple'>{status}</Tag>,
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 80,
      align: 'center',
      fixed: 'right',
      render: (_, record) => (
        <Tooltip title='Xem chi tiết'>
          <Button
            type='link'
            icon={<EyeOutlined />}
            onClick={() => showDetail(record)}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <div style={{ padding: '0px' }}>
      <Title level={3} style={{ margin: 0 }}>Danh sách người dùng</Title>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <Input
          placeholder='Tìm kiếm họ tên, mã cán bộ...'
          prefix={<SearchOutlined />}
          style={{ width: 300 }}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
        />
      </div>
      <Table<MUser.IRecord>
        columns={columns}
        dataSource={filteredUsers}
        rowKey='userId'
        bordered
        scroll={{ x: 1200 }}
        pagination={{
          pageSize: 10,
          showTotal: (total) => `Tổng cộng ${total} người dùng`,
          showSizeChanger: true,
        }}
      />

      <Modal
        title='Thông tin chi tiết người dùng'
        onCancel={() => setModalVisible(false)}
        open={modalVisible}
        width={800}
        footer={null}
        destroyOnClose
      >
        {selectedUser && (
          <div className='user-detail-modal'>
            <Title level={4}>
              <UserOutlined style={{ marginRight: 8 }} />
              {selectedUser.fullName}
            </Title>
            <Text type='secondary'>{selectedUser.userId}</Text>

            <Divider orientation='left'>Thông tin cá nhân</Divider>
            <Descriptions column={2} bordered size='small'>
              <Descriptions.Item label='Giới tính'>{selectedUser.gender}</Descriptions.Item>
              <Descriptions.Item label='Ngày sinh'>{selectedUser.dob}</Descriptions.Item>
              <Descriptions.Item label='Số CMND/CCCD'>{selectedUser.nationalId || '—'}</Descriptions.Item>
              <Descriptions.Item label='ORCID'>{selectedUser.orcid || '—'}</Descriptions.Item>
              <Descriptions.Item label='Đơn vị chính' span={2}>{selectedUser.affiliationPrimary}</Descriptions.Item>
            </Descriptions>

            <Divider orientation='left'>Học hàm & Học vị</Divider>
            <Descriptions column={1} bordered size='small'>
              <Descriptions.Item label='Học hàm hiện tại'>{selectedUser.academicRankCurrent || '—'}</Descriptions.Item>
              <Descriptions.Item label='Học vị cao nhất'>{selectedUser.degreeHighest}</Descriptions.Item>
              <Descriptions.Item label='Lý luận chính trị'>{selectedUser.politicalTheoryStatus || '—'}</Descriptions.Item>
            </Descriptions>

            {selectedUser.departments && selectedUser.departments.length > 0 && (
              <>
                <Divider orientation='left'>Phòng ban / Đơn vị</Divider>
                <Table
                  dataSource={selectedUser.departments}
                  pagination={false}
                  size='small'
                  bordered
                  columns={[
                    { title: 'Tên đơn vị', dataIndex: 'name', key: 'name' },
                    { title: 'Chức vụ', dataIndex: 'role', key: 'role', render: (val) => val || 'Thành viên' },
                  ]}
                  rowKey={(record: any) => record.name}
                />
              </>
            )}

            {selectedUser.externalIds && Object.keys(selectedUser.externalIds).length > 0 && (
              <>
                <Divider orientation='left'>Định danh khoa học</Divider>
                <Row gutter={[16, 16]}>
                  {selectedUser.externalIds.scopusAuthorId && (
                    <Col span={12}>
                      <Card size='small' hoverable title={<><GlobalOutlined /> Scopus ID</>}>
                        <Text copyable>{selectedUser.externalIds.scopusAuthorId}</Text>
                      </Card>
                    </Col>
                  )}
                  {selectedUser.externalIds.wosResearcherId && (
                    <Col span={12}>
                      <Card size='small' hoverable title={<><SolutionOutlined /> WoS ID</>}>
                        <Text copyable>{selectedUser.externalIds.wosResearcherId}</Text>
                      </Card>
                    </Col>
                  )}
                  {selectedUser.externalIds.googleScholarId && (
                    <Col span={12}>
                      <Card size='small' hoverable title={<><ReadOutlined /> Google Scholar</>}>
                        <Text copyable>{selectedUser.externalIds.googleScholarId}</Text>
                      </Card>
                    </Col>
                  )}
                </Row>
              </>
            )}

            {selectedUser.foreignLanguageCerts && selectedUser.foreignLanguageCerts.length > 0 && (
              <>
                <Divider orientation='left'>Chứng chỉ ngoại ngữ</Divider>
                <Table
                  dataSource={selectedUser.foreignLanguageCerts}
                  pagination={false}
                  size='small'
                  bordered
                  columns={[
                    { title: 'Loại chứng chỉ', dataIndex: 'type', key: 'type' },
                    { title: 'Điểm số', dataIndex: 'score', key: 'score' },
                    { title: 'Ngày cấp', dataIndex: 'issuedDate', key: 'issuedDate' },
                    { title: 'Nơi cấp', dataIndex: 'issuedBy', key: 'issuedBy' },
                  ]}
                  rowKey={(record: any) => `${record.type}-${record.issuedDate}`}
                />
              </>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default QuanLyNguoiDung;
