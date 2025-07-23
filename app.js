(function () {
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        })
    });
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    
        const icon = document.querySelector(".theme-btn i");
    
        if (document.body.classList.contains("light-mode")) {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        } else {
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");
        }
    });    
})();

function startTypingEffect() {
    const texts = [" Web Developer.", " Frontend Developer.", " UI/UX Designer."];
    let index = 0;
    let charIndex = 0;
    let isDeleting = false;
    const speed = 100;
    const pause = 1500;
    const dynamicText = document.querySelector(".dynamic-text");
  
    function type() {
      const current = texts[index];
      if (isDeleting) {
        dynamicText.textContent = current.substring(0, charIndex--);
      } else {
        dynamicText.textContent = current.substring(0, charIndex++);
      }
  
      if (!isDeleting && charIndex === current.length + 1) {
        isDeleting = true;
        setTimeout(type, pause);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        index = (index + 1) % texts.length;
        setTimeout(type, 300);
      } else {
        setTimeout(type, isDeleting ? 50 : speed);
      }
    }
  
    type();
  }

  document.addEventListener("DOMContentLoaded", () => {
    startTypingEffect();
  });
  
  class GlitchEffect {
    constructor() {
      this.root = document.body
      this.cursor = document.querySelector(".curzr")
  
      this.distanceX = 0, 
      this.distanceY = 0,
      this.pointerX = 0,
      this.pointerY = 0,
      this.previousPointerX = 0
      this.previousPointerY = 0
      this.cursorSize = 25
      this.glitchColorB = '#00feff'
      this.glitchColorR = '#ff4f71'
  
      this.cursorStyle = {
        boxSizing: 'border-box',
        position: 'fixed',
        top: `${ this.cursorSize / -2 }px`,
        left: `${ this.cursorSize / -2 }px`,
        zIndex: '2147483647',
        width: `${ this.cursorSize }px`,
        height: `${ this.cursorSize }px`,
        backgroundColor: '#222',
        borderRadius: '50%',
        boxShadow: `0 0 0 ${this.glitchColorB}, 0 0 0 ${this.glitchColorR}`,
        transition: '100ms, transform 100ms',
        userSelect: 'none',
        pointerEvents: 'none'
      }
  
      if (CSS.supports("backdrop-filter", "invert(1)")) {
        this.cursorStyle.backdropFilter = 'invert(1)'
        this.cursorStyle.backgroundColor = '#fff0'
      } else {
        this.cursorStyle.backgroundColor = '#222'
      }
  
      this.init(this.cursor, this.cursorStyle)
    }
  
    init(el, style) {
      Object.assign(el.style, style)
      this.cursor.removeAttribute("hidden")
      
      document.body.style.cursor = 'none'
      document.body.querySelectorAll("button, label, input, textarea, select, a").forEach((el) => {
        el.style.cursor = 'inherit'
      })
    }
  
    move(event) {
      this.previousPointerX = this.pointerX
      this.previousPointerY = this.pointerY
      this.pointerX = event.pageX + this.root.getBoundingClientRect().x
      this.pointerY = event.pageY + this.root.getBoundingClientRect().y
      this.distanceX = Math.min(Math.max(this.previousPointerX - this.pointerX, -10), 10)
      this.distanceY = Math.min(Math.max(this.previousPointerY - this.pointerY, -10), 10)
  
      if (event.target.localName === 'button' || 
          event.target.localName === 'a' || 
          event.target.onclick !== null ||
          event.target.className.includes('curzr-hover')) {
        this.hover()
      } else {
        this.hoverout()
      }
  
      this.cursor.style.transform = `translate3d(${this.pointerX}px, ${this.pointerY}px, 0)`
      this.cursor.style.boxShadow = `
        ${+this.distanceX}px ${+this.distanceY}px 0 ${this.glitchColorB}, 
        ${-this.distanceX}px ${-this.distanceY}px 0 ${this.glitchColorR}`
      this.stop()
    }
  
    hover() {
    }
  
    hoverout() {
    }
  
    click() {
      this.cursor.style.transform += ` scale(0.75)`
      setTimeout(() => {
        this.cursor.style.transform = this.cursor.style.transform.replace(` scale(0.75)`, '')
      }, 35)
    }
  
    stop() {
      if (!this.moving) {
        this.moving = true
        setTimeout(() => {
          this.cursor.style.boxShadow = ''
          this.moving = false
        }, 50)
      }
    }
  
    remove() {
      this.cursor.remove()
    }
  }
  
  (() => {
    const cursor = new GlitchEffect()
    if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      document.onmousemove = function (event) {
        cursor.move(event)
      }
      document.onclick = function () {
        cursor.click()
      }
    } else {
      cursor.remove()
    }
  })()

document.querySelector('.contact-form').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent page reload

    const inputs = e.target.querySelectorAll('input');
    const textarea = e.target.querySelector('textarea');

    const name = inputs[0].value.trim();
    const email = inputs[1].value.trim();
    const subject = inputs[2].value.trim();
    const message = textarea.value.trim();

    // Prepare data for SheetDB
    const data = {
        data: {
            name: name,
            email: email,
            subject: subject,
            message: message
        }
    };

    // Replace with your actual SheetDB API URL
    const SHEETDB_API = 'https://sheetdb.io/api/v1/dd5kferxi4396';

    try {
        const res = await fetch(SHEETDB_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        console.log('Response:', res.status, result); // Add this line

        if (res.ok) {
            alert('Message sent successfully!');
            e.target.reset(); // Clear the form
        } else {
            alert('Failed to send message. Try again later.');
        }
    } catch (err) {
        console.error('Error:', err);
        alert('Error sending message.');
    }
});

