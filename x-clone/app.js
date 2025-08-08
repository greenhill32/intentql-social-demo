async function loadPost(){
  try{
    const res = await fetch('./post.json', { cache: 'no-store' });
    if(!res.ok) throw new Error('fetch post.json failed');
    const post = await res.json();

    const feed = document.getElementById('feed');
    feed.innerHTML = '';
    const el = document.createElement('article');
    el.className = 'post';
    el.innerHTML = `
      <div class="avatar"></div>
      <div class="content">
        <div class="handle">@intentql</div>
        <div class="text"></div>
        ${post.media_url ? `<div class="media"><img src="${post.media_url}" alt=""></div>` : ''}
        <div class="timestamp">${new Date(post.timestamp || Date.now()).toLocaleString()}</div>
      </div>`;
    el.querySelector('.text').textContent = post.text || '';
    feed.appendChild(el);
  }catch(e){
    document.getElementById('feed').innerHTML = `<div style="color:#f87171">Error loading post.</div>`;
    console.error(e);
  }
}
loadPost();
