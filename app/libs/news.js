const truncate = (str, size = 50, postf = '...') => {
  if (str.length > size) {
    return str.substring(0, size - postf.length) + postf;
  }
  return str;
};

const request = new XMLHttpRequest();

request.open('GET', '/data/news/news.json', true);

request.onload = () => {
  if (request.status >= 200 && request.status < 400) {
    const data = JSON.parse(request.responseText);
    const newsList = document.getElementById('news__list');

    const articles = data.reduce((acc, article) => {
      const maxLength = 400;
      let more = '<a href="" class="news__link news__link--hide">more ></a>';
      if (article.body.length > maxLength) {
        more = '<a href="" class="news__link">more ></a>';
      }
      return `
        ${acc}
        <article class="news__article">
          <div class="news__header">
            <h3 class="news__title">${article.title}</h3>
            <span class="news__date">${article.date}</span>
          </div>
          <p class="news__body">${truncate(article.body, maxLength)}</p>
          ${more}
        </article>
        <div class="news__bot-line"></div>
      `;
    }, '');
    newsList.innerHTML = articles;

    const bodies = document.getElementsByClassName('news__body');

    Array.from(document.getElementsByClassName('news__link')).forEach((element, index, links) => {
      element.addEventListener('click', (event) => {
        event.preventDefault();
        if (links[index].getAttribute('data-state') === 'full') {
          bodies[index].innerHTML = truncate(data[index].body, 400);
          links[index].innerHTML = 'more >';
          links[index].setAttribute('data-state', 'truncated');
        } else {
          bodies[index].innerHTML = data[index].body;
          links[index].innerHTML = 'hide <';
          links[index].setAttribute('data-state', 'full');
        }
      });
    });
  } else {
    console.log('server error: ', request.status);
  }
};

request.onerror = () => console.log('loading error');

request.send();
