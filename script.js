document.getElementById('searchButton').addEventListener('click', async () => {
    const nicknameInput = document.getElementById('nickname');
    const userName = nicknameInput.value.trim();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    if (!userName) {
        resultDiv.innerHTML = '<p style="color: red;">닉네임을 입력하세요.</p>';
        return;
    }

    try {
        const response = await fetch(`/.netlify/functions/fetchData?userName=${encodeURIComponent(userName)}`);
        const data = await response.json();

        if (response.ok) {
            const avatarUrl = data.avatarUrl;
            const levelImgUrl = data.levelImgUrl;

            const avatarDisplay = document.getElementById('avatar-display');
            if (avatarUrl && avatarUrl !== '이미지 없음') {
                avatarDisplay.style.backgroundImage = `url(${avatarUrl})`;
            } else {
                avatarDisplay.style.backgroundImage = '';
                resultDiv.innerHTML += '<p>아바타 이미지를 찾을 수 없습니다.</p>';
            }

            if (levelImgUrl && levelImgUrl !== '이미지 없음') {
                resultDiv.innerHTML = `<img src="${levelImgUrl}" alt="레벨 이미지" class="level-img">`;
            } else {
                resultDiv.innerHTML += '<p>레벨 이미지를 찾을 수 없습니다.</p>';
            }
        } else {
            throw new Error(data.error);
        }
    } catch (error) {
        console.error('에러 발생:', error);
        resultDiv.innerHTML = `<p style="color: red;">오류: ${error.message}</p>`;
    }
});
