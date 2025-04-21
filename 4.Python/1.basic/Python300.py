
# 201 ~ 210 예측문제

def print_coin():
    print("비트코인")

for i in range(100):
    print_coin()

def message() :
    print("A")
    print("B")

message()
print("C")
message()

print("=====")

def message1():
    print("A")

def message2():
    print("B")

def message3():
    for i in range (3) :
        message2()
        print("C")
    message1()

message3()

# 211 ~ 220

def print_with_smile(user):
    print(user+":D")


print_with_smile("안녕하세요")

def print_upper_price(price):
    print(price*1.3)

def print_sum(a,b):
    sum = a + b
    print(sum)

print_sum(1,2)

def print_arithmetic_operation(a,b):
    print(a,"+",b,"=",a+b)
    print(a,"-",b,"=",a-b)
    print(a,"*",b,"=",a*b)
    print(a,"/",b,"=",a/b)

print_arithmetic_operation(3,4)

def print_max(a,b,c):
    if(a >= b and a >= c):
        print(a)
    elif(b >= a and b >= c):
        print(b)
    else:
        print(c)

print_max(1,22,3)

# 221 ~ 230

def print_reverse(string):
    string = string[::-1]
    print(string)
print_reverse("python")

def print_score(a):
    sum = 0
    for i in a:
        sum += i
    avg = sum / len(a)
    print(avg)

print_score([1,2,3])

def print_even(a):
    for i in a:
        if(int(i) % 2 == 0):
            print(i)

print_even([1, 3, 2, 10, 12, 11, 15])

def print_keys(dict):
    for i in dict.keys():
        print(i)
print_keys ({"이름":"김말똥", "나이":30, "성별":0})

my_dict = {"10/26" : [100, 130, 100, 100],
           "10/27" : [10, 12, 10, 11]}

def print_value_by_key(dic, key):
    print(dic[key])

print_value_by_key  (my_dict, "10/26")

def print_5xn(string):
    num = 0
    while(int(len(string))>=int(num)):
        print(string[num:num+5])
        num += 5

print_5xn("아이엠어보이유알어걸")

def print_5xn(string, str_num):
    num = 0
    while(int(len(string))>=int(num)):
        print(string[num:num+str_num])
        num += str_num

print_5xn("아이엠어보이유알어걸", 3)

def calc_monthly_salary(salary):
    print(int(salary/12))

calc_monthly_salary(12000000)

def my_print (a, b) :
    print("왼쪽:", a)
    print("오른쪽:", b)

my_print(a=100, b=200)

def my_print (a, b) :
    print("왼쪽:", a)
    print("오른쪽:", b)

my_print(b=100, a=200)

# 231 ~ 240

def n_plus_1 (n) :
    result = n + 1

print(n_plus_1(3))

def make_url(string):
    return "www."+string+".com"
print(make_url("naver"))

def make_list(string):
    j = []
    for i in string:
        j.append(i)
    return j
print(make_list("abcd"))

def pickup_even(list):
    j = []
    for i in list:
        if(int(i) % 2 == 0):
            j.append(i)
    return j

print(pickup_even([3, 4, 5, 6, 7, 8]))

def convert_int(string):
    a = string.split(",")
    for i in a:
        print(i, end="")
    # a,b,c = string.split(",")
    # print(int(a)+int(b)+int(c))
convert_int("1,234,567")

def 함수(num) :
    return num + 4

a = 함수(10)
b = 함수(a)
c = 함수(b)
print("\n")
print(c)

def 함수(num) :
    return num + 4

c = 함수(함수(함수(10)))
print(c)

def 함수1(num) :
    return num + 4

def 함수2(num) :
    return num * 10

a = 함수1(10)
c = 함수2(a)
print(c)

def 함수1(num) :
    return num + 4

def 함수2(num) :
    num = num + 2
    return 함수1(num)

c = 함수2(10)
print(c)

def 함수0(num) :
    return num * 2

def 함수1(num) :
    return 함수0(num + 2)

def 함수2(num) :
    num = num + 10
    return 함수1(num)

c = 함수2(2)
print(c)

# 241 ~ 250

import datetime
import time

print(datetime.datetime.now())

print(type(datetime.datetime.now()))

for i in range(5,0,-1):
    print(datetime.datetime.now()-datetime.timedelta(days=i))

print(datetime.datetime.now().strftime(format="%H:%M:%S"))
print(datetime.datetime.strptime("2020-05-04", "%Y-%m-%d"))

# while(True):
#     print(datetime.datetime.now())
#     time.sleep(1)

import os

print(os.getcwd())
# print(os.rename("1.txt","2.txt"))

import numpy

for i in numpy.arange(0,5,0.1):
    print(i)

# 251 ~ 260

