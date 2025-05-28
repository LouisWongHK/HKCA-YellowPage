import Link from 'next/link';
import { getSocialIcon, getContrastColor } from '../utils';
import styles from '../styles/RandomListingModal.module.css';
import globalStyles from '../styles/global.module.css';

export default function RandomListingModal({ isOpen, onClose, randomListing }) {
  if (!isOpen || !randomListing) return null;

  const modalImgBgColor = (!randomListing.logo_url && randomListing.theme_color_hex) ? randomListing.theme_color_hex : '#e9ecef';
  const modalImgTextColor = (!randomListing.logo_url && randomListing.theme_color_hex) ? getContrastColor(randomListing.theme_color_hex) : '#495057';

  return (
    <div className={styles.modal} style={{ display: isOpen ? 'block' : 'none' }} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <span className={styles.modalCloseBtn} onClick={onClose}>
          &times;
        </span>
        <div className={styles.modalImageArea} style={{ backgroundColor: modalImgBgColor, color: modalImgTextColor }}>
          {randomListing.logo_url ? (
            <img
              src={randomListing.logo_url}
              alt={`${randomListing.name_zh} logo`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.parentElement.innerHTML = `<span>${randomListing.icon_text || randomListing.name_zh.charAt(0)}</span>`;
                e.target.parentElement.style.backgroundColor = '#e9ecef';
                e.target.parentElement.style.color = '#495057';
              }}
            />
          ) : (
            <span>{randomListing.icon_text || randomListing.name_zh.charAt(0)}</span>
          )}
        </div>
        <h3 id="modalName" className={`${styles.modalName} ${globalStyles.canadianRedText}`}>
          {randomListing.name_zh}
        </h3>
        {randomListing.handle && <p id="modalHandle" className={styles.modalHandle}>{randomListing.handle}</p>}
        <p id="modalCategory" className={styles.modalCategory}>
          <span className={globalStyles.categoryTag}>{randomListing.category_zh}</span>
        </p>
        <p id="modalInfo" className={styles.modalInfo} dangerouslySetInnerHTML={{ __html: randomListing.info_zh.replace(/\n/g, '<br>') }}></p>
        {randomListing.website ? (
          <Link
            id="modalWebsiteLink"
            href={randomListing.website}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.modalWebsiteLink} ${globalStyles.canadianRedText}`}
          >
            {getSocialIcon(randomListing.website)}前往了解
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
          <p id="modalNoWebsite" className={styles.modalNoWebsite}>
            未提供網址
          </p>
        )}
      </div>
    </div>
  );
}