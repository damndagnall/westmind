(function(){
  const year = document.getElementById("year");
  if(year) year.textContent = new Date().getFullYear();
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll('[data-nav]').forEach(a=>{
    const href = (a.getAttribute("href") || "").split("/").pop();
    if(href === path) a.classList.add("active");
  });
})();