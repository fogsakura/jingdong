// 模糊查询
// 获取搜索框关键字并显示匹配结果
let keyword = document.querySelector('.keyword');
let searchArr = ['小米手机', '华为手机', '苹果手机', '小米电视', '小米平板', '苹果12', '苹果13', '苹果手表'];
let searchHelper = document.querySelector('.search-helper');
keyword.oninput = function(){
    searchHelper.innerHTML = ''; // 重置匹配结果
    // 遍历后台数据 显示匹配结果
    console.log();
    for(let i=0;i<searchArr.length;i++){
        // indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置
        if(searchArr[i].indexOf(keyword.value) != -1){
            searchHelper.innerHTML += '<li>' + searchArr[i] + '</li>';
            // 显示匹配结果
            searchHelper.style.display = 'block';
        }
    }
}

// 搜索框失焦后不显示结果
keyword.onblur = function(){
    searchHelper.style.display = 'none';
}


// 轮播图
let lis = document.querySelectorAll('.banner-btn li');  // 选取所有的li
let img = document.querySelector('.img');
let prev = document.querySelector('.prev');
let next = document.querySelector('.next');
// slide是轮播区域
let slide = document.querySelector('.slide');
let imgArr = ['01.jpg','02.jpg','03.jpg','04.jpg','05.jpg','06.jpg'];
// count作为下标
let count = 0;
// 实现图片切换 并突出圆点
function cutImg(){
    img.src = '../images/img-slide/' + imgArr[count];
    for(let i = 0;i < lis.length;i++){
        lis[i].className = '';
    }
    lis[count].className = 'active';
}

// 设置2秒自动切换
// setInterval(函数, 时间)
let timer = setInterval(function(){
    count++;
    if(count>imgArr.length-1) count=0;
    cutImg();
}, 2000);

// 设置切换到底部和头部时的循环
// 下一张事件
next.onclick = function(){
    count++;
    if(count>imgArr.length-1)
        count = 0;
    cutImg();
}
// 上一张事件
prev.onclick = function(){
    count--;
    if(count<0)
        count = imgArr.length-1;
    cutImg();
}

// 鼠标移出时不再自动切换
slide.onmouseover = function(){
    clearInterval(timer);
}
// 鼠标移入时再次切换
slide.onmouseout = function(){
    // 再次调用timer 保证鼠标切入切出时针对的是同一个自动轮播对象
    timer = setInterval(function(){
        count++;
        if(count>imgArr.length-1) count=0;
        cutImg();
    }, 2000);
}

// 为每个圆点绑定点击事件,将圆点的序号绑定在图片的序号上
for(let i = 0;i < lis.length;i++){
    lis[i].onclick = () =>{
        count = i;
        cutImg();
    }
}


// 楼层滚动 吸顶效果
// 实现楼层滚动 文字变色的效果
let header = document.querySelector('.header');
let banner = document.querySelector('.banner');
let items = document.querySelectorAll('.content .item');
let elevator = document.querySelector('.elevator');
let elevatorA = document.querySelectorAll('.elevator a');
let search = document.querySelector('.search');
let searchM = document.querySelector('.search-m');
let form = document.querySelector('.form');
let searchLogo = document.querySelector('.search_logo');

let elevatorArr = [];
// 基础高度
let base = header.offsetHeight + banner.offsetHeight;
for(let i=0;i<items.length;i++){
    base += items[i].offsetHeight;
    elevatorArr.push(base);
}
function clearColor(){
    for(let i=0;i<elevatorA.length;i++){
        elevatorA[i].style.color = '';
    }
}

// 实现楼层的定位切换,滚动事件onscroll
document.onscroll = function(){
    // 获取到滚动条垂直方向滚动了多少
    let top = document.documentElement.scrollTop;

    // 获取到header的高度
    let headerHeight = header.offsetHeight;  // 包括height、padding、border
    // 获取到banner的高度
    let bannerHeight = banner.offsetHeight;

    // 当下滑到一定高度时 将elevator导航栏设置为固定
    if(top >= headerHeight + bannerHeight){
        elevator.className = 'elevator elevator-fix';
        // 当下滑到一定高度时,搜索框设为吸顶效果
        search.className = 'search search-fix';
        searchM.style.height = '70px';
        form.style.top = '20px';
        searchLogo.style.display = 'block';
    }
    else{
        elevator.className = 'elevator';
        search.className = 'search';
        searchM.style.height = '80px';
        form.style.top = '25px';
        searchLogo.style.display = 'none';
    }

    // 设置导航栏高亮
    if(top < header.offsetHeight+banner.offsetHeight){
        clearColor();
    }else if(top >= header.offsetHeight+banner.offsetHeight && top < elevatorArr[0]){ 
        clearColor();
        elevatorA[0].style.color = 'red';
    }else if(top >= elevatorArr[0] && top < elevatorArr[1]){
        clearColor();
        elevatorA[1].style.color = 'red';
    }else if(top >= elevatorArr[1] && top < elevatorArr[2]){
        clearColor();
        elevatorA[2].style.color = 'red';
    }else if(top >= elevatorArr[2]){
        clearColor();
        elevatorA[3].style.color = 'red';
    }
}