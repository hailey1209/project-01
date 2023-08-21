const scroller = new Scroller(false)

const header =document.querySelector('header')
const footer = document.querySelector('footer')

const toTop = document.querySelector('.to-top div')
toTop.addEventListener('click', function(e){
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

    window.addEventListener('click',function(e){
      if(e.target.className.includes('show')){
        this.document.body.classList.toggle('dark')
        header.classList.toggle('dark')
        for(let item of searched_item){
          item.classList.toggle('dark')
        }
      }
    })

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
        if(e.target == searched_item[i] || e.target == searched_item[i].childNodes){
          console.log(e.target)
          modals[i].style.display = 'block'
        }
      }
    }
    function close(e){
      for(let i=0; i< searched_item.length; i++){
        if(e.target == modals[i]){
          console.log(e.target)
          modals[i].style.display = 'none'
        }
      }
    }
    for(let item of searched_item){
      window.addEventListener('click', pop)
      window.addEventListener('click', close)
    }
 }
  loadApi('http://127.0.0.1:5000/api/movies')
  .then(data=>showData(data))
}