export const MOCK_PROJECTS: MProject.IRecord[] = [
  {
    projectId: "PRJ-001",
    userId: "USR-001",
    title:
      "Nghiên cứu phát triển hệ thống nhận dạng tiếng nói tiếng Việt thế hệ mới ứng dụng học sâu",
    level: "Quỹ",
    role: "PI",
    startDate: "2020-01-01",
    endDate: "2022-12-31",
    status: "Đã nghiệm thu",
    acceptanceResult: "Xuất sắc",
    outputs: [
      { type: "Bài báo", description: "PUB-001", pubId: "PUB-001" },
      { type: "Bài báo", description: "PUB-002", pubId: "PUB-002" },
    ],
    evidenceFileId: "FILE-004",
  },
  {
    projectId: "PRJ-002",
    userId: "USR-001",
    title:
      "Xây dựng nền tảng xử lý ngôn ngữ tự nhiên đa ngôn ngữ cho khu vực ASEAN",
    level: "Bộ",
    role: "PI",
    startDate: "2023-03-01",
    status: "Đang thực hiện",
    outputs: [],
    evidenceFileId: "FILE-004",
  },
  {
    projectId: "PRJ-003",
    userId: "USR-002",
    title:
      "Tối ưu hóa đa mục tiêu ứng dụng trong quản lý chuỗi cung ứng xanh",
    level: "Quốc gia",
    role: "PI",
    startDate: "2021-06-01",
    endDate: "2024-05-31",
    status: "Đang thực hiện",
    outputs: [
      { type: "Bài báo", description: "PUB-003", pubId: "PUB-003" },
      { type: "Bài báo", description: "PUB-005", pubId: "PUB-005" },
    ],
  },
  {
    projectId: "PRJ-004",
    userId: "USR-002",
    title: "Ứng dụng Học tăng cường sâu cho bài toán định tuyến xe tải",
    level: "Cơ sở",
    role: "PI",
    startDate: "2022-01-01",
    endDate: "2022-12-31",
    status: "Đã nghiệm thu",
    acceptanceResult: "Đạt",
    outputs: [{ type: "Bài báo", description: "PUB-005", pubId: "PUB-005" }],
  },
  {
    projectId: "PRJ-005",
    userId: "USR-003",
    title:
      "Hệ thống trợ lý ảo hỗ trợ giáo dục tiếng Việt cho người nước ngoài",
    level: "Bộ",
    role: "PI",
    startDate: "2019-01-01",
    endDate: "2021-12-31",
    status: "Đã nghiệm thu",
    acceptanceResult: "Xuất sắc",
    outputs: [
      { type: "Sản phẩm", description: "Phần mềm VietTutor v1.0" },
      { type: "Bài báo", description: "PUB-004", pubId: "PUB-004" },
    ],
  },
];