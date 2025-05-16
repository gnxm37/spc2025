// 별점 텍스트 다국어
const ratingTextMap = {
    ko: ['매우 나쁨', '나쁨', '보통', '좋음', '매우 좋음'],
    en: ['Very Bad', 'Bad', 'Average', 'Good', 'Very Good'],
    ja: ['とても悪い', '悪い', '普通', '良い', 'とても良い']
};
const scoreSuffix = {
    ko: '점',
    en: 'pt',
    ja: '点'
};

let currentLang = localStorage.getItem('lang') || 'ko';
document.getElementById('lang-select').value = currentLang;

document.getElementById('lang-select').addEventListener('change', function(e) {
    currentLang = e.target.value;
    localStorage.setItem('lang', currentLang);
    renderDynamicLang();
});

async function renderDynamicLang() {
    // 1. 항상 한국어 원본 데이터 요청
    const [reviewsRes, summaryRes] = await Promise.all([
        fetch('/api/reviews'),
        fetch('/api/ai-summary')
    ]);
    let reviews = (await reviewsRes.json()).reviews;
    let summary = (await summaryRes.json()).ai_summary;

    // 2. 번역 필요시 GPT로 번역
    if (currentLang !== 'ko') {
        // 리뷰 번역
        const trRes = await fetch('/api/translate', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({reviews, lang: currentLang})
        });
        reviews = (await trRes.json()).reviews || [];

        // 요약 번역
        const summaryTrRes = await fetch('/api/translate', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({summary, lang: currentLang})
        });
        summary = (await summaryTrRes.json()).summary || '';
    }

    // 3. 후기 목록 렌더링
    const reviewList = document.querySelector('.divide-y');
    reviewList.innerHTML = (reviews || []).map(review => {
        const rating = review.rating;
        const ratingText = ratingTextMap[currentLang][rating - 1];
        const suffix = scoreSuffix[currentLang];
        return `
            <div class="py-4" data-review-id="${review.id}">
                <div class="flex items-center gap-3 mb-1">
                    <span class="text-yellow-400 font-bold text-lg">
                        ${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}
                    </span>
                    <span class="text-gray-700 font-semibold">${rating}${suffix}</span>
                    <span class="text-gray-400 text-xs ml-2">${review.created_at}</span>
                    <span class="text-xs text-gray-500 ml-2">${ratingText}</span>
                    <button class="edit-review-btn text-blue-500 text-xs ml-2 underline" data-id="${review.id}">${currentLang === 'ko' ? '수정' : currentLang === 'en' ? 'Edit' : '編集'}</button>
                    <button class="delete-review-btn text-red-500 text-xs ml-1 underline" data-id="${review.id}">${currentLang === 'ko' ? '삭제' : currentLang === 'en' ? 'Delete' : '削除'}</button>
                </div>
                <div class="text-gray-800 text-base mt-1">${review.review}</div>
            </div>
        `;
    }).join('') || `<div class="text-gray-400 text-center py-8">${currentLang === 'ko' ? '아직 등록된 후기가 없습니다.' : currentLang === 'en' ? 'No reviews yet.' : 'まだレビューがありません。'}</div>`;

    // 4. AI 요약 렌더링
    document.querySelector('.text-base.text-gray-800.font-semibold').textContent = summary;
}

// 페이지 진입 시에는 서버 렌더링 그대로 사용, 언어 변경 시에만 동적 렌더링

document.addEventListener('DOMContentLoaded', () => {
    const reviewForm = document.getElementById('reviewForm');
    const submitButton = document.getElementById('submit-button');
    const reviewTextarea = document.getElementById('review-text');

    async function refreshReviewsAndSummary() {
        await renderDynamicLang();
    }

    // 진입 시 렌더링
    refreshReviewsAndSummary();

    // 등록
    async function submitReview(e) {
        e.preventDefault();
        const rating = document.querySelector('input[name="rating"]:checked')?.value;
        const review = reviewTextarea.value;
        if (!rating || !review) {
            alert('평점과 후기 내용을 모두 입력해주세요.');
            return;
        }
        try {
            const response = await fetch('/api/review', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rating: parseInt(rating), review: review }),
            });
            if (response.ok) {
                alert('후기가 성공적으로 등록되었습니다.');
                reviewForm.reset();
                refreshReviewsAndSummary();
                return;
            } else {
                alert('후기 등록에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('후기 등록 중 오류가 발생했습니다.');
        }
    }

    if (reviewForm) {
        reviewForm.addEventListener('submit', submitReview);
    }
    if (submitButton) {
        submitButton.addEventListener('click', submitReview);
    }
    if (reviewTextarea) {
        reviewTextarea.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                submitReview(e);
            }
        });
    }

    // 후기 수정
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('edit-review-btn')) {
            const reviewDiv = e.target.closest('[data-review-id]');
            const reviewId = e.target.dataset.id;
            const reviewTextDiv = reviewDiv.querySelector('.text-gray-800');
            const oldText = reviewTextDiv.textContent;
            const oldRating = reviewDiv.querySelector('.text-gray-700').textContent[0];
            const newText = prompt('후기 내용을 수정하세요:', oldText);
            const newRating = prompt('평점을 수정하세요 (1~5):', oldRating);
            if (newText && newRating) {
                fetch(`/api/review/${reviewId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ rating: parseInt(newRating), review: newText })
                })
                .then(res => res.json())
                .then(() => {
                    refreshReviewsAndSummary();
                });
            }
        }
    });

    // 후기 삭제
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-review-btn')) {
            const reviewId = e.target.dataset.id;
            if (confirm('정말 삭제하시겠습니까?')) {
                fetch(`/api/review/${reviewId}`, { method: 'DELETE' })
                .then(res => res.json())
                .then(() => {
                    refreshReviewsAndSummary();
                });
            }
        }
    });
});