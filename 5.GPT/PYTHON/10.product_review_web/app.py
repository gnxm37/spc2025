from flask import Flask, render_template, request, jsonify
from openai import OpenAI
from dotenv import load_dotenv
import os
import sqlite3
from datetime import datetime

load_dotenv()

app = Flask(__name__)
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

def init_db():
    conn = sqlite3.connect('reviews.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS reviews (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            rating INTEGER NOT NULL,
            review TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

init_db()

def get_all_reviews():
    conn = sqlite3.connect('reviews.db')
    c = conn.cursor()
    c.execute('SELECT id, rating, review, created_at FROM reviews ORDER BY created_at ASC')
    rows = c.fetchall()
    conn.close()
    return [{'id': row[0], 'rating': row[1], 'review': row[2], 'created_at': row[3]} for row in rows]

def get_ai_summary(reviews):
    if not reviews:
        return "아직 등록된 후기가 없습니다."
    # 모든 리뷰 내용을 하나의 문자열로 합침
    all_text = "\n".join([f"{r['rating']}점: {r['review']}" for r in reviews])
    prompt = (
        "아래는 상품에 대한 사용자 후기입니다. 전체 후기를 간결하게 요약해줘. "
        "중요한 키워드와 전반적인 평점을 중심으로 2문장으로 정리해줘.\n\n"
        f"{all_text}"
    )
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "너는 상품 후기 요약 전문가야."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=300,
            temperature=0.5,
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        return "AI 요약을 불러오는 데 실패했습니다."

@app.route('/')
def index():
    reviews = get_all_reviews()
    ai_summary = get_ai_summary(reviews)
    return render_template('index.html', reviews=reviews, ai_summary=ai_summary)

@app.route('/hello')
def hello():
    return 'Hello, World!'

@app.route('/api/review', methods=['POST'])
def add_review():
    data = request.get_json()
    rating = data.get('rating')
    review = data.get('review')

    if not rating or not review:
        return jsonify({'error': 'Rating and review are required'}), 400

    conn = sqlite3.connect('reviews.db')
    c = conn.cursor()
    c.execute('INSERT INTO reviews (rating, review) VALUES (?, ?)', (rating, review))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Review added successfully'}), 201

@app.route('/api/review/<int:review_id>', methods=['PUT'])
def update_review(review_id):
    data = request.get_json()
    rating = data.get('rating')
    review = data.get('review')
    if not rating or not review:
        return jsonify({'error': 'Rating and review are required'}), 400
    conn = sqlite3.connect('reviews.db')
    c = conn.cursor()
    c.execute('UPDATE reviews SET rating=?, review=? WHERE id=?', (rating, review, review_id))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Review updated successfully'})

@app.route('/api/review/<int:review_id>', methods=['DELETE'])
def delete_review(review_id):
    conn = sqlite3.connect('reviews.db')
    c = conn.cursor()
    c.execute('DELETE FROM reviews WHERE id=?', (review_id,))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Review deleted successfully'})

# /api/reviews
@app.route('/api/reviews')
def api_reviews():
    reviews = get_all_reviews()
    return jsonify({'reviews': reviews})

# /api/ai-summary
@app.route('/api/ai-summary')
def api_ai_summary():
    reviews = get_all_reviews()
    ai_summary = get_ai_summary(reviews)
    return jsonify({'ai_summary': ai_summary})

@app.route('/api/translate', methods=['POST'])
def translate_reviews():
    data = request.get_json()
    lang = data.get('lang', 'ko')
    reviews = data.get('reviews', [])
    summary = data.get('summary', None)

    texts = []
    review_indices = []
    if reviews:
        for i, r in enumerate(reviews):
            texts.append(r['review'])
            review_indices.append(i)
    if summary is not None:
        texts.append(summary)
        summary_idx = len(texts) - 1
    else:
        summary_idx = None

    lang_map = {'ko': 'Korean', 'en': 'English', 'ja': 'Japanese'}
    target_lang = lang_map.get(lang, 'Korean')

    translated = []
    for text in texts:
        if not text.strip():
            translated.append(text)
            continue
        prompt = f"다음 문장을 {target_lang}로 자연스럽게 번역해줘:\n{text}"
        try:
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "너는 번역 전문가야."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=300,
                temperature=0.3,
            )
            translated.append(response.choices[0].message.content.strip())
        except Exception:
            translated.append(text)

    if reviews:
        for idx, review_idx in enumerate(review_indices):
            reviews[review_idx]['review'] = translated[idx]
    if summary_idx is not None:
        summary_translated = translated[summary_idx]
    else:
        summary_translated = summary

    return jsonify({'reviews': reviews, 'summary': summary_translated})

if __name__ == '__main__':
    app.run(debug=True)