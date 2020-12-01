var wow = new WOW({
  boxClass: "wow", // animated element css class (default is wow)
  animateClass: "animated", // animation css class (default is animated)
  offset: 0, // distance to the element when triggering the animation (default is 0)
  mobile: true, // trigger animations on mobile devices (default is true)
  live: true, // act on asynchronously loaded content (default is true)
  callback: function (box) {
    // the callback is fired every time an animation is started
    // the argument that is passed in is the DOM node being animated
  },
  scrollContainer: null, // optional scroll container selector, otherwise use window,
  resetAnimation: true, // reset animation on end (default is true)
});
wow.init();

// scroleld check
// top caption on_scroll fadeout
let el = document.querySelector("header .logo");
let cap = document.querySelector(".top_caption");
window.onscroll = function () {
  var v =
    document.documentElement.scrollTop || // IE、Firefox、Opera
    document.body.scrollTop;
  if (v > 400) {
    el.classList.add("scrolled");
  } else {
    el.classList.remove("scrolled");
  }

  if (window.innerWidth < 1200) {
    if (v > 50) {
      cap && cap.classList.add("hidden");
    } else {
      cap && cap.classList.remove("hidden");
    }
  }
};

// menu
var toggleMenu = function () {
  document.querySelector("header nav").classList.toggle("clicked");
  document.querySelector("header").classList.toggle("blackedOut");
  var b = document.querySelector("#menuButton");
  b.innerText = b.innerText === "MENU" ? "CLOSE" : "MENU";
};

document.getElementById("menuButton").addEventListener("click", toggleMenu);

// check accessed page
document.querySelectorAll("header nav li a").forEach((a) => {
  if (location.href.indexOf(a.href) != -1) {
    a.classList.toggle("now");
  }
});

// top pic height
if (window.innerWidth < 769) {
  var toppic = document.querySelector(
    "section#fv section.top_pic:nth-of-type(2)"
  );
  if (toppic) {
    toppic.style.marginTop = `${
      document.querySelector(".top_caption").offsetHeight - 10
    }px`;
  }
}

// projects page image generation
var d = document.querySelector(".projects");
d &&
  document.querySelectorAll(".project__title a").forEach((elm) => {
    elm.addEventListener(
      "mouseover",
      function (event) {
        if (d && d.firstElementChild.nodeName !== "IMG") {
          let img = document.createElement("img");
          img.src = elm.getAttribute("image-path");
          img.style.position = "absolute";
          img.classList.add("animated");
          img.classList.add("fadeIn");
          img.width = d.offsetWidth * 0.5;
          img.height = (img.width / 16) * 9;
          img.style.width = "unset";
          img.style.left = `${Math.floor(
            Math.random() * (window.innerWidth - img.width)
          )}px`;
          img.style.top = `${Math.floor(
            Math.random() * (window.innerHeight - img.height)
          )}px`;
          d.insertBefore(img, d.firstElementChild);
        }
      },
      false
    );
    elm.addEventListener(
      "mouseout",
      function (event) {
        if (d && d.firstElementChild.nodeName === "IMG") {
          d.firstElementChild.remove();
        }
      },
      false
    );
  });

// projectrs filtering
let projects = document.querySelectorAll(".projects__item");
let projectImages = document.querySelectorAll(".projects__image");
let filterProjects = (e) => {
  let query = e.target.href.split("#")[1];
  projects &&
    projectImages &&
    projects.forEach((project, idx) => {
      project.classList.add("hidden");
      projectImages[idx] && projectImages[idx].classList.add("hidden");
      let categories = project.getAttribute("category");
      categories &&
        categories.split(" ").forEach((m) => {
          if (query === m) {
            project.classList.toggle("hidden");
            projectImages[idx] && projectImages[idx].classList.toggle("hidden");
          }
        });
    });
  projectLinks.forEach((l) => {
    l.classList.remove("now");
  });
  e.target.classList.toggle("now");
};
let projectLinks = document.querySelectorAll(".sub-header a");
projectLinks &&
  projectLinks.forEach((elm) => {
    elm.addEventListener("click", filterProjects);
  });

// projects article
var readmore = document.querySelector(".project__readmore");
readmore &&
  readmore.addEventListener("click", function () {
    var article = document.querySelector(".project__description > article");
    article.classList.toggle("opened");
    if (readmore.innerHTML === "Close") {
      article.style.height = "50px";
      readmore.innerHTML = "Read More";
    } else {
      var height = 0;
      if (article) {
        for (let i = 0; i < article.children.length; i++) {
          height += article.children[i].offsetHeight;
        }
        article.style.height = String(height) + "px";
        readmore.innerHTML = "Close";
      }
    }
  });

// people filtering
let members = document.querySelectorAll(".member");
let filterMembers = (e) => {
  let query = e.target.href.split("#")[1];
  members &&
    members.forEach((member) => {
      member.classList.add("hidden");
      member
        .getAttribute("discipline")
        .split(" ")
        .forEach((m) => {
          if (query === m) {
            member.classList.toggle("hidden");
          }
        });
      member
        .getAttribute("role")
        .split(" ")
        .forEach((m) => {
          if (query === m) {
            member.classList.toggle("hidden");
          }
        });
    });
  memberLinks.forEach((l) => {
    l.classList.remove("now");
  });
  e.target.classList.toggle("now");
};
let memberLinks = document.querySelectorAll(".sub-header a");
memberLinks &&
  memberLinks.forEach((elm) => {
    elm.addEventListener("click", filterMembers);
  });

// News filtering
let news = document.querySelectorAll(".news__item");
let filterNews = (e) => {
  let query = e.target.href.split("#")[1];
  news &&
    news.forEach((item, idx) => {
      item.classList.add("hidden");
      let categories = item.getAttribute("category");
      categories &&
        categories.split(" ").forEach((m) => {
          if (query === m) {
            item.classList.toggle("hidden");
          }
        });
    });
  newsLinks.forEach((l) => {
    l.classList.remove("now");
  });
  e.target.classList.toggle("now");
};
let newsLinks = document.querySelectorAll(".sub-header a");
newsLinks &&
  newsLinks.forEach((elm) => {
    elm.addEventListener("click", filterNews);
  });

// journal post sidebar footnotes
let allFootNotes = document.querySelectorAll(".fn");
let contents = document.querySelectorAll(".fn_contents");
allFootNotes &&
  allFootNotes.forEach((fn, idx) => {
    let y = Math.floor(fn.getBoundingClientRect().y + window.scrollY);
    contents[idx].style.top = String(y - 90) + "px";
    // 重なりチェック
    if (idx > 0) {
      let previousBottom = Math.floor(
        contents[idx - 1].getBoundingClientRect().bottom + window.scrollY
      );
      if (y - previousBottom < 30) {
        let idealY = previousBottom + 30;
        contents[idx].style.top = String(idealY - 90) + "px";
      }
    }
  });
