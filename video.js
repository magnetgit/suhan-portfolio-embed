(() => {
  const player = document.getElementById('tripa-player');
  const select = document.getElementById('video-part');
  const status = document.getElementById('video-status');
  const direct = document.getElementById('video-direct');
  let current = 0;
  let request = 0;
  const selectPart = async (index, resume) => {
    if (!Number.isInteger(index) || index < 0 || index >= select.options.length) return;
    const ticket = ++request;
    current = index;
    select.value = String(index);
    const url = `media/tripa-${String(index).padStart(2, '0')}.mp4`;
    player.src = url;
    direct.href = url;
    player.load();
    status.textContent = `${select.options[index].text} 구간을 선택했습니다.`;
    if (resume) {
      try { await player.play(); }
      catch { if (ticket === request) status.textContent = '재생 버튼을 눌러 선택한 구간을 이어서 시청해주세요.'; }
    }
  };
  select.addEventListener('change', () => selectPart(Number(select.value), !player.paused));
  player.addEventListener('ended', () => {
    if (current + 1 < select.options.length) selectPart(current + 1, true);
    else status.textContent = '소개 영상이 끝났습니다. 구간을 선택해 다시 볼 수 있습니다.';
  });
  player.addEventListener('error', () => {
    status.textContent = '영상을 불러오지 못했습니다. 선택 구간 새 창에서 보기를 이용하거나 다른 구간을 선택해주세요.';
  });
  player.addEventListener('playing', () => {
    status.textContent = `${current + 1} / ${select.options.length} 구간 재생 중 · 끝나면 다음 구간으로 이어집니다.`;
  });
})();
