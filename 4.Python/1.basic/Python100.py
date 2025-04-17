
# 1 ~ 10

print("Hello World")

print("Mary's cosmetics")

print("신씨가 소리질렀다. \"도둑이야\".")

print("C:\\Windows")

print("안녕하세요.\n만나서\t\t반갑습니다.")

print("오늘은", "일요일")

print("naver", "kakao", "samsung", sep=";")

print("naver", "kakao", "sk", "samsung", sep="/")

print("first", end=""); print("second")

print(5/3)

# 11 ~ 30

삼성전자 = 50000
총평가금액 = 삼성전자*10
print(총평가금액) 

시가총액 = 298000000000000
현재가 = 50000
PER = 15.79
print(시가총액, type(시가총액))
print(현재가, type(현재가))
print(PER, type(PER))

s = "hello"
t = "python"
print(f"{s}! {t}")

print(2 + 2 * 3)

a = "132"
print (type(a))

num_str = "720"
num_int = int(num_str)
print(num_int+1, type(num_int))

num = 100
num = str(num)
print(type(num))

a = "15.79"
b = float(a)
print(b)

year = "2020"
years = int(year)
print(years, years+1, years+2)

price = 48584
print(price*36)

letters = 'python'
print(letters[0],letters[2])

license_plate = "24가 2210"
print(license_plate[-4:])

string = "홀짝홀짝홀짝"
print(string[::2])

string = "PYTHON"
print(string[::-1])

phone_number = "010-1111-2222"
print(phone_number.replace("-"," "))

phone = phone_number.split("-")
print(phone[0]+phone[1]+phone[2])

url = "http://sharebook.kr"
url = url.split(".")
print(url[-1])

# lang = 'python'
# lang[0] = 'P'
# print(lang)

string = 'abcdfe2a354a32a'
print(string.replace('a','A'))

string = 'abcd'
string.replace('b', 'B')
print(string)

# 31 ~ 40

a = "3"
b = "4"
print(a + b)

print("Hi" * 3)

print("-"*80)

t1 = 'python'
t2 = 'java'
t3 = t1 + " " + t2 + " "
print(t3 * 4)

name1 = "김민수" 
age1 = 10
name2 = "이철희"
age2 = 13

print("이름: %s 나이: %d" %(name1, age1))
print("이름: %s 나이: %d" %(name2, age2))

print("이름: {} 나이: {}".format(name1, age1))
print("이름: {} 나이: {}".format(name2, age2))

print(f"이름: {name1} 나이: {age1}")
print(f"이름: {name2} 나이: {age2}")

상장주식수 = "5,969,782,550"
상장주식수 = 상장주식수.replace(",","")
상장주식수 = int(상장주식수)
print(상장주식수)

분기 = "2020/03(E) (IFRS연결)"
sp = 분기.split("(")
print(sp[0])

data = "   삼성전자    "
data = data.replace(" ","")
print(data)

# 41 ~ 50

ticker = "btc_krw"
print(ticker.upper())

a = "hello"
a = a.capitalize()
print(a)

file_name = "보고서.xlsx"
print(file_name.endswith('xlsx'))

file_name = "2020_보고서.xlsx"
print(file_name.startswith('2020'))

a = "hello world"
a = a.split()
print(a)

ticker = "btc_krw"
ticker = ticker.split("_")
print(ticker)

date = "2020-05-01"
date = date.split("-")
print(date)

data = "039490     "
data = data.rstrip()
print(data)

# 51 ~ 60

movie_rank = ["닥터 스트레인지", "스플릿", "럭키"]
print(movie_rank)

movie_rank.append("배트맨")
print(movie_rank)

movie_rank.insert(1, "슈퍼맨")
print(movie_rank)

movie_rank.pop(3)
print(movie_rank)

del movie_rank[2]
del movie_rank[2]
print(movie_rank)

lang1 = ["C", "C++", "JAVA"]
lang2 = ["Python", "Go", "C#"]

langs = lang1 + lang2
print(langs)

nums = [1, 2, 3, 4, 5, 6, 7]
print(max(nums), min(nums))

nums = [1, 2, 3, 4, 5]
print(sum(nums))

