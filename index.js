const scroller = new Scroller(false)

window.onload = () => {
  scroller.setScrollPosition({top:0, behavior:'smooth'})

  //테마변경 다크
  const mode = document.querySelector('.mode')
  const header = document.querySelector('header')
  const hambtn = document.querySelector('header .navbar .ham-btn')
  const icons = document.querySelectorAll('header .navbar .mode .material-symbols-outlined')
  const scrollBtn = document.querySelectorAll('main .main-scroll .scroll-container .btns button')
  // const scrollItems = document.querySelectorAll('.item')

  mode.addEventListener('click', (e) => {
    document.body.classList.toggle('dark')
    header.classList.toggle('dark')
    hambtn.classList.toggle('dark')

    for(let item of scrollItems){
      item.classList.toggle('dark')
    }
    for (let btn of scrollBtn){
      btn.classList.toggle('dark')
    }

    for(let icon of icons){  //모드 버튼의 display설정 변경
      icon.classList.contains('show') ? 
      icon.classList.remove('show')
      : icon.classList.add('show')
    }
  })

    //스크롤링 중에 일어나는 이벤트
  window.addEventListener('scroll', function(e){
    //스크롤이 끝났는지 아닌지 체크하기
    scroller.isScrollended()
    .then(result => console.log('scroll eneded!'))
    .catch(err => console.log('scrolling...'))

    //스크롤링중에 어느정도 스크롤바를 내리면 헤더에 그림자 추가
    scroller.getScrollPosition() > header.offsetHeight ? 
    header.classList.add('active')
    : header.classList.remove('active')
  })

}


function loadApi(url){
  return fetch(url)
.then(response=> response.json())
.then(response=> response.boxOfficeResult.dailyBoxOfficeList)
// .then(response=> console.log(response))
}

function showwData(data){
  const movieDetail = []
  const movieItemContiner = document.querySelector('main .main-scroll .scroll-container .item-container')
  for(let i=0; i<10; i++){
    const title = data[i].movieNm
    const rank = data[i].rank
    const release = data[i].openDt
    movieDetail.push({title, rank, release})
    const item = document.createElement('div')
    item.className = 'item'
    item.innerHTML=`<div class="item-img">
                    <img src="" alt="">
                  </div>
                  <div class="item-content">  
                    <h3>${data[i].movieNm}</h3>
                    <p>${data[i].openDt}</p>
                  </div>`
    movieItemContiner.appendChild(item)
  }
    //마우스 가로 스크롤 이벤트
    const scrollItems = document.querySelectorAll('.item')
    const leftBtn = document.querySelector('.left')
    const rightBtn = document.querySelector('.right')
  
    function leftSlider(e){
      for(let item of scrollItems){
      item.style.transform = `translateX(-${item.offsetWidth*3}%)`
      item.style.transition = '0.3s'
      }
    }
    function rightSlider(e){
      for(let item of scrollItems){
      item.style.transform = `translateX(0%)`
      }
    }
    leftBtn.addEventListener('click', leftSlider)
    rightBtn.addEventListener('click', rightSlider)
  console.log(movieDetail)

}
loadApi('http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=a686fcd94c3bc0a1ae44f56193240ed2&targetDt=20120101')
.then(data=>showwData(data))