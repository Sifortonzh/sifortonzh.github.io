(function () {
  function loadSearch(callback) {
    fetch('/search.xml')
      .then(response => response.text())
      .then(xmlText => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlText, 'application/xml');
        const entries = [...xml.querySelectorAll('entry')].map(entry => ({
          title: entry.querySelector('title').textContent,
          content: entry.querySelector('content').textContent,
          url: entry.querySelector('url').textContent
        }));
        callback(entries);
      });
  }

  function search(entries) {
    const input = document.getElementById('search-input');
    const result = document.getElementById('search-result');

    input.addEventListener('input', function () {
      const keyword = this.value.toLowerCase();
      result.innerHTML = '';
      if (!keyword.trim()) return;

      const matched = entries.filter(entry =>
        entry.title.toLowerCase().includes(keyword) ||
        entry.content.toLowerCase().includes(keyword)
      );

      matched.forEach(entry => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${entry.url}">${entry.title}</a>`;
        result.appendChild(li);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    loadSearch(search);
  });
})();

