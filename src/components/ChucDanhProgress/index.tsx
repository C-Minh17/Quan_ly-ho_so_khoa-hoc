import React, { useMemo, useState } from 'react';
import { Card, Progress, Radio, Typography, Space, Tooltip, Badge } from 'antd';
import { MOCK_PUBLICATIONS } from '@/services/Publication/constant';
import { MOCK_PROJECTS } from '@/services/Project/constant';
import { MOCK_SUPERVISION } from '@/services/Supervision/constant';

const { Text } = Typography;

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

const ChucDanhProgress: React.FC = () => {
  const [selectedTitle, setSelectedTitle] = useState<'PGS' | 'GS'>('PGS');

  const evaluationResult = useMemo(() => {
    const articleScore = MOCK_PUBLICATIONS.length * 2.5;
    const projectScore = MOCK_PROJECTS.length * 2.0;
    const supScore = MOCK_SUPERVISION.length * 1.5;

    const totalScore = articleScore + projectScore + supScore;
    const rule = RULES[selectedTitle];

    const conditions = [
      {
        passed: totalScore >= rule.minScore,
        failMsg: `Thiếu ${(rule.minScore - totalScore).toFixed(1)} điểm.`
      },
      {
        passed: MOCK_PUBLICATIONS.length >= rule.minArticles,
        failMsg: `Thiếu ${rule.minArticles - MOCK_PUBLICATIONS.length} bài báo.`
      },
      {
        passed: MOCK_PROJECTS.length >= rule.minProjects,
        failMsg: `Thiếu ${rule.minProjects - MOCK_PROJECTS.length} đề tài.`
      },
      {
        passed: MOCK_SUPERVISION.length >= rule.minSupervision,
        failMsg: `Thiếu ${rule.minSupervision - MOCK_SUPERVISION.length} học viên TD.`
      }
    ];

    const isAllPassed = conditions.every((c) => c.passed);
    const passCount = conditions.filter((c) => c.passed).length;
    const progressPercent = Math.round((passCount / conditions.length) * 100);
    const shortcomings = conditions.filter((c) => !c.passed).map((c) => c.failMsg);

    return {
      progressPercent,
      isAllPassed,
      shortcomings,
    };
  }, [selectedTitle]);

  return (
    <Card size="small" style={{ marginBottom: 16, borderLeft: '4px solid #1677ff' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <Space>
            <Text strong>Tiến độ xét chức danh:</Text>
            <Radio.Group
              size="small"
              value={selectedTitle}
              onChange={(e) => setSelectedTitle(e.target.value)}
              buttonStyle="solid"
            >
              <Radio.Button value="PGS">PGS</Radio.Button>
              <Radio.Button value="GS">GS</Radio.Button>
            </Radio.Group>
          </Space>
          
          {evaluationResult.isAllPassed ? (
            <Badge status="success" text={<Text type="success" strong>Đủ điều kiện nộp hồ sơ</Text>} />
          ) : (
            <Tooltip title={evaluationResult.shortcomings.join(' | ')}>
              <Badge status="processing" text={<Text type="secondary">Chưa đủ điều kiện (Xem chi tiết)</Text>} />
            </Tooltip>
          )}
        </div>
        
        <Progress 
          percent={evaluationResult.progressPercent} 
          status={evaluationResult.isAllPassed ? 'success' : 'active'}
          strokeColor={evaluationResult.isAllPassed ? '#52c41a' : '#1677ff'}
          strokeWidth={14}
        />
      </div>
    </Card>
  );
};

export default ChucDanhProgress;
