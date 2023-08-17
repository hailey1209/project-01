// 아코디언 박스 이벤트
const detailBox_01 = document.querySelector('main .personal-detail .detail-container')
const detailBox_02 = document.querySelector('main .personal-detail .personal-list')
const openBtn_01 = document.querySelector('main .personal-detail .detail-container .open-btn')
const openBtn_02 = document.querySelector('main .personal-detail .personal-list .open-btn')
const acodienBox_01 = document.querySelector('main .personal-detail .details')
const acodienBox_02 = document.querySelector('main .personal-detail .list-items')
const closeBtn = document.querySelectorAll('main .personal-detail > div span:nth-of-type(2)')
const buttons = document.querySelectorAll('main .personal-detail > div')
// console.log(buttons)

buttons[0].addEventListener('click', (e)=> {
    if(acodienBox_01.style.display == 'none'){
        acodienBox_01.style.display = 'block'
        detailBox_01.style = 'margin-bottom: 0px; border-radius: 0.5rem 0.5rem 0 0 '
        closeBtn[0].style.display = 'block'
        openBtn_01.style.display = 'none'
    }else{
        acodienBox_01.style.display = 'none'
        detailBox_01.style = 'margin-bottom: 0.5rem; border-radius: 0.5rem'
        closeBtn[0].style.display = 'none'
        openBtn_01.style.display = 'block'
    }
})
buttons[2].addEventListener('click', (e)=> {
    if(acodienBox_02.style.display == 'none'){
        acodienBox_02.style.display = 'block'
        detailBox_02.style = 'margin-bottom: 0px; border-radius: 0.5rem 0.5rem 0 0 '
        closeBtn[1].style.display = 'block'
        openBtn_02.style.display = 'none'
    }else{
        acodienBox_02.style.display = 'none'
        detailBox_02.style = 'margin-bottom: 0.5rem; border-radius: 0.5rem'
        closeBtn[1].style.display = 'none'
        openBtn_02.style.display = 'block'
    }
})

const editBtn = document.querySelector('main .personal-detail .details .edit-btn button')
const personalList = document.querySelectorAll('main .personal-detail .details ul li')

function toEdit(e){
    editBtn.removeEventListener('click', toEdit)
    editBtn.innerText = '완료'
    acodienBox_01.style.display = 'block'
    detailBox_01.style = 'margin-bottom: 0px; border-radius: 0.5rem 0.5rem 0 0 '
    console.log(personalList)
    const detail = document.querySelectorAll('.detail')
    for(let i=0; i<detail.length; i++){
        if(detail[i].innerHTML == null){
            for(let i=0; i< personalList.length; i++){
                const input = document.createElement('input')
                input.type = 'text'
                input.className = 'input'
                input.style = 'margin-left: 0.5rem; border: none; background: none; border-bottom: 1px solid #999; outline: none; width:60%;'
                personalList[i].appendChild(input)
            }
            editBtn.addEventListener('click', edited)
        }else{
            detail[i].innerHTML = ''
            personalList[i].removeChild(detail[i])
        }
        console.log(detail[i].innerHTML)
    }
    
    if(personalList.innerHtml == null){
        for(let i=0; i< personalList.length; i++){
            const input = document.createElement('input')
            input.type = 'text'
            input.className = 'input'
            input.style = 'margin-left: 0.5rem; border: none; background: none; border-bottom: 1px solid #999; outline: none; width:60%;'
            personalList[i].appendChild(input)
        }
        editBtn.addEventListener('click', edited)
    }else {
        return editBtn.addEventListener('click', edited)
    }
    return 
}

function edited(e){
    console.log(e.target)
    editBtn.removeEventListener('click', edited)
    alert('수정이 완료 되었습니다.')
    for(let i=0; i<personalList.length; i++){
        const detail = document.createElement('p')
        detail.className = 'detail'
        const inputValue = document.querySelector('input')
        const personal = inputValue.parentElement
        detail.innerText = inputValue.value
        personal.appendChild(detail)
        personal.removeChild(inputValue)
    }
        editBtn.addEventListener('click',returnTo)
    return
}

function returnTo(e){
    editBtn.innerText = '수정하기'
    // editBtn.removeEventListener('click', edited)
    acodienBox_01.style.display = 'none'
    detailBox_01.style = 'margin-bottom: 0.5rem; border-radius: 0.5rem'
    editBtn.addEventListener('click', toEdit)
    const detail =document.querySelectorAll('.detail')
    if(detail == null){
        personalList.removeChild(detail)
    }
}
editBtn.addEventListener('click', toEdit)


// 영화아이템 목록에서 지우기
const itemContainer = document.querySelector('main .personal-detail .list-items ul')
const movieItem = document.querySelectorAll('main .personal-detail .list-items ul li')
const deletBtn = document.querySelectorAll('main .personal-detail .list-items ul li button')

console.log(deletBtn)
console.log(movieItem)

for(let i=0; i<movieItem.length; i++){
    deletBtn[i].addEventListener('click', function(e){
        if(e.target == deletBtn[i]){
            // movieItem[i].style.display = 'none'
            itemContainer.removeChild(movieItem[i])
            return console.log(itemContainer)
        }
    })
}
