/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FC, useId } from 'react';
import { useAppDispatch } from 'util/hooks';
import styles from './input-form.module.scss';
import cn from 'classnames';
import { strToNumber } from 'util/str-to-Number';

interface IProps {
  title?: string;
  rangMin: number;
  rangMax: number;
  step?: number;
  prefix?: string;
  value: string;
  rangeValue?: string;
  funcValue?: (payload: number) => {
    payload: number;
    type: string;
  };
  funcRange?: (payload: number) => {
    payload: number;
    type: string;
  };
}

export const InputForm: FC<IProps> = (props) => {
  const {
    title,
    rangMin,
    rangMax,
    step,
    prefix,
    funcValue,
    funcRange,
    value,
    rangeValue,
  } = props;
  const dispatch = useAppDispatch();
  const id = useId();

  const handlerValue = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (funcValue) {
      dispatch(funcValue(strToNumber(target.value)));
    }
  };

  const handlerRange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (funcRange) {
      dispatch(funcRange(strToNumber(target.value)));
    } else if (funcValue) {
      dispatch(funcValue(strToNumber(target.value)));
    }
  };

  return (
    <article className={styles.container}>
      {title && (
        <label className={styles.title} htmlFor={`input-${id}`}>
          {title}
        </label>
      )}
      <div className={styles.wrapper}>
        <input
          value={value || 0}
          readOnly={!funcValue}
          onChange={handlerValue}
          className={styles.value}
          id={`input-${id}`}
          type={'text'}
          min={rangeValue ? undefined : rangMin}
          max={rangeValue ? undefined : rangMax}
        />
        {prefix && (
          <span
            className={cn(styles.prefix, { [styles.active]: !!rangeValue })}
          >
            {prefix}
          </span>
        )}
      </div>
      <input
        value={strToNumber(rangeValue || value)}
        onChange={handlerRange}
        min={rangMin}
        max={rangMax}
        className={styles.range}
        type={'range'}
        step={step || Math.floor(rangMax / 100)}
      />
    </article>
  );
};
