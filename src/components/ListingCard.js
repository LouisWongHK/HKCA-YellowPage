import Link from 'next/link';
import { getSocialIcon, getContrastColor } from '../utils';
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              fill="currentColor"
              className="bi bi-arrow-up-right-square inline ml-1"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.854 8.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707l-4.096 4.096z"
              />
            </svg>
          </Link>
        ) : (
          <p className={styles.noWebsite}>未提供網址</p>
        )}
      </div>
    </div>
  );
}