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
 async function loadApi(){
  // await fetch
 }
}