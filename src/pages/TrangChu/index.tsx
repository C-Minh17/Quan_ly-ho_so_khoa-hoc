import React from 'react';
import { Typography, Row, Col, Card, List, Avatar, Tag, Space, Table, Badge, Button, theme, Timeline, Progress } from 'antd';
import {
	FileTextOutlined,
	ProjectOutlined,
	DashboardOutlined,
	ArrowUpOutlined,
	BookOutlined,
	EditOutlined,
	ClockCircleOutlined,
	CheckCircleOutlined,
	ExclamationCircleOutlined,
	SendOutlined,
	TrophyOutlined
} from '@ant-design/icons';
import { MOCK_PUBLICATIONS } from '@/services/Publication/constant';
import { MOCK_USERS } from '@/services/User/constant';
import { MOCK_PROJECTS } from '@/services/Project/constant';
import { MOCK_SCORING_SNAPSHOTS } from '@/services/ScoringSnapshot/constant';
import { MOCK_AWARDS } from '@/services/Award/constant';

const { Title, Text, Paragraph } = Typography;

const TrangChu = () => {
	const { token } = theme.useToken();
	const currentUser = MOCK_USERS[0];
	const myScoring = MOCK_SCORING_SNAPSHOTS.find(s => s.userId === currentUser.userId);
	const myPublications = MOCK_PUBLICATIONS.filter(p => p.userId === currentUser.userId);
	const myProjects = MOCK_PROJECTS.filter(p => p.userId === currentUser.userId);
	const myAwards = MOCK_AWARDS;

	const stats = [
		{
			title: 'Tổng điểm đối chiếu',
			value: myScoring?.totalPoints || 0,
			icon: <DashboardOutlined />,
			color: '#1890ff',
			bg: '#e6f7ff',
			prefix: 'Điểm quy đổi'
		},
		{
			title: 'Công bố khoa học',
			value: myPublications.length,
			icon: <FileTextOutlined />,
			color: '#52c41a',
			bg: '#f6ffed',
			prefix: 'Bài báo'
		},
		{
			title: 'Đề tài Nghiên cứu',
			value: myProjects.length,
			icon: <ProjectOutlined />,
			color: '#722ed1',
			bg: '#f9f0ff',
			prefix: 'Dự án'
		},
		{
			title: 'Giải thưởng',
			value: myAwards.length,
			icon: <TrophyOutlined />,
			color: '#faad14',
			bg: '#fff7e6',
			prefix: 'Cấp quốc tế/QG'
		},
	];

	const SectionTitle = ({ children }: { children: React.ReactNode }) => (
		<div style={{
			fontSize: 18,
			fontWeight: 600,
			marginBottom: 20,
			color: '#262626',
			display: 'flex',
			alignItems: 'center',
			gap: 8
		}}>
			<div style={{ width: 4, height: 18, background: token.colorPrimary, borderRadius: 2 }} />
			{children}
		</div>
	);

	return (
		<div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
			{/* Personalized Banner */}
			<div style={{
				background: 'linear-gradient(135deg, #1890ff 0%, #001529 100%)',
				borderRadius: 12,
				padding: 32,
				color: '#fff',
				marginBottom: 24,
				boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
				position: 'relative',
				overflow: 'hidden'
			}}>
				<Row gutter={24} align="middle">
					<Col xs={24} md={16}>
						<Title level={2} style={{ color: '#fff', marginBottom: 8, marginTop: 0 }}>
							Xin chào, {currentUser.fullName}!
						</Title>
						{/* <Paragraph style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: 16, marginBottom: 24 }}>
							Hồ sơ xét chức danh <Text strong style={{ color: '#fff' }}>{currentUser.academicRankCurrent}</Text> của bạn đang ở bước:
							<Tag color="gold" style={{ marginLeft: 8, fontSize: 14, padding: '2px 10px' }}>Thẩm định cấp cơ sở</Tag>
						</Paragraph> */}
						<Space size="middle">
							<Button type="primary" size="large" icon={<EditOutlined />} style={{ borderRadius: 8, height: 45 }}>
								Cập nhật thông tin
							</Button>
							{/* <Button ghost size="large" icon={<SendOutlined />} style={{ borderRadius: 8, height: 45 }}>
								Xem thông báo xét
							</Button> */}
						</Space>
					</Col>
					<Col xs={0} md={8} style={{ textAlign: 'center' }}>
						<div style={{ position: 'relative', display: 'inline-block' }}>
							<Progress
								type="circle"
								percent={75}
								strokeColor="#ffec3d"
								trailColor="rgba(255, 255, 255, 0.1)"
								format={() => <span style={{ color: '#fff', fontSize: 24, fontWeight: 600 }}>75%</span>}
								width={120}
							/>
							<div style={{ color: '#fff', marginTop: 12, fontSize: 14 }}>Hồ sơ hoàn thiện</div>
						</div>
					</Col>
				</Row>
			</div>

			{/* Applicant Stats */}
			<Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
				{stats.map((item, index) => (
					<Col xs={24} sm={12} xl={6} key={index}>
						<Card hoverable style={{ borderRadius: 12, border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
							<div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
								<div style={{
									fontSize: 24,
									padding: 12,
									borderRadius: 12,
									backgroundColor: item.bg,
									color: item.color
								}}>
									{item.icon}
								</div>
								<div>
									<Text type="secondary" style={{ fontSize: 13, display: 'block' }}>{item.title}</Text>
									<div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
										<Text style={{ fontSize: 22, fontWeight: 700 }}>{item.value}</Text>
										<Text type="secondary" style={{ fontSize: 12 }}>{item.prefix}</Text>
									</div>
								</div>
							</div>
						</Card>
					</Col>
				))}
			</Row>

			<Row gutter={24}>
				{/* Left Column: My Assets */}
				<Col xs={24} lg={16}>
					{/* Scoring Detail Breakdown */}
					{/* <Card
						title={<SectionTitle>Chi tiết Điểm đối chiếu (Kỳ 2026)</SectionTitle>}
						style={{ borderRadius: 12, marginBottom: 24 }}
					>
						<Row gutter={[16, 16]}>
							<Col span={8}>
								<Statistic title="Công bố" value={myScoring?.byCategory.publications} suffix="/ 72" />
							</Col>
							<Col span={8}>
								<Statistic title="Đề tài" value={myScoring?.byCategory.projects} suffix="/ 18" />
							</Col>
							<Col span={8}>
								<Statistic title="Đào tạo" value={myScoring?.byCategory.teaching} suffix="/ 12.5" />
							</Col>
						</Row>
					</Card> */}

					{/* My Publications */}
					<Card title={<SectionTitle>Công bố của tôi</SectionTitle>} extra={<Button type="link">Xem đầy đủ</Button>} style={{ borderRadius: 12, marginBottom: 24 }}>
						<List
							dataSource={myPublications}
							renderItem={(item) => (
								<List.Item>
									<List.Item.Meta
										avatar={<Avatar shape="square" icon={<BookOutlined />} style={{ backgroundColor: '#f0f5ff', color: '#1890ff' }} size={40} />}
										title={<Text strong>{item.title}</Text>}
										description={
											<Space size={0} split={<Text type="secondary" style={{ margin: '0 8px' }}>|</Text>}>
												<Text type="secondary">{item.journalTitle || item.proceedingsTitle}</Text>
												<Tag style={{ border: 'none', backgroundColor: '#e6f7ff', color: '#1890ff' }}>{item.indexing?.[0]}</Tag>
												<Tag color="gold">{item.quartile}</Tag>
											</Space>
										}
									/>
									{/* <div style={{ textAlign: 'right' }}>
										<Text strong style={{ color: '#1890ff' }}>+{item.citationCount}</Text>
										<div style={{ fontSize: 11, color: '#8c8c8c' }}>Trích dẫn</div>
									</div> */}
								</List.Item>
							)}
						/>
					</Card>

					{/* My Projects */}
					<Card title={<SectionTitle>Đề tài/Dự án đang thực hiện</SectionTitle>} style={{ borderRadius: 12 }}>
						<Table
							dataSource={myProjects}
							pagination={false}
							size="small"
							columns={[
								{ title: 'Tên đề tài', dataIndex: 'title', key: 'title', ellipsis: true },
								{ title: 'Cấp', dataIndex: 'level', key: 'level', width: 100 },
								{
									title: 'Trạng thái',
									dataIndex: 'status',
									key: 'status',
									render: (status) => (
										<Badge status={status === 'Đang thực hiện' ? 'processing' : 'success'} text={status} />
									)
								}
							]}
						/>
					</Card>
				</Col>

				{/* Right Column: Process & Actions */}
				<Col xs={24} lg={8}>
					{/* Application Progress */}
					{/* <Card title={<SectionTitle>Tiến độ thẩm định hồ sơ</SectionTitle>} style={{ borderRadius: 12, marginBottom: 24 }}>
						<Timeline
							mode="left"
							items={[
								{
									label: '10/01/2024',
									children: 'Nộp hồ sơ thành công',
									color: 'green',
									dot: <CheckCircleOutlined />
								},
								{
									label: '15/01/2024',
									children: 'Thẩm định hồ sơ tại đơn vị',
									color: 'green',
									dot: <CheckCircleOutlined />
								},
								{
									label: 'Đang xử lý',
									children: 'Hội đồng chuyên môn đánh giá',
									color: 'blue',
									dot: <ClockCircleOutlined />
								},
								{
									children: 'Xét duyệt cấp Đại học',
									color: 'gray'
								},
								{
									children: 'Phê duyệt kết quả cuối cùng',
									color: 'gray'
								}
							]}
						/>
					</Card> */}

					{/* Notifications/Reminders */}
					{/* <Card title={<SectionTitle>Thông báo mới</SectionTitle>} style={{ borderRadius: 12, marginBottom: 24 }}>
						<List
							dataSource={[
								{ icon: <ExclamationCircleOutlined style={{ color: '#faad14' }} />, title: 'Yêu cầu bổ sung chứng chỉ ngoại ngữ', time: '2 ngày trước' },
								{ icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />, title: 'Điểm bài báo PUB-001 đã được xác nhận', time: '5 ngày trước' }
							]}
							renderItem={item => (
								<List.Item>
									<Space align="start">
										{item.icon}
										<div>
											<div style={{ fontWeight: 500, fontSize: 13 }}>{item.title}</div>
											<div style={{ fontSize: 11, color: '#8c8c8c' }}>{item.time}</div>
										</div>
									</Space>
								</List.Item>
							)}
						/>
					</Card> */}

					{/* Quick Shortcuts */}
					<Card title={<SectionTitle>Hành động nhanh</SectionTitle>} style={{ borderRadius: 12 }}>
						<Row gutter={[12, 12]}>
							<Col span={12}>
								<Button block style={{ height: 60, display: 'flex', flexDirection: 'column', padding: 8 }}>
									<EditOutlined />
									<span style={{ fontSize: 11, marginTop: 4 }}>Sửa hồ sơ</span>
								</Button>
							</Col>
							<Col span={12}>
								<Button block style={{ height: 60, display: 'flex', flexDirection: 'column', padding: 8 }}>
									<FileTextOutlined />
									<span style={{ fontSize: 11, marginTop: 4 }}>Thêm bài báo</span>
								</Button>
							</Col>
							<Col span={12}>
								<Button block style={{ height: 60, display: 'flex', flexDirection: 'column', padding: 8 }}>
									<BookOutlined />
									<span style={{ fontSize: 11, marginTop: 4 }}>Tải minh chứng</span>
								</Button>
							</Col>
							<Col span={12}>
								<Button block style={{ height: 60, display: 'flex', flexDirection: 'column', padding: 8 }}>
									<SendOutlined />
									<span style={{ fontSize: 11, marginTop: 4 }}>Gửi đơn xét</span>
								</Button>
							</Col>
						</Row>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default TrangChu;
