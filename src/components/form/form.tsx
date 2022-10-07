import { BlockForm } from 'components/block-form/block-form';
import { BtnForm } from 'components/btn-form';
import { InputForm } from 'components/input-form';
import { FC, FormEvent } from 'react';
import { formApi } from 'store/api/form';
import {
  setCarCost,
  setInitialPercent,
  setMonthlyPayment,
} from 'store/slices/calc-slices';
import { useAppDispatch, useAppSelector } from 'util/hooks';
import { rankToNumber } from 'util/rank-to-number';
import styles from './form.module.scss';

export const Form: FC = () => {
  const {
    carCost,
    initialPercent,
    initialSum,
    monthly,
    monthlyPayment,
    sumContract,
  } = useAppSelector((store) => store.calc);

  const dispatch = useAppDispatch();

  const handlerForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      formApi({
        carCost,
        initialPercent,
        initialSum,
        monthly,
        monthlyPayment,
        sumContract,
      })
    );
  };

  return (
    <form onSubmit={handlerForm} className={styles.form}>
      <InputForm
        rangMin={100000}
        rangMax={6000000}
        title={'Стоимость автомобиля'}
        prefix={'₽'}
        value={rankToNumber(carCost)}
        funcValue={setCarCost}
      />
      <InputForm
        rangMin={10}
        rangMax={60}
        title={'Первоначальный взнос'}
        prefix={`${initialPercent}%`}
        value={`${rankToNumber(initialSum)} ₽`}
        rangeValue={initialPercent.toString()}
        funcRange={setInitialPercent}
      />
      <InputForm
        rangMin={1}
        rangMax={60}
        title={'Срок лизинга'}
        prefix={'мес.'}
        value={rankToNumber(monthly)}
        funcRange={setMonthlyPayment}
        funcValue={setMonthlyPayment}
      />
      <BlockForm
        title={'Сумма договора лизинга'}
        out={`${rankToNumber(sumContract)} ₽`}
      />
      <BlockForm
        title={'Ежемесячный платеж от'}
        out={`${rankToNumber(monthlyPayment)} ₽`}
      />
      <BtnForm title={'Оставить заявку'} />
    </form>
  );
};
