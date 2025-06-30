import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import {
	__experimentalInputControl as InputControl,
	PanelBody,
	Button,
} from '@wordpress/components';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const [isLoading, setIsLoading] = useState(false);
	const [totalPages, setTotalPages] = useState(1);
	const [page, setPage] = useState(1);
	const [results, setResults] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	const fetchPosts = async () => {
		setIsLoading(true);
		let endpoint = `/wp/v2/posts?per_page=5&page=${page}`;

		if (searchTerm) {
			if (/^\d+$/.test(searchTerm)) {
				endpoint = `/wp/v2/posts/${searchTerm}`;
			} else {
				endpoint += `&search=${encodeURIComponent(searchTerm)}`;
			}
		}

		try {
			const res = await apiFetch({ path: endpoint });

			if (Array.isArray(res)) {
				setResults(res);
				setTotalPages(5); // hardcoded — ideally use res headers
			} else {
				setResults([res]);
				setTotalPages(1);
			}
		} catch (err) {
			setResults([]);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, [searchTerm, page]);

	const choosePost = (post) => {
		setAttributes({
			postId: post.id,
			postTitle: post.title.rendered,
			postUrl: post.link,
		});
	};

	const { postTitle, postUrl } = attributes;

	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				<PanelBody title="Search for a Post">
					<InputControl
						label="Search"
						value={searchTerm}
						onChange={(value) => {
							setPage(1);
							setSearchTerm(value);
						}}
						placeholder="Enter title or ID"
					/>
					{isLoading && <p>Loading...</p>}
					{results.map((post) => (
						<Button
							key={post.id}
							isSecondary
							onClick={() => choosePost(post)}
							style={{ marginBottom: '4px' }}
						>
							{post.title.rendered}
						</Button>
					))}
					{totalPages > 1 && (
						<div style={{ marginTop: '8px' }}>
							<Button
								isSmall
								disabled={page <= 1}
								onClick={() => setPage((p) => p - 1)}
							>
								← Prev
							</Button>
							<Button
								isSmall
								disabled={page >= totalPages}
								onClick={() => setPage((p) => p + 1)}
								style={{ marginLeft: '4px' }}
							>
								Next →
							</Button>
						</div>
					)}
				</PanelBody>
			</InspectorControls>

			{postUrl && postTitle ? (
				<p className="dmg-read-more">
					Read More:{' '}
					<a href={postUrl} target="_blank" rel="noreferrer">
						{postTitle}
					</a>
				</p>
			) : (
				<p>Select a post to create a Read More link.</p>
			)}
		</div>
	);
}
