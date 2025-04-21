
# 101 ~ 110

# print (3 == 5)

# print(3 < 5)

# x = 4
# print(1 < x < 5)

# print ((3 == 3) and (4 != 3))

# print(3 >= 4)

# if 4 < 3:
#     print("Hello World")

# if 4 < 3:
#     print("Hello World.")
# else:
#     print("Hi, there.")

# if True :
#     print ("1")
#     print ("2")
# else :
#     print("3")
# print("4")

# if True :
#     if False:
#         print("1")
#         print("2")
#     else:
#         print("3")
# else :
#     print("4")
# print("5")

# 111 ~ 120

# user = input("입력:")
# print(user * 2)

# user = input("숫자를 입력하세요: ")
# print(10 + int(user))

# user = input("값을 입력하세요.")
# if (int(user) % 2 == 0):
#     print("짝수")
# else:
#     print("홀수")

# user = input("값을 넣으세요")
# if((int(user) + 20 )< 240):
#     print(int(user) + 20)
# else:
#     print(255)

# user = input("값을 넣으세요")
# if(0 <= (int(user) - 20) <= 255):
#     print(int(user) - 20)
# elif(int(user) - 20 < 0):
#     print(0)
# else:
#     print(255)

# user = input("현재시간:")
# if (user[-2:] == "00"):
#     print("정각입니다.")
# else:
#     print("정각이 아닙니다.")

# user = input("좋아하는 과일은? ")
# fruit = ["사과", "포도", "홍시"]

# if user in fruit:
#     print(user)

# warn_investment_list = ["Microsoft", "Google", "Naver", "Kakao", "SAMSUNG", "LG"]
# user = input('값을 넣으시오')

# if user in warn_investment_list:
#     print('존재함')
# else:
#     print("존재하지 않음")

# user = input("제가 좋아하는 계절은:")
# fruit = {"봄" : "딸기", "여름" : "토마토", "가을" : "사과"}
# if user in fruit:
#     print("정답입니다.")
# else:
#     print("정답이 아닙니다.")

# 121 ~ 130

# user = input()
# if (user.isupper()):
#     print(user.lower())
# else:
#     print(user.upper())

# user = input("점수를 입력하세요")
# user = int(user)
# if (81 <= user <= 100):
#     print("grade is A")
# elif (61 <= user <= 80):
#     print("grade is B")
# elif (41 <= user <= 60):
#     print("grade is C")
# elif (21 <= user <= 40):
#     print("grade is D")
# elif (0<= user <= 20):
#     print("grade is E")

# user = input("금액 입력받기")
# user = user.split(" ")
# print(user)
# if user[1] == "달러":
#     print(int(user[0])*1177.00, "원")
# elif user[1] == "엔":
#     print(int(user[0])*1.096, "원")
# elif user[1] == "유로":
#     print(int(user[0])*1268, "원")
# elif user[1] == "위안":
#     print(int(user[0])*171, "원")

# 환율 = {"달러": 1167, 
#         "엔": 1.096, 
#         "유로": 1268, 
#         "위안": 171}

# user = input("금액 입력받기")
# name, price = user.split(" ")
# print(float(name) * 환율[price], "원")

# user1 = input("number1 :")
# user2 = input("number2 :")
# user3 = input("number3 :")

# print(max(user1, user2, user3))

# user = input("휴대전화 번호 입력: ")
# usernum = user[:3]
# if usernum == "011":
#     print('당신은 SKT 사용자 입니다.')
# elif usernum == "010":
#     print('알수없음.')
# elif usernum == "016":
#     print('당신은 KT 사용자 입니다.')
# elif usernum == "019":
#     print('당신은 LGU 사용자 입니다.')

# user = input('우편번호: ')
# userIn = user[:3]
# if userIn in ["010" or "011" or "012"]:
#     print("강북구")
# elif userIn in ["014", "015", "016"]:
#     print("도봉구")
# else:
#     print("노원구")

# user = input("주민등록번호: ")
# user= user.split("-")
# if (user[1][:1]) in ["2","4"]:
#     print("여자")
# else:
#     print("남자")

# user = input("주민등록번호: ")
# user= user.split("-")
# if (user[1][1:3]) in ["00","01","02","03","04","05","06","07","08"]:
#     print("서울")
# else:
#     print("서울아님")

# user = input("주민등록번호: ")
# user = user.replace("-",'')
# userArea = user[7:9]
# area = ""

