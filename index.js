document.addEventListener("DOMContentLoaded", function() {
  (function() {
      var currentIndex = 0;
      var element = document.getElementById("textDecode");
      var chars = "!<>-_\\/[]{}—=+*^?#________";
      var frameRequest;

      function setText(newText) {
          return new Promise(function(resolve) {
              var currentText = element.innerText;
              var maxLength = Math.max(currentText.length, newText.length);
              var queue = [];

              for (var i = 0; i < maxLength; i++) {
                  var from = currentText[i] || "";
                  var to = newText[i] || "";
                  var start = Math.floor(10 * Math.random());
                  var end = start + Math.floor(40 * Math.random());

                  queue.push({
                      from: from,
                      to: to,
                      start: start,
                      end: end,
                      char: ""
                  });
              }

              cancelAnimationFrame(frameRequest);
              var frame = 0;
              update();

              function update() {
                  var output = "";
                  var completed = 0;

                  for (var i = 0; i < queue.length; i++) {
                      var item = queue[i];
                      var from = item.from;
                      var to = item.to;
                      var start = item.start;
                      var end = item.end;
                      var char = item.char;

                      if (frame >= end) {
                          completed++;
                          output += to;
                      } else if (frame >= start) {
                          if (!char || Math.random() < 0.28) {
                              char = randomChar();
                              queue[i].char = char;
                          }
                          output += '<span class="dec">' + char + "</span>";
                      } else {
                          output += from;
                      }
                  }

                  element.innerHTML = output;

                  if (completed === queue.length) {
                      resolve();
                  } else {
                      frameRequest = requestAnimationFrame(update);
                      frame++;
                  }
              }
          });
      }

      function randomChar() {
          return chars[Math.floor(Math.random() * chars.length)];
      }

      function nextText() {
          var text = this.content[currentIndex];
          currentIndex = (currentIndex + 1) % this.content.length;
          setText(text).then(function() {
              setTimeout(nextText, 2000); // Delay before switching to the next text
          });
      }

      nextText();
  })();
});

