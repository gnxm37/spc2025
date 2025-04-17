# 1. 기본 프린트 구문
name = "John"
print("Hello,", name) # 기본 띄어쓰기

print("Hello,"+ name) # 수동 띄어쓰기

# 2. f-문자열 (f-string) 표기법
print(f"Hello, {name}!")

# 3. 문자열 포맷팅

print('-'*10)
print("Hello, {}!\n".format(name))
print("Hello, {}!\nGoodBye, {}".format(name, name))

name = "James"
age = 30

print("안녕하세요, {}님, 당신은 {}살 입니다.".format(name,age))
print("안녕하세요, {1}님, 당신은 {0}살 입니다.".format(name,age))

# 4. % 연산자 사용
print("-----4-----")
print("Hello, %s!"%name)
