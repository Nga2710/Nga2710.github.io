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
<div class="icond sidebarIconClose" onclick="sidebarOpen()"></div>
<div class="icond sidebarIconOpen sidebarIconHide" onclick="sidebarClose()"></div>
<div class="headerTitle">BDev-Book</div>
<a class="indeximg icond" href="index.html"></a>
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
    <div class="p contentBox" style="overflow-y: auto; height: auto; max-height: 256px;">
    <div style="margin: 5px">
      <div class="contentText">
        <a class="ru" href="index.html" title="Trang Chủ"><span class="blue index"></span></a>
      </div>
      <div>
        <div class="contentText dropdown">
          <span>Tài liệu</span>
        </div>
        <div class="dropdownTab dropdownHide">
          <div class="contentText">
            <a class="ru" href="rawtext.html" title="Văn Bản Thô"><span class="blue rawText"></span></a>
          </div>
        </div>
      </div>
      <div>
        <div class="contentText dropdown">
          <span>Công cụ</span>
        </div>
        <div class="dropdownTab dropdownHide">
          <div class="contentText">
            <a class="ru" href="encode-decode.html" title="Mã Hóa & Giải Mã Json"><span class="blue encode-decode"></span></a>
          </div>
          <div class="contentText">
            <a class="ru" href="dialogue-generator.html" title="Tạo Json Của Dialogue"><span class="blue dialogue-generator"></span></a>
          </div>
          <div class="contentText">
            <a class="ru" href="uuid-generator.html" title="Tạo Uuid"><span class="blue uuid-generator"></span></a>
          </div>
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
Youtube Green</a>
<a class="social footerLink" href="https://twitter.com/Nga2710?s=0" target="_blank"><div class="socialLogo logoTwitter"></div>
Twitter @Nga2710</a>
</div>
<div class="copyright">
<div class="copyright1">
Copyright©2021-<div class="year"></div>
</div>
<div class="copyrightSide"></div>
<div class="copyright2">
Created by Green
</div>
<div class="copyrightSide"></div>
<div class="copyright3">
Hosted by <a class="ru" href="https://github.com/" target="_blank"><span class="blue">Github</span></a>
</div>
</div>
`;
