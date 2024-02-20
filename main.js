const API_KEY = `66abf55e4f434a859eeb892551dceb60`
let news = []
const getLatestNews = async () => {
  //내 api key로 변경
  const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`) 
  const response = await fetch(url);
  //json : 파일 형식 중 하나 (텍스트화 시키는데 객체처럼 생김)
  const data = await response.json()
  // const data = JSON.parse(response)
  news = data.articles
  console.log('ddddd', news)
}

getLatestNews()