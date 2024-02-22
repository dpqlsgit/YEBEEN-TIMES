const API_KEY = `66abf55e4f434a859eeb892551dceb60`;
let newsList = [];
const menus = document.querySelectorAll(".menus button")
menus.forEach(menu => menu.addEventListener('click', (event) => {
  getNewsByCategory(event)
}))

 const getLatestNews = async () => {
  //내 api key로 변경
  //배포
  const url = new URL(`https://yebeen-times.netlify.app/top-headlines`)
  //실습
  // const url = new URL(
    // `http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`
    // `http://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`
  // );
  const response = await fetch(url);
  //json : 파일 형식 중 하나 (텍스트화 시키는데 객체처럼 생김)
  const data = await response.json();
  // const data = JSON.parse(response)
  /* newsList값이 확정되어야 데이터를 쓸 수 있기 때문에 newsList값이 확정된 후 render호출 */
  newsList = data.articles;
  render();
};

const getNewsByCategory = async (event) => {
  // console.log('category', event.target.value)
  //ui상에서는 앞글자 대문자를 유지하고 보내주는 파라미터 값은 소문자로 변경
  const category = event.target.textContent.toLowerCase();
  //바뀔일 없는 API_KEY는 가장 뒤에 배치 - 쿼리 정렬 규칙 같은 것
  const url = new URL(`http://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`)
  const response = await fetch(url);
  const data = await response.json();
  //render()함수 호출 전에 newsList 변수값을 변경해주어야 한다
  newsList = data.articles;
  render();
} 

const render = () => {
  //변수는 최대한 const를 사용하도록!
  const newsHTML = newsList.map(
    (news) => 
    `<div class="row news">
      <div class="col-lg-4">
        <img class="news-img-size" src="${news.urlToImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
      }"/>
      </div>
      <div class="col-lg-8">
        <h2>${news.title}</h2>
        <p>
          ${news.description == null || news.description == ""
          ? "내용없음"
          : news.description.length > 200
          ? news.description.substring(0, 200) + "..."
          : news.description}
        </p>
      <div>
        ${news.source.name || "no source"} * ${moment(news.publishedAt).fromNow()}
      </div>
      </div>
    </div>`
  ).join('');
  document.getElementById("news-board").innerHTML = newsHTML;
};

getLatestNews();

//1. 버튼들에 클릭이벤트를 주어야 함
//2. 카테고리별 뉴스 가져오기
//3. 그 뉴스를 보여주기

const getNewsByKeyWord = async() => {
  let keyWord = document.getElementById('search-input').value
  const url = new URL(`http://newsapi.org/v2/top-headlines?country=us&q=${keyWord}&apiKey=${API_KEY}`)
  const response = await fetch(url)
  const data = await response.json();
  newsList = data.articles;
  render();
}