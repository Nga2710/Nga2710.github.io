function defaults() {
  for (let script of scriptList) {
    let scriptCreate = document.createElement('script');
    scriptCreate.src = `assets/js/${script}.js`;
    document.getElementById("script").appendChild(scriptCreate);
  };
  document.getElementById("header").innerHTML = header;
  document.getElementById("sidebar").innerHTML = sidebar;
  document.getElementById("footer").innerHTML = footer;
  document.querySelector(".year").innerHTML = (new Date).getFullYear();
}
let scriptList = [
  "sidebar",
  "filter",
  "search",
  "dropdown"
];
let header = `
<div class="sidebarIcon sidebarIconClose" onclick="sidebarOpen()"></div>
<div class="sidebarIcon sidebarIconOpen sidebarIconHide" onclick="sidebarClose()"></div>
<div class="headerTitle">Nga's Book</div>
<a class="indeximg" href="index.html"></a>
<div class="search">
<div class="searchBar">
<div class="searchIcon" onclick="searchEnter()"></div>
<input class="searchInput" placeholder="Nhập để tìm kiếm..." type="search">
</div>
<div class="searchBox searchBoxHide"></div>
</div>
`;
let sidebar = `
<div class="sidebar sidebarClose">
  <div class="slot box">
    <div class="h">
      Mục lục
    </div>
    <div class="p contentBox" style="overflow-y: auto; height: auto; max-height: 128px;">
      <div class="contentText">
        <a class="ru" href="index.html" title="Trang chủ"><span class="blue index"></span></a>
      </div>
      <div>
        <div class="contentText dropdown">
          <span>Documentation</span>
        </div>
        <div class="dropdownTab dropdownHide">
          <div class="contentText">
            <a class="ru" href="i.html" title="..."><span class="blue"></span></a>
          </div>
        </div>
      </div>
      <div>
        <div class="contentText dropdown">
          <span>Tools</span>
        </div>
        <div class="dropdownTab dropdownHide">
          <div class="contentText">
            <a class="ru" href="encode-decode.html" title="Encode & Decode"><span class="blue encode-decode"></span></a>
          </div>
          <div class="contentText">
            <a class="ru" href="uuid-generator.html" title="Uuid Generator"><span class="blue uuid-generator"></span></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="sidebarClose" onclick="sidebarClose()"></div>
`;
let footer = `
<div>
<a class="social footerLink" href="https://youtube.com/c/Nga2710?sub_confirmation=1" target="_blank"><div class="socialLogo logoYoutube"></div>
Youtube GreenVN</a>
<a class="social footerLink" href="https://twitter.com/Nga2710?s=0" target="_blank"><div class="socialLogo logoTwitter"></div>
Twitter @Nga2710</a>
<a class="social footerLink" href="https://www.facebook.com/tdtnga" target="_blank"><div class="socialLogo logoFacebook"></div>
Facebook Thanh Ngà</a>
</div>
<div class="copyright">
<div class="copyright1">
Copyright©2021-<div class="year"></div>
</div>
<div class="copyrightSide"></div>
<div class="copyright2">
Web by GreenVN
</div>
<div class="copyrightSide"></div>
<div class="copyright3">
Hosted by <a class="ru" href="https://github.com/" target="_blank"><span class="blue">Github</span></a>
</div>
</div>
`;