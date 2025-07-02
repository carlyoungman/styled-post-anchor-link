import { useBlockProps, InspectorControls, useSettings } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';
import { GridLoader } from "react-spinners";
import apiFetch from '@wordpress/api-fetch';
import {
	__experimentalInputControl as InputControl,
	PanelBody,
	Button,
} from '@wordpress/components';
import './editor.scss';
import { ChevronLeft, ChevronRight  } from 'lucide-react';

export default function Edit({ attributes, setAttributes }) {
	const [isLoading, setIsLoading] = useState(false);
	const [totalPages, setTotalPages] = useState(1);
	const [page, setPage] = useState(1);
	const [results, setResults] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const color = "#8C6AB9";
	const { colors } = useSettings();
	const override = {
		display: "block",
		margin: "0 auto",
	};

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
				setTotalPages(5);
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
					<p>Search for posts using their title or ID</p>
					<InputControl
						value={searchTerm}
						onChange={(value) => {
							setPage(1);
							setSearchTerm(value);
						}}
						placeholder="Enter title or ID"
					/>
					<hr></hr>
					<GridLoader
						color={color}
						loading={isLoading}
						cssOverride={override}
						size={15}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
					{!isLoading && (
						<>
							<p>Results:</p>
							{results.map((post) => (
								<Button
									key={post.id}
									variant="secondary"
									onClick={() => choosePost(post)}
									style={{ marginBottom: '5px' }}
								>
									{post.title.rendered}
								</Button>
							))}
						</>
					)}
					{totalPages > 1 && (
						<div style={{ marginTop: '30px', display: 'flex', gap: '15px', alignItems: 'center', justifyContent: 'space-between' }}>
							<Button
								disabled={page <= 1}
								variant="tertiary"
								onClick={() => setPage((p) => p - 1)}
								style={{ display: 'flex', gap: '15px', alignItems: 'center', justifyContent: 'space-between' }}
							>
								<ChevronLeft size={24} /> Prev
							</Button>
							<Button
								disabled={page >= totalPages}
								variant="tertiary"
								onClick={() => setPage((p) => p + 1)}
								style={{ display: 'flex', gap: '5px', alignItems: 'center', justifyContent: 'space-between' }}
							>
								Next
								<ChevronRight size={24} />
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
