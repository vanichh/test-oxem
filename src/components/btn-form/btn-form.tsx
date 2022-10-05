import { FC } from 'react';
import styles from './btn-form.module.scss';
import icon from 'icon/loading.svg';
import { useAppSelector } from 'util/hooks';
import cn from 'classnames';

interface IProps {
  title: string;
}

export const BtnForm: FC<IProps> = ({ title }) => {
  const { loading } = useAppSelector((store) => store.form);

  return (
    <article>
      <button
        disabled={loading}
        className={cn(styles.btn, {
          [styles.active]: loading,
        })}
        type={'submit'}
      >
        {title}
        <img
          alt='Иконка загрузки'
          height={'21px'}
          width={'21px'}
          className={cn(styles.icon)}
          src={icon}
        />
      </button>
    </article>
  );
};
