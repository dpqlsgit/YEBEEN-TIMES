const API_KEY = `66abf55e4f434a859eeb892551dceb60`;
let newsList = [];
const getLatestNews = async () => {
  //내 api key로 변경
  //배포
  // const url = new URL(`https://yebeen-times.netlify.app/top-headlines`)
  //실습
  const url = new URL(
    // `http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`
    `http://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  );
  const response = await fetch(url);
  //json : 파일 형식 중 하나 (텍스트화 시키는데 객체처럼 생김)
  const data = await response.json();
  // const data = JSON.parse(response)
  /* newsList값이 확정되어야 데이터를 쓸 수 있기 때문에 newsList값이 확정된 후 render호출 */
  newsList = data.articles;
  render();
  console.log("ddddd", newsList);
};

const buttonName = document.querySelectorAll(".menus button")
console.log('buttonName',buttonName)

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
