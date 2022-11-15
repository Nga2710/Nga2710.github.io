var toggle1, toggle2, toggle3, toggle4, toggle5, toggle6, buttons = ``, buttonGroup1, buttonGroup2, buttonGroup3, buttonGroup4, buttonGroup5, buttonGroup6;
const saveFile = document.getElementById('saveFile');
saveFile.addEventListener('click', e => {
  var fileName = document.getElementById('fileName').value,
  scene_tag = document.getElementById('scene_tag').value,
  npc_name = document.getElementById('npc_name').value,
  text = document.getElementById('text').value,
  name1 = document.getElementById('name1').value,
  name2 = document.getElementById('name2').value,
  name3 = document.getElementById('name3').value,
  name4 = document.getElementById('name4').value,
  name5 = document.getElementById('name5').value,
  name5 = document.getElementById('name6').value;
  npc_name = toRawText(npc_name);
  text = toRawText(text);
  name1 = toRawText(name1);
  name2 = toRawText(name2);
  name3 = toRawText(name3);
  name4 = toRawText(name4);
  name5 = toRawText(name5);
  name6 = toRawText(name6);
  var commands1 = document.getElementById('commands1').value,
  commands2 = document.getElementById('commands2').value,
  commands3 = document.getElementById('commands3').value,
  commands4 = document.getElementById('commands4').value,
  commands5 = document.getElementById('commands5').value,
  commands6 = document.getElementById('commands6').value,
  on_open_commands = document.getElementById('on_open_commands').value,
  on_close_commands = document.getElementById('on_close_commands').value;
  commands1 = Fcommands(toggle1, commands1);
  commands2 = Fcommands(toggle2, commands2);
  commands3 = Fcommands(toggle3, commands3);
  commands4 = Fcommands(toggle4, commands4);
  commands5 = Fcommands(toggle5, commands5);
  commands6 = Fcommands(toggle6, commands6);
  function Fcommands(toggleF, commandsF) {
    if (toggleF && commandsF) {
      commandsF = '"' + commandsF.replace(/\n/g, '", "') + '"';
    }
    return commandsF;
  };
  buttonGroup1 = toGroup(name1, commands1);
  buttonGroup2 = toGroup(name2, commands2);
  buttonGroup3 = toGroup(name3, commands3);
  buttonGroup4 = toGroup(name4, commands4);
  buttonGroup5 = toGroup(name5, commands5);
  buttonGroup6 = toGroup(name6, commands6);
  function toGroup(nameG, commandsG) {
    var buttonGroup = '{"name":' + nameG + ', ' + '"commands":[' + commandsG + ']}';
    return buttonGroup;
  }
  if (on_open_commands) {
    on_open_commands = '"' + on_open_commands.replace(/\n/g, '", "') + '"';
  } else on_open_commands = '';
  if (on_close_commands) {
    on_close_commands = '"' + on_close_commands.replace(/\n/g, '", "') + '"';
  } else on_close_commands = '';
  if (toggle1) {
    buttons += buttonGroup1;
    if (toggle2) {
      buttons += ", " + buttonGroup2;
      if (toggle3) {
        buttons += ", " + buttonGroup3;
        if (toggle4) {
          buttons += ", " + buttonGroup4;
          if (toggle5) {
            buttons += ", " + buttonGroup5;
            if (toggle6) {
              buttons += ", " + buttonGroup6;
            }
          }
        }
      }
    }
  } else buttons = ``;
  const dialogue =
  `{"format_version": "1.17", "minecraft:npc_dialogue":{"scenes":[{"scene_tag": "${scene_tag}", "npc_name": ${npc_name}, "text": ${text}, "on_open_commands":[${on_open_commands}], "on_close_commands":[${on_close_commands}], "buttons":[${buttons}]}]}}`;
  if (fileName && scene_tag)
    downloadFile(fileName, dialogue); else {
    if (!scene_tag) {
      document.querySelector(".scene_tag").classList.add("wood_b_warning");
      document.querySelector(".scene_tag").classList.remove("wood_b");
    }
    if (!fileName) {
      document.querySelector(".fileName").classList.add("wood_b_warning");
      document.querySelector(".fileName").classList.remove("wood_b");
    }
    window.open("#top", "_self");
    toastShow("Lỗi", "Đây là những ô bắt buộc phải điền!");
    const timeout = setTimeout(reset, 3000);
    function reset() {
      document.querySelector(".fileName").classList.remove("wood_b_warning");
      document.querySelector(".fileName").classList.add("wood_b");
      document.querySelector(".scene_tag").classList.remove("wood_b_warning");
      document.querySelector(".scene_tag").classList.add("wood_b");
    }
  }
});
//-a|-b|c|-|-
function toRawText(texts) {
  if (texts) {
    var rawText = '{"rawtext":[',
    trans = false,
    noneText = false,
    withS = false;
    for (let i = 0; i < texts.length; i++) {
      var char = texts[i];
      if (trans && char == "|" && texts[i-1] != "\\") {
        rawText += '", "with":["';
        withS = true;
        continue;
      }
      if (withS && trans && char == ",") {
        rawText += '", "';
        continue;
      }
      if (char == "-" && texts[i-1] != "\\") {
        if (noneText) {
          noneText = false;
          if (i+1 <= texts.length) {
            rawText += '"}, ';
          } else rawText += '"}';
        }
        if (!trans && !noneText) {
          rawText += '{"translate": "';
          trans = true;
          continue;
        }
        if (trans) {
          trans = false;
          if (withS) {
            rawText += '"]';
            withS = false;
          } else rawText += '"';
          if (!withS && i+1 < texts.length) {
            rawText += "}, ";
          } else rawText += "}";
        }
        continue;
      }
      if (!trans && !noneText) {
        rawText += '{"text": "' + char;
        noneText = true;
        continue;
      }
      if (char == "\"")
      rawText += "\\\""; else
      rawText += char;
    }
    if (noneText) {
      noneText = false;
      rawText += '"}';
    }
    rawText += "]}";
  } else rawText = '""';
  rawText = rawText.replace(/\\\-/g, "-").replace(/\\\|/g, "|");
  return rawText;
}
function downloadFile(fileName, dialogue) {
  const element = document.createElement('a');
  const blob = new Blob([dialogue],
    {
      type: 'plain/text'
    });
  const fileUrl = URL.createObjectURL(blob);
  element.setAttribute('href',
    fileUrl);
  element.setAttribute('download',
    `${fileName}.json`);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
function toggle_on1() {
  document.querySelector(".buttonoff1").classList.add("hide");
  document.querySelector(".buttonon1").classList.remove("hide");
  document.querySelector(".buttonGroup2").classList.remove("hide");
  toggle1 = true;
}
function toggle_off1() {
  document.querySelector(".buttonoff1").classList.remove("hide");
  document.querySelector(".buttonon1").classList.add("hide");
  document.querySelector(".buttonoff2").classList.remove("hide");
  document.querySelector(".buttonon2").classList.add("hide");
  document.querySelector(".buttonoff3").classList.remove("hide");
  document.querySelector(".buttonon3").classList.add("hide");
  document.querySelector(".buttonoff4").classList.remove("hide");
  document.querySelector(".buttonon4").classList.add("hide");
  document.querySelector(".buttonoff5").classList.remove("hide");
  document.querySelector(".buttonon5").classList.add("hide");
  document.querySelector(".buttonoff6").classList.remove("hide");
  document.querySelector(".buttonon6").classList.add("hide");
  document.querySelector(".buttonGroup2").classList.add("hide");
  document.querySelector(".buttonGroup3").classList.add("hide");
  document.querySelector(".buttonGroup4").classList.add("hide");
  document.querySelector(".buttonGroup5").classList.add("hide");
  document.querySelector(".buttonGroup6").classList.add("hide");
  toggle1 = false;
  toggle2 = false;
  toggle3 = false;
  toggle4 = false;
  toggle5 = false;
  toggle6 = false;
}
function toggle_on2() {
  document.querySelector(".buttonoff2").classList.add("hide");
  document.querySelector(".buttonon2").classList.remove("hide");
  document.querySelector(".buttonGroup3").classList.remove("hide");
  toggle2 = true;
}
function toggle_off2() {
  document.querySelector(".buttonoff2").classList.remove("hide");
  document.querySelector(".buttonon2").classList.add("hide");
  document.querySelector(".buttonoff3").classList.remove("hide");
  document.querySelector(".buttonon3").classList.add("hide");
  document.querySelector(".buttonoff4").classList.remove("hide");
  document.querySelector(".buttonon4").classList.add("hide");
  document.querySelector(".buttonoff5").classList.remove("hide");
  document.querySelector(".buttonon5").classList.add("hide");
  document.querySelector(".buttonoff6").classList.remove("hide");
  document.querySelector(".buttonon6").classList.add("hide");
  document.querySelector(".buttonGroup3").classList.add("hide");
  document.querySelector(".buttonGroup4").classList.add("hide");
  document.querySelector(".buttonGroup5").classList.add("hide");
  document.querySelector(".buttonGroup6").classList.add("hide");
  toggle2 = false;
  toggle3 = false;
  toggle4 = false;
  toggle5 = false;
  toggle6 = false;
}
function toggle_on3() {
  document.querySelector(".buttonoff3").classList.add("hide");
  document.querySelector(".buttonon3").classList.remove("hide");
  document.querySelector(".buttonGroup4").classList.remove("hide");
  toggle3 = true;
}
function toggle_off3() {
  document.querySelector(".buttonoff3").classList.remove("hide");
  document.querySelector(".buttonon3").classList.add("hide");
  document.querySelector(".buttonoff4").classList.remove("hide");
  document.querySelector(".buttonon4").classList.add("hide");
  document.querySelector(".buttonoff5").classList.remove("hide");
  document.querySelector(".buttonon5").classList.add("hide");
  document.querySelector(".buttonoff6").classList.remove("hide");
  document.querySelector(".buttonon6").classList.add("hide");
  document.querySelector(".buttonGroup4").classList.add("hide");
  document.querySelector(".buttonGroup5").classList.add("hide");
  document.querySelector(".buttonGroup6").classList.add("hide");
  toggle3 = false;
  toggle4 = false;
  toggle5 = false;
  toggle6 = false;
}
function toggle_on4() {
  document.querySelector(".buttonoff4").classList.add("hide");
  document.querySelector(".buttonon4").classList.remove("hide");
  document.querySelector(".buttonGroup5").classList.remove("hide");
  toggle4 = true;
}
function toggle_off4() {
  document.querySelector(".buttonoff4").classList.remove("hide");
  document.querySelector(".buttonon4").classList.add("hide");
  document.querySelector(".buttonoff5").classList.remove("hide");
  document.querySelector(".buttonon5").classList.add("hide");
  document.querySelector(".buttonoff6").classList.remove("hide");
  document.querySelector(".buttonon6").classList.add("hide");
  document.querySelector(".buttonGroup5").classList.add("hide");
  document.querySelector(".buttonGroup6").classList.add("hide");
  toggle4 = false;
  toggle5 = false;
  toggle6 = false;
}
function toggle_on5() {
  document.querySelector(".buttonoff5").classList.add("hide");
  document.querySelector(".buttonon5").classList.remove("hide");
  document.querySelector(".buttonoff6").classList.remove("hide");
  document.querySelector(".buttonon6").classList.add("hide");
  document.querySelector(".buttonGroup6").classList.remove("hide");
  toggle5 = true;
}
function toggle_off5() {
  document.querySelector(".buttonoff5").classList.remove("hide");
  document.querySelector(".buttonon5").classList.add("hide");
  document.querySelector(".buttonGroup6").classList.add("hide");
  toggle5 = false;
  toggle6 = false;
}
function toggle_on6() {
  document.querySelector(".buttonoff6").classList.add("hide");
  document.querySelector(".buttonon6").classList.remove("hide");
  toggle6 = true;
}
function toggle_off6() {
  document.querySelector(".buttonoff6").classList.remove("hide");
  document.querySelector(".buttonon6").classList.add("hide");
  toggle6 = false;
}