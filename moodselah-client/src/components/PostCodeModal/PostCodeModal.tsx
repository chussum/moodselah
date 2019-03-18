import * as React from 'react';
import Modal from '@material-ui/core/Modal';
import s from './PostCodeModal.module.scss';
import PostCode from '../PostCode';

export interface PostCodeModalProps {
  isVisible: boolean;
  onClose: () => void;
  onComplete: (data) => void;
}

const PostCodeModal: React.SFC<PostCodeModalProps> = props => {
  return (
    <Modal open={props.isVisible} onClose={props.onClose}>
      <div className={s.container}>
        <div className={s.closeContainer}>
          <button className={s.btnClose} type="button" onClick={props.onClose}>
            x
          </button>
        </div>
        <PostCode containerClassName={s.postCodeContainer} autoResize={true} onComplete={props.onComplete} />
      </div>
    </Modal>
  );
};

export default PostCodeModal;
