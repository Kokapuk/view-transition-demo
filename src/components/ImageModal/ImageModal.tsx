import { createPortal } from 'react-dom';
import Close from '../../icons/Close';
import { PexelPhoto } from '../../types';
import styles from './ImageModal.module.css';

interface Props {
  photo: PexelPhoto;
  onClose(): void;
}

const ImageModal = ({ photo, onClose }: Props) => {
  return createPortal(
    <div className={styles.background}>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <button className={styles.closeButton} onClick={onClose}>
            <Close />
          </button>
          <img
            className={styles.image}
            src={photo ? photo.src.large2x : ''}
          />
        </div>
        {photo && (
          <h3 className={styles.description}>
            <a className={styles.link} href={photo.url} target="_blank">
              {photo.alt}
            </a>{' '}
            <span className={styles.by}>by</span>{' '}
            <a className={styles.link} href={photo.photographer_url} target="_blank">
              {photo.photographer}
            </a>
          </h3>
        )}
      </div>
    </div>,
    document.getElementById('modalRoot')!
  );
};

export default ImageModal;