# if userArea in ["00","01","02","03","04","05","06","07","08"]:
#     print("서울입니다.")
# elif userArea in ["09","10","11","12"]:
#     print("부산입니다.")
# else:
#     print("서울이 아닙니다.")

# num = input("주민등록번호: ")
# sum1 = int(num[0]) * 2 + int(num[1]) * 3 + int(num[2]) * 4 + int(num[3]) * 5 + int(num[4]) * 6 + \
#         int(num[5]) * 7 + int(num[7]) * 8 + int(num[8]) * 9 + int(num[9]) * 2 + int(num[10])* 3 + \
#         int(num[11])* 4 + int(num[12]) * 5
# sum2 = 11 - (sum1 % 11)
# sum3 = str(sum2)

# if num[-1] == sum3[-1]:
#     print("유효한 주민등록번호입니다.")
# else:
#     print("유효하지 않은 주민등록번호입니다.")

# import requests
# btc = requests.get("https://api.bithumb.com/public/ticker/").json()['data']
# if ((int(btc['opening_price'])+int(btc['max_price'])-int(btc['min_price'])) > int(btc['max_price'])):
#     print('상승장')
# else:
#     print('하락장')

# 131 ~ 140

# 과일 = ["사과", "귤", "수박"]
# for 변수 in 과일:
#     print(변수)

# 과일 = ["사과", "귤", "수박"]
# for 변수 in 과일:
#   print("#####")

# for 변수 in ["A", "B", "C"]:
#   print(변수)

# for 변수 in ["A", "B", "C"]:
#   print("출력:", 변수)

# for 변수 in ["A", "B", "C"]:
#   b = 변수.lower()
#   print("변환:", b)

# 변수 = 10
# print(변수)
# 변수 = 20
# print(변수)
# 변수 = 30
# print(변수)

# 변수 = [10, 20, 30]
# for i in 변수:
#     print(i)

# print(10)
# print(20)
# print(30)

# for i in [10, 20, 30]:
#     print(i)
#     print("=========")

# print("+++++++++")
# for i in [10, 20, 30]:
#     print(i)

# for i in range(4):
#     print("=============")


# 141 ~ 150

# 리스트 = [100, 200, 300]
# for i in 리스트:
#     print(i + 10)

# 리스트 = ["김밥", "라면", "튀김"]

# for i in 리스트:
#     print("오늘의 메뉴:", i)

# 리스트 = ["SK하이닉스", "삼성전자", "LG전자"]

# for i in 리스트:
#     print(len(i))

# 리스트 = ['dog', 'cat', 'parrot']
# for i in 리스트:
#     print(i, len(i))

# 리스트 = ['dog', 'cat', 'parrot']
# for i in 리스트:
#     print(i[:1])

# 리스트 = [1, 2, 3]
# for i in 리스트:
#     print("3 x",i,"=", i*3)

# 리스트 = ["가", "나", "다", "라"]

# for i in 리스트[1:]:
#     print(i)

# 리스트 = ["가", "나", "다", "라"]

# for i in 리스트[::2]:
#     print(i)

# for i in 리스트[::-1]:
#     print(i)

# 리스트 = [3, -20, -3, 44]

# for i in 리스트:
#     if(int(i) < 0):
#         print(i)

# 리스트 = [3, 100, 23, 44]

# for i in 리스트:
#     if(int(i) % 3 == 0):
#         print(i)

리스트 = [13, 21, 12, 14, 30, 18]

for i in 리스트:
    if((int(i) % 3 == 0) and (int(i) < 20)):
        print(i)

리스트 = ["I", "study", "python", "language", "!"]

for i in 리스트[1:4]:
    print(i)

리스트 = ["A", "b", "c", "D"]

for i in 리스트:
    if(i.isupper()):
        print(i)

리스트 = ["A", "b", "c", "D"]
for i in 리스트:
    if(i.islower()):
        print(i)

리스트 = ['dog', 'cat', 'parrot']
for i in 리스트:
    print(i[0].upper()+i[1:])

리스트 = ['hello.py', 'ex01.py', 'intro.hwp']
for i in 리스트:
    i = i.split(".")
    print(i[0])

리스트 = ['intra.h', 'intra.c', 'define.h', 'run.py']
# for i in 리스트:
#     i,j = i.split(".")
#     if(j == "h"):
#         print(i+"."+j)

