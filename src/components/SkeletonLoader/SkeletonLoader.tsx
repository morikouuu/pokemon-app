// src/components/SkeletonLoader.tsx
import "./style.css";

const SkeletonLoader = () => {
	return (
		<div className="skeleton-loader">
			<div className="skeleton-image"></div>
			<div className="skeleton-content">
				<div className="skeleton-title"></div>
				<div className="skeleton-text"></div>
				<div className="skeleton-text short"></div>
				<div className="skeleton-badges">
					<div className="skeleton-badge"></div>
					<div className="skeleton-badge"></div>
				</div>
			</div>
		</div>
	);
};

export default SkeletonLoader;
