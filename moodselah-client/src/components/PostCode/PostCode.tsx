import * as React from 'react';
import classNames from 'classnames';
import { IProps, IState } from '.';
import s from './PostCode.module.scss';

export interface PostCodeProps extends IProps, IState {
  daumPostCodeRef: React.RefObject<HTMLDivElement>;
  width: string | number;
  height: string | number;
  display: string;
  error: boolean;
}

const PostCode: React.SFC<PostCodeProps> = props => {
  const {
    containerClassName,
    daumPostCodeRef,
    style,
    display,
    onComplete,
    alwaysShowEngAddr,
    animation,
    autoClose,
    autoMapping,
    autoResize,
    defaultQuery,
    error,
    errorMessage,
    height,
    hideEngBtn,
    hideMapBtn,
    maxSuggestItems,
    pleaseReadGuide,
    pleaseReadGuideTimer,
    scriptUrl,
    shorthand,
    showMoreHName,
    submitMode,
    theme,
    useSuggest,
    width,
    zonecodeOnly,
    ...rest
  } = props;
  return (
    <div
      ref={props.daumPostCodeRef}
      className={classNames(s.container, props.containerClassName)}
      style={{
        width: props.width,
        height: props.height,
        display: props.display,
        ...style
      }}
      {...rest}
    >
      {props.error && props.errorMessage}
    </div>
  );
};

export default PostCode;
