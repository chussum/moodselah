import * as React from 'react';
import Modal from '@material-ui/core/Modal';
import s from './MapPlaceModal.module.scss';

export interface MapPlaceModalProps {
  children: any;
  isVisible: boolean;
  onClose: () => void;
}

const MapPlaceModal: React.SFC<MapPlaceModalProps> = React.memo(props => {
  return (
    <Modal open={props.isVisible} onClose={props.onClose}>
      <div className={s.container}>
        <div className={s.closeContainer}>
          <button className={s.btnClose} type="button" onClick={props.onClose}>
            x
          </button>
        </div>
        <div className={s.contentContainer}>{props.children}</div>
      </div>
    </Modal>
  );
});

export default MapPlaceModal;
