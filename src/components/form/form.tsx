import { BlockForm } from 'components/block-form/block-form';
import { BtnForm } from 'components/btn-form';
import { Input } from 'components/input';
import { FC, FormEvent } from 'react';
import { formApi } from 'store/api/form';
import {
  setCarCost,
  setInitialPercent,
  setMonthlyPayment,
} from 'store/slices/calc-slices';
import { useAppDispatch, useAppSelector } from 'util/hooks';
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
      <Input
        rangMin={100000}
        rangMax={6000000}
        title={'Стоимость автомобиля'}
        prefix={'₽'}
        value={carCost}
        funcValue={setCarCost}
      />
      <Input
        rangMin={10}
        rangMax={60}
        title={'Первоначальный взнос'}
        prefix={`${initialPercent}%`}
        value={initialSum}
        rangeValue={initialPercent}
        funcRange={setInitialPercent}
      />
      <Input
        rangMin={1}
        rangMax={60}
        title={'Срок лизинга'}
        prefix={'мес.'}
        value={monthly}
        funcRange={setMonthlyPayment}
      />
      <BlockForm title={'Сумма договора лизинга'} out={sumContract} />
      <BlockForm title={'Ежемесячный платеж от'} out={monthlyPayment} />
      <BtnForm title={'Оставить заявку'} />
    </form>
  );
};
