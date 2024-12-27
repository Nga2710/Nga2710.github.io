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
        var minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        var milliseconds = Math.floor((timeDiff % 1000) / 10);
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
      result.textContent = `Điểm của bạn: ${((score/amount)*10).toFixed(2)}/10\nSố câu đúng: ${score}\nSố câu sai: ${amount-score}\nTổng số câu: ${amount}`;
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






