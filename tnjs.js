window.addEventListener('scroll', function() {
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPosition = window.scrollY;
  const scrollPercentage = (scrollPosition / docHeight) * 100;


  const progressBar = document.querySelector('.progress-bar');
  progressBar.style.width = scrollPercentage + '%';


  const scrollPercentageDisplay = document.getElementById('scrollPercentage');
  scrollPercentageDisplay.textContent = Math.round(scrollPercentage) + '%';
});

function pasteFromClipboard() {
  navigator.clipboard.readText()
  .then(function(text) {
    var textarea = document.getElementById("text");
    textarea.value = text;
  })
  .catch(function(err) {
    console.error("Lỗi khi đọc văn bản: ", err);
  });
}


document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const lastPathSegment = window.location.pathname.split('/').filter(Boolean).pop().replace('.html', '') || '/';
  header.innerHTML = `<span>${lastPathSegment}</span>`;
});
/*
    var inputElement = document.getElementById('text');
    inputElement.value = `Câu 1: 1+1=?\nA. 1 /B. 2 C. 3 D. 4\nCâu 2: 1+2=?\nA. 1 B. 2 /C. 3 D. 4
    `*/
/*
    let str = ""
    for (let i = 0; i < 10; i++) {
      let a = Math.floor(Math.random()*99)
      let b = Math.floor(Math.random()*99)
      let result = a*b
      if (Math.random() < 0.8) {
       let a1 = shuffleR(result, [])
       let a2 = shuffleR(result, [a1])
       let a3 = shuffleR(result, [a1, a2])
        str += `\nCâu ${i+1}: ${a} × ${b} = ?\n/A. ${result}\nB. ${a1}\nC. ${a2}\nD. ${a3}`
      } else {
        let a1 = shuffleR(b, [])
        let a2 = shuffleR(b, [a1])
        let a3 = shuffleR(b, [a1, a2])
        str += `\nCâu ${i+1}: ${result} : ${a} = ?\n/A. ${b}\nB. ${a1}\nC. ${a2}\nD. ${a3}`
      }
    }
    function shuffleR(n, excludeArray) {
      const strN = n.toString();
      const index = Math.floor(Math.random() * strN.length);
      let newDigit = Math.floor(Math.random() * 9) + 1;

      // Đảm bảo số mới khác số ban đầu và khác với những số trong mảng
      while (newDigit === parseInt(strN[index]) || excludeArray.includes(newDigit)) {
        newDigit = Math.floor(Math.random() * 9) + 1;
      }

      const modifiedNumber = strN.substring(0, index) + newDigit + strN.substring(index + 1);
      return parseInt(modifiedNumber);
    }


    inputElement.value = str*/

