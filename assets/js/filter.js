let filter = [
  "Trang Chủ",
  "Văn Bản Thô",
  "Tạo npc_dialogue",
  "Mã Hóa & Giải Mã",
  "Tạo Uuid",
  "apple"
];
let minecraft = [
  "apple"
];
function searchFilter(searchValue) {
  wo("Trang Chủ", "index");
  wo("Văn Bản Thô", "rawtext");
  wo("Tạo npc_dialogue", "dialogue-generator");
  wo("Mã Hóa & Giải Mã", "encode-decode");
  wo("Tạo Uuid", "uuid-generator");
  function wo(value, link) {
    if (searchValue === value) {
      window.open("https://nga2710.github.io/" + link + ".html", "_self");
    }
  }
}