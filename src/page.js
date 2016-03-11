import pageTemplate from './pageTemplate.html';
import mustache from 'mustache';
import './styles.scss';

export default function page() {
	console.log('in page');
	return mustache.render(pageTemplate, {
		meaning: 'none'
	});
}
