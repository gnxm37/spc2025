
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

print(datetime.datetime.now())

print(type(datetime.datetime.now()))