document.getElementById('codeForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const github_url = document.getElementById('github_url').value;
    const resultPre = document.getElementById('result');
    resultPre.textContent = '분석 중...';

    try {
        const res = await fetch('/api/check', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ github_url })
        });
        const data = await res.json();
        const formatted = (data.result || '결과가 없습니다.').replace(/(?:\r\n|\r|\n)/g, '<br>');
        // const formatted= data.result
        resultPre.innerHTML = formatted;
    } catch (err) {
        resultPre.innerHTML = '오류가 발생했습니다.';
    }
});