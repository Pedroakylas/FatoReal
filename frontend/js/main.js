function updateCounter() {
  const text = document.getElementById('textInput').value;
  const counter = document.getElementById('charCounter');
  counter.textContent = `${text.length} / 2000`;
  counter.className = 'char-counter' + (text.length > 1800 ? ' danger' : text.length > 1500 ? ' warning' : '');
}

function showAlert(message, type = 'error') {
  document.getElementById('alertBox').innerHTML =
    `<div class="alert alert-${type}"><i class="fa-solid fa-circle-exclamation"></i> ${message}</div>`;
}

async function verify() {
  const alertBox = document.getElementById('alertBox');
  alertBox.innerHTML = '';

  const input = document.getElementById('textInput').value.trim();
  if (!input) return showAlert('Digite algum texto para verificar.');
  if (input.length < 5) return showAlert('Texto muito curto. Digite pelo menos 5 caracteres.');

  const overlay = document.getElementById('loadingOverlay');
  overlay.classList.add('show');
  document.getElementById('btnVerify').disabled = true;

  try {
    const result = await api.checkText(input);

    // Sprint 1 ainda não tem banco de dados nem compartilhamento por link:
    // o resultado só existe nesta sessão do navegador.
    sessionStorage.setItem('vn_result', JSON.stringify(result));
    window.location.href = 'result.html';

  } catch (error) {
    overlay.classList.remove('show');
    document.getElementById('btnVerify').disabled = false;
    showAlert(error.message || 'Erro ao verificar. Tente novamente.');
  }
}
