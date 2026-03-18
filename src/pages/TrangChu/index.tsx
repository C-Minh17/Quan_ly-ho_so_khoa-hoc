import { useIntl } from '@umijs/max';
import { Card } from 'antd';
import './components/style.less';

const TrangChu = () => {
	const intl = useIntl();
	return (
		<Card styles={{ body: { height: '100%' } }} variant='borderless'>
			<div className='home-welcome'>
				<h1 className='title'>HỆ THỐNG QUẢN LÝ HỒ SƠ KHOA HỌC VÀ XÉT CHỨC DANH</h1>
			</div>
		</Card>
	);
};

export default TrangChu;
