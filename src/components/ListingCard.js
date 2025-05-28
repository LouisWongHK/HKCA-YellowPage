import Link from 'next/link';
import { getSocialIcon, getContrastColor } from '../utils'; // getSocialIcon is kept as requested
import styles from '../styles/ListingCard.module.css';
import globalStyles from '../styles/global.module.css';

export default function ListingCard({ listing }) {
  const formattedInfo = listing.info_zh.replace(/\n/g, '<br>');
  const imageAreaBgColor = (!listing.logo_url && listing.theme_color_hex) ? listing.theme_color_hex : '#e9ecef';
  const imageAreaTextColor = (!listing.logo_url && listing.theme_color_hex) ? getContrastColor(listing.theme_color_hex) : '#495057';

  return (
    <div className={styles.card} style={{ borderTop: `5px solid ${listing.theme_color_hex || 'transparent'}` }}>
      <div className={styles.cardImageArea} style={{ backgroundColor: imageAreaBgColor, color: imageAreaTextColor }}>
        {listing.logo_url ? (
          <img
            src={listing.logo_url}
            alt={`${listing.name_zh} logo`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.parentElement.innerHTML = `<span>${listing.icon_text || listing.name_zh.charAt(0)}</span>`;
              e.target.parentElement.style.backgroundColor = '#e9ecef';
              e.target.parentElement.style.color = '#495057';
            }}
          />
        ) : (
          <span>{listing.icon_text || listing.name_zh.charAt(0)}</span>
        )}
      </div>
      <div className={styles.content}>
        <div className="mb-3">
          <span className={globalStyles.categoryTag}>{listing.category_zh}</span>
        </div>
        <h3 className={`${styles.title} ${globalStyles.canadianRedText} ${styles.clamp2Lines}`} title={listing.name_zh}>
          {listing.name_zh}
        </h3>
        {listing.handle && <p className={styles.handle}>{listing.handle}</p>}
        <p
          className={styles.info}
          title={listing.info_zh}
          dangerouslySetInnerHTML={{ __html: formattedInfo }}
        />
        {listing.website ? (
          <Link
            href={listing.website}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.websiteLink} ${globalStyles.canadianRedText}`}
          >
            {getSocialIcon(listing.website)}前往了解
            {/* The redundant arrow SVG has been removed from here */}
          </Link>
        ) : (
          <p className={styles.noWebsite}>未提供網址</p>
        )}
      </div>
    </div>
  );
}
