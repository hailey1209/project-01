// const scroller = new Scroller(false)
// 위로가기 버튼
//영화 클릭시 해당 페이지로 넘어가기

//스크롤링중에 어느정도 스크롤바를 내리면 헤더에 그림자 추가

const header =document.querySelector('header')
const footer = document.querySelector('footer')

const toTop = document.querySelector('.to-top div')
toTop.addEventListener('click', function(e){
    console.log(e.target)
    window.scrollTo({left:0,top:0, behavior:'smooth'})
})

  //스크롤링 중에 일어나는 이벤트
  window.addEventListener('scroll', function(e){
    //스크롤이 끝났는지 아닌지 체크하기
    scroller.isScrollended()
    .then(result => console.log('scroll eneded!'))
    .catch(err => console.log('scrolling...'))
  })


window.onload = () => {
  function loadApi(url){
   return fetch(url)
    .then(response => response.json())
 }
  function showData(data){
    const movies = data.movies
    console.log(movies)
    const result_container = document.querySelector('main .result-container')
    for(let i=0; i<movies.length; i++){
      const result_item = document.createElement('div')
      result_item.className = 'result-item'
      result_item.innerHTML = `<div class="item-img">
                                  <img src='${movies[i].poster_img}' alt="">
                                </div>
                                <div class="item-detail">
                                  <h3>${movies[i].title}</h3>
                                  <p>${movies[i].release}</p>
                                </div>`
      result_container.appendChild(result_item)

      const modal = document.createElement('div')
        
      modal.className = 'modal'
      modal.innerHTML = `<div class="img">
                            <img src='${movies[i].poster_img}' alt="">
                          </div>
                          <div class="detail">
                            <h3>${movies[i].title}</h3>
                            <p>${movies[i].release}</p>
                            <p>줄거리</p>
                          </div>`
      document.body.appendChild(modal)
    }
    const searchBar = document.querySelector('main .search-container .search-bar input')
    const searched_item = document.querySelectorAll('main .result-container .result-item')
    const modals = document.querySelectorAll('.modal')
    console.log(modals)
  
    searchBar.addEventListener('keyup', (e)=> {
      for(let i=0; i<searched_item.length; i++){
        console.log(searchBar.value.toLowerCase())
        searched_item[i].style.display = 'none'
        const name = searched_item[i].querySelector('main .result-container .result-item .item-detail h3')
        // console.log(name.innerText.toLowerCase())
        if(name.innerText.toLowerCase().includes(e.target.value) || name.innerText.toUpperCase().includes(e.target.value)){
          searched_item[i].style.display = 'block'
        }else{
          searched_item[i].style.display = 'none'
        }
      }
    })
    
    function pop(e){
      for(let i=0; i< searched_item.length; i++){
        if(e.target == searched_item[i]){
          console.log(e.target)
          modals[i].style.display = 'block'
        }
      }
    }
    for(let item of searched_item){
      item.addEventListener('click', pop)
    }
 }
  loadApi('http://127.0.0.1:5000/api/movies')
  .then(data=>showData(data))
}