import { useState, useMemo } from 'react';
import {
  Card,
  Col,
  Row,
  Radio,
  Progress,
  List,
  Typography,
  Alert,
  Tabs,
  Button,
  Space,
  Tag,
  Divider,
  Result,
  message,
  Steps
} from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  SaveOutlined,
  PlayCircleOutlined,
  SyncOutlined,
  EyeOutlined
} from '@ant-design/icons';
import { MOCK_PUBLICATIONS } from '@/services/Publication/constant';
import { MOCK_PROJECTS } from '@/services/Project/constant';
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

const XetChucDanh = () => {
  const [selectedTitle, setSelectedTitle] = useState<'PGS' | 'GS'>('PGS');
  const [generating, setGenerating] = useState(false);
  const [dossierState, setDossierState] = useState<'none' | 'preview' | 'saved'>('none');

  // 1 & 2. Thu thập dữ liệu và tính điểm (Mock logic for QD 37/2018)
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

  const handleGenerateDossier = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setDossierState('preview');
      message.success('Đã nạp dữ liệu vào template biểu mẫu thành công!');
    }, 1500);
  };

  const renderScoring = () => (
    <div className="animate-fade-in">
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card title="Cấu hình & Tổng quan" bordered={false} className="shadow-sm">
            <div style={{ marginBottom: 24 }}>
              <Text strong style={{ display: 'block', marginBottom: 8 }}>Chọn mục tiêu xét:</Text>
              <Radio.Group
                value={selectedTitle}
                onChange={(e) => setSelectedTitle(e.target.value)}
                buttonStyle="solid"
              >
                <Radio.Button value="PGS">Phó Giáo Sư</Radio.Button>
                <Radio.Button value="GS">Giáo Sư</Radio.Button>
              </Radio.Group>
            </div>

            <div style={{ textAlign: 'center', margin: '32px 0' }}>
              <Progress
                type="dashboard"
                percent={evaluationResult.progressPercent}
                strokeColor={evaluationResult.isAllPassed ? '#52c41a' : '#1677ff'}
                size={180}
              />
              <Title level={4} style={{ marginTop: 16 }}>
                {evaluationResult.isAllPassed ? 'Đủ điều kiện nộp hồ sơ!' : 'Chưa đủ điều kiện'}
              </Title>
              {!evaluationResult.isAllPassed && (
                <Text type="secondary">Cần hoàn thiện thêm các tiêu chí báo đỏ</Text>
              )}
            </div>

            <Divider />
            <Text strong>Cơ cấu điểm công trình hiện tại:</Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text>Bài báo khoa học:</Text>
                <Text strong>{evaluationResult.articleScore} đ</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text>Đề tài NCKH:</Text>
                <Text strong>{evaluationResult.projectScore} đ</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text>Hướng dẫn NCS/ThS:</Text>
                <Text strong>{evaluationResult.supScore} đ</Text>
              </div>
              <Divider style={{ margin: '8px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text strong>TỔNG ĐIỂM:</Text>
                <Text strong style={{ color: '#1677ff', fontSize: 18 }}>{evaluationResult.totalScore} đ</Text>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={16}>
          <Card title="Kiểm tra điều kiện bắt buộc (Checklist)" bordered={false} className="shadow-sm">
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

            {!evaluationResult.isAllPassed && (
              <div style={{ marginTop: 24 }}>
                <Title level={5}>Gợi ý khắc phục khuyết điểm:</Title>
                <Alert
                  type="warning"
                  showIcon
                  message="Bạn cần hoàn thiện các hạng mục sau trước khi tạo hồ sơ:"
                  description={
                    <ul style={{ margin: 0, paddingLeft: 20 }}>
                      {evaluationResult.shortcomings.map((msg, idx) => (
                        <li key={idx}>
                          <Text>{msg}</Text>
                        </li>
                      ))}
                    </ul>
                  }
                />
              </div>
            )}

            {evaluationResult.isAllPassed && (
              <Alert
                type="success"
                showIcon
                message="Chúc mừng! Bạn đã đủ mọi điều kiện tối thiểu."
                description="Hệ thống đã mở khóa chức năng tự động trích xuất template hồ sơ để trình Hội đồng Giáo sư Nhà nước. Vui lòng chuyển sang tab 'Tạo Hồ sơ' để tiếp tục."
                style={{ marginTop: 24 }}
              />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );

  const renderDossierGeneration = () => {
    if (!evaluationResult.isAllPassed) {
      return (
        <Result
          status="warning"
          title="Tính năng bị khóa"
          subTitle="Bạn phải thỏa mãn toàn bộ các điều kiện xét chức danh ở tab 'Tính Điểm' mới có thể tiếp tục tự động tạo hồ sơ."
        />
      );
    }

    if (dossierState === 'none') {
      return (
        <Result
          icon={<FileWordOutlined style={{ color: '#1677ff' }} />}
          title="Sẵn sàng tạo Hồ sơ điện tử"
          subTitle={`Dữ liệu khoa học của bạn đã đủ kiều kiện xét ${RULES[selectedTitle].titleName}. Hệ thống sẽ điền dữ liệu vào form Mẫu số 01-HDGSNN.`}
          extra={
            <Button
              type="primary"
              size="large"
              icon={generating ? <SyncOutlined spin /> : <PlayCircleOutlined />}
              onClick={handleGenerateDossier}
              disabled={generating}
            >
              {generating ? 'Đang tổng hợp dữ liệu...' : 'Bắt đầu tạo hồ sơ'}
            </Button>
          }
        />
      );
    }

    return (
      <Card title="Workspace Lưu trữ Hồ sơ" >
        <Steps
          current={dossierState === 'saved' ? 3 : 2}
          items={[
            { title: 'Kiểm tra điều kiện', description: 'Đã hoàn thành' },
            { title: 'Trích xuất dữ liệu DB', description: 'Hoàn tất binding' },
            { title: 'Preview & Hiệu đính', description: 'Đang thao tác' },
            { title: 'Lưu & Nộp Hội đồng', description: 'Hoàn tất' },
          ]}
          style={{ marginBottom: 32 }}
        />

        <Alert
          message="Hồ sơ đã được khởi tạo thành công!"
          description="Dữ liệu về Quá trình đào tạo, Kinh nghiệm giảng dạy và Danh mục công trình khoa học đã được map chi tiết vào Document. Hãy kiểm tra lại bản draft bên dưới."
          type="info"
          showIcon
          style={{ marginBottom: 24 }}
        />

        <div style={{ background: '#f5f5f5', padding: 32, borderRadius: 8, textAlign: 'center', border: '1px dashed #d9d9d9' }}>
          <FilePdfOutlined style={{ fontSize: 48, color: '#ff4d4f', marginBottom: 16 }} />
          <Title level={4}>Ban_Dang_Ky_XCD_{selectedTitle}_2024.pdf</Title>
          <Text type="secondary">Cập nhật lần cuối: Vừa xong | Kích thước: ~2.4 MB</Text>

          <div style={{ marginTop: 24 }}>
            <Space size="middle">
              <Button type="primary" icon={<EyeOutlined />}>Preview (Xem trước)</Button>
              <Button icon={<FilePdfOutlined />}>Xuất chuẩn PDF</Button>
              <Button icon={<FileWordOutlined />}>Xuất DOCX (Cho phép sửa)</Button>
            </Space>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Button
            type="primary"
            size="large"
            icon={<SaveOutlined />}
            onClick={() => {
              setDossierState('saved');
              message.success('Đã lưu trạng thái hồ sơ vào cơ sở dữ liệu!');
            }}
          >
            Lưu trạng thái hồ sơ hiện tại
          </Button>
        </div>
      </Card>
    );
  };

  return (
    <div style={{ padding: '0 16px' }}>
      <Title level={3} style={{ marginBottom: 24 }}>
        Thẩm Định Hồ Sơ & Xét Chức Danh (QĐ 37/2018)
      </Title>

      <Tabs
        type="card"
        items={[
          {
            key: 'scoring',
            label: '1. Tính Điểm & Điều Kiện',
            children: renderScoring(),
          },
          {
            key: 'dossier',
            label: '2. Khởi Tạo Hồ Sơ',
            children: renderDossierGeneration(),
          }
        ]}
      />
    </div>
  );
};

export default XetChucDanh;
