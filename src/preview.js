/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import countries from '../assets/countries.json';
import continentNames from '../assets/continent-names.json';
import continents from '../assets/continents.json';

import { getEmojiFlag, formatExcerpt } from './utils';

export default function Preview( { countryCode, relatedPosts } ) {
	if ( ! countryCode ) return null;

	const emojiFlag = getEmojiFlag( countryCode ),
		hasRelatedPosts = relatedPosts?.length > 0;

	return (
		<div className="xwp-country-card">
			<div
				className="xwp-country-card__media"
				data-emoji-flag={ emojiFlag }
			>
				<div className="xwp-country-card-flag">{ emojiFlag }</div>
			</div>
			<h3 className="xwp-country-card__heading">
				{ __( 'Hello from' ) }{ ' ' }
				<strong>{ countries[ countryCode ] }</strong> (
				<span
					className="xwp-country-card__country-code"
					data-country-code={ countryCode }
				>
					<abbr title={ countries[ countryCode ] }>
						{ countryCode }
					</abbr>
				</span>
				), { continentNames[ continents[ countryCode ] ] }!
			</h3>
			<div className="xwp-country-card__related-posts">
				<h3 className="xwp-country-card__related-posts__heading">
					{ hasRelatedPosts
						? sprintf(
								// eslint-disable-next-line @wordpress/i18n-translator-comments
								__( 'There are %d related posts:' ),
								relatedPosts.length
						  )
						: __( 'There are no related posts.' ) }
				</h3>
				{ hasRelatedPosts && (
					<ul className="xwp-country-card__related-posts-list">
						{ relatedPosts.map( ( relatedPost, index ) => (
							<li
								key={ index }
								className="xwp-country-card__related-post"
							>
								<a
									className="xwp-country-card__related-post-link"
									href={ relatedPost.link }
									data-post-id={ relatedPost.id }
								>
									<h3 className="xwp-country-card__related-post-title">
										{ relatedPost.title }
									</h3>
									<p className="xwp-country-card__related-post-excerpt">
										{ formatExcerpt(
											relatedPost.excerpt,
											24
										) }
									</p>
								</a>
							</li>
						) ) }
					</ul>
				) }
			</div>
		</div>
	);
}
