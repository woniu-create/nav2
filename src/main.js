const $mainUl = $(".Mainwrapper");
const $last = $mainUl.find("li.last");
const $Show = $(".onShow");
const $input=$("input")
const y=localStorage.getItem('y')
const yObject=JSON.parse(y)

  const simplyfyUrl = (url) => {
    return url
      .replace("https://", "")
      .replace("http://", "")
      .replace("www.", "")
      .replace(/\/.*/, "")
      .replace(/\.com/, "");
  };

  const hashMap = yObject||[
    {logo:'G',url:'https://www.google.com'},
    {logo:'B',url:'https://www.bilibili.com'},
    {logo:'C',url:'https://www.ctrip.com'},
    {logo:'G',url:'https://www.github.com'},
    {logo:'Z',url:'https://www.zhihu.com'}
  ];
  const render=()=>{
    $mainUl.find('li:not(.last)').remove()
    hashMap.forEach((node,index)=>{
      const $li = $(`
      <li>
      <div class="wrapper">
        <div class="logo">${node.logo}</div>
        <div class="close">
        <svg class="icon">
        <use xlink:href="#icon-close"></use>
        </svg> 
        </div> 
      </div>
      <div class="text">${simplyfyUrl(node.url)}</div>
    </li>    
      `).insertBefore($last);
      $li.on('click',()=>{
        window.open(node.url)
      })
      $li.on('click','.close',(e)=>{
         e.stopPropagation()
         hashMap.splice(index,1)
         render()
      })
    })
  }
  render()
  $(".addWrapper").on("click", () => {
    let url = window.prompt("请输入你要添加的网址");
    if (url.indexOf("http") !== 0) {
      url = "https://" + url;
    }
    hashMap.push({
      logo:simplyfyUrl(url)[0].toUpperCase(),
      url:url
    })
   render()
});
window.onbeforeunload=()=>{
  const string=JSON.stringify(hashMap)
  localStorage.setItem('y',string)
}
$input.on("foucs",() => {
  $Show.style.display="block"
})
$input.on("blur",()=> {
  $Show.style.display="none"
})