for i in 리스트:
    i,j = i.split(".")
    if(j == "h" or j == "c"):
        print(i+"."+j)

# 161 ~ 170

for i in range(0,100):
    print(i)

for i in range(2002,2051, 4):
    print(i)

for i in range(3,31,3):
    print(i)

for i in range(99, 0, -1):
    print(i)

for i in range(0, 10):
    print("0." + str(i))

for i in range(1,10):
    print("3x"+str(i)+"="+str(int(i)*3))

for i in range(1,10,2):
    print("3x"+str(i)+"="+str(int(i)*3))

sum = 0 
for i in range(1,11):
    sum += i
print(sum)

sum = 0
for i in range(1,11,2):
    sum += i
print(sum)

mul = 1
for i in range(1,11):
    mul *= i
print(mul)

# 171 ~ 180

price_list = [32100, 32150, 32000, 32500]
for i in price_list:
    print(i)

for i in range(0,4):
    print(i, price_list[i])

for i in range(0,4):
    print(3-i, price_list[i])

price_list = [32100, 32150, 32000, 32500]
for i in range(1,4):
    print(90+(i*10), price_list[i])

my_list = ["가", "나", "다", "라"]
for i in range(0,3):
    print(my_list[i], my_list[i+1])

my_list = ["가", "나", "다", "라", "마"]
for i in range(0,3):
    print(my_list[i], my_list[i+1], my_list[i+2])

my_list = ["가", "나", "다", "라"]
for i in range(3,0,-1):
    print(my_list[i], my_list[i-1])

my_list = [100, 200, 400, 800]
for i in range(0,3):
    print(my_list[i+1]-my_list[i])

my_list = [100, 200, 400, 800, 1000, 1300]
for i in range(0,4):
    print((int(my_list[i]) + int(my_list[i+1]) + int(my_list[i+2]))/3)

low_prices  = [100, 200, 400, 800, 1000]
high_prices = [150, 300, 430, 880, 1000]

volatility = []
for i in range(0,5):
    volatility.append(high_prices[i]-low_prices[i])

print(volatility)

# 181 ~ 190

apart = [["101호", "102호"], ["201호", "202호"], ["301호", "302호"]]

stock = [ ["시가", 100, 200, 300], ["종가", 80, 210, 330] ]
stock = {"시가": [100, 200, 300], "종가": [80, 210, 330] }

stock = {"10/10": [80, 110, 70, 90], "10/11": [210, 230, 190, 200] }

apart = [ [101, 102], [201, 202], [301, 302] ]
for i in range(3):
    for j in range(2):
        print(apart[i][j], "호")

for i in range(2,-1,-1):
    for j in range(0,2):
        print(apart[i][j], "호")

for i in range(2,-1,-1):
    for j in range(1,-1,-1):
        print(apart[i][j], "호")

for i in range(3):
    for j in range(2):
        print(apart[i][j], "호")
        print("-----")

for i in range(3):
    for j in range(2):
        print(apart[i][j], "호")
    print("-----")

for i in range(3):
    for j in range(2):
        print(apart[i][j], "호")

print("-----")

# 191 ~ 200

data = [
    [ 2000,  3050,  2050,  1980],
    [ 7500,  2050,  2050,  1980],
    [15450, 15050, 15550, 14900]
]

for i in range(3):
    for j in range(4):
        print(data[i][j]*1.00014)

for i in range(3):
    for j in range(4):
        print(data[i][j]*1.00014)
    print("----")

list = []
for i in range(3):
    for j in range(4):
        list.append(data[i][j]*1.00014)
print(list)

ohlc = [["open", "high", "low", "close"],
        [100, 110, 70, 100],
        [200, 210, 180, 190],
        [300, 310, 300, 310]]

for i in range(1,4):
    print(ohlc[i][3])

print ("======")

for i in range(1,4):
    if int(ohlc[i][3]) > 150:
        print(ohlc[i][3])

print("=======")
for i in range(1,4):
    if (int(ohlc[i][3]) >= int(ohlc[i][0])):
        print(ohlc[i][3])

volatility = []
print("=======")
for i in range(1,4):
    volatility.append(int(ohlc[i][1]) - int(ohlc[i][2]))
print(volatility)

for row in ohlc[1:]:
    if row[3] > row[0]:
        print(row[1]-row[2])

sum = 0
for row in ohlc[1:]:
    sum += (row[3] - row[0])
print(sum)