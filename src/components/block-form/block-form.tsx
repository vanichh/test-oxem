import { FC } from 'react';
import styles from './block-form.module.scss';

export interface IProps {
  title: string;
  out: string;
}

export const BlockForm: FC<IProps> = ({ title, out }) => {
  return (
    <article className={styles.block}>
      <p className={styles.title}>{title}</p>
      <p className={styles.out}>{out}</p>
    </article>
  );
};