function replaceLinksToImages(text) {
  var urlPattern = /(http(s)?:\/\/[^\s]+\.(png|jpg|jp2|gif|webp))/g;
  // thay thế URLs bằng <img> tags
  var replacedText = text.replace(urlPattern,
    function (url) {
      return '<img src="' + url + '" />';
    });
  return replacedText;
}
/*
inputElement.addEventListener('input', function() {
  localStorage.setItem('inputValue_page1', inputElement.value);
});
// Tải lại giá trị đã lưu khi trang được tải lại
window.addEventListener('load', function() {
  const savedValue = localStorage.getItem('inputValue_page1');
  if (savedValue) {
    inputElement.value = savedValue;
  }
});*/
function help() {
  let prompt = "Mẫu:\`\nCâu 1: 1+1=?\nA. 1 /B. 2 C. 3 D. 4\nCâu 2: 1+2=?\nA. 1 B. 2 /C. 3 D. 4\n\`\n Lưu ý: \n+Nội dung câu hỏi nằm cùng một dòng\n+Các câu trả lời có thể xuống dòng hoặc không\n+Có thể gắn link hình ảnh vào"
  alert(prompt)
}
let calculateScore;
var minutes, seconds, milliseconds
function run() {

    document.getElementById("start").classList.remove("hide")
    document.getElementById("reload").classList.add("hide")
  var shuffleQ = document.getElementById("shuffleQ").checked,
  shuffleA = document.getElementById("shuffleA").checked
  var inputString = "\n"+document.getElementById("text").value
  if (!inputString) return
  document.getElementById("inputStr").classList.add("hide")
  document.getElementById("main").classList.remove("hide")
  function shuffleArray(array) {
    var currentIndex = array.length,
    temporaryValue,
    randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }





  function convertStringToHTML(questionStrings) {
    const questions = [];
    for (let i = 0; i < questionStrings.length; i++) {
      const questionString = questionStrings[i].trim();
      const lineBreakIndex = questionString.indexOf('\n');
      const question = questionString.slice(0, lineBreakIndex).trim();
      const answers = questionString.slice(lineBreakIndex).trim();
      let answerStrings = answers.split('\n');
      if (shuffleA) answerStrings = shuffleArray(answerStrings)
      const questionAnswers = [];
      for (let j = 0; j < answerStrings.length; j++) {
        let answerString = answerStrings[j].trim();
        const isCorrect = answerString.startsWith("\/");
        if (isCorrect) {
          answerString = answerString.slice(1)
        }
        const answerHTML = `
        <div class="answer">
        <input type="radio" id="q${i}-${j}" name="q${i}" value="${isCorrect ? 'correct': 'incorrect'}"><label class="radio" for="q${i}-${j}">${String.fromCharCode(65+j)}. ${answerString.slice(2).trim()}</label>
        </div>
        `;
        questionAnswers.push(answerHTML);
      }
      const questionHTML = `
      <div class="question" id="qt${i}">
      <p class="question-text"><span style="font-size:26px" onclick="change(this)">✧</span><span style="color: green; font-size:20px"><sub style="font-size: 8px">${i+1}</sub>Câu </span> ${question.replace(/không/g, '<span style="text-decoration: underline;">không</span>')}</p><div style="display: inline-block">
      ${questionAnswers.join('\n')}</div>
      </div>
      `;
      questions.push(questionHTML);
    }
    return questions.join('\n');
  }
  let questionStrings = ("\n" + replaceLinksToImages(inputString.replace(/\t/g, "\x20").replace(/\x20([A-Z])\./g, '\n$1.').replace(/\x20\/([A-Z])\./g, '\n\/$1.').replace(/\.([A-Z])\./g, '\n.$1')).split('\n').filter(line => line.trim() !== '').join('\n')).split('\nCâu ')
  questionStrings.shift()
  if (shuffleQ) questionStrings = shuffleArray(questionStrings)
  amount = questionStrings.length
  const htmlString = convertStringToHTML(questionStrings);
  // console.log(htmlString)
  // test
  //  console.log(htmlString);
  document.getElementById("container").innerHTML = htmlString
  var inputs = document.querySelectorAll('input[type="radio"]');
  var result = document.getElementById('result');
  var timer = document.getElementById('time');
  var startTime = Date.now();

  function updateTime() {
    var currentTime = Date.now();
    var timeDiff = currentTime - startTime;
    minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    milliseconds = Math.floor((timeDiff % 1000) / 10);
    minutes = (minutes < 10) ? "0" + minutes: minutes;
    seconds = (seconds < 10) ? "0" + seconds: seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds: milliseconds;
    timer.textContent = minutes + ":" + seconds + ":" + milliseconds;
  }

  timerInterval = setInterval(updateTime,
    10);
  
  if (window.location.hostname !== "\u006e\u0067\u0061\u0032\u0037\u0031\u0030\u002e\u0067\u0069\u0074\u0068\u0075\u0062\u002e\u0069\u006f") {
    document.body.innerHTML = "\u003c\u0068\u0031\u003e\u004c\u1ed7\u0069\u0020\u0074\u0072\u0079\u0020\u0063\u1ead\u0070\u003c\u002f\u0068\u0031\u003e";
    throw new Error("Hey!");
  }
  var radioButtons = document.querySelectorAll('input[type="radio"]');

  if (document.getElementById("autoStr").checked) {
    radioButtons.forEach(function(radio) {
      radio.addEventListener('click', function() {
        if (radio.checked) {
          try {
            scroll(document.getElementById(`qt${Number(radio.name.slice(1))+1}`), false)
          }
          catch {
            calculateScore()
            scroll(document.getElementById("result"), false)
          }
        }
      });
    });
  }
  var timerInterval, amount;
  calculateScore = function() {
    document.getElementById("start").classList.add("hide")
    document.getElementById("reload").classList.remove("hide")
    var score = 0;
    var inputs = document.querySelectorAll('input[type="radio"]');
    var result = document.getElementById('result');
    var timer = document.getElementById('time');
    inputs.forEach(function(input) {
      if (input.checked && input.value === 'correct') {
        score++;
      }
      if (input.value === 'correct') {
        input.parentNode.style.color = "green"
      } else
        if (input.checked) {
        input.parentNode.style.color = "red"
      }
    });
    clearInterval(timerInterval);
    result.style.display = 'block';
    result.textContent = `Điểm của bạn: ${((score/amount)*10).toFixed(2)}/10\nSố câu đúng: ${score}\nSố câu sai: ${amount-score}\nTổng số câu: ${amount}\nThời gian TB: ${((Number(minutes)*60+Number(seconds))/amount).toFixed(2)}s/câu\nNhận xét: ${feedback((score/amount*10).toFixed(2))}`;
    if ((score/amount)*10 >= 9) {
      result.className = 'correct';
    } else {
      result.className = 'incorrect';
    }
    /* var userInput = prompt("Nhập tên của bạn:");
            if (userInput !== null) {
                console.log("Bạn đã nhập: " + userInput);
            } else {
                console.log("Bạn đã hủy bỏ hộp thoại.");
            }*/
    var prevButton = document.getElementById('prevButton');
    var nextButton = document.getElementById('nextButton');
    var radioInputs = Array.from(document.querySelectorAll('input[type="radio"]'));
    // Filter radio inputs without value "correct"
    var filteredInputs = radioInputs.filter(function(input) {
      return input.value == 'correct' && !input.checked;
    });

    var IAR = filteredInputs.map((value)=> "\nCâu "+questionStrings[Number(value.name.slice(1))]).join("")
         var inputElement = document.getElementById('text');
  inputElement.value = IAR
    var maxIndex = filteredInputs.length-1
    var currentIndex = 0
    prevButton.addEventListener('click', function() {
      currentIndex--;
      if (currentIndex >= 0) {
        scroll(filteredInputs[currentIndex])
      } else {
        scroll(filteredInputs[maxIndex])
        currentIndex = maxIndex
      }
    });
    nextButton.addEventListener('click',
      function() {
        console.log(currentIndex)
        currentIndex++;
        if (currentIndex <= maxIndex) {
          scroll(filteredInputs[currentIndex])
        } else {
          scroll(filteredInputs[0])
          currentIndex = 0
        }
      });
    document.getElementById("floating-buttons").classList.remove("hide")
    inputs.forEach(function(input) {
      input.disabled = true
    })
  }
}
function change(element) {
  element.innerHTML = element.innerHTML == "✦" ? "✧": "✦"
  element.style.color = element.innerHTML == "✦" ? "#ffdd00": "black"
  //  element.style.color = element.innerHTML == "✦" ? "#ffff00": "black"
}
var IAR
function reload() {
  window.scrollTo(0,
    0)
    result.textContent = ""

 // window.location.reload()
   document.getElementById("inputStr").classList.remove("hide")
  document.getElementById("main").classList.add("hide")
  

}

