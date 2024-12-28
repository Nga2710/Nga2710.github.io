        window.addEventListener('scroll', function() {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const scrollPercentage = (scrollPosition / docHeight) * 100;

      // Cập nhật thanh tiến độ
      const progressBar = document.querySelector('.progress-bar');
      progressBar.style.width = scrollPercentage + '%';

      // Cập nhật phần trăm cuộn
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
      var replacedText = text.replace(urlPattern, function (url) {
        return '<img src="' + url + '" />';
      });
      return replacedText;
    }
    inputElement.addEventListener('input', function() {
      localStorage.setItem('inputValue_page1', inputElement.value);
    });
    // Tải lại giá trị đã lưu khi trang được tải lại
    window.addEventListener('load', function() {
      const savedValue = localStorage.getItem('inputValue_page1');
      if (savedValue) {
        inputElement.value = savedValue;
      }
    });
    function help() {
      let prompt = "Mẫu:\`\nCâu 1: 1+1=?\nA. 1 /B. 2 C. 3 D. 4\nCâu 2: 1+2=?\nA. 1 B. 2 /C. 3 D. 4\n\`\n Lưu ý: \n+Nội dung câu hỏi nằm cùng một dòng\n+Các câu trả lời có thể xuống dòng hoặc không\n+Có thể gắn link hình ảnh vào"
      alert(prompt)
    }
    var minutes, seconds, milliseconds
    function run() {
      const shuffleQ = document.getElementById("shuffleQ").checked, shuffleA = document.getElementById("shuffleA").checked
      const inputString = "\n"+document.getElementById("text").value
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
      // Gọi hàm để kích hoạt hiệu ứng highlight
      timerInterval = setInterval(updateTime,
        10);
      // Lấy tất cả các radio button trong trang
      var radioButtons = document.querySelectorAll('input[type="radio"]');
      // Gán sự kiện click cho mỗi radio button
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
    }
    function change(element) {
      element.innerHTML = element.innerHTML == "✦" ? "✧": "✦"
      element.style.color = element.innerHTML == "✦" ? "#ffdd00": "black"
      //  element.style.color = element.innerHTML == "✦" ? "#ffff00": "black"
    }
    function reload() {
      window.scrollTo(0, 0)
      window.location.reload()
    }
    var timerInterval, amount;
    function calculateScore() {
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
        { min: 10, max: 10, messages: [
            "Xuất sắc! Nhưng hãy thử nhìn lại bài để kiểm tra xem bạn có thực sự nắm chắc kiến thức không.",
            "Hoàn hảo! Nhưng đừng quên kiểm tra kỹ để đảm bảo bạn không bỏ sót bất kỳ chi tiết nào.",
            "Điểm tối đa! Nhưng thử tự đặt câu hỏi và giải lại bài để củng cố kiến thức.",
            "Thành công lớn, nhưng để duy trì phong độ, hãy ôn luyện bài này thêm một lần nữa.",
            "Điểm tuyệt đối! Hãy thử thách bản thân với bài tập khó hơn để mở rộng kiến thức."
        ]},
        // 9.5 - 9.99 điểm
        { min: 9.5, max: 9.99, messages: [
            "Rất tuyệt vời! Nhưng có lẽ bạn bỏ lỡ một vài chi tiết nhỏ. Hãy làm lại bài và tìm ra chúng.",
            "Điểm này rất cao, nhưng vẫn còn chỗ để cải thiện. Đừng quên xem lại các phần bạn cảm thấy chưa chắc.",
            "Bạn gần như hoàn hảo, nhưng thử làm lại bài mà không nhìn tài liệu để kiểm tra sự tự tin của mình.",
            "Rất tốt! Nhưng bạn cần thêm một chút tập trung để đạt điểm tối đa."
        ]},
        // 9 - 9.49 điểm
        { min: 9, max: 9.49, messages: [
            "Điểm cao! Tuy nhiên, bạn có thể cải thiện hơn bằng cách làm lại bài và xem có gì thiếu sót không.",
            "Bạn đã làm rất tốt, nhưng hãy tự kiểm tra kiến thức bằng cách giải lại bài một lần nữa.",
            "Điểm này rất ấn tượng! Hãy thử tìm hiểu thêm các cách giải khác để mở rộng tư duy.",
            "Rất tốt, nhưng nếu làm bài với thời gian ngắn hơn, bạn có thể đạt kết quả cao hơn nữa."
        ]},
        // 8 - 8.99 điểm
        { min: 8, max: 8.99, messages: [
            "Điểm khá, nhưng hãy xem lại phần nào khiến bạn mất điểm và cải thiện nó.",
            "Hãy dành thêm chút thời gian để làm lại bài, chắc chắn bạn sẽ đạt kết quả cao hơn.",
            "Bạn đang làm tốt, nhưng đừng ngại thử thách bản thân để đạt mục tiêu cao hơn.",
            "Điểm này tốt, nhưng hãy cố gắng giảm sai sót trong lần tiếp theo."
        ]},
        // 6.5 - 7.99 điểm
        { min: 6.5, max: 7.99, messages: [
            "Bạn đạt điểm khá, nhưng cần xem xét lại các lỗi dễ gặp để nâng cao thành tích.",
            "Điểm này ổn, nhưng bạn hoàn toàn có thể làm tốt hơn nếu tập trung hơn.",
            "Hãy thử làm bài lại lần nữa với cách tiếp cận khác, bạn sẽ thấy sự tiến bộ.",
            "Bạn đang ở mức tốt, nhưng hãy cố gắng làm lại bài để nâng cao độ chính xác."
        ]},
        // 5 - 6.49 điểm
        { min: 5, max: 6.49, messages: [
            "Điểm trung bình, bạn cần làm lại bài và tập trung hơn vào các khái niệm chưa rõ.",
            "Hãy xem đây là cơ hội để học hỏi và làm lại. Bạn chắc chắn sẽ tốt hơn.",
            "Bạn đã có cố gắng, nhưng hãy dành thêm thời gian ôn lại những phần còn yếu.",
            "Kết quả này chỉ ở mức tạm được. Cố gắng thêm để đạt mức cao hơn."
        ]},
        // 3 - 4.99 điểm
        { min: 3, max: 4.99, messages: [
            "Điểm này thấp, bạn cần nghiêm túc xem lại bài và tìm ra những lỗi sai cơ bản.",
            "Hãy bắt đầu lại từ những phần cơ bản và tập trung hơn vào bài học.",
            "Bạn đang gặp khó khăn. Hãy thử làm bài lại từ đầu.",
            "Đừng nản lòng. Làm lại bài tập từ đầu sẽ giúp bạn tiến bộ hơn."
        ]},
        // 0 - 2.99 điểm
        { min: 0, max: 2.99, messages: [

        "Đã ngu còn xui!",
        "Cười rung CPU",
        " Điểm cao! Xin chúc mừng",
        "Kết quả này đủ để gọi cấp cứu.",
        "Bạn đang đứng dưới đáy đại dương rồi.",
        "Phải có ý đồ gì đó, con người không thể ngu vậy được!",
        "Thầy cô từ chối nhìn mặt",
        "Không thể thấp hơn nữa!",
        "Điểm số đến mức này là một tài năng hiếm có!",
        "Gọi mục sư đi!",
        "Hết cứu",
        "Hết cứu",
        "Hết cứu"
       

        ]}
    ];

    // Lựa chọn phạm vi phản hồi phù hợp
    for (const range of feedbackRanges) {
        if (score >= range.min && score <= range.max) {
            const messages = range.messages;
            return messages[Math.floor(Math.random() * messages.length)];
        }
    }

    return "Điểm không hợp lệ.";
}





