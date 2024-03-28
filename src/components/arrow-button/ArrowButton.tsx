import arrow from 'src/images/arrow.svg';
import clsx from 'clsx';
import styles from './ArrowButton.module.scss';
export type PropsArrowButton = {
	onClick?: OnClick;
	isOpen: boolean;
};
/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;
 
export const ArrowButton = (props: PropsArrowButton) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			onClick={props.onClick}
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			className={clsx({
				[styles.container]: true,
				[styles.container_open]: props.isOpen,
			})}
			tabIndex={0}>

			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx({
					[styles.arrow]: true,
					[styles.arrow_open]: props.isOpen,
				})}
			/>
		</div>
	);
};
