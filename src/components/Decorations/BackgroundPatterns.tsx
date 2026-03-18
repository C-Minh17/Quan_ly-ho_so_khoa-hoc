import type React from 'react';
import { CSSProperties } from 'react';

type BGVariantType = 'dots' | 'diagonal-stripes' | 'grid' | 'horizontal-lines' | 'vertical-lines' | 'checkerboard';

type BGMaskType =
	| 'fade-center'
	| 'fade-edges'
	| 'fade-top'
	| 'fade-bottom'
	| 'fade-left'
	| 'fade-right'
	| 'fade-x'
	| 'fade-y'
	| 'none';

type BackgroundPatternProps = React.ComponentProps<'div'> & {
	variant?: BGVariantType;
	mask?: BGMaskType;
	size?: number;
	fill?: string;
	thickness?: number;
};

const getMaskStyle = (mask: BGMaskType): React.CSSProperties => {
	switch (mask) {
		case 'fade-edges':
			return {
				maskImage: `radial-gradient(ellipse at center, black, transparent)`,
				WebkitMaskImage: `radial-gradient(ellipse at center, black, transparent)`,
			};
		case 'fade-center':
			return {
				maskImage: `radial-gradient(ellipse at center, transparent, black)`,
				WebkitMaskImage: `radial-gradient(ellipse at center, transparent, black)`,
			};
		case 'fade-top':
			return {
				maskImage: `linear-gradient(to bottom, transparent, black)`,
				WebkitMaskImage: `linear-gradient(to bottom, transparent, black)`,
			};
		case 'fade-bottom':
			return {
				maskImage: `linear-gradient(to bottom, black, transparent)`,
				WebkitMaskImage: `linear-gradient(to bottom, black, transparent)`,
			};
		case 'fade-left':
			return {
				maskImage: `linear-gradient(to right, transparent, black)`,
				WebkitMaskImage: `linear-gradient(to right, transparent, black)`,
			};
		case 'fade-right':
			return {
				maskImage: `linear-gradient(to right, black, transparent)`,
				WebkitMaskImage: `linear-gradient(to right, black, transparent)`,
			};
		case 'fade-x':
			return {
				maskImage: `linear-gradient(to right, transparent, black, transparent)`,
				WebkitMaskImage: `linear-gradient(to right, transparent, black, transparent)`,
			};
		case 'fade-y':
			return {
				maskImage: `linear-gradient(to bottom, transparent, black, transparent)`,
				WebkitMaskImage: `linear-gradient(to bottom, transparent, black, transparent)`,
			};
		case 'none':
		default:
			return {};
	}
};

function getBgImage(variant: BGVariantType, fill: string, size: number, thickness: number) {
	switch (variant) {
		case 'dots':
			return `radial-gradient(${fill} ${thickness}px, transparent ${thickness}px)`;
		case 'grid':
			return `linear-gradient(to right, ${fill} ${thickness}px, transparent ${thickness}px), linear-gradient(to bottom, ${fill} ${thickness}px, transparent ${thickness}px)`;
		case 'diagonal-stripes':
			return `repeating-linear-gradient(45deg, ${fill}, ${fill} ${thickness}px, transparent ${thickness}px, transparent ${size}px)`;
		case 'horizontal-lines':
			return `linear-gradient(to bottom, ${fill} ${thickness}px, transparent ${thickness}px)`;
		case 'vertical-lines':
			return `linear-gradient(to right, ${fill} ${thickness}px, transparent ${thickness}px)`;
		case 'checkerboard':
			return `linear-gradient(45deg, ${fill} 25%, transparent 25%), linear-gradient(-45deg, ${fill} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${fill} 75%), linear-gradient(-45deg, transparent 75%, ${fill} 75%)`;
		default:
			return undefined;
	}
}

export const BackgroundPattern = ({
	variant = 'grid',
	mask = 'none',
	size = 24,
	fill = '#252525',
	thickness = 1,
	className,
	style,
	...props
}: BackgroundPatternProps) => {
	const bgSize = `${size}px ${size}px`;
	const backgroundImage = getBgImage(variant, fill, size, thickness);
	const maskStyle = getMaskStyle(mask);

	const combinedStyle: CSSProperties = {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		width: '100%',
		height: '100%',
		backgroundImage,
		backgroundSize: bgSize,
		backgroundRepeat: 'repeat',
		pointerEvents: 'none',
		zIndex: 0.5,
		...maskStyle, // Bật lại mask
		...style,
	};

	return <div className={className} style={combinedStyle} {...props} />;
};
