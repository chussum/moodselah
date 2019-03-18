import * as React from 'react';
import uniqueId from 'lodash-es/uniqueId';
import classNames from 'classnames';
import s from './SwitchButton.module.scss';

const SwitchButton = props => (
  <div className={classNames(s.row, s.switchButton, props.containerClassName, props.errors && s.error)}>
    {props.children}
    {props.errors &&
      props.errors.map(err => (
        <p key={uniqueId()} className={s.error}>
          {err}
        </p>
      ))}
    {props.success && <p className={s.success}>{props.success}</p>}
  </div>
);

export default SwitchButton;
