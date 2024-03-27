import clsx from 'clsx';
import { StrictMode, CSSProperties, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';
import styles from './styles/index.module.scss';
import './styles/index.scss';

const root = createRoot(document.getElementById('root') as HTMLDivElement);

const App = () => {
	const [openForm, setFormOpen] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState);

	const submit = (props: ArticleStateType) => setFormState(props);
	const reset = (props: ArticleStateType) => setFormState(props);
	const toggle = () => setFormOpen(!openForm);
 
	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': formState.fontFamilyOption.value,
					'--font-size': formState.fontSizeOption.value,
					'--font-color': formState.fontColor.value,
					'--container-width': formState.contentWidth.value,
					'--bg-color': formState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				openForm={openForm}
				submit={submit}
				resetDefault={reset}
				toggle={toggle}
			/>
			<Article onClick={() => setFormOpen(false)} />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
