/**
 * WordPress dependencies
 */
import { edit as editIcon, globe as globeIcon } from '@wordpress/icons';

import { BlockControls, useBlockProps } from '@wordpress/block-editor';

import {
	ComboboxControl,
	Placeholder,
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';

import apiFetch from '@wordpress/api-fetch';

import { useEffect, useState } from '@wordpress/element';

import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './editor.scss';
import countries from '../assets/countries.json';
import { getEmojiFlag } from './utils';

import Preview from './preview';

export default function Edit( { attributes, setAttributes, context } ) {
	const blockProps = useBlockProps();

	const { postId } = context;

	const { countryCode, relatedPosts } = attributes;
	
	const options = Object.keys( countries )
		.sort()
		.map( ( code ) => ( {
			value: code,
			label:
				getEmojiFlag( code ) + '  ' + countries[ code ] + ' — ' + code,
		} ) );

	const [ isPreview, setPreview ] = useState();

	useEffect( () => setPreview( countryCode ), [ countryCode ] );

	const handleChangeCountry = () => {
		if ( isPreview ) setPreview( false );
		else if ( countryCode ) setPreview( true );
	};

	const handleChangeCountryCode = ( newCountryCode ) => {
		if ( newCountryCode && countryCode !== newCountryCode ) {
			setAttributes( {
				countryCode: newCountryCode,
				relatedPosts: [],
			} );
		}
	};

	useEffect( () => {
		async function getRelatedPosts() {
			const posts = await apiFetch( {
				path: `/wp/v2/posts?_fields=id,title,excerpt&search=${ countries[ countryCode ] }&exclude=${ postId }&type=post`,
			} ).then( ( response ) => {
				return response;
			} );

			setAttributes( {
				relatedPosts:
					posts?.map( ( relatedPost ) => ( {
						...relatedPost,
						title: relatedPost.title?.rendered || relatedPost.link,
						excerpt: relatedPost.excerpt?.rendered || '',
					} ) ) || [],
			} );
		}

		getRelatedPosts();
	}, [ countryCode, postId, setAttributes ] );

	return (
		<div { ...blockProps }>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						label={ __( 'Change Country', 'xwp-country-card' ) }
						icon={ editIcon }
						onClick={ handleChangeCountry }
						disabled={ ! Boolean( countryCode ) }
					/>
				</ToolbarGroup>
			</BlockControls>
			<div>
				{ isPreview ? (
					<Preview
						countryCode={ countryCode }
						relatedPosts={ relatedPosts }
					/>
				) : (
					<Placeholder
						icon={ globeIcon }
						label={ __( 'XWP Country Card', 'xwp-country-card' ) }
						isColumnLayout={ true }
						instructions={ __(
							'Type in the name of the country you want to display on your site.',
							'xwp-country-card'
						) }
					>
						<ComboboxControl
							label={ __( 'Country', 'xwp-country-card' ) }
							hideLabelFromVision
							options={ options }
							value={ countryCode }
							onChange={ handleChangeCountryCode }
							allowReset={ true }
						/>
					</Placeholder>
				) }
			</div>
		</div>
	);
}
