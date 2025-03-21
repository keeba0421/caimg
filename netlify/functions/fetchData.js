const axios = require('axios');
const cheerio = require('cheerio');

exports.handler = async (event) => {
    const userName = event.queryStringParameters.userName;

    if (!userName) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: '닉네임을 입력하세요' }),
        };
    }

    try {
        const profileUrl = `https://ca.nexon.com/MyBlock/Information/${encodeURIComponent(userName)}/0`;
        const response = await axios.get(profileUrl);
        const $ = cheerio.load(response.data);

        // 아바타 이미지(caavatarimg) 추출
        const avatarImgSrc = $('.personal .avatar img').attr('src') || '이미지 없음';

        // 레벨 이미지(Level_Ladder) 추출 (첫 번째 Small_LD 이미지)
        const levelImgSrc = $('.personal .level_icon img[src*="Level_Ladder"]').attr('src') || '이미지 없음';

        return {
            statusCode: 200,
            body: JSON.stringify({ avatarUrl: avatarImgSrc, levelImgUrl: levelImgSrc }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