# 클래스는 일종의 설계도로 하나의 타입을 정의하는 방법
# 클래스에는 관련있는 데이터와 함수를 한 데 모아 정의
# 클래스로 만들어진 결과물을 객체라고 함

class Human:
    def __init__(self, name, age, sex):
        self.name = name
        self.age = age
        self.sex = sex
    
    def who(self):
        print("이름:", self.name,",", "나이:", self.age,",","성별:", self.sex)

    def setInfo(self, name, age, sex):
        self.name = name
        self.age = age
        self.sex = sex

    def __del__(self):
        print("나의 죽음을 알리지 말라")


# areun = Human("조아름", 25, "여자")
# areun.who()

# areun = Human("모름", 0, "모름")
# areun.setInfo("아름", 25, "여자")
# areun.who()
# del(areun)

# class OMG: 
#     def print():
#         print("Oh my god")

# myStock = OMG()
# myStock.print()

# 261 ~ 270

class Stock:
    def __init__(self, name, code, per, pbr, dividend):
        self.name = name
        self.code = code
        self.per = per
        self.pbr = pbr
        self.dividend = dividend

    def set_name(self, name):
        self.name = name
        
    def set_code(self, number):
        self.number = number

    def set_per(self, per):
        self.per = per

    def set_pbr(self, pbr):
        self.pbr = pbr

    def set_dividend(self, dividend):
        self.dividend = dividend

    def get_name(self):
        return self.name

    def get_code(self):
        return self.number
    
# 삼성 = Stock("삼성전자", "005930")
# a = Stock(None, None)
# a.set_name("삼성전자")
# print(a.name, a.number)

# a = Stock(None, None)
# a.set_code("005930")
# print(a.name, a.number)

# 삼성 = Stock("삼성전자", "005930")
# print(삼성.get_name())
# print(삼성.get_code())

삼성 = Stock('삼성전자', '005930', 15.79, 1.33, 2.83)
print(삼성.dividend)

삼성.set_per(12.75)
print(삼성.per)

삼성 = Stock('삼성전자','005930', 15.79, 1.33, 2.83)
현대 = Stock('현대차', '005380', 8.70, 0.35, 4.27)
LG = Stock('LG전자', '066570', 317.34, 0.69, 1.37)

종목 = []
종목.append(삼성)
종목.append(현대)
종목.append(LG)

for i in 종목:
    print(i.code, i.per)

# 271 ~ 280

import random

class Account:
    count = 0
    def __init__(self, name, balance):
        self.dep = []
        self.draw = []
        self.deposit_count = 0
        self.name = name
        self.balance = balance
        self.bank = "SC은행"

        num1 = random.randint(0,999)
        num2 = random.randint(0,99)
        num3 = random.randint(0,999999)
    
        num1 = str(num1).zfill(3)
        num2 = str(num2).zfill(2)
        num3 = str(num3).zfill(6)
        self.account_number = num1 + '-' + num2 + '-' + num3  
        Account.count += 1

    @classmethod
    def get_account_num(c):
        print(c.count)

    def deposit(self, a):
        if int(a) >= 1:
            self.balance += a
            self.deposit_count += 1

            if int(self.deposit_count) % 5 == 0:
                self.balance = self.balance * 1.01
        self.dep.append(a)

    def withdraw(self, d):
        if self.balance <= 0:
            pass
        elif self.balance > d:
            self.balance -= d
        self.draw.append(d)
    
    def display_info(self):
        print(f"은행이름: {self.bank}, 예금주: {self.name}, 계좌번호: {self.account_number}, 잔고: {self.balance}")

    def deposit_history(self):
        for amount in self.dep:
            print(amount)
    def withdraw_history(self):
        for amount in self.draw:
            print(amount)
# user = Account("유진", 10)
# print(Account.count)

# print("----"*3)
# print(user.name)
# print(user.balance)
# print(user.bank)
# print(user.account_number)
# print("----"*3)

# user1 = Account("유자", 20)
# user1.get_account_num()

# a = Account("user", 100)
# a.deposit(100)
# a.withdraw(100)
# print(a.balance)
# a.display_info()

# p = Account("파이썬", 10000)
# p.deposit(10000)
# p.deposit(10000)
# p.deposit(10000)
# p.deposit(5000)
# p.deposit(5000)
# print(p.balance)

# data = []
# m = Account("민", 10000000)
# y = Account("유", 5000)
# j = Account("진", 1000)

# data.append(m)
# data.append(y)
# data.append(j)

# for c in data:
#     if c.balance >= 1000000:
#         c.display_info()


print("-"*10)

min = Account("min", 1000)
min.deposit(100)
min.deposit(200)
min.deposit(300)
min.deposit_history()

min.withdraw(300)
min.withdraw(400)
min.withdraw(500)
min.withdraw_history()