cook = ["피자", "김밥", "만두", "양념치킨", "족발", "피자", "김치만두", "쫄면", "소시지", "라면", "팥빙수", "김치전"]
print(len(cook))

nums = [1, 2, 3, 4, 5]
print(sum(nums)/len(nums))

# 61 ~ 70

price = ['20180728', 100, 130, 140, 150, 160, 170]
print(price[1:])

nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
print(nums[::2])

print(nums[1::2])

nums = [1, 2, 3, 4, 5]
print(nums[::-1])

interest = ['삼성전자', 'LG전자', 'Naver']
print(interest[0], interest[2])

interest = ['삼성전자', 'LG전자', 'Naver', 'SK하이닉스', '미래에셋대우']
print(" ".join(interest))
print("/".join(interest))
print("\n".join(interest))

string = "삼성전자/LG전자/Naver"
interest = string.split("/")
print(interest)

data = [2, 4, 3, 1, 5, 10, 9]
data.sort()
print(data)

data = [2, 4, 3, 1, 5, 10, 9]
data = sorted(data)
print(data)

# 71 ~ 80

my_variable = ("닥터 스트레인지", "스플릿", "럭키")

num = (1,)
print(type(num))

# t = (1, 2, 3)
# t[0] = 'a'

t = 1, 2, 3, 4
print(type(t))

t = ('A', 'b', 'c')

interest = ('삼성전자', 'LG전자', 'SK Hynix')
interest = list(interest)
print(interest)

interest = ['삼성전자', 'LG전자', 'SK Hynix']
interest = tuple(interest)
print(type(interest))

temp = ('apple', 'banana', 'cake')
a, b, c = temp
print(a, b, c)

a = tuple(range(2,98,2))
print(a)

# 81 ~ 90

scores, s, *valid_score = [8.8, 8.9, 8.7, 9.2, 9.3, 9.7, 9.9, 9.5, 7.8, 9.4]
print(valid_score)

scores = [8.8, 8.9, 8.7, 9.2, 9.3, 9.7, 9.9, 9.5, 7.8, 9.4]
a, *score, b = scores
print(score)

icecream = {
    "메로나": "1000",
    "폴라포": "1200",
    "빵빠레": "1800"
    }
print(icecream)

ice = {"메로나": 1000, "폴라포": 1200, "빵빠레": 1800}
ice["죠스바"] = 1200
ice["월드콘"] = 1500
print(ice)

ice = {'메로나': 1000,
       '폴로포': 1200,
       '빵빠레': 1800,
       '죠스바': 1200,
       '월드콘': 1500}
print("메로나 가격: {}".format(ice['메로나']))

ice['메로나'] = 1300
print(ice)

ice.pop('메로나')
print(ice)

icecream = {'폴라포': 1200, '빵빠레': 1800, '월드콘': 1500, '메로나': 1000}
# icecream['누가바']

# 91 ~ 100

ice = {
    "메로나": [300, 20],
    "비비빅": [400, 3],
    "죠스바": [250, 100]
}

print(ice)

inventory = {"메로나": [300, 20],
              "비비빅": [400, 3],
              "죠스바": [250, 100]}
print(inventory["메로나"][0], "원")

print(inventory["메로나"][1], "개")

inventory['월드콘'] = [500, 7]
print(inventory)

icecream = {'탱크보이': 1200, '폴라포': 1200, '빵빠레': 1800, '월드콘': 1500, '메로나': 1000}
ice = list(icecream.keys())
print(ice)

ice = list(icecream.values())
print(ice)

a = sum(ice)
print(a)

icecream = {'탱크보이': 1200, '폴라포': 1200, '빵빠레': 1800, '월드콘': 1500, '메로나': 1000}
new_product = {'팥빙수':2700, '아맛나':1000}

icecream.update(new_product)
print(icecream)

keys = ("apple", "pear", "peach")
vals = (300, 250, 400)
keyval = dict(zip(keys, vals))
print(keyval)

date = ['09/05', '09/06', '09/07', '09/08', '09/09']
close_price = [10500, 10300, 10100, 10800, 11000]
close_table = dict(zip(date, close_price))
print(close_table)