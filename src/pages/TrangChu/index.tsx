import React, { useMemo, useState } from 'react';
import { Typography, Row, Col, Card, List, Avatar, Tag, Space, Table, Badge, Button, theme, Timeline, Progress, Radio } from 'antd';
import {
	FileTextOutlined,
	ProjectOutlined,
	DashboardOutlined,
	BookOutlined,
	EditOutlined,
	SendOutlined,
	TrophyOutlined,
	CheckCircleOutlined,
	CloseCircleOutlined
} from '@ant-design/icons';
import { MOCK_PUBLICATIONS } from '@/services/Publication/constant';
import { MOCK_USERS } from '@/services/User/constant';
import { MOCK_PROJECTS } from '@/services/Project/constant';
import { MOCK_SCORING_SNAPSHOTS } from '@/services/ScoringSnapshot/constant';
import { MOCK_AWARDS } from '@/services/Award/constant';
import { MOCK_SUPERVISION } from '@/services/Supervision/constant';

const { Title, Text } = Typography;


const RULES = {
	PGS: {
		minScore: 20,
		minArticles: 3,
		minProjects: 1,
		minSupervision: 2,
		titleName: 'Phó Giáo Sư'
	},
	GS: {
		minScore: 40,
		minArticles: 5,
		minProjects: 2,
		minSupervision: 4,
		titleName: 'Giáo Sư'
	}
};
const TrangChu = () => {
	const { token } = theme.useToken();
	const currentUser = MOCK_USERS[0];
	const myScoring = MOCK_SCORING_SNAPSHOTS.find(s => s.userId === currentUser.userId);
	const myPublications = MOCK_PUBLICATIONS.filter(p => p.userId === currentUser.userId);
	const myProjects = MOCK_PROJECTS.filter(p => p.userId === currentUser.userId);
	const myAwards = MOCK_AWARDS;
	const [selectedTitle, setSelectedTitle] = useState<'PGS' | 'GS'>('PGS');


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

	const evaluationResult = useMemo(() => {
		// 3. Tính điểm từng loại công trình
		const articleScore = MOCK_PUBLICATIONS.length * 2.5; // Giả sử mỗi bài 2.5đ
		const projectScore = MOCK_PROJECTS.length * 2.0; // Giả sử mỗi đề tài 2.0đ
		const supScore = MOCK_SUPERVISION.length * 1.5; // Hướng dẫn 1.5đ

		// 4. Tổng hợp điểm
		const totalScore = articleScore + projectScore + supScore;

		const rule = RULES[selectedTitle];

		// 5 & 6. Kiểm tra các điều kiện
		const conditions = [
			{
				id: 'c1',
				name: 'Điểm công trình khoa học quy đổi',
				required: rule.minScore,
				current: totalScore,
				unit: 'điểm',
				passed: totalScore >= rule.minScore,
				failMsg: `Cần bổ sung thêm ${(rule.minScore - totalScore).toFixed(1)} điểm công trình.`
			},
			{
				id: 'c2',
				name: 'Bài báo khoa học (Q1, Q2, Q3 hoặc uy tín)',
				required: rule.minArticles,
				current: MOCK_PUBLICATIONS.length,
				unit: 'bài',
				passed: MOCK_PUBLICATIONS.length >= rule.minArticles,
				failMsg: `Cần công bố thêm tối thiểu ${rule.minArticles - MOCK_PUBLICATIONS.length} bài báo khoa học.`
			},
			{
				id: 'c3',
				name: 'Chủ trì đề tài cấp Bộ / Quốc gia',
				required: rule.minProjects,
				current: MOCK_PROJECTS.length,
				unit: 'đề tài',
				passed: MOCK_PROJECTS.length >= rule.minProjects,
				failMsg: `Cần chủ trì thêm ${rule.minProjects - MOCK_PROJECTS.length} đề tài cấp sơ cở trở lên.`
			},
			{
				id: 'c4',
				name: 'Hướng dẫn chính NCS hoặc Thạc sĩ',
				required: rule.minSupervision,
				current: MOCK_SUPERVISION.length,
				unit: 'học viên',
				passed: MOCK_SUPERVISION.length >= rule.minSupervision,
				failMsg: `Yêu cầu hướng dẫn bảo vệ thành công thêm ${rule.minSupervision - MOCK_SUPERVISION.length} học viên.`
			}
		];

		const isAllPassed = conditions.every((c) => c.passed);
		const passCount = conditions.filter((c) => c.passed).length;
		const progressPercent = Math.round((passCount / conditions.length) * 100);
		const shortcomings = conditions.filter(c => !c.passed).map(c => c.failMsg);

		return {
			totalScore,
			articleScore,
			projectScore,
			supScore,
			conditions,
			isAllPassed,
			progressPercent,
			shortcomings
		};
	}, [selectedTitle]);

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
						<Space size="middle">
							<Button type="primary" size="large" icon={<EditOutlined />} style={{ borderRadius: 8, height: 45 }}>
								Cập nhật thông tin
							</Button>

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
				<Col xs={24} lg={16}>
					<Card title={<SectionTitle>Tiến trình</SectionTitle>}
						extra={
							<Radio.Group
								value={selectedTitle}
								onChange={(e) => setSelectedTitle(e.target.value)}
								buttonStyle="solid"
							>
								<Radio.Button value="PGS">Phó Giáo Sư</Radio.Button>
								<Radio.Button value="GS">Giáo Sư</Radio.Button>
							</Radio.Group>
						}
						style={{ borderRadius: 12, marginBottom: 24 }}>
						<List
							itemLayout="horizontal"
							dataSource={evaluationResult.conditions}
							renderItem={(item) => (
								<List.Item>
									<List.Item.Meta
										avatar={
											item.passed
												? <CheckCircleOutlined style={{ color: '#52c41a', fontSize: 24 }} />
												: <CloseCircleOutlined style={{ color: '#ff4d4f', fontSize: 24 }} />
										}
										title={
											<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
												<Text strong style={{ fontSize: 16 }}>{item.name}</Text>
												<Tag color={item.passed ? 'success' : 'error'}>
													{item.passed ? 'ĐẠT' : 'CHƯA ĐẠT'}
												</Tag>
											</div>
										}
										description={
											<div style={{ marginTop: 8 }}>
												<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
													<Text>Mục tiêu: {item.required} {item.unit}</Text>
													<Text strong>Hiện có: {item.current} {item.unit}</Text>
												</div>
												<Progress
													percent={Math.min(100, Math.round((item.current / item.required) * 100))}
													status={item.passed ? 'success' : 'exception'}
													showInfo={false}
													strokeWidth={8}
												/>
											</div>
										}
									/>
								</List.Item>
							)}
						/>
					</Card>

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
								</List.Item>
							)}
						/>
					</Card>

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

				<Col xs={24} lg={8}>
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
