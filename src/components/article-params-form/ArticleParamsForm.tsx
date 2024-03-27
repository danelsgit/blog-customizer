import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useEffect, useState } from 'react';
import { Button } from 'components/button';
import { ArrowButton } from 'components/arrow-button';
import { Separator } from '../separator';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState, 
	fontFamilyOptions,
	fontColors,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

type PropsArticleParamsForm = {
	resetDefault?: (params: ArticleStateType) => void;
	submit?: (params: ArticleStateType) => void;
	toggle?: (params: boolean) => void;
	openForm: boolean;
};

export const ArticleParamsForm = (props: PropsArticleParamsForm) => {
	const { resetDefault, submit, toggle, openForm } = props;

	useEffect(() => {
		const handleOpen = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && openForm === true) toggle?.(false);
		};
		document.addEventListener('keydown', handleOpen);
		return () => document.removeEventListener('keydown', handleOpen);
	}, [openForm]);

	const [params, setParams] = useState({
		contentWidth: contentWidthArr[0],
		backgroundColor: backgroundColors[0],
		fontFamilyOption: fontFamilyOptions[0],
		fontColor: fontColors[0],
		fontSizeOption: fontSizeOptions[0],
	});

	const colorsForBackground = (option: OptionType) => {
		setParams({
			...params,
			backgroundColor: option,
		});
	};
	const toggleOn = () => {
		toggle?.(openForm);
	};

	const fonts = (option: OptionType) => {
		setParams({
			...params,
			fontFamilyOption: option,
		});
	};

	const colorFont = (option: OptionType) => {
		setParams({
			...params,
			fontColor: option,
		});
	};

	const fontSize = (option: OptionType) => {
		setParams({
			...params,
			fontSizeOption: option,
		});
	};

	const paramsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		submit?.(params);
	};

	const stylesResetDefault = () => {
		setParams(defaultArticleState);
		resetDefault?.(defaultArticleState);
	};

	const sidebarOpen = clsx({
		[styles.container]: true,
		[styles.container_open]: openForm,
	});

	const widthForContent = (option: OptionType) => {
		setParams({
			...params,
			contentWidth: option,
		});
	};

	return (
		<>
		<ArrowButton onClick={toggleOn} isOpen={openForm} />
			<aside className={sidebarOpen} style={{overflow:'hidden'}}>
				<form className={styles.form} onSubmit={paramsSubmit} onReset={stylesResetDefault}>
					<fieldset style={{ display: 'grid', gap: 'clamp(10px, 4vh, 50px)' }}>
						<Text size={31} weight={800} uppercase>
							{'Задайте параметры'}
						</Text>
						<Select
							onChange={fonts}
							title='Шрифт'
							selected={params.fontFamilyOption}
							placeholder='Open Sans'
							options={fontFamilyOptions}
						/>
						<RadioGroup
							onChange={fontSize}
							title={'Размер шрифта'}
							selected={params.fontSizeOption}
							name={params.fontSizeOption.className}
							options={fontSizeOptions}
						/>
						<Select
							onChange={colorFont}
							title='Цвет шрифта'
							selected={params.fontColor}
							placeholder={params.fontColor.title}
							options={fontColors}
						/>
						<Separator />
						<Select
							onChange={colorsForBackground}
							title='Цвет фона'
							selected={params.backgroundColor}
							placeholder={params.backgroundColor.title}
							options={backgroundColors}
						/>
						<Select
							onChange={widthForContent}
							title='Ширина контента'
							selected={params.contentWidth}
							placeholder={params.contentWidth.title}
							options={contentWidthArr}
						/>
					</fieldset>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
