const ClassName = {
  content: 'content',
  title: 'content__title',
  textarea: 'content__window',
  keyboard: 'content__keyboard keyboard',
  text: 'content__text',
};

const titleContent = 'RSS Virtual Keyboard';

const textOperatingSystem = 'Virtual keyboard created on macOS';
const switchLanguages = 'Switch between different input languages - control + option(alt)';
const additionInfo = 'On my mac OS keyboard - delete(this is e.code - Backspace)';

const createElement = (tag, name, content) => {
  const element = document.createElement(tag);
  element.className = name;

  const main = document.querySelector('.content');

  if (main) {
    main.append(element);
  } else {
    document.body.append(element);
  }
  if (content) {
    element.innerHTML = `<${tag}>${content}</${tag}>`;
  }
};

function createPageStructure() {
  createElement('main', ClassName.content);

  createElement('h1', ClassName.title, titleContent);

  createElement('textarea', ClassName.textarea);
  createElement('div', ClassName.keyboard);

  const textContent = `*** ${textOperatingSystem}<br>*** ${switchLanguages}<br>***${additionInfo}`;
  createElement('div', ClassName.text, textContent);
}

export default createPageStructure;
