(()=>{
  "use strict";
  const ALLOWED=/^https:\/\/(w\.soundcloud\.com\/player\/|audiomack\.com\/embed\/)/;
  const PLACEHOLDER=/REPLACE_/;

  function render(slot){
    const label=slot.dataset.label||"Player";
    slot.textContent="";
    const ph=document.createElement("div");ph.className="ph";
    const t=document.createElement("strong");t.textContent=label;
    const s=document.createElement("small");
    s.textContent="Click to load. This connects to a third party.";
    const b=document.createElement("button");b.type="button";b.textContent="Load player";
    ph.append(t,s,b);slot.append(ph);

    b.addEventListener("click",()=>{
      const src=slot.dataset.src||"";
      if(!ALLOWED.test(src)||PLACEHOLDER.test(src)){
        s.textContent="Set a real embed URL in data-src (see README).";
        s.classList.add("err");return;
      }
      const f=document.createElement("iframe");
      f.src=src;f.title=label;f.loading="lazy";
      f.height=slot.dataset.height||"166";
      f.allow="autoplay";f.referrerPolicy="no-referrer";
      slot.replaceChildren(f);
    });
  }
  document.querySelectorAll(".slot").forEach(render);
})();
