let filter = [
  "Trang Chủ",
  "Văn Bản Thô",
  "Định Dạng Json",
  "Tạo npc_dialogue",
  "Mã Hóa & Giải Mã",
  "Tạo Uuid"
];
let urlLink = [
  "index",
  "rawtext",
  "json-formattor",
  "npc_dialogue-generator",
  "encode-decode",
  "uuid-generator"
];
function searchFilter(searchValue) {
  for (i = 0; i < filter.length; i++) {
    if (searchValue === filter[i]) {
      window.open("https://nga2710.github.io/" + urlLink[i] + ".html", "_self");
    }
  }
}