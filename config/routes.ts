
export default [
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
				name: 'login',
				component: './user/Login',
			},
		],
	},

	// GROUP TITLE
	// {
	// 	name: 'DashboardGroup',
	// 	path: '/__group__/dashboard',
	// 	disabled: true,
	// },

	// DEFAULT MENU
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: './TrangChu',
		icon: 'HomeOutlined',

	},
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},

	// DANH MUC HE THONG
	// {
	// 	name: 'DanhMuc',
	// 	path: '/danh-muc',
	// 	icon: 'copy',
	// 	routes: [
	// 		{
	// 			name: 'ChucVu',
	// 			path: 'chuc-vu',
	// 			component: './DanhMuc/ChucVu',
	// 		},
	// 	],
	// },
	{
		path: '/notification',
		routes: [
			{
				path: './subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: './check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: './',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
		],
		layout: false,
		hideInMenu: true,
	},
	{
		path: '/',
	},
	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},
	{
		path: '/hold-on',
		component: './exception/DangCapNhat',
		layout: false,
	},
	{
		path: '/*',
		component: './exception/404',
		layout: false,
	},

	// new config start here

	{
		path: '/ho-so-ca-nhan',
		name: 'Hồ sơ cá nhân',
		component: './Ho-so-ca-nhan',
		icon: 'UserOutlined',
	},
	{
		path: '/search',
		name: 'Tìm kiếm',
		component: './Search',
		icon: 'SearchOutlined',
	},
	{
		path: '/quan-ly-hoc-van',
		name: 'Quản lý học vấn',
		icon: 'BookOutlined',
		routes: [
			{
				path: '/quan-ly-hoc-van/bang-cap',
				name: 'Bằng cấp',
				component: './Quan-ly-hoc-van/Bang-cap',
			},
			{
				path: '/quan-ly-hoc-van/cong-tac',
				name: 'Công tác',
				component: './Quan-ly-hoc-van/Cong-tac',
			},
		]
	},
	{
		path: '/So-yeu-khoa-hoc',
		name: 'Sơ yếu khoa học',
		icon: 'ExperimentOutlined',
		routes: [
			{
				path: '/So-yeu-khoa-hoc/bai-bao-khoa-hoc',
				name: 'Bài báo khoa học',
				component: './So-yeu-khoa-hoc/Bai-bao-khoa-hoc',
			},
			{
				path: '/So-yeu-khoa-hoc/de-tai-khoa-hoc',
				name: 'Đề tài khoa học',
				component: './So-yeu-khoa-hoc/De-tai-khoa-hoc',
			},
		]
	},
	{
		path: '/giang-day',
		name: 'Giảng dạy',
		component: './Giang-day',
		icon: 'ReadOutlined',
	},
	{
		path: '/huong-dan-ncs-ths',
		name: 'Hướng dẫn NCS&ThS',
		component: './Huong-dan-NCS&ThS',
		icon: 'TeamOutlined',
	},
	{
		path: '/giai-thuong',
		name: 'Giải thưởng',
		component: './Giai-thuong',
		icon: 'TrophyOutlined',
	},
	{
		path: '/xet-chuc-danh',
		name: 'Xét chức danh',
		component: './Xet-chuc-danh',
		icon: 'AuditOutlined',
	},
	{
		path: '/quan-ly-nguoi-dung',
		name: 'Quản lý người dùng',
		component: './Quan-ly-nguoi-dung',
		icon: 'UserOutlined',
	},
	{
		path: '/kiem-duyet',
		name: 'Kiểm duyệt',
		component: './Kiem-duyet',
		icon: 'CheckCircleOutlined',
	},
	{
		path: '/thong-ke-bao-cao',
		name: 'Thống kê báo cáo',
		component: './Thong-ke-bao-cao',
		icon: 'BarChartOutlined',
	},
];
