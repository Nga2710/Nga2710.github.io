window.onload = () => {
  for (let script of scriptList) {
    let scriptCreate = document.createElement('script');
    scriptCreate.src = `https://nga2710.github.io/assets/js/${script}.js`;
    //scriptCreate.src = `assets/js/${script}.js`;
    document.getElementById("script").appendChild(scriptCreate);
  };
  document.getElementById("header").innerHTML = header;
  document.getElementById("sidebar").innerHTML = sidebar;
  document.getElementById("footer").innerHTML = footer;
  document.querySelector(".year").innerHTML = (new Date).getFullYear();
  document.getElementById("loading").innerHTML = loading;
};
let scriptList = [
  "sidebar",
  "filter",
  "search",
  "dropdown",
  "toast",
  "sounds"
];
let loading = `
<span>➼</span>
`;
let header = `
<style>
header {
height: 100px
}
</style>
<div class="icond sidebarIconClose" onclick="sidebarOpen()"></div>
<div class="icond sidebarIconOpen hide" onclick="sidebarClose()"></div>
<div class="headerTitle">BDev-Book</div>
<a class="indeximg icond" href="nga2710.github.io"></a>
<div class="search">
<div class="searchBar">
<div class="searchIcon" onclick="searchEnter()"></div>
<input class="searchInput" placeholder="Nhập để tìm kiếm..." type="search">
</div>
<div class="searchBox hide"></div>
</div>
`;
let sidebar = `
<div class="sidebar sidebarClose">
<div class="box">
<div class="h">
Mục lục
</div>
<contentBox class="p" style="overflow-y: auto; height: auto; max-height: 256px;">
<div style="margin: 5px">
<div class="ar">
<a href="index.html" title="Trang Chủ" class="blue index"></a>
</div>
<div>
<div class="ar dropdown">
<span>Tài liệu</span>
</div>
<div class="dropdownTab hide">
<div class="ar">
<a href="rawtext.html" title="Văn Bản Thô" class="blue rawText"></a>
</div>
</div>
</div>
<div>
<div class="ar dropdown">
<span>Công cụ</span>
</div>
<div class="dropdownTab hide">
<div class="ar">
<a href="json-formattor.html" title="Định dạng Json" class="blue json-formattor"></a>
</div>
<div class="ar">
<a href="encode-decode.html" title="Mã Hóa & Giải Mã" class="blue encode-decode"></a>
</div>
<div class="ar">
<a href="npc_dialogue-generator.html" title="Tạo Json Của Dialogue" class="blue npc_dialogue-generator"></a>
</div>
<div class="ar">
<a href="uuid-generator.html" title="Tạo Uuid" class="blue uuid-generator"></a>
</div>
</div>
</div>
</contentBox>
</div>
</div>
<div class="sidebarClose" onclick="sidebarClose()"></div>
`;
let footer = `
<div>
<a class="center footerLink" href="https://www.youtube.com/@Nga2710" target="_blank">
<div class="icond socialLogo logoYoutube"></div>
Youtube Green</a>
<a class="center footerLink" href="https://twitter.com/Nga2710?s=0" target="_blank">
<div class="icond socialLogo logoTwitter"></div>
Twitter @Nga2710</a>
</div>
<div class="copyright">
<div class="copyright1">
Copyright©<div class="year"></div>
</div>
<div class="copyrightSide"></div>
<div class="copyright2">
Created by Green
</div>
<div class="copyrightSide"></div>
<div class="copyright3">
Hosted by <a href="https://github.com/" target="_blank">Github</a>
</div>
</div>
`;