function scroll(element, h = true) {
  (h ? element.parentNode: element).scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center"
  });
  if (!h) return
  element.parentNode.classList.add("highlight-animation");

  setTimeout(function() {
    element.parentNode.classList.remove("highlight-animation");
  },
    1000);
}
function feedback(score) {
  if (score < 0 || score > 10) {
    return "Điểm không hợp lệ. Vui lòng nhập điểm từ 0 đến 10.";
  }

  const feedbackRanges = [
    // 10 điểm
    {
      min: 10,
      max: 10,
      messages: [
        "Xuất sắc! Nhưng hãy thử nhìn lại bài để kiểm tra xem bạn có thực sự nắm chắc kiến thức không.",
        "Hoàn hảo! Nhưng đừng quên kiểm tra kỹ để đảm bảo bạn không bỏ sót bất kỳ chi tiết nào.",
        "Điểm tối đa! Nhưng thử tự đặt câu hỏi và giải lại bài để củng cố kiến thức.",
        "Thành công lớn, nhưng để duy trì phong độ, hãy ôn luyện bài này thêm một lần nữa.",
        "Điểm tuyệt đối! Hãy thử thách bản thân với bài tập khó hơn để mở rộng kiến thức."
      ]},
    // 9.5 - 9.99 điểm
    {
      min: 9.5,
      max: 9.99,
      messages: [
        "Rất tuyệt vời! Nhưng có lẽ bạn bỏ lỡ một vài chi tiết nhỏ. Hãy làm lại bài và tìm ra chúng.",
        "Điểm này rất cao, nhưng vẫn còn chỗ để cải thiện. Đừng quên xem lại các phần bạn cảm thấy chưa chắc.",
        "Bạn gần như hoàn hảo, nhưng thử làm lại bài mà không nhìn tài liệu để kiểm tra sự tự tin của mình.",
        "Rất tốt! Nhưng bạn cần thêm một chút tập trung để đạt điểm tối đa."
      ]},
    // 9 - 9.49 điểm
    {
      min: 9,
      max: 9.49,
      messages: [
        "Điểm cao! Tuy nhiên, bạn có thể cải thiện hơn bằng cách làm lại bài và xem có gì thiếu sót không.",
        "Bạn đã làm rất tốt, nhưng hãy tự kiểm tra kiến thức bằng cách giải lại bài một lần nữa.",
        "Điểm này rất ấn tượng! Hãy thử tìm hiểu thêm các cách giải khác để mở rộng tư duy.",
        "Rất tốt, nhưng nếu làm bài với thời gian ngắn hơn, bạn có thể đạt kết quả cao hơn nữa."
      ]},
    // 8 - 8.99 điểm
    {
      min: 8,
      max: 8.99,
      messages: [
        "Điểm khá, nhưng hãy xem lại phần nào khiến bạn mất điểm và cải thiện nó.",
        "Hãy dành thêm chút thời gian để làm lại bài, chắc chắn bạn sẽ đạt kết quả cao hơn.",
        "Bạn đang làm tốt, nhưng đừng ngại thử thách bản thân để đạt mục tiêu cao hơn.",
        "Điểm này tốt, nhưng hãy cố gắng giảm sai sót trong lần tiếp theo."
      ]},
    // 6.5 - 7.99 điểm
    {
      min: 6.5,
      max: 7.99,
      messages: [
        "Bạn đạt điểm khá, nhưng cần xem xét lại các lỗi dễ gặp để nâng cao thành tích.",
        "Điểm này ổn, nhưng bạn hoàn toàn có thể làm tốt hơn nếu tập trung hơn.",
        "Hãy thử làm bài lại lần nữa với cách tiếp cận khác, bạn sẽ thấy sự tiến bộ.",
        "Bạn đang ở mức tốt, nhưng hãy cố gắng làm lại bài để nâng cao độ chính xác."
      ]},
    // 5 - 6.49 điểm
    {
      min: 5,
      max: 6.49,
      messages: [
        "Điểm trung bình, bạn cần làm lại bài và tập trung hơn vào các khái niệm chưa rõ.",
        "Hãy xem đây là cơ hội để học hỏi và làm lại. Bạn chắc chắn sẽ tốt hơn.",
        "Bạn đã có cố gắng, nhưng hãy dành thêm thời gian ôn lại những phần còn yếu.",
        "Kết quả này chỉ ở mức tạm được. Cố gắng thêm để đạt mức cao hơn."
      ]},
    // 3 - 4.99 điểm
    {
      min: 3,
      max: 4.99,
      messages: [
        "Điểm này thấp, bạn cần nghiêm túc xem lại bài và tìm ra những lỗi sai cơ bản.",
        "Hãy bắt đầu lại từ những phần cơ bản và tập trung hơn vào bài học.",
        "Bạn đang gặp khó khăn. Hãy thử làm bài lại từ đầu.",
        "Đừng nản lòng. Làm lại bài tập từ đầu sẽ giúp bạn tiến bộ hơn."
      ]},
    // 0 - 2.99 điểm
    {
      min: 0,
      max: 2.99,
      messages: [

        "Đã ngu còn xui!",
        "Cười rung CPU",

        "Kết quả này đủ để gọi cấp cứu.",
        "Bạn đang đứng dưới đáy đại dương rồi.",
        "Phải có ý đồ gì đó, con người không thể ngu vậy được!",
        
        "Thầy cô từ chối nhìn mặt",
        "Không thể thấp hơn nữa!",
        "Điểm số đến mức này là một tài năng hiếm có!",
        "Gọi mục sư đi!",
        "Hết cứu",
"Khók",


        "Bạn không làm bài à? Hay là điền bừa rồi chạy đi chơi?",
        "Nếu có giải thưởng 'dũng cảm nộp bài', chắc bạn được giải nhất.",
        "Điểm này khiến thầy cô phải tự hỏi: 'Mình có dạy nhầm ngành không?'",
        "Bạn đang thử thách độ kiên nhẫn của thầy cô và chính mình.",
        "Hãy coi điểm này là động lực để thoát kiếp... ngáo.",
        "Bài làm của bạn đáng đưa vào sách giáo khoa... như một ví dụ cần tránh.",
        "Đây là thời điểm bạn nên học thêm và bớt lướt TikTok.",
        "Điểm thấp tới mức nếu vẽ biểu đồ, nó chạm đáy đồ thị.",
        "Hãy ngồi lại, hít một hơi sâu và làm bài nghiêm túc lần nữa.",
        "Điểm số này là ví dụ hoàn hảo của 'không học bài'.",
        "Bạn là người tiên phong cho việc biến điểm số thành... số hài hước.",
        "Không biết bạn học gì, nhưng chắc chắn không phải bài này.",
        "Hình như bạn đang thi thử... kiên nhẫn của giáo viên?",
        "Chắc bạn cần bản đồ để tìm đường đến điểm 10.",
        "Điểm này như ánh sáng le lói cuối đường hầm... nhưng chưa tới.",
        "Bạn đã đạt được một điều không phải ai cũng làm được: điểm thấp khó tin.",
        "Học bài là việc làm cần thiết... nhất là sau điểm số này.",
        "Thầy cô cần một bức thư giải thích về bài làm của bạn.",
        "Kết quả này có lẽ là do bạn đã... ngủ quên trong lúc thi?",
        "Nếu có điểm âm, bạn chắc sẽ lập kỷ lục mới.",

        "Bạn vừa thiết lập một tiêu chuẩn mới cho sự cố gắng không thành.",
        "Không có lý do nào để biện minh cho điểm này... chỉ có hành động.",

        "Bài làm này có thể in ra và làm poster 'học từ thất bại'.",
        "Điểm thấp tới mức nó khiến giáo viên phải kiểm tra lại bài chấm.",
        "Chắc bạn quên mang theo não khi làm bài này rồi.",
        "Thêm một chút cố gắng nữa, bạn sẽ đạt điểm... tròn (không).",
        "Bạn có thể làm tốt hơn, nhưng trước tiên hãy làm gì đó đi.",
        "Đây không phải điểm số, đây là một lời cảnh báo.",

        "Điểm số này đủ để tổ chức... buổi họp khẩn cấp gia đình.",
        "Bạn đã đạt đến đỉnh cao của sự... thiếu tập trung.",
        "Chắc bạn đang thử sức với giới hạn điểm số thấp nhất?",
        "Không có điểm âm, nhưng bạn đã rất gần điều đó.",
        "Bạn cần một kế hoạch học tập khẩn cấp.",
        "Nếu có điểm thưởng vì nộp bài, bạn đã được cộng thêm một chút.",
        "Hãy nhớ rằng thất bại là mẹ của thành công, nhưng bạn cần học trước.",
        "Thầy cô cần một ly cà phê để xử lý bài làm này.",
        "Chắc bạn quên rằng đây là bài thi, không phải trò chơi.",
        "Hãy nghĩ đến tương lai và thử làm bài nghiêm túc lần nữa.",
        "Điểm số này có thể trở thành meme của cả lớp.",
        "Bạn vừa chứng minh rằng 'thiếu chuẩn bị là chuẩn bị thất bại'.",
        "Điểm thấp nhưng rất 'gây ấn tượng'.",
        "Bạn có thể làm tốt hơn, nhưng trước hết hãy làm bài đi.",
        "Thầy cô có thể cần thêm từ điển để hiểu bài làm này.",
        "Chắc bạn đã sáng tạo ra cách giải mới, nhưng tiếc là nó sai.",
        "Điểm này thấp tới mức không cần zoom cũng thấy rõ.",
        "Bạn đã đạt đến cấp độ 'truyền thuyết' về điểm thấp.",
        "Nếu có câu lạc bộ 'học lại', bạn là hội trưởng.",
        "Hãy dành thời gian để suy nghĩ về điểm số này.",
        "Điểm số này là lời nhắc nhở rằng bạn cần thay đổi chiến lược học tập.",
        "Nếu có huy chương cho 'không học bài', bạn chắc chắn sẽ giành được.",
        "Hãy coi đây là khởi đầu cho một hành trình dài... lên điểm 10.",
        "Bạn cần học lại toàn bộ từ đầu.",
        "Điểm thấp tới mức nó gần như là nghệ thuật.",
        "Nếu điểm thấp là một nghề, bạn đã trở thành chuyên gia.",
        "Điểm số này như một bài học sống động về việc không học bài.",
        "Bạn đã tạo ra một đỉnh mới cho sự... thiếu cố gắng.",
        "Điểm này khiến cả lớp phải... cúi đầu 'bái phục'.",
        "Bạn đang tiến rất xa... khỏi mục tiêu 10 điểm.",
        "Điểm này không phản ánh năng lực, mà phản ánh sự... lười biếng.",
        "Bài làm này là ví dụ điển hình của việc học lệch.",
        "Hãy bắt đầu lại từ đầu, nghiêm túc hơn và chăm chỉ hơn.",
        "Nếu điểm thấp là một môn thể thao, bạn chắc chắn là vận động viên chuyên nghiệp.",
        "Bạn đang chơi trò chơi mạo hiểm với tương lai của mình.",
        "Điểm này giống như một lời nhắc: 'Học bài đi!'.",
        "Hãy ngừng đùa với điểm số và bắt đầu nghiêm túc học tập.",
        "Điểm thấp này khiến mọi người không thể không... bật cười.",
        "Thầy cô có thể sẽ nhớ mãi bài làm này của bạn.",
        "Chúc bạn may mắn lần sau, lần này thì... hết hy vọng rồi.",
        "Bài làm này giống như một bức thư gửi tương lai: 'Tôi đã từng lười'.",
        "Nếu bạn định phá kỷ lục điểm thấp, bạn đã thành công.",
        "Hãy coi điểm này là lời cảnh báo cuối cùng cho sự lười biếng.",
        "Bạn đã đặt một dấu mốc mới cho sự thiếu cố gắng.",
        "Thầy cô có thể sẽ cần một buổi họp để xử lý bài này.",
        "Bạn đã tạo ra một kỳ tích trong sự nghiệp học tập của mình.",
        "Điểm này giống như một bài thơ buồn về sự lười biếng.",
        "Bạn vừa chứng minh rằng việc không học bài có hậu quả ngay lập tức.",
        "Chắc bạn đang nghĩ 'lần sau làm lại'... đúng không?",
        "Hãy cẩn thận, đừng để điểm số này trở thành thói quen.",
        "Bạn có thể làm tốt hơn nếu bạn thực sự cố gắng.",
        "Điểm số này là một thử thách cho chính bạn vượt qua.",
        "Hãy coi đây là khởi đầu mới, với mục tiêu lớn hơn.",
        "Điểm số này khiến cả lớp phải im lặng... vì không biết nói gì.",
        "Chắc chắn bạn có tiềm năng, nhưng bạn cần học cách khai thác nó."

      ]}];

  // Lựa chọn phạm vi phản hồi phù hợp
  for (const range of feedbackRanges) {
    if (score >= range.min && score <= range.max) {
      const messages = range.messages;
      return messages[Math.floor(Math.random() * messages.length)];
    }
  }

  return "Điểm không hợp lệ.";
}