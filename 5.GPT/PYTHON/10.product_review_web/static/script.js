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

// UI 텍스트 다국어
const uiText = {
    aiSummary: { ko: 'AI 요약', en: 'AI Summary', ja: 'AI要約' },
    writeReview: { ko: '상품 후기 작성', en: 'Write a Product Review', ja: '商品レビューを書く' },
    rating: { ko: '평점', en: 'Rating', ja: '評価' },
    reviewContent: { ko: '후기 내용', en: 'Review Content', ja: 'レビュー内容' },
    submit: { ko: '후기 등록', en: 'Submit Review', ja: 'レビュー登録' },
    reviewList: { ko: '상품 후기 목록', en: 'Product Reviews', ja: '商品レビュー一覧' },
    edit: { ko: '수정', en: 'Edit', ja: '編集' },
    delete: { ko: '삭제', en: 'Delete', ja: '削除' },
    noReview: { ko: '아직 등록된 후기가 없습니다.', en: 'No reviews yet.', ja: 'まだレビューがありません。' }
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

    // === UI 텍스트 번역 ===
    // AI 요약 제목
    const aiSummaryTitle = document.querySelector('.text-lg.font-bold.text-teal-700.mb-2');
    if (aiSummaryTitle) {
        aiSummaryTitle.textContent = uiText.aiSummary[currentLang];
    }
    document.querySelector('h1.text-2xl.font-bold').textContent = uiText.writeReview[currentLang];
    document.querySelector('label[for="review-text"]').textContent = uiText.reviewContent[currentLang];
    document.querySelector('label.block.font-semibold.mb-2.text-gray-700').textContent = uiText.rating[currentLang];
    document.getElementById('submit-button').textContent = uiText.submit[currentLang];
    document.querySelector('h2.text-xl.font-bold').textContent = uiText.reviewList[currentLang];

    // 별점 라벨 텍스트도 변경
    const ratingLabels = document.querySelectorAll('.flex.flex-row label');
    ratingLabels.forEach((label, idx) => {
        const span = label.querySelector('span.text-xs');
        if (span) span.textContent = ratingTextMap[currentLang][idx];
    });

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
                    <button class="edit-review-btn text-blue-500 text-xs ml-2 underline" data-id="${review.id}">${uiText.edit[currentLang]}</button>
                    <button class="delete-review-btn text-red-500 text-xs ml-1 underline" data-id="${review.id}">${uiText.delete[currentLang]}</button>
                </div>
                <div class="text-gray-800 text-base mt-1">${review.review}</div>
            </div>
        `;
    }).join('') || `<div class="text-gray-400 text-center py-8">${uiText.noReview[currentLang]}</div>`;

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