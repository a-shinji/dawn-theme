document.addEventListener('DOMContentLoaded', function () {
  const shirtS = document.getElementById('shirt-s');
  const shirtM = document.getElementById('shirt-m');
  const shirtL = document.getElementById('shirt-l');

  if (!shirtS || !shirtM || !shirtL) {
    return;
  }

  const sizeS = document.getElementById('shirt-s').getAttribute('data-value');
  const sizeM = document.getElementById('shirt-m').getAttribute('data-value');
  const sizeL = document.getElementById('shirt-l').getAttribute('data-value');

  const sizeDescriptions = {
    S: sizeS,
    M: sizeM,
    L: sizeL,
  }

  const sizeDescriptionDiv = document.getElementById('size-description');

  function updateSizeDescription() {
    const selectedSize = document.querySelector("input:checked[name*='size']").value;
    sizeDescriptionDiv.textContent = sizeDescriptions[selectedSize];
  }

  function setupSizeChangeListener() {
    const sizeSelects = document.querySelectorAll("input[name*='size']");
    sizeSelects.forEach((sizeSelect) => {
      sizeSelect.addEventListener('change', updateSizeDescription);
    });
  }

  updateSizeDescription();

  // 何かしらの操作でDOMツリーの更新があった場合は、文言をupdateする
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' || mutation.type === 'attributes') {
        setupSizeChangeListener();
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    attributes: true,
    subtree: true,
  });
});
