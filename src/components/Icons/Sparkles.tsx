import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import React from 'react';

const SparklesSvg = (props: React.SVGProps<SVGSVGElement>) => {
	// Remove fill and stroke from props if they exist to prevent them from overriding
	// the defaults we want (fill: none, stroke: currentColor)
	const { fill, stroke, ...restProps } = props;

	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='1em'
			height='1em'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
			{...restProps}
		>
			<path d='M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z' />
			<path d='M20 2v4' />
			<path d='M22 4h-4' />
			<circle cx='4' cy='20' r='2' />
		</svg>
	);
};

export const Sparkles = (props: Partial<CustomIconComponentProps>) => <Icon component={SparklesSvg} {...props} />;
