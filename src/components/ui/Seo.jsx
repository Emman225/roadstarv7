import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const SITE_URL = 'https://roadstar.vercel.app';
const SITE_NAME = 'ROADSTAR';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

export default function Seo({ title, description, path = '', image, jsonLd }) {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const canonicalUrl = `${SITE_URL}${path}`;
    const ogImage = image || DEFAULT_IMAGE;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonicalUrl} />

            {/* Open Graph */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:type" content="website" />
            <meta property="og:locale" content="fr_CI" />
            <meta property="og:site_name" content={SITE_NAME} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            {/* JSON-LD Structured Data */}
            {jsonLd && (
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            )}
        </Helmet>
    );
}

Seo.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    path: PropTypes.string,
    image: PropTypes.string,
    jsonLd: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
