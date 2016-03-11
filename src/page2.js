import pageTemplate from './pageTemplate.html';
import mustache from 'mustache';
import './styles.scss';

export default function page() {
  return mustache.render(pageTemplate, {
    meaning: 'some',
  });
}
