const scroller = new Scroller(false)

window.onload = () => {
    scroller.setScrollPosition({top:0, behavior:'smooth'})
  
    //테마변경 다크
    const mode = document.querySelector('.mode')
    const header = document.querySelector('header')
    const hambtn = document.querySelector('header .navbar .ham-btn')
    const icons = document.querySelectorAll('header .navbar .mode .material-symbols-outlined')
    const scrollBtn = document.querySelectorAll('main .main-scroll .scroll-container .btns button')
    const scrollItems = document.querySelectorAll('main .main-scroll .scroll-container .item-container .item')
    const resultItem = document.querySelectorAll('main .search-container .result-container .result-item')
    const resultItemDetail = document.querySelectorAll('main .search-container .result-container .result-item .item-detail p')
    const registerInputs = document.querySelectorAll('main .register-form fieldset .forms ul li input')
    const loginLinks = document.querySelectorAll('main .login-form form fieldset .form .more a')
    
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
      for(let item of resultItem){
        item.classList.toggle('dark')
      }
      for(let detail of resultItemDetail){
        detail.classList.toggle('dark')
      }
      for(let input of registerInputs){
        input.classList.toggle('dark')
      }
      for(let link of loginLinks){
        link.classList.toggle('dark')
      }
      for(let icon of icons){  //모드 버튼의 display설정 변경
        icon.classList.contains('show') ? 
        icon.classList.remove('show')
        : icon.classList.add('show')
      }
    })
  
  